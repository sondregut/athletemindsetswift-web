import { NextRequest, NextResponse } from 'next/server';
import { stripe, STRIPE_CONFIG } from '@/lib/services/stripe';
import { getAdminFirestore } from '@/lib/firebase/admin';
import Stripe from 'stripe';

// Type for subscription data - handle API version differences
interface SubscriptionData {
  id: string;
  customer: string | { id: string };
  status: string;
  metadata?: Record<string, string>;
  items: { data: Array<{ price: { id: string } }> };
  current_period_start?: number;
  current_period_end?: number;
  trial_start?: number | null;
  trial_end?: number | null;
  cancel_at_period_end?: boolean;
}

// Type for invoice data - handle API version differences
interface InvoiceData {
  subscription?: string | { id: string } | null;
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    console.error('[Stripe Webhook] No signature found');
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      STRIPE_CONFIG.webhookSecret
    );
  } catch (err) {
    console.error('[Stripe Webhook] Signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const adminDb = getAdminFirestore();

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(adminDb, session);
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as unknown as SubscriptionData;
        await handleSubscriptionUpdate(adminDb, subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as unknown as SubscriptionData;
        await handleSubscriptionDeleted(adminDb, subscription);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as unknown as InvoiceData;
        await handlePaymentSucceeded(adminDb, invoice);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as unknown as InvoiceData;
        await handlePaymentFailed(adminDb, invoice);
        break;
      }

      default:
        console.log(`[Stripe Webhook] Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[Stripe Webhook] Error processing event:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handleCheckoutCompleted(
  adminDb: FirebaseFirestore.Firestore,
  session: Stripe.Checkout.Session
) {
  // Support both firebaseUserId and supabase_user_id metadata field names
  const userId = session.metadata?.firebaseUserId || session.metadata?.supabase_user_id;
  if (!userId) {
    console.error('[Stripe Webhook] No userId in checkout session metadata');
    return;
  }

  console.log(`[Stripe Webhook] Checkout completed for user ${userId}`);

  // The subscription update will be handled by the subscription.created event
  // Just update the customer ID if needed
  await adminDb.collection('swift_users').doc(userId).set(
    {
      billing: {
        stripeCustomerId: session.customer as string,
        updatedAt: new Date().toISOString(),
      },
    },
    { merge: true }
  );
}

async function handleSubscriptionUpdate(
  adminDb: FirebaseFirestore.Firestore,
  subscription: SubscriptionData
) {
  // Support both firebaseUserId and supabase_user_id metadata field names
  const userId = subscription.metadata?.firebaseUserId || subscription.metadata?.supabase_user_id;
  if (!userId) {
    console.error('[Stripe Webhook] No userId in subscription metadata');
    return;
  }

  const status = mapStripeStatus(subscription.status as Stripe.Subscription.Status, subscription.trial_end ?? null);
  const planType = subscription.metadata?.planType || 'monthly';
  const customerId = typeof subscription.customer === 'string'
    ? subscription.customer
    : subscription.customer.id;

  console.log(`[Stripe Webhook] Subscription ${subscription.status} for user ${userId}`);

  // Web app billing data (original format)
  const billingData: Record<string, unknown> = {
    stripeCustomerId: customerId,
    stripeSubscriptionId: subscription.id,
    stripePriceId: subscription.items.data[0]?.price.id,
    subscriptionStatus: status,
    planType: planType,
    cancelAtPeriodEnd: subscription.cancel_at_period_end ?? false,
    updatedAt: new Date().toISOString(),
  };

  // iOS app subscription data (unified format for cross-platform)
  // This allows iOS app to read Stripe subscription status
  const subscriptionData: Record<string, unknown> = {
    status: status,
    plan: planType,
    platform: 'stripe',
    stripeCustomerId: customerId,
    stripeSubscriptionId: subscription.id,
    lastVerifiedAt: new Date().toISOString(),
  };

  // Add period dates if available
  if (subscription.current_period_start) {
    billingData.currentPeriodStart = new Date(subscription.current_period_start * 1000).toISOString();
    subscriptionData.currentPeriodStart = new Date(subscription.current_period_start * 1000);
  }
  if (subscription.current_period_end) {
    billingData.currentPeriodEnd = new Date(subscription.current_period_end * 1000).toISOString();
    subscriptionData.currentPeriodEnd = new Date(subscription.current_period_end * 1000);
  }

  // Add trial dates if in trial
  if (subscription.trial_start) {
    billingData.trialStartDate = new Date(subscription.trial_start * 1000).toISOString();
    subscriptionData.trialStartDate = new Date(subscription.trial_start * 1000);
  }
  if (subscription.trial_end) {
    billingData.trialEndDate = new Date(subscription.trial_end * 1000).toISOString();
    subscriptionData.trialEndDate = new Date(subscription.trial_end * 1000);
  }

  // Update both billing (for web) and subscription (for iOS) fields
  await adminDb.collection('swift_users').doc(userId).set(
    {
      billing: billingData,
      subscription: subscriptionData
    },
    { merge: true }
  );
}

async function handleSubscriptionDeleted(
  adminDb: FirebaseFirestore.Firestore,
  subscription: SubscriptionData
) {
  // Support both firebaseUserId and supabase_user_id metadata field names
  const userId = subscription.metadata?.firebaseUserId || subscription.metadata?.supabase_user_id;
  if (!userId) {
    console.error('[Stripe Webhook] No userId in subscription metadata');
    return;
  }

  console.log(`[Stripe Webhook] Subscription deleted for user ${userId}`);

  // Update both billing (web) and subscription (iOS) fields
  await adminDb.collection('swift_users').doc(userId).set(
    {
      billing: {
        subscriptionStatus: 'expired',
        stripeSubscriptionId: null,
        cancelAtPeriodEnd: false,
        updatedAt: new Date().toISOString(),
      },
      subscription: {
        status: 'expired',
        lastVerifiedAt: new Date().toISOString(),
      },
    },
    { merge: true }
  );
}

async function handlePaymentSucceeded(
  adminDb: FirebaseFirestore.Firestore,
  invoice: InvoiceData
) {
  const subscriptionId = typeof invoice.subscription === 'string'
    ? invoice.subscription
    : invoice.subscription?.id;
  if (!subscriptionId) return;

  // Get the subscription to find the userId
  const subscriptionResponse = await stripe.subscriptions.retrieve(subscriptionId);
  const subscription = subscriptionResponse as unknown as SubscriptionData;
  const userId = subscription.metadata?.firebaseUserId;
  if (!userId) return;

  console.log(`[Stripe Webhook] Payment succeeded for user ${userId}`);

  // Update both billing (web) and subscription (iOS) fields
  await adminDb.collection('swift_users').doc(userId).set(
    {
      billing: {
        subscriptionStatus: 'active',
        lastPaymentDate: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      subscription: {
        status: 'active',
        lastVerifiedAt: new Date().toISOString(),
      },
    },
    { merge: true }
  );
}

async function handlePaymentFailed(
  adminDb: FirebaseFirestore.Firestore,
  invoice: InvoiceData
) {
  const subscriptionId = typeof invoice.subscription === 'string'
    ? invoice.subscription
    : invoice.subscription?.id;
  if (!subscriptionId) return;

  // Get the subscription to find the userId
  const subscriptionResponse = await stripe.subscriptions.retrieve(subscriptionId);
  const subscription = subscriptionResponse as unknown as SubscriptionData;
  const userId = subscription.metadata?.firebaseUserId;
  if (!userId) return;

  console.log(`[Stripe Webhook] Payment failed for user ${userId}`);

  // Update both billing (web) and subscription (iOS) fields
  await adminDb.collection('swift_users').doc(userId).set(
    {
      billing: {
        subscriptionStatus: 'past_due',
        updatedAt: new Date().toISOString(),
      },
      subscription: {
        status: 'past_due',
        lastVerifiedAt: new Date().toISOString(),
      },
    },
    { merge: true }
  );
}

function mapStripeStatus(
  stripeStatus: Stripe.Subscription.Status,
  trialEnd: number | null
): string {
  // Check if currently in trial
  if (trialEnd && Date.now() < trialEnd * 1000) {
    return 'trial';
  }

  switch (stripeStatus) {
    case 'active':
      return 'active';
    case 'trialing':
      return 'trial';
    case 'canceled':
      return 'canceled';
    case 'past_due':
      return 'past_due';
    case 'unpaid':
      return 'past_due';
    case 'incomplete':
    case 'incomplete_expired':
      return 'expired';
    default:
      return 'none';
  }
}
