import Stripe from 'stripe';

// Lazy initialization of Stripe to avoid build-time errors
let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not configured');
    }
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-11-17.clover',
      typescript: true,
    });
  }
  return stripeInstance;
}

// Keep backward compatibility
export const stripe = {
  get subscriptions() { return getStripe().subscriptions; },
  get customers() { return getStripe().customers; },
  get checkout() { return getStripe().checkout; },
  get billingPortal() { return getStripe().billingPortal; },
  get webhooks() { return getStripe().webhooks; },
};

// Stripe configuration
export const STRIPE_CONFIG = {
  publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  monthlyPriceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID!,
  yearlyPriceId: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID!,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
  appUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://athletemindset.app',
};

// Trial period in days
export const TRIAL_PERIOD_DAYS = 3;
