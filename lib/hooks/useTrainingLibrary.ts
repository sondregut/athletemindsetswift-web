"use client";

import { useState, useEffect, useCallback } from "react";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import { useAuthContext } from "@/components/auth/auth-context";
import {
  TrainingTemplate,
  PersonalizedSession,
  TrainingCategory,
  TTSVoice,
} from "@/types/library";

// Cache validity in milliseconds (5 minutes)
const CACHE_VALIDITY_MS = 5 * 60 * 1000;

interface CacheEntry {
  templates: TrainingTemplate[];
  timestamp: number;
}

let templatesCache: CacheEntry | null = null;

export function useTrainingLibrary() {
  const { user, profile } = useAuthContext();
  const [templates, setTemplates] = useState<TrainingTemplate[]>([]);
  const [userSessions, setUserSessions] = useState<PersonalizedSession[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ============================================================
  // TEMPLATE OPERATIONS
  // ============================================================

  // Load templates from Firestore (with caching)
  const loadTemplates = useCallback(async (forceRefresh = false) => {
    // Check cache validity
    if (
      !forceRefresh &&
      templatesCache &&
      Date.now() - templatesCache.timestamp < CACHE_VALIDITY_MS
    ) {
      setTemplates(templatesCache.templates);
      setIsLoadingTemplates(false);
      return;
    }

    setIsLoadingTemplates(true);
    setError(null);

    if (!db) {
      setError("Database not initialized");
      setIsLoadingTemplates(false);
      return;
    }

    try {
      const templatesRef = collection(db, "swift_training_sessions");
      const q = query(templatesRef, where("is_active", "==", true));
      const snapshot = await getDocs(q);

      const loadedTemplates: TrainingTemplate[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          description: data.description,
          category: data.category as TrainingCategory,
          duration_minutes: data.duration_minutes,
          difficulty: data.difficulty,
          segments: data.segments || [],
          placeholders: data.placeholders,
          default_voice: data.default_voice,
          icon_name: data.icon_name,
          is_active: data.is_active,
          created_at: data.created_at?.toDate() || new Date(),
          updated_at: data.updated_at?.toDate(),
        };
      });

      // Sort by title
      loadedTemplates.sort((a, b) => a.title.localeCompare(b.title));

      // Update cache
      templatesCache = {
        templates: loadedTemplates,
        timestamp: Date.now(),
      };

      setTemplates(loadedTemplates);
      console.log(`[TrainingLibrary] Loaded ${loadedTemplates.length} templates`);
    } catch (err) {
      console.error("[TrainingLibrary] Error loading templates:", err);
      setError("Failed to load training templates");
    } finally {
      setIsLoadingTemplates(false);
    }
  }, []);

  // Get templates filtered by category
  const getTemplatesByCategory = useCallback(
    (category: TrainingCategory | null) => {
      if (!category) return templates;
      return templates.filter((t) => t.category === category);
    },
    [templates]
  );

  // Get a single template by ID
  const getTemplate = useCallback(
    async (templateId: string): Promise<TrainingTemplate | null> => {
      // First check local state
      const cached = templates.find((t) => t.id === templateId);
      if (cached) return cached;

      // Fetch from Firestore
      if (!db) return null;

      try {
        const docRef = doc(db, "swift_training_sessions", templateId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) return null;

        const data = docSnap.data();
        return {
          id: docSnap.id,
          title: data.title,
          description: data.description,
          category: data.category as TrainingCategory,
          duration_minutes: data.duration_minutes,
          difficulty: data.difficulty,
          segments: data.segments || [],
          placeholders: data.placeholders,
          default_voice: data.default_voice,
          icon_name: data.icon_name,
          is_active: data.is_active,
          created_at: data.created_at?.toDate() || new Date(),
          updated_at: data.updated_at?.toDate(),
        };
      } catch (err) {
        console.error("[TrainingLibrary] Error fetching template:", err);
        return null;
      }
    },
    [templates]
  );

  // ============================================================
  // USER SESSION OPERATIONS
  // ============================================================

  // Load user's personalized sessions
  const loadUserSessions = useCallback(async () => {
    if (!user || !db) {
      setUserSessions([]);
      setIsLoadingSessions(false);
      return;
    }

    setIsLoadingSessions(true);

    try {
      const sessionsRef = collection(
        db,
        "swift_users",
        user.uid,
        "trainingSessions"
      );
      const q = query(sessionsRef, orderBy("created_at", "desc"), limit(50));
      const snapshot = await getDocs(q);

      const loadedSessions: PersonalizedSession[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          template_id: data.template_id,
          user_id: data.user_id,
          title: data.title,
          description: data.description,
          category: data.category as TrainingCategory,
          sport: data.sport,
          voice_id: data.voice_id as TTSVoice,
          segments: data.segments || [],
          total_duration_seconds: data.total_duration_seconds,
          audio_url: data.audio_url,
          created_at: data.created_at?.toDate() || new Date(),
        };
      });

      setUserSessions(loadedSessions);
      console.log(`[TrainingLibrary] Loaded ${loadedSessions.length} user sessions`);
    } catch (err) {
      console.error("[TrainingLibrary] Error loading user sessions:", err);
    } finally {
      setIsLoadingSessions(false);
    }
  }, [user]);

  // Check for cached session (same template + sport + voice)
  const getCachedSession = useCallback(
    async (
      templateId: string,
      sport: string,
      voice: TTSVoice
    ): Promise<PersonalizedSession | null> => {
      if (!user || !db) return null;

      try {
        const sessionsRef = collection(
          db,
          "swift_users",
          user.uid,
          "trainingSessions"
        );
        const q = query(
          sessionsRef,
          where("template_id", "==", templateId),
          where("sport", "==", sport),
          where("voice_id", "==", voice),
          limit(1)
        );
        const snapshot = await getDocs(q);

        if (snapshot.empty) return null;

        const doc = snapshot.docs[0];
        const data = doc.data();
        return {
          id: doc.id,
          template_id: data.template_id,
          user_id: data.user_id,
          title: data.title,
          description: data.description,
          category: data.category as TrainingCategory,
          sport: data.sport,
          voice_id: data.voice_id as TTSVoice,
          segments: data.segments || [],
          total_duration_seconds: data.total_duration_seconds,
          audio_url: data.audio_url,
          created_at: data.created_at?.toDate() || new Date(),
        };
      } catch (err) {
        console.error("[TrainingLibrary] Error checking cached session:", err);
        return null;
      }
    },
    [user]
  );

  // Save a personalized session
  const saveSession = useCallback(
    async (session: PersonalizedSession) => {
      if (!user) throw new Error("Not authenticated");
      if (!db) throw new Error("Database not initialized");

      try {
        const sessionRef = doc(
          db,
          "swift_users",
          user.uid,
          "trainingSessions",
          session.id
        );

        await setDoc(sessionRef, {
          ...session,
          user_id: user.uid,
          created_at: Timestamp.fromDate(session.created_at),
        });

        // Update local state
        setUserSessions((prev) => [session, ...prev]);
        console.log(`[TrainingLibrary] Saved session: ${session.id}`);
      } catch (err) {
        console.error("[TrainingLibrary] Error saving session:", err);
        throw new Error("Failed to save session");
      }
    },
    [user]
  );

  // Delete a user session
  const deleteSession = useCallback(
    async (sessionId: string) => {
      if (!user) throw new Error("Not authenticated");
      if (!db) throw new Error("Database not initialized");

      try {
        const sessionRef = doc(
          db,
          "swift_users",
          user.uid,
          "trainingSessions",
          sessionId
        );
        await deleteDoc(sessionRef);

        // Update local state
        setUserSessions((prev) => prev.filter((s) => s.id !== sessionId));
        console.log(`[TrainingLibrary] Deleted session: ${sessionId}`);
      } catch (err) {
        console.error("[TrainingLibrary] Error deleting session:", err);
        throw new Error("Failed to delete session");
      }
    },
    [user]
  );

  // ============================================================
  // STATS
  // ============================================================

  const stats = {
    totalTemplates: templates.length,
    totalSessions: userSessions.length,
    categoryCounts: templates.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + 1;
      return acc;
    }, {} as Record<TrainingCategory, number>),
  };

  // ============================================================
  // EFFECTS
  // ============================================================

  // Load templates on mount
  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  // Load user sessions when user changes
  useEffect(() => {
    loadUserSessions();
  }, [loadUserSessions]);

  return {
    // Data
    templates,
    userSessions,
    stats,
    userSport: profile?.sport || null,

    // Loading states
    isLoadingTemplates,
    isLoadingSessions,
    isLoading: isLoadingTemplates || isLoadingSessions,
    error,

    // Template operations
    loadTemplates,
    getTemplatesByCategory,
    getTemplate,

    // Session operations
    loadUserSessions,
    getCachedSession,
    saveSession,
    deleteSession,
  };
}
