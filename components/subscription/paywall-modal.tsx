"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Crown, Check, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/lib/hooks/useSubscription";
import { useState } from "react";
import { PlanType } from "@/lib/types/subscription";

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature?: string;
}

const PREMIUM_FEATURES = [
  "Unlimited AI coaching sessions",
  "Personalized visualizations",
  "Training session tracking",
  "Goal setting & progress",
  "Mental performance insights",
  "Priority support",
];

export function PaywallModal({ isOpen, onClose, feature }: PaywallModalProps) {
  const { createCheckout, pricing, actionLoading } = useSubscription();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("yearly");

  const handleSubscribe = async () => {
    try {
      await createCheckout(selectedPlan);
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-md mx-auto"
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                backgroundColor: "var(--glass-bg)",
                border: "1px solid var(--glass-border)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              }}
            >
              {/* Header */}
              <div
                className="relative p-6 text-center"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-cyan) 100%)",
                }}
              >
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                  <Crown className="w-8 h-8 text-white" />
                </div>

                <h2 className="text-2xl font-bold text-white mb-2">
                  Unlock Premium
                </h2>
                <p className="text-white/80 text-sm">
                  {feature
                    ? `${feature} is a premium feature`
                    : "Get unlimited access to all features"}
                </p>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Features List */}
                <div className="space-y-3 mb-6">
                  {PREMIUM_FEATURES.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "var(--accent-green)/20" }}
                      >
                        <Check
                          className="w-3 h-3"
                          style={{ color: "var(--accent-green)" }}
                        />
                      </div>
                      <span
                        className="text-sm"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Plan Selection */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    onClick={() => setSelectedPlan("monthly")}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      selectedPlan === "monthly"
                        ? "border-[var(--accent-blue)]"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: "var(--glass-overlay-secondary)" }}
                  >
                    <p
                      className="text-lg font-bold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      ${pricing.monthly.amount}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      per month
                    </p>
                  </button>

                  <button
                    onClick={() => setSelectedPlan("yearly")}
                    className={`p-4 rounded-xl border-2 transition-all relative ${
                      selectedPlan === "yearly"
                        ? "border-[var(--accent-gold)]"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: "var(--glass-overlay-secondary)" }}
                  >
                    <span
                      className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        backgroundColor: "var(--accent-gold)",
                        color: "#000",
                      }}
                    >
                      Save {pricing.yearly.savings}
                    </span>
                    <p
                      className="text-lg font-bold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      ${pricing.yearly.amount}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      per year
                    </p>
                  </button>
                </div>

                {/* CTA Button */}
                <Button
                  variant="gradient"
                  className="w-full py-3 text-base"
                  onClick={handleSubscribe}
                  disabled={actionLoading}
                >
                  {actionLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  ) : (
                    <Sparkles className="w-5 h-5 mr-2" />
                  )}
                  Start 3-Day Free Trial
                </Button>

                <p
                  className="text-center text-xs mt-4"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Cancel anytime. No commitment required.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Hook to manage paywall state
export function usePaywall() {
  const [isOpen, setIsOpen] = useState(false);
  const [feature, setFeature] = useState<string | undefined>();
  const { hasAccess } = useSubscription();

  const checkAccess = (featureName?: string): boolean => {
    if (hasAccess) return true;
    setFeature(featureName);
    setIsOpen(true);
    return false;
  };

  const closePaywall = () => {
    setIsOpen(false);
    setFeature(undefined);
  };

  return {
    isOpen,
    feature,
    checkAccess,
    closePaywall,
    hasAccess,
  };
}
