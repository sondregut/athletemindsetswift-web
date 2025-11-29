"use client";

import { useState, useEffect, useCallback } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db, auth } from "@/lib/firebase/client";
import {
  SubscriptionStatus,
  PlanType,
  PRICING,
  TRIAL_DAYS,
  FREE_SESSIONS_LIMIT,
  calculateTrialDaysLeft,
  isSubscriptionActive,
} from "@/lib/types/subscription";

export interface BillingData {
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  stripePriceId?: string;
  subscriptionStatus: SubscriptionStatus;
  planType?: PlanType;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
  trialStartDate?: string;
  trialEndDate?: string;
  cancelAtPeriodEnd?: boolean;
  cancellationReason?: string;
  cancellationFeedback?: string;
  cancellationInitiatedAt?: string;
  lastPaymentDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SubscriptionState {
  isLoading: boolean;
  billing: BillingData | null;
  hasAccess: boolean;
  isTrialing: boolean;
  trialDaysLeft: number;
  canAccessPremiumFeatures: boolean;
  isCanceled: boolean;
}

export function useSubscription() {
  const [state, setState] = useState<SubscriptionState>({
    isLoading: true,
    billing: null,
    hasAccess: false,
    isTrialing: false,
    trialDaysLeft: 0,
    canAccessPremiumFeatures: false,
    isCanceled: false,
  });
  const [actionLoading, setActionLoading] = useState(false);

  // Listen to billing data changes
  useEffect(() => {
    if (!auth || !db) {
      setState((prev) => ({ ...prev, isLoading: false }));
      return;
    }

    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (!user) {
        setState({
          isLoading: false,
          billing: null,
          hasAccess: false,
          isTrialing: false,
          trialDaysLeft: 0,
          canAccessPremiumFeatures: false,
          isCanceled: false,
        });
        return;
      }

      // Subscribe to user document for billing updates
      // db is guaranteed to be defined here because we checked at the top of useEffect
      const userRef = doc(db!, "swift_users", user.uid);
      const unsubscribeDoc = onSnapshot(
        userRef,
        (snapshot) => {
          const data = snapshot.data();
          const billing = data?.billing as BillingData | undefined;

          if (!billing) {
            setState({
              isLoading: false,
              billing: null,
              hasAccess: false,
              isTrialing: false,
              trialDaysLeft: 0,
              canAccessPremiumFeatures: false,
              isCanceled: false,
            });
            return;
          }

          const status = billing.subscriptionStatus || "none";
          const isTrialing = status === "trial";
          const trialDaysLeft = calculateTrialDaysLeft(billing.trialEndDate);
          const hasAccess = isSubscriptionActive(status);
          const isCanceled = billing.cancelAtPeriodEnd === true;

          setState({
            isLoading: false,
            billing,
            hasAccess,
            isTrialing,
            trialDaysLeft,
            canAccessPremiumFeatures: hasAccess,
            isCanceled,
          });
        },
        (error) => {
          console.error("Error listening to billing data:", error);
          setState((prev) => ({ ...prev, isLoading: false }));
        }
      );

      return () => unsubscribeDoc();
    });

    return () => unsubscribeAuth();
  }, []);

  // Get ID token for API calls
  const getIdToken = useCallback(async () => {
    const user = auth?.currentUser;
    if (!user) throw new Error("Not authenticated");
    return user.getIdToken();
  }, []);

  // Create checkout session
  const createCheckout = useCallback(
    async (planType: PlanType = "monthly") => {
      setActionLoading(true);

      try {
        const token = await getIdToken();
        const priceId = PRICING[planType].priceId;

        const response = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ priceId, planType }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to create checkout session");
        }

        const { url } = await response.json();

        // Redirect to Stripe checkout
        if (url) {
          window.location.href = url;
        }
      } catch (error) {
        console.error("Checkout error:", error);
        throw error;
      } finally {
        setActionLoading(false);
      }
    },
    [getIdToken]
  );

  // Open customer portal
  const openCustomerPortal = useCallback(async () => {
    setActionLoading(true);

    try {
      const token = await getIdToken();

      const response = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to open customer portal");
      }

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Portal error:", error);
      throw error;
    } finally {
      setActionLoading(false);
    }
  }, [getIdToken]);

  // Cancel subscription
  const cancelSubscription = useCallback(
    async (reason?: string, feedback?: string) => {
      setActionLoading(true);

      try {
        const token = await getIdToken();

        const response = await fetch("/api/stripe/cancel", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ reason, feedback }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to cancel subscription");
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Cancel error:", error);
        throw error;
      } finally {
        setActionLoading(false);
      }
    },
    [getIdToken]
  );

  // Reactivate subscription
  const reactivateSubscription = useCallback(async () => {
    setActionLoading(true);

    try {
      const token = await getIdToken();

      const response = await fetch("/api/stripe/reactivate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to reactivate subscription");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Reactivate error:", error);
      throw error;
    } finally {
      setActionLoading(false);
    }
  }, [getIdToken]);

  return {
    ...state,
    actionLoading,
    createCheckout,
    openCustomerPortal,
    cancelSubscription,
    reactivateSubscription,
    pricing: PRICING,
    trialDays: TRIAL_DAYS,
    freeSessionsLimit: FREE_SESSIONS_LIMIT,
  };
}
