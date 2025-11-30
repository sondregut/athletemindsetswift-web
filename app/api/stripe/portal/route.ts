import { NextRequest, NextResponse } from 'next/server';
import { stripe, STRIPE_CONFIG } from '@/lib/services/stripe';
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

    // Get user's Stripe customer ID
    const userDoc = await adminDb.collection('swift_users').doc(userId).get();
    const userData = userDoc.data();
    const customerId = userData?.billing?.stripeCustomerId;

    if (!customerId) {
      return NextResponse.json(
        { error: 'No billing account found' },
        { status: 400 }
      );
    }

    // Create Stripe Customer Portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${STRIPE_CONFIG.appUrl}/profile`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('[Stripe Portal] Error:', error);

    const errorMessage = error instanceof Error ? error.message : String(error);
    if (errorMessage.includes('invalid_grant') || errorMessage.includes('reauth')) {
      return NextResponse.json(
        { error: 'Server authentication error. Please try again later.' },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create portal session' },
      { status: 500 }
    );
  }
}
