import { NextRequest, NextResponse } from 'next/server';
import { stripe, STRIPE_CONFIG, TRIAL_PERIOD_DAYS } from '@/lib/services/stripe';
import { getAdminAuth, getAdminFirestore } from '@/lib/firebase/admin';

export async function POST(request: NextRequest) {
  try {
    // Verify Firebase auth token
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    const adminAuth = getAdminAuth();
    const adminDb = getAdminFirestore();

    const decodedToken = await adminAuth.verifyIdToken(token);
    const userId = decodedToken.uid;
    const userEmail = decodedToken.email;

    // Get request body
    const { priceId, planType } = await request.json();

    if (!priceId) {
      return NextResponse.json({ error: 'Price ID is required' }, { status: 400 });
    }

    // Check if user already has a Stripe customer ID
    const userDoc = await adminDb.collection('swift_users').doc(userId).get();
    const userData = userDoc.data();
    let customerId = userData?.billing?.stripeCustomerId;

    // Create Stripe customer if doesn't exist
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: userEmail,
        metadata: {
          firebaseUserId: userId,
        },
      });
      customerId = customer.id;

      // Save customer ID to Firestore
      await adminDb.collection('swift_users').doc(userId).set({
        billing: {
          stripeCustomerId: customerId,
          createdAt: new Date().toISOString(),
        },
      }, { merge: true });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      subscription_data: {
        trial_period_days: TRIAL_PERIOD_DAYS,
        metadata: {
          firebaseUserId: userId,
          planType: planType || 'monthly',
        },
      },
      success_url: `${STRIPE_CONFIG.appUrl}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${STRIPE_CONFIG.appUrl}/dashboard?canceled=true`,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      metadata: {
        firebaseUserId: userId,
        planType: planType || 'monthly',
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error('[Stripe Checkout] Error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
