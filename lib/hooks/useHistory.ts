"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { useAuthContext } from "@/components/auth/auth-context";
import { DailyCheckIn } from "@/types/checkin";
import { TrainingSession } from "@/types/training";
import {
  VoiceSession,
  VoiceSessionBreakdown,
  HistoryItem,
  HistoryStats,
  TimeFilter,
  ContentFilter,
  EMPTY_STATS,
  filterByTime,
  filterByContent,
} from "@/types/history";

const CACHE_VALIDITY_MS = 5 * 60 * 1000; // 5 minutes

export function useHistory() {
  const { user } = useAuthContext();
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use ref for cache to avoid dependency issues
  const lastLoadTimeRef = useRef<Date | null>(null);
  const hasLoadedRef = useRef(false);

  // Filters
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("all");
  const [contentFilter, setContentFilter] = useState<ContentFilter>("all");

  // Load check-ins
  const loadCheckIns = useCallback(
    async (userId: string): Promise<DailyCheckIn[]> => {
      if (!db) return [];

      try {
        const checkInsRef = collection(db, "swift_users", userId, "checkIns");
        const q = query(checkInsRef, orderBy("date", "desc"), limit(100));
        const snapshot = await getDocs(q);

        return snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            userId: data.userId,
            date: data.date,
            mentalReadiness: data.mentalReadiness,
            energyLevel: data.energyLevel,
            sleepQuality: data.sleepQuality,
            notes: data.notes,
            sport: data.sport,
            timestamp: data.timestamp?.toDate() || new Date(),
          };
        });
      } catch (err) {
        console.error("Error loading check-ins:", err);
        return [];
      }
    },
    []
  );

  // Load training sessions
  const loadTrainingSessions = useCallback(
    async (userId: string): Promise<TrainingSession[]> => {
      if (!db) return [];

      try {
        const sessionsRef = collection(
          db,
          "swift_users",
          userId,
          "trainingSessions"
        );
        const q = query(sessionsRef, orderBy("sessionDate", "desc"), limit(100));
        const snapshot = await getDocs(q);

        return snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            userId: data.userId,
            sessionDate: data.sessionDate,
            sessionType: data.sessionType,
            activity: data.activity,
            mainFocus: data.mainFocus,
            mindsetCues: data.mindsetCues,
            quickNotes: data.quickNotes,
            readinessRating: data.readinessRating,
            startTime: data.startTime?.toDate(),
            endTime: data.endTime?.toDate(),
            sessionDuration: data.sessionDuration,
            positives: data.positives,
            stretchGoal: data.stretchGoal,
            rpe: data.rpe,
            overallRating: data.overallRating,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          };
        });
      } catch (err) {
        console.error("Error loading training sessions:", err);
        return [];
      }
    },
    []
  );

  // Load voice sessions
  const loadVoiceSessions = useCallback(
    async (userId: string): Promise<VoiceSession[]> => {
      if (!db) return [];

      try {
        const sessionsRef = collection(
          db,
          "swift_users",
          userId,
          "voiceSessions"
        );
        const q = query(sessionsRef, orderBy("createdAt", "desc"), limit(100));
        const snapshot = await getDocs(q);

        return snapshot.docs.map((doc) => {
          const data = doc.data();

          // Parse breakdown
          const breakdownData = data.breakdown || {};
          const moodData = breakdownData.moodAnalysis || {};

          const breakdown: VoiceSessionBreakdown = {
            summary: breakdownData.summary || "",
            keyTopics: breakdownData.keyTopics || [],
            exercisesPerformed: breakdownData.exercisesPerformed || [],
            actionItems: breakdownData.actionItems || [],
            moodAnalysis: {
              overallMood: moodData.overallMood || "neutral",
              confidenceLevel: moodData.confidenceLevel || "medium",
              energyLevel: moodData.energyLevel || "medium",
              notes: moodData.notes || "",
            },
            coachingInsights: breakdownData.coachingInsights || [],
            techniquesUsed: breakdownData.techniquesUsed || [],
          };

          // Parse messages
          const messages = (data.messages || []).map(
            (msg: { role: string; content: string }) => ({
              role: msg.role as "user" | "assistant",
              content: msg.content,
            })
          );

          // Parse createdAt
          let createdAt: Date;
          if (data.createdAt instanceof Timestamp) {
            createdAt = data.createdAt.toDate();
          } else if (typeof data.createdAt === "string") {
            createdAt = new Date(data.createdAt);
          } else {
            createdAt = new Date();
          }

          // Parse updatedAt
          let updatedAt: Date | undefined;
          if (data.updatedAt instanceof Timestamp) {
            updatedAt = data.updatedAt.toDate();
          } else if (typeof data.updatedAt === "string") {
            updatedAt = new Date(data.updatedAt);
          }

          return {
            id: doc.id,
            transcript: data.transcript || "",
            messages,
            durationSeconds: data.durationSeconds || 0,
            breakdown,
            userName: data.userName,
            userSport: data.userSport,
            messageCount: data.messageCount || messages.length,
            createdAt,
            updatedAt,
          };
        });
      } catch (err) {
        console.error("Error loading voice sessions:", err);
        return [];
      }
    },
    []
  );

  // Load all history
  const loadHistory = useCallback(
    async (forceRefresh = false) => {
      if (!user || !db) {
        setItems([]);
        setIsLoading(false);
        return;
      }

      // Check cache validity using refs to avoid infinite loops
      if (
        !forceRefresh &&
        hasLoadedRef.current &&
        lastLoadTimeRef.current &&
        Date.now() - lastLoadTimeRef.current.getTime() < CACHE_VALIDITY_MS
      ) {
        console.log("[useHistory] Using cached history");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Load all data in parallel
        const [checkIns, trainingSessions, voiceSessions] = await Promise.all([
          loadCheckIns(user.uid),
          loadTrainingSessions(user.uid),
          loadVoiceSessions(user.uid),
        ]);

        // Combine into history items
        const allItems: HistoryItem[] = [
          ...checkIns.map((checkIn) => ({
            id: `checkin-${checkIn.id}`,
            type: "checkIn" as const,
            date: checkIn.timestamp,
            data: checkIn,
          })),
          ...trainingSessions.map((session) => ({
            id: `training-${session.id}`,
            type: "trainingSession" as const,
            date: session.createdAt,
            data: session,
          })),
          ...voiceSessions.map((session) => ({
            id: `voice-${session.id}`,
            type: "voiceSession" as const,
            date: session.createdAt,
            data: session,
          })),
        ];

        // Sort by date (newest first)
        allItems.sort((a, b) => b.date.getTime() - a.date.getTime());

        setItems(allItems);
        lastLoadTimeRef.current = new Date();
        hasLoadedRef.current = true;

        console.log(
          `[useHistory] Loaded ${allItems.length} history items (${checkIns.length} check-ins, ${trainingSessions.length} training, ${voiceSessions.length} voice)`
        );
      } catch (err) {
        console.error("Error loading history:", err);
        setError("Failed to load history");
      } finally {
        setIsLoading(false);
      }
    },
    [user, loadCheckIns, loadTrainingSessions, loadVoiceSessions]
  );

  // Filtered items
  const filteredItems = useMemo(() => {
    let result = items;
    result = filterByTime(result, timeFilter);
    result = filterByContent(result, contentFilter);
    return result;
  }, [items, timeFilter, contentFilter]);

  // Calculate stats
  const stats: HistoryStats = useMemo(() => {
    const checkIns = items
      .filter((item) => item.type === "checkIn")
      .map((item) => item.data as DailyCheckIn);

    const trainingSessions = items
      .filter((item) => item.type === "trainingSession")
      .map((item) => item.data as TrainingSession);

    const voiceSessions = items
      .filter((item) => item.type === "voiceSession")
      .map((item) => item.data as VoiceSession);

    if (
      checkIns.length === 0 &&
      trainingSessions.length === 0 &&
      voiceSessions.length === 0
    ) {
      return EMPTY_STATS;
    }

    // Total training minutes
    const totalTrainingMinutes = Math.floor(
      trainingSessions
        .filter((s) => s.sessionDuration)
        .reduce((acc, s) => acc + (s.sessionDuration || 0), 0) / 60
    );

    // Total voice minutes
    const totalVoiceMinutes = Math.floor(
      voiceSessions.reduce((acc, s) => acc + s.durationSeconds, 0) / 60
    );

    // Average mental readiness
    const mentalValues = checkIns.map((c) => c.mentalReadiness);
    const avgMental =
      mentalValues.length > 0
        ? mentalValues.reduce((a, b) => a + b, 0) / mentalValues.length
        : undefined;

    // Average energy
    const energyValues = checkIns.map((c) => c.energyLevel);
    const avgEnergy =
      energyValues.length > 0
        ? energyValues.reduce((a, b) => a + b, 0) / energyValues.length
        : undefined;

    // Calculate streak from check-ins
    const sortedDates = checkIns
      .map((c) => c.date)
      .sort()
      .reverse();
    let streak = 0;
    let checkDate = new Date();

    for (const dateString of sortedDates) {
      const expectedDateString = checkDate.toISOString().split("T")[0];
      if (dateString === expectedDateString) {
        streak++;
        checkDate = new Date(checkDate.getTime() - 24 * 60 * 60 * 1000);
      } else if (dateString < expectedDateString) {
        break;
      }
    }

    return {
      totalCheckIns: checkIns.length,
      totalTrainingSessions: trainingSessions.length,
      totalTrainingMinutes,
      totalVoiceSessions: voiceSessions.length,
      totalVoiceMinutes,
      averageMentalReadiness: avgMental,
      averageEnergy: avgEnergy,
      currentStreak: streak,
    };
  }, [items]);

  // Invalidate cache
  const invalidateCache = useCallback(() => {
    lastLoadTimeRef.current = null;
    hasLoadedRef.current = false;
  }, []);

  // Load on mount
  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return {
    items,
    filteredItems,
    stats,
    isLoading,
    error,
    timeFilter,
    setTimeFilter,
    contentFilter,
    setContentFilter,
    loadHistory,
    invalidateCache,
  };
}
