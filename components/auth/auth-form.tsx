"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, Mail, Lock, User } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Validation schemas
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const resetSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type ResetFormData = z.infer<typeof resetSchema>;
export type AuthFormData = LoginFormData | SignupFormData | ResetFormData;

interface AuthFormProps {
  mode: "login" | "signup" | "reset";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => Promise<void>;
  onGoogleSignIn?: () => Promise<void>;
  error?: string | null;
}

export function AuthForm({ mode, onSubmit, onGoogleSignIn, error }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const schema =
    mode === "login"
      ? loginSchema
      : mode === "signup"
      ? signupSchema
      : resetSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<any>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema) as any,
  });

  const handleFormSubmit = async (data: Record<string, string>) => {
    setIsLoading(true);
    try {
      // Cast based on mode - TypeScript discriminated union ensures type safety
      await (onSubmit as (data: Record<string, string>) => Promise<void>)(data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GlassCard>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2
          className="text-2xl font-bold mb-2 text-center"
          style={{ color: "var(--text-primary)" }}
        >
          {mode === "login"
            ? "Welcome Back"
            : mode === "signup"
            ? "Create Account"
            : "Reset Password"}
        </h2>
        <p
          className="text-center mb-6"
          style={{ color: "var(--text-secondary)" }}
        >
          {mode === "login"
            ? "Sign in to continue your training"
            : mode === "signup"
            ? "Start your mental performance journey"
            : "Enter your email to reset your password"}
        </p>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 p-3 rounded-xl bg-[var(--accent-red)]/10 border border-[var(--accent-red)]/20"
          >
            <p className="text-sm text-center" style={{ color: "var(--accent-red)" }}>
              {error}
            </p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {/* Name field (signup only) */}
          {mode === "signup" && (
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                  style={{ color: "var(--text-secondary)" }}
                />
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Enter your name"
                  className="w-full pl-10 pr-4 py-3 rounded-xl glass-card-compact border-0 focus:ring-2 focus:ring-[var(--accent-blue)]"
                  style={{
                    color: "var(--text-primary)",
                    backgroundColor: "var(--glass-overlay-secondary)",
                  }}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm" style={{ color: "var(--accent-red)" }}>
                  {errors.name.message as string}
                </p>
              )}
            </div>
          )}

          {/* Email field */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                style={{ color: "var(--text-secondary)" }}
              />
              <input
                {...register("email")}
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 rounded-xl glass-card-compact border-0 focus:ring-2 focus:ring-[var(--accent-blue)]"
                style={{
                  color: "var(--text-primary)",
                  backgroundColor: "var(--glass-overlay-secondary)",
                }}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm" style={{ color: "var(--accent-red)" }}>
                {errors.email.message as string}
              </p>
            )}
          </div>

          {/* Password field (login and signup) */}
          {mode !== "reset" && (
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                  style={{ color: "var(--text-secondary)" }}
                />
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl glass-card-compact border-0 focus:ring-2 focus:ring-[var(--accent-blue)]"
                  style={{
                    color: "var(--text-primary)",
                    backgroundColor: "var(--glass-overlay-secondary)",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff
                      className="w-5 h-5"
                      style={{ color: "var(--text-secondary)" }}
                    />
                  ) : (
                    <Eye
                      className="w-5 h-5"
                      style={{ color: "var(--text-secondary)" }}
                    />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm" style={{ color: "var(--accent-red)" }}>
                  {errors.password.message as string}
                </p>
              )}
            </div>
          )}

          {/* Confirm Password field (signup only) */}
          {mode === "signup" && (
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                  style={{ color: "var(--text-secondary)" }}
                />
                <input
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="w-full pl-10 pr-12 py-3 rounded-xl glass-card-compact border-0 focus:ring-2 focus:ring-[var(--accent-blue)]"
                  style={{
                    color: "var(--text-primary)",
                    backgroundColor: "var(--glass-overlay-secondary)",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeOff
                      className="w-5 h-5"
                      style={{ color: "var(--text-secondary)" }}
                    />
                  ) : (
                    <Eye
                      className="w-5 h-5"
                      style={{ color: "var(--text-secondary)" }}
                    />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm" style={{ color: "var(--accent-red)" }}>
                  {errors.confirmPassword.message as string}
                </p>
              )}
            </div>
          )}

          {/* Forgot password link (login only) */}
          {mode === "login" && (
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm hover:underline"
                style={{ color: "var(--accent-blue)" }}
              >
                Forgot password?
              </Link>
            </div>
          )}

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || isGoogleLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                {mode === "login"
                  ? "Signing in..."
                  : mode === "signup"
                  ? "Creating account..."
                  : "Sending reset link..."}
              </>
            ) : mode === "login" ? (
              "Sign In"
            ) : mode === "signup" ? (
              "Create Account"
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </form>

        {/* Google Sign In (only for login and signup) */}
        {mode !== "reset" && onGoogleSignIn && (
          <>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" style={{ borderColor: "var(--glass-border-primary)" }} />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4" style={{ backgroundColor: "var(--glass-bg-primary)", color: "var(--text-secondary)" }}>
                  or continue with
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={async () => {
                setIsGoogleLoading(true);
                try {
                  await onGoogleSignIn();
                } finally {
                  setIsGoogleLoading(false);
                }
              }}
              disabled={isLoading || isGoogleLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border transition-all hover:bg-[var(--glass-overlay-secondary)]"
              style={{
                borderColor: "var(--glass-border-primary)",
                color: "var(--text-primary)",
              }}
            >
              {isGoogleLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              )}
              <span className="font-medium">
                {isGoogleLoading ? "Signing in..." : "Continue with Google"}
              </span>
            </button>
          </>
        )}

        {/* Footer links */}
        <div className="mt-6 text-center">
          {mode === "login" ? (
            <p style={{ color: "var(--text-secondary)" }}>
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold hover:underline"
                style={{ color: "var(--accent-blue)" }}
              >
                Sign up
              </Link>
            </p>
          ) : mode === "signup" ? (
            <p style={{ color: "var(--text-secondary)" }}>
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold hover:underline"
                style={{ color: "var(--accent-blue)" }}
              >
                Sign in
              </Link>
            </p>
          ) : (
            <p style={{ color: "var(--text-secondary)" }}>
              Remember your password?{" "}
              <Link
                href="/login"
                className="font-semibold hover:underline"
                style={{ color: "var(--accent-blue)" }}
              >
                Sign in
              </Link>
            </p>
          )}
        </div>
      </motion.div>
    </GlassCard>
  );
}
