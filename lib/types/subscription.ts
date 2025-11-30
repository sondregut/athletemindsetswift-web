// Subscription types for Stripe integration

export type SubscriptionStatus =
  | 'trial'
  | 'active'
  | 'canceled'
  | 'expired'
  | 'past_due'
  | 'none';

export type PlanType = 'monthly' | 'yearly';

export interface UserSubscription {
  userId: string;
  subscriptionStatus: SubscriptionStatus;
  planType?: PlanType;
  stripeSubscriptionId?: string;
  stripeCustomerId?: string;
  stripePriceId?: string;
  currentPeriodStart?: string; // ISO date
  currentPeriodEnd?: string; // ISO date
  trialStartDate?: string; // ISO date
  trialEndDate?: string; // ISO date
  cancelAtPeriodEnd?: boolean;
  cancellationReason?: string;
  cancellationFeedback?: string;
  cancellationInitiatedAt?: string; // ISO date
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}

export interface SubscriptionState {
  isLoading: boolean;
  subscription: UserSubscription | null;
  hasAccess: boolean;
  isTrialing: boolean;
  trialDaysLeft: number;
  sessionsCompleted: number;
  canAccessPremiumFeatures: boolean;
}

// Pricing configuration
export const PRICING = {
  monthly: {
    priceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID!,
    amount: 12.99,
    interval: 'month' as const,
    label: 'Monthly',
  },
  yearly: {
    priceId: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID!,
    amount: 69.99,
    monthlyEquivalent: 5.83,
    interval: 'year' as const,
    label: 'Yearly',
    savings: '55%',
  },
} as const;

// Trial configuration
export const TRIAL_DAYS = 3;
export const FREE_SESSIONS_LIMIT = 2;

// Helper functions
export function isSubscriptionActive(status: SubscriptionStatus): boolean {
  return status === 'active' || status === 'trial';
}

export function calculateTrialDaysLeft(trialEndDate?: string): number {
  if (!trialEndDate) return 0;
  const now = new Date();
  const end = new Date(trialEndDate);
  const diffTime = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}
