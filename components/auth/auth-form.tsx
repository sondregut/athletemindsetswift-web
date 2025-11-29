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
  error?: string | null;
}

export function AuthForm({ mode, onSubmit, error }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
            disabled={isLoading}
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
