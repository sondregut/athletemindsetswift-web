"use client";

import { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useAuthContext } from "@/components/auth/auth-context";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/client";
import {
  PersonalizedSession,
  TrainingCategory,
  getCategoryInfo,
  formatDurationSeconds,
} from "@/types/library";
import {
  Loader2,
  Play,
  Pause,
  SkipBack,
  X,
  Volume2,
  VolumeX,
  Flag,
  Brain,
  Sparkles,
  Flame,
  Heart,
  Wind,
  Leaf,
} from "lucide-react";

// Icon mapping for categories
const CategoryIconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Flag,
  Brain,
  Sparkles,
  Flame,
  Heart,
  Wind,
  Leaf,
};

// Loading fallback component
function PlayerLoading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      <Loader2
        className="w-8 h-8 animate-spin"
        style={{ color: "var(--accent-blue)" }}
      />
    </div>
  );
}

export default function TrainingPlayerPage() {
  return (
    <Suspense fallback={<PlayerLoading />}>
      <TrainingPlayerContent />
    </Suspense>
  );
}

function TrainingPlayerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");
  const { user, isAuthenticated, loading: authLoading } = useAuthContext();

  const [session, setSession] = useState<PersonalizedSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Audio state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Load session from Firestore
  useEffect(() => {
    async function loadSession() {
      if (!user || !sessionId || !db) return;

      setIsLoading(true);
      setError(null);

      try {
        const sessionRef = doc(
          db,
          "swift_users",
          user.uid,
          "trainingSessions",
          sessionId
        );
        const docSnap = await getDoc(sessionRef);

        if (!docSnap.exists()) {
          setError("Session not found");
          return;
        }

        const data = docSnap.data();
        setSession({
          id: docSnap.id,
          template_id: data.template_id,
          user_id: data.user_id,
          title: data.title,
          description: data.description,
          category: data.category as TrainingCategory,
          sport: data.sport,
          voice_id: data.voice_id,
          segments: data.segments || [],
          total_duration_seconds: data.total_duration_seconds,
          audio_url: data.audio_url,
          created_at: data.created_at?.toDate() || new Date(),
        });
      } catch (err) {
        console.error("Error loading session:", err);
        setError("Failed to load session");
      } finally {
        setIsLoading(false);
      }
    }

    if (isAuthenticated && sessionId) {
      loadSession();
    }
  }, [user, sessionId, isAuthenticated]);

  // Initialize audio element
  useEffect(() => {
    if (session?.audio_url) {
      const audio = new Audio(session.audio_url);
      audioRef.current = audio;

      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });

      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime);
      });

      audio.addEventListener("ended", () => {
        setIsPlaying(false);
        setCurrentTime(0);
      });

      audio.addEventListener("error", (e) => {
        console.error("Audio error:", e);
        setError("Failed to load audio");
      });

      return () => {
        audio.pause();
        audio.src = "";
      };
    }
  }, [session?.audio_url]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  // Play/Pause toggle
  const togglePlayPause = useCallback(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  // Restart
  const handleRestart = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
  }, []);

  // Mute toggle
  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  }, [isMuted]);

  // Seek
  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const time = Number(e.target.value);
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  }, []);

  // Close player
  const handleClose = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    router.push("/dashboard/training");
  }, [router]);

  // Loading state
  if (authLoading || isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <Loader2
          className="w-8 h-8 animate-spin"
          style={{ color: "var(--accent-blue)" }}
        />
      </div>
    );
  }

  // Error state
  if (error || !session) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center p-6"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <p className="text-lg mb-4" style={{ color: "var(--text-primary)" }}>
          {error || "Session not found"}
        </p>
        <button
          onClick={() => router.push("/dashboard/training")}
          className="px-4 py-2 rounded-xl font-semibold"
          style={{
            backgroundColor: "var(--accent-blue)",
            color: "white",
          }}
        >
          Back to Library
        </button>
      </div>
    );
  }

  const categoryInfo = getCategoryInfo(session.category);
  const CategoryIcon = CategoryIconMap[categoryInfo.icon];
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <button
          onClick={handleClose}
          className="p-2 rounded-full hover:bg-[var(--glass-overlay-secondary)]"
        >
          <X className="w-6 h-6" style={{ color: "var(--text-primary)" }} />
        </button>
        <button
          onClick={toggleMute}
          className="p-2 rounded-full hover:bg-[var(--glass-overlay-secondary)]"
        >
          {isMuted ? (
            <VolumeX className="w-6 h-6" style={{ color: "var(--text-secondary)" }} />
          ) : (
            <Volume2 className="w-6 h-6" style={{ color: "var(--text-primary)" }} />
          )}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-8">
        {/* Category Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-32 h-32 rounded-full flex items-center justify-center mb-8"
          style={{ backgroundColor: `${categoryInfo.color}20` }}
        >
          {CategoryIcon && (
            <CategoryIcon
              className="w-16 h-16"
              style={{ color: categoryInfo.color }}
            />
          )}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-bold text-center mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          {session.title}
        </motion.h1>

        {/* Sport & Voice */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-sm text-center mb-8"
          style={{ color: "var(--text-secondary)" }}
        >
          {session.sport} · {session.voice_id}
        </motion.p>

        {/* Audio Visualizer (simplified) */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-end justify-center gap-1 h-16 mb-8"
        >
          {Array.from({ length: 7 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-2 rounded-full"
              style={{ backgroundColor: categoryInfo.color }}
              animate={{
                height: isPlaying
                  ? [16, 32 + Math.random() * 32, 16]
                  : 16,
              }}
              transition={{
                duration: 0.5 + Math.random() * 0.3,
                repeat: isPlaying ? Infinity : 0,
                repeatType: "reverse",
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mb-4">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, ${categoryInfo.color} ${progress}%, var(--glass-overlay-secondary) ${progress}%)`,
            }}
          />
        </div>

        {/* Time Display */}
        <div className="flex justify-between w-full max-w-md mb-8">
          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {formatDurationSeconds(Math.floor(currentTime))}
          </span>
          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
            {formatDurationSeconds(Math.floor(duration))}
          </span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6">
          {/* Restart */}
          <button
            onClick={handleRestart}
            className="p-3 rounded-full hover:bg-[var(--glass-overlay-secondary)]"
          >
            <SkipBack
              className="w-6 h-6"
              style={{ color: "var(--text-primary)" }}
            />
          </button>

          {/* Play/Pause */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={togglePlayPause}
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: categoryInfo.color }}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white" />
            ) : (
              <Play className="w-8 h-8 text-white ml-1" />
            )}
          </motion.button>

          {/* Spacer for symmetry */}
          <div className="w-12 h-12" />
        </div>
      </div>

      {/* Session Script Preview (collapsed) */}
      <div
        className="px-6 pb-6"
        style={{ maxHeight: "20vh", overflowY: "auto" }}
      >
        <details className="group">
          <summary
            className="text-sm font-semibold cursor-pointer list-none flex items-center gap-2 mb-2"
            style={{ color: "var(--text-secondary)" }}
          >
            <span>View Script</span>
            <span className="group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <div
            className="p-4 rounded-xl text-sm space-y-4"
            style={{
              backgroundColor: "var(--glass-overlay-primary)",
              color: "var(--text-secondary)",
            }}
          >
            {session.segments.map((segment, i) => (
              <p key={segment.id || i}>{segment.content}</p>
            ))}
          </div>
        </details>
      </div>
    </div>
  );
}
