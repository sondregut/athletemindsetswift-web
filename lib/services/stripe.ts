import Stripe from 'stripe';

// Initialize Stripe with secret key
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
  typescript: true,
});

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
