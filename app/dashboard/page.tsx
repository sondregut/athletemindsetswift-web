"use client";

import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/layout/app-shell";
import {
  Mic,
  Target,
  Flame,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useAuthContext } from "@/components/auth/auth-context";
import { useGoals } from "@/lib/hooks/useGoals";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { user, profile, loading, isAuthenticated } = useAuthContext();
  const { stats: goalStats } = useGoals();
  const router = useRouter();

  // Redirect to login if not authenticated, or onboarding if explicitly not completed
  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (profile && profile.onboardingCompleted === false) {
        // Only redirect if onboardingCompleted is explicitly false (new user)
        // Users with undefined onboardingCompleted (existing users from iOS) can access dashboard
        router.push("/onboarding");
      }
    }
  }, [loading, isAuthenticated, profile, router]);

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const displayName = profile?.displayName || user?.displayName || "Athlete";

  // Show loading state
  if (loading) {
    return (
      <AppShell>
        <div className="p-6 md:p-8 flex items-center justify-center min-h-[50vh]">
          <div className="animate-pulse text-lg" style={{ color: "var(--text-secondary)" }}>
            Loading...
          </div>
        </div>
      </AppShell>
    );
  }

  // Don't render if not authenticated (redirect will happen)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <AppShell>
      <div className="p-6 md:p-8">
        <div className="max-w-5xl">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              {getGreeting()}, {displayName}
            </h1>
            <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
              Here's an overview of your mental training
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={Target}
              label="Active Goals"
              value={goalStats.activeGoals.toString()}
            />
            <StatCard
              icon={CheckCircle}
              label="Completed"
              value={goalStats.completedGoals.toString()}
            />
            <StatCard
              icon={Flame}
              label="Day Streak"
              value="0"
            />
            <StatCard
              icon={TrendingUp}
              label="Success Rate"
              value={`${Math.round(goalStats.completionRate * 100)}%`}
            />
          </div>

          {/* Quick Actions */}
          <GlassCard className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2
                  className="text-xl font-bold mb-1"
                  style={{ color: "var(--text-primary)" }}
                >
                  Ready to train?
                </h2>
                <p style={{ color: "var(--text-secondary)" }}>
                  Start a voice coaching session with your AI coach
                </p>
              </div>
              <Link href="/dashboard/coach">
                <Button icon={Mic} size="lg">
                  Start Voice Session
                </Button>
              </Link>
            </div>
          </GlassCard>

          {/* Getting Started */}
          <GlassCard>
            <h2
              className="text-lg font-bold mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Getting Started
            </h2>
            <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
              Follow these steps to get the most out of your training
            </p>

            <div className="space-y-4">
              <GettingStartedItem
                number={1}
                title="Set Your Goals"
                description="Define what you want to achieve mentally"
                href="/dashboard/goals"
                completed={goalStats.totalGoals > 0}
              />
              <GettingStartedItem
                number={2}
                title="Complete a Voice Session"
                description="Talk with your AI coach about your mental game"
                href="/dashboard/coach"
                completed={false}
              />
              <GettingStartedItem
                number={3}
                title="Explore Training Library"
                description="Discover visualization and mental training exercises"
                href="/dashboard/library"
                completed={false}
              />
              <GettingStartedItem
                number={4}
                title="Track Your Progress"
                description="Review your history and celebrate wins"
                href="/dashboard/history"
                completed={false}
              />
            </div>
          </GlassCard>
        </div>
      </div>
    </AppShell>
  );
}

// Stat Card Component
function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  value: string;
}) {
  return (
    <GlassCard variant="compact">
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-sm font-medium"
          style={{ color: "var(--text-secondary)" }}
        >
          {label}
        </span>
        <Icon className="w-4 h-4" style={{ color: "var(--accent-blue)" }} />
      </div>
      <p
        className="text-2xl font-bold"
        style={{ color: "var(--text-primary)" }}
      >
        {value}
      </p>
    </GlassCard>
  );
}

// Getting Started Item Component
function GettingStartedItem({
  number,
  title,
  description,
  href,
  completed,
}: {
  number: number;
  title: string;
  description: string;
  href: string;
  completed: boolean;
}) {
  return (
    <Link href={href}>
      <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-[var(--glass-overlay-secondary)] transition-colors">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: completed
              ? "var(--accent-green)"
              : "var(--accent-blue)",
          }}
        >
          {completed ? (
            <CheckCircle className="w-4 h-4 text-white" />
          ) : (
            <span className="text-sm font-bold text-white">{number}</span>
          )}
        </div>
        <div className="flex-1">
          <h3
            className="font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            {title}
          </h3>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
