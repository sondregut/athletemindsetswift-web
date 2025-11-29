"use client";

import { useState, useCallback } from "react";
import { auth } from "@/lib/firebase/client";

export interface UserContext {
  userId: string;
  voiceId: string;
  name?: string;
  sport?: string;
  streak?: number;
  goals?: string[];
}

export interface LiveKitTokenResponse {
  url: string;
  token: string;
  roomName?: string;
  identity?: string;
}

export function useLiveKit() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getToken = useCallback(
    async (
      roomName: string,
      identity: string,
      userContext: UserContext
    ): Promise<LiveKitTokenResponse | null> => {
      setIsLoading(true);
      setError(null);

      try {
        // Get Firebase ID token
        const currentUser = auth?.currentUser;
        if (!currentUser) {
          throw new Error("Not authenticated");
        }

        const firebaseToken = await currentUser.getIdToken();

        // Build metadata JSON
        const metadata = JSON.stringify(userContext);

        // Call our API route
        const response = await fetch("/api/livekit/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${firebaseToken}`,
          },
          body: JSON.stringify({
            roomName,
            identity,
            metadata,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to get token");
        }

        const data: LiveKitTokenResponse = await response.json();
        return data;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        console.error("[useLiveKit] Error getting token:", message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    getToken,
    isLoading,
    error,
  };
}
