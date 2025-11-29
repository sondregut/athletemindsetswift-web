"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { useAuthContext } from "@/components/auth/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuthContext();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (data: { email: string; password: string }) => {
    setError(null);
    try {
      await signIn(data.email, data.password);
      router.push("/");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      // Parse Firebase error messages
      if (errorMessage.includes("user-not-found")) {
        setError("No account found with this email");
      } else if (errorMessage.includes("wrong-password")) {
        setError("Incorrect password");
      } else if (errorMessage.includes("invalid-email")) {
        setError("Invalid email address");
      } else if (errorMessage.includes("too-many-requests")) {
        setError("Too many attempts. Please try again later");
      } else {
        setError("Failed to sign in. Please check your credentials.");
      }
    }
  };

  return <AuthForm mode="login" onSubmit={handleLogin} error={error} />;
}
