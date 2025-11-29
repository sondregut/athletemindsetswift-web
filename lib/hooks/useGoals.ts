"use client";

import { useState, useEffect, useCallback } from "react";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { useAuthContext } from "@/components/auth/auth-context";
import {
  Goal,
  GoalStats,
  GoalFilter,
  GoalStatus,
  calculateTargetDate,
} from "@/lib/types/goals";

export function useGoals() {
  const { user } = useAuthContext();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load goals from Firestore
  const loadGoals = useCallback(async () => {
    if (!user || !db) {
      setGoals([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const goalsRef = collection(db, "swift_users", user.uid, "goals");
      const q = query(goalsRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);

      const loadedGoals: Goal[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          userId: data.userId,
          title: data.title,
          description: data.description || "",
          type: data.type,
          timeframe: data.timeframe,
          status: data.status,
          priority: data.priority,
          progress: data.progress || 0,
          targetDate: data.targetDate?.toDate(),
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
          completedAt: data.completedAt?.toDate(),
        };
      });

      setGoals(loadedGoals);
    } catch (err) {
      console.error("Error loading goals:", err);
      setError("Failed to load goals");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Create a new goal
  const createGoal = useCallback(
    async (goalData: Omit<Goal, "id" | "userId" | "createdAt" | "updatedAt">) => {
      if (!user || !db) {
        throw new Error("Not authenticated");
      }

      try {
        const goalsRef = collection(db, "swift_users", user.uid, "goals");
        const targetDate = goalData.targetDate || calculateTargetDate(goalData.timeframe);

        const docRef = await addDoc(goalsRef, {
          ...goalData,
          userId: user.uid,
          targetDate: targetDate ? Timestamp.fromDate(targetDate) : null,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });

        const newGoal: Goal = {
          id: docRef.id,
          userId: user.uid,
          ...goalData,
          targetDate,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        setGoals((prev) => [newGoal, ...prev]);
        return newGoal;
      } catch (err) {
        console.error("Error creating goal:", err);
        throw new Error("Failed to create goal");
      }
    },
    [user]
  );

  // Update a goal
  const updateGoal = useCallback(
    async (goalId: string, updates: Partial<Goal>) => {
      if (!user || !db) {
        throw new Error("Not authenticated");
      }

      try {
        const goalRef = doc(db, "swift_users", user.uid, "goals", goalId);

        const firestoreUpdates: Record<string, unknown> = {
          ...updates,
          updatedAt: serverTimestamp(),
        };

        // Convert dates to Timestamps
        if (updates.targetDate) {
          firestoreUpdates.targetDate = Timestamp.fromDate(updates.targetDate);
        }
        if (updates.completedAt) {
          firestoreUpdates.completedAt = Timestamp.fromDate(updates.completedAt);
        }

        // Remove undefined values
        Object.keys(firestoreUpdates).forEach((key) => {
          if (firestoreUpdates[key] === undefined) {
            delete firestoreUpdates[key];
          }
        });

        await updateDoc(goalRef, firestoreUpdates);

        setGoals((prev) =>
          prev.map((g) =>
            g.id === goalId ? { ...g, ...updates, updatedAt: new Date() } : g
          )
        );
      } catch (err) {
        console.error("Error updating goal:", err);
        throw new Error("Failed to update goal");
      }
    },
    [user]
  );

  // Delete a goal
  const deleteGoal = useCallback(
    async (goalId: string) => {
      if (!user || !db) {
        throw new Error("Not authenticated");
      }

      try {
        const goalRef = doc(db, "swift_users", user.uid, "goals", goalId);
        await deleteDoc(goalRef);
        setGoals((prev) => prev.filter((g) => g.id !== goalId));
      } catch (err) {
        console.error("Error deleting goal:", err);
        throw new Error("Failed to delete goal");
      }
    },
    [user]
  );

  // Update goal progress
  const updateProgress = useCallback(
    async (goalId: string, progress: number) => {
      const clampedProgress = Math.min(100, Math.max(0, progress));
      const updates: Partial<Goal> = { progress: clampedProgress };

      // Auto-complete when reaching 100%
      if (clampedProgress === 100) {
        updates.status = "completed";
        updates.completedAt = new Date();
      } else if (clampedProgress > 0) {
        updates.status = "in_progress";
      }

      await updateGoal(goalId, updates);
    },
    [updateGoal]
  );

  // Mark goal as complete
  const completeGoal = useCallback(
    async (goalId: string) => {
      await updateGoal(goalId, {
        status: "completed",
        progress: 100,
        completedAt: new Date(),
      });
    },
    [updateGoal]
  );

  // Filter goals
  const getFilteredGoals = useCallback(
    (filter: GoalFilter) => {
      switch (filter) {
        case "active":
          return goals.filter(
            (g) => g.status === "not_started" || g.status === "in_progress"
          );
        case "completed":
          return goals.filter((g) => g.status === "completed");
        default:
          return goals;
      }
    },
    [goals]
  );

  // Calculate stats
  const stats: GoalStats = {
    totalGoals: goals.length,
    activeGoals: goals.filter(
      (g) => g.status === "not_started" || g.status === "in_progress"
    ).length,
    completedGoals: goals.filter((g) => g.status === "completed").length,
    completionRate:
      goals.length > 0
        ? goals.filter((g) => g.status === "completed").length / goals.length
        : 0,
  };

  // Load goals on mount
  useEffect(() => {
    loadGoals();
  }, [loadGoals]);

  return {
    goals,
    stats,
    isLoading,
    error,
    loadGoals,
    createGoal,
    updateGoal,
    deleteGoal,
    updateProgress,
    completeGoal,
    getFilteredGoals,
  };
}
