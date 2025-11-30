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

    // Get optional cancellation reason from body
    const body = await request.json().catch(() => ({}));
    const { reason, feedback } = body;

    // Get user's subscription ID
    const userDoc = await adminDb.collection('swift_users').doc(userId).get();
    const userData = userDoc.data();
    const subscriptionId = userData?.billing?.stripeSubscriptionId;

    if (!subscriptionId) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 400 }
      );
    }

    // Cancel at period end (user keeps access until end of billing period)
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    // Update Firestore with cancellation info
    await adminDb.collection('swift_users').doc(userId).set(
      {
        billing: {
          cancelAtPeriodEnd: true,
          subscriptionStatus: 'canceled',
          cancellationReason: reason || null,
          cancellationFeedback: feedback || null,
          cancellationInitiatedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
      { merge: true }
    );

    // Get cancel_at date - use type assertion for the newer Stripe API version
    const subData = subscription as unknown as { cancel_at?: number; current_period_end?: number };
    const cancelAt = subData.cancel_at
      ? new Date(subData.cancel_at * 1000).toISOString()
      : subData.current_period_end
        ? new Date(subData.current_period_end * 1000).toISOString()
        : new Date().toISOString();

    return NextResponse.json({
      success: true,
      cancelAt,
    });
  } catch (error) {
    console.error('[Stripe Cancel] Error:', error);

    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('invalid_grant') || errorMessage.includes('reauth')) {
      return NextResponse.json(
        { error: 'Server authentication error. Please try again later.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to cancel subscription' },
      { status: 500 }
    );
  }
}
