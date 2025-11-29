"use client";

import { useAuthContext } from "@/components/auth/auth-context";
import { Sidebar } from "./sidebar";
import { Loader2 } from "lucide-react";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { isAuthenticated, loading } = useAuthContext();

  // Always render the shell structure to prevent layout shift
  // Only show loading indicator in the content area
  if (!isAuthenticated && !loading) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen">
      <Sidebar />
      {/* Main content area */}
      <main className="md:ml-[240px] min-h-screen pb-20 md:pb-0">
        {loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <Loader2
              className="w-8 h-8 animate-spin"
              style={{ color: "var(--accent-blue)" }}
            />
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  );
}
