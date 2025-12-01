"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthForm } from "@/components/auth/auth-form";
import { useAuthContext } from "@/components/auth/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signInWithGoogle } = useAuthContext();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (data: { email: string; password: string }) => {
    setError(null);
    try {
      await signIn(data.email, data.password);
      router.push("/dashboard");
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

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      const result = await signInWithGoogle();
      // Redirect to onboarding if new user, otherwise dashboard
      if (result.isNewUser) {
        router.push("/onboarding");
      } else {
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Google sign in failed";
      if (errorMessage.includes("popup-closed-by-user")) {
        // User closed the popup, don't show error
        return;
      }
      setError("Failed to sign in with Google. Please try again.");
    }
  };

  return <AuthForm mode="login" onSubmit={handleLogin} onGoogleSignIn={handleGoogleSignIn} error={error} />;
}
