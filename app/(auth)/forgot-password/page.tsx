"use client";

import { useState } from "react";
import { AuthForm } from "@/components/auth/auth-form";
import { useAuthContext } from "@/components/auth/auth-context";
import { GlassCard } from "@/components/ui/glass-card";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuthContext();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleReset = async (data: { email: string }) => {
    setError(null);
    try {
      await resetPassword(data.email);
      setSuccess(true);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Reset failed";
      if (errorMessage.includes("user-not-found")) {
        setError("No account found with this email");
      } else if (errorMessage.includes("invalid-email")) {
        setError("Invalid email address");
      } else {
        setError("Failed to send reset email. Please try again.");
      }
    }
  };

  if (success) {
    return (
      <GlassCard>
        <div className="text-center py-6">
          <div className="w-16 h-16 rounded-full bg-[var(--accent-green)]/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle
              className="w-8 h-8"
              style={{ color: "var(--accent-green)" }}
            />
          </div>
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Check Your Email
          </h2>
          <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
            We&apos;ve sent you a link to reset your password. Please check your
            inbox and spam folder.
          </p>
          <Link
            href="/login"
            className="font-semibold hover:underline"
            style={{ color: "var(--accent-blue)" }}
          >
            Return to Sign In
          </Link>
        </div>
      </GlassCard>
    );
  }

  return <AuthForm mode="reset" onSubmit={handleReset} error={error} />;
}
