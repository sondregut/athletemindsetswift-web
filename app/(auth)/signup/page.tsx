"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { useAuthContext } from "@/components/auth/auth-context";

export default function SignupPage() {
  const router = useRouter();
  const { signUp } = useAuthContext();
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    setError(null);
    try {
      await signUp(data.email, data.password, data.name);
      // Redirect to onboarding after signup
      router.push("/onboarding");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Signup failed";
      // Parse Firebase error messages
      if (errorMessage.includes("email-already-in-use")) {
        setError("An account with this email already exists");
      } else if (errorMessage.includes("invalid-email")) {
        setError("Invalid email address");
      } else if (errorMessage.includes("weak-password")) {
        setError("Password is too weak. Use at least 6 characters");
      } else {
        setError("Failed to create account. Please try again.");
      }
    }
  };

  return <AuthForm mode="signup" onSubmit={handleSignup} error={error} />;
}
