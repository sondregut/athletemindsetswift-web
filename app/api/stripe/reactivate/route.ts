import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/services/stripe';
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

    // Get user's subscription ID
    const userDoc = await adminDb.collection('swift_users').doc(userId).get();
    const userData = userDoc.data();
    const subscriptionId = userData?.billing?.stripeSubscriptionId;

    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'No subscription found to reactivate' },
        { status: 400 }
      );
    }

    // Check if subscription is actually canceled
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const subData = subscription as unknown as { cancel_at_period_end?: boolean; status?: string };

    if (!subData.cancel_at_period_end) {
      return NextResponse.json(
        { error: 'Subscription is not scheduled for cancellation' },
        { status: 400 }
      );
    }

    // Reactivate by removing cancel_at_period_end
    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
    });
    const updatedSubData = updatedSubscription as unknown as { status?: string };

    // Update Firestore
    await adminDb.collection('swift_users').doc(userId).set(
      {
        billing: {
          cancelAtPeriodEnd: false,
          subscriptionStatus: updatedSubData.status === 'trialing' ? 'trial' : 'active',
          cancellationReason: null,
          cancellationFeedback: null,
          cancellationInitiatedAt: null,
          updatedAt: new Date().toISOString(),
        },
      },
      { merge: true }
    );

    return NextResponse.json({
      success: true,
      status: updatedSubData.status,
    });
  } catch (error) {
    console.error('[Stripe Reactivate] Error:', error);

    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('invalid_grant') || errorMessage.includes('reauth')) {
      return NextResponse.json(
        { error: 'Server authentication error. Please try again later.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to reactivate subscription' },
      { status: 500 }
    );
  }
}
