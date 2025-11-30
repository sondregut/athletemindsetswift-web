"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/components/auth/auth-context";
import {
  User,
  LogOut,
  Moon,
  Sun,
  Monitor,
  ArrowLeft,
  Edit2,
  Check,
  X,
  Loader2,
  Trophy,
  Target,
  CreditCard,
  Crown,
  Calendar,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";
import { useSubscription } from "@/lib/hooks/useSubscription";

// Sports list - synced with iOS mobile app (OnboardingModels.swift)
const SPORTS = [
  // Popular Sports
  "Track & Field",
  "Basketball",
  "Soccer",
  "Football",
  "Tennis",
  "Swimming",
  "Golf",
  "Baseball",
  "Volleyball",
  "Gymnastics",
  "Cycling",
  "Martial Arts",
  "Skiing",
  "Hockey",
  "Wrestling",
  "Rowing",
  "CrossFit",
  "Triathlon",
  // Additional Sports
  "Archery",
  "Badminton",
  "Climbing",
  "Fencing",
  "Figure Skating",
  "Lacrosse",
  "Rugby",
  "Skateboarding",
  "Snowboarding",
  "Surfing",
  "Table Tennis",
  "Weightlifting",
  "Other",
];

// Experience levels - synced with iOS mobile app (OnboardingModels.swift)
const EXPERIENCE_LEVELS = [
  { value: "beginner", label: "Beginner", description: "Just starting out or returning to sport" },
  { value: "intermediate", label: "Intermediate", description: "Regularly training and competing" },
  { value: "advanced", label: "Advanced", description: "Competitive at regional/national level" },
  { value: "elite", label: "Elite", description: "Professional or Olympic-level athlete" },
];

export default function ProfilePage() {
  const router = useRouter();
  const { user, profile, isAuthenticated, loading, signOut, updateUserProfile } =
    useAuthContext();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Subscription state
  const {
    billing,
    hasAccess,
    isTrialing,
    trialDaysLeft,
    isCanceled,
    actionLoading,
    createCheckout,
    openCustomerPortal,
    reactivateSubscription,
    pricing,
  } = useSubscription();

  // Edit form state
  const [editForm, setEditForm] = useState({
    displayName: "",
    sport: "",
    experienceLevel: "",
  });

  // Hydration fix for theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize edit form when profile loads
  useEffect(() => {
    if (profile) {
      setEditForm({
        displayName: profile.displayName || "",
        sport: profile.sport || "",
        experienceLevel: profile.experienceLevel || "",
      });
    }
  }, [profile]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      await updateUserProfile({
        displayName: editForm.displayName,
        sport: editForm.sport,
        experienceLevel: editForm.experienceLevel,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditForm({
      displayName: profile?.displayName || "",
      sport: profile?.sport || "",
      experienceLevel: profile?.experienceLevel || "",
    });
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2
          className="w-8 h-8 animate-spin"
          style={{ color: "var(--accent-blue)" }}
        />
      </div>
    );
  }

  const currentExperience = EXPERIENCE_LEVELS.find(
    (e) => e.value === profile?.experienceLevel
  );

  return (
    <AppShell>
      <div className="p-6 md:p-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1
              className="text-2xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Profile
            </h1>
          </motion.header>

          {/* Profile Header */}
          <GlassCard className="mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-cyan)] flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.displayName}
                    onChange={(e) =>
                      setEditForm({ ...editForm, displayName: e.target.value })
                    }
                    className="text-xl font-bold bg-transparent border-b-2 border-[var(--accent-blue)] outline-none"
                    style={{ color: "var(--text-primary)" }}
                    placeholder="Your name"
                  />
                ) : (
                  <h1
                    className="text-xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {profile?.displayName || "Athlete"}
                  </h1>
                )}
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {user?.email}
                </p>
              </div>
            </div>

            {/* Edit/Save buttons */}
            {isEditing ? (
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancelEdit}
                  disabled={isSaving}
                >
                  <X className="w-4 h-4" />
                </Button>
                <Button
                  variant="gradient"
                  size="sm"
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4" />
                  )}
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)}>
                <Edit2 className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Sport & Experience */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[var(--glass-overlay-secondary)]">
              <div className="flex items-center gap-2 mb-2">
                <Trophy
                  className="w-4 h-4"
                  style={{ color: "var(--accent-gold)" }}
                />
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Sport
                </span>
              </div>
              {isEditing ? (
                <select
                  value={editForm.sport}
                  onChange={(e) =>
                    setEditForm({ ...editForm, sport: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-[var(--glass-border)] outline-none text-sm"
                  style={{ color: "var(--text-primary)" }}
                >
                  <option value="">Select sport</option>
                  {SPORTS.map((sport) => (
                    <option key={sport} value={sport}>
                      {sport}
                    </option>
                  ))}
                </select>
              ) : (
                <p
                  className="font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {profile?.sport || "Not set"}
                </p>
              )}
            </div>

            <div className="p-4 rounded-xl bg-[var(--glass-overlay-secondary)]">
              <div className="flex items-center gap-2 mb-2">
                <Target
                  className="w-4 h-4"
                  style={{ color: "var(--accent-cyan)" }}
                />
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Level
                </span>
              </div>
              {isEditing ? (
                <select
                  value={editForm.experienceLevel}
                  onChange={(e) =>
                    setEditForm({ ...editForm, experienceLevel: e.target.value })
                  }
                  className="w-full bg-transparent border-b border-[var(--glass-border)] outline-none text-sm"
                  style={{ color: "var(--text-primary)" }}
                >
                  <option value="">Select level</option>
                  {EXPERIENCE_LEVELS.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>
              ) : (
                <p
                  className="font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {currentExperience?.label || "Not set"}
                </p>
              )}
            </div>
          </div>
        </GlassCard>

        {/* Theme Settings */}
        <GlassCard className="mb-6">
          <h2
            className="text-lg font-semibold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Appearance
          </h2>
          <div className="flex gap-3">
            {mounted && (
              <>
                <button
                  onClick={() => setTheme("light")}
                  className={`flex-1 p-4 rounded-xl transition-all ${
                    theme === "light"
                      ? "bg-[var(--accent-blue)]/20 border-2 border-[var(--accent-blue)]"
                      : "bg-[var(--glass-overlay-secondary)] border-2 border-transparent"
                  }`}
                >
                  <Sun
                    className="w-6 h-6 mx-auto mb-2"
                    style={{
                      color:
                        theme === "light"
                          ? "var(--accent-blue)"
                          : "var(--text-secondary)",
                    }}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{
                      color:
                        theme === "light"
                          ? "var(--accent-blue)"
                          : "var(--text-secondary)",
                    }}
                  >
                    Light
                  </span>
                </button>

                <button
                  onClick={() => setTheme("dark")}
                  className={`flex-1 p-4 rounded-xl transition-all ${
                    theme === "dark"
                      ? "bg-[var(--accent-blue)]/20 border-2 border-[var(--accent-blue)]"
                      : "bg-[var(--glass-overlay-secondary)] border-2 border-transparent"
                  }`}
                >
                  <Moon
                    className="w-6 h-6 mx-auto mb-2"
                    style={{
                      color:
                        theme === "dark"
                          ? "var(--accent-blue)"
                          : "var(--text-secondary)",
                    }}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{
                      color:
                        theme === "dark"
                          ? "var(--accent-blue)"
                          : "var(--text-secondary)",
                    }}
                  >
                    Dark
                  </span>
                </button>

                <button
                  onClick={() => setTheme("system")}
                  className={`flex-1 p-4 rounded-xl transition-all ${
                    theme === "system"
                      ? "bg-[var(--accent-blue)]/20 border-2 border-[var(--accent-blue)]"
                      : "bg-[var(--glass-overlay-secondary)] border-2 border-transparent"
                  }`}
                >
                  <Monitor
                    className="w-6 h-6 mx-auto mb-2"
                    style={{
                      color:
                        theme === "system"
                          ? "var(--accent-blue)"
                          : "var(--text-secondary)",
                    }}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{
                      color:
                        theme === "system"
                          ? "var(--accent-blue)"
                          : "var(--text-secondary)",
                    }}
                  >
                    System
                  </span>
                </button>
              </>
            )}
          </div>
        </GlassCard>

        {/* Subscription & Billing */}
        <GlassCard className="mb-6">
          <h2
            className="text-lg font-semibold mb-4 flex items-center gap-2"
            style={{ color: "var(--text-primary)" }}
          >
            <CreditCard className="w-5 h-5" style={{ color: "var(--accent-blue)" }} />
            Subscription
          </h2>

          {/* Active/Trial Subscription */}
          {hasAccess && (
            <div className="space-y-4">
              {/* Status Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--accent-gold)/20" }}
                  >
                    <Crown className="w-5 h-5" style={{ color: "var(--accent-gold)" }} />
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
                      {isTrialing ? "Free Trial" : "Premium"}
                    </p>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      {billing?.planType === "yearly" ? "Yearly Plan" : "Monthly Plan"}
                    </p>
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isCanceled
                      ? "bg-red-500/20 text-red-400"
                      : isTrialing
                      ? "bg-amber-500/20 text-amber-400"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {isCanceled ? "Canceling" : isTrialing ? "Trial" : "Active"}
                </div>
              </div>

              {/* Trial Info */}
              {isTrialing && trialDaysLeft > 0 && (
                <div
                  className="p-3 rounded-xl flex items-center gap-3"
                  style={{ backgroundColor: "var(--glass-overlay-secondary)" }}
                >
                  <Calendar className="w-5 h-5" style={{ color: "var(--accent-cyan)" }} />
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                      {trialDaysLeft} day{trialDaysLeft !== 1 ? "s" : ""} left in trial
                    </p>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      Ends {billing?.trialEndDate ? new Date(billing.trialEndDate).toLocaleDateString() : "soon"}
                    </p>
                  </div>
                </div>
              )}

              {/* Cancellation Warning */}
              {isCanceled && billing?.currentPeriodEnd && (
                <div
                  className="p-3 rounded-xl flex items-start gap-3"
                  style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                >
                  <AlertCircle className="w-5 h-5 mt-0.5 text-red-400" />
                  <div>
                    <p className="text-sm font-medium text-red-400">
                      Subscription ending
                    </p>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      Access until {new Date(billing.currentPeriodEnd).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                {isCanceled ? (
                  <Button
                    variant="gradient"
                    className="flex-1"
                    onClick={() => reactivateSubscription()}
                    disabled={actionLoading}
                  >
                    {actionLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Sparkles className="w-4 h-4 mr-2" />
                    )}
                    Reactivate
                  </Button>
                ) : (
                  <Button
                    variant="glass"
                    className="flex-1"
                    onClick={() => openCustomerPortal()}
                    disabled={actionLoading}
                  >
                    {actionLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <CreditCard className="w-4 h-4 mr-2" />
                    )}
                    Manage Billing
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* No Subscription - Upgrade CTA */}
          {!hasAccess && (
            <div className="space-y-4">
              {/* Header */}
              <div className="text-center mb-2">
                <div
                  className="w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, var(--accent-gold), var(--accent-cyan))" }}
                >
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h3
                  className="text-xl font-bold mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  Athlete Mindset Pro
                </h3>
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Unlock your full mental performance potential
                </p>
              </div>

              {/* Features List */}
              <div
                className="p-4 rounded-xl space-y-2"
                style={{ backgroundColor: "var(--glass-overlay-secondary)" }}
              >
                {[
                  "Unlimited AI voice coaching sessions",
                  "Personalized mental training plans",
                  "Advanced visualization exercises",
                  "Goal tracking & progress analytics",
                  "Daily check-ins & journaling",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-4 h-4 flex-shrink-0" style={{ color: "var(--accent-cyan)" }} />
                    <span className="text-sm" style={{ color: "var(--text-primary)" }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing Options */}
              <div className="grid grid-cols-2 gap-3">
                {/* Monthly */}
                <button
                  onClick={() => createCheckout("monthly")}
                  disabled={actionLoading}
                  className="p-4 rounded-xl border-2 border-transparent hover:border-[var(--accent-blue)] transition-all text-left relative"
                  style={{ backgroundColor: "var(--glass-overlay-secondary)" }}
                >
                  <p className="text-xs font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                    Monthly
                  </p>
                  <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                    ${pricing.monthly.amount}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    per month
                  </p>
                </button>

                {/* Yearly - Best Value */}
                <button
                  onClick={() => createCheckout("yearly")}
                  disabled={actionLoading}
                  className="p-4 rounded-xl border-2 border-[var(--accent-gold)] transition-all text-left relative overflow-hidden"
                  style={{ backgroundColor: "var(--glass-overlay-secondary)" }}
                >
                  <span
                    className="absolute top-0 right-0 text-[10px] px-2 py-1 font-bold text-black"
                    style={{ backgroundColor: "var(--accent-gold)" }}
                  >
                    BEST VALUE
                  </span>
                  <p className="text-xs font-medium mb-2" style={{ color: "var(--text-secondary)" }}>
                    Yearly
                  </p>
                  <p className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                    ${pricing.yearly.amount}
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    ${(pricing.yearly.amount / 12).toFixed(2)}/mo · Save {pricing.yearly.savings}
                  </p>
                </button>
              </div>

              {/* Trial Info */}
              <div
                className="p-3 rounded-xl flex items-center justify-center gap-2 bg-[var(--accent-cyan)]/10"
              >
                <Sparkles className="w-4 h-4" style={{ color: "var(--accent-cyan)" }} />
                <p className="text-sm font-medium" style={{ color: "var(--accent-cyan)" }}>
                  Start with 3 days free
                </p>
              </div>
            </div>
          )}
        </GlassCard>

          {/* Sign Out */}
          <GlassCard>
            <Button
              variant="ghost"
              onClick={handleSignOut}
              className="w-full justify-center"
              style={{ color: "var(--accent-red)" }}
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sign Out
            </Button>
          </GlassCard>
        </div>
      </div>
    </AppShell>
  );
}
