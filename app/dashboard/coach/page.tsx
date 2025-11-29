"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LiveKitRoom,
  useRoomContext,
  useParticipants,
  useLocalParticipant,
  useTrackTranscription,
  useTracks,
  TrackReference,
  RoomAudioRenderer,
} from "@livekit/components-react";
import { Track, RoomEvent, ConnectionState } from "livekit-client";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { AudioVisualizer } from "@/components/coach/audio-visualizer";
import { AgentStateIndicator, AgentState } from "@/components/coach/agent-state";
import { useAuthContext } from "@/components/auth/auth-context";
import { useLiveKit, UserContext } from "@/lib/hooks/useLiveKit";
import {
  Mic,
  MicOff,
  Phone,
  PhoneOff,
  Brain,
  Loader2,
  AlertCircle,
  X,
} from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";

// Room content component (inside LiveKitRoom)
function RoomContent({
  onEnd,
  onAgentStateChange,
}: {
  onEnd: () => void;
  onAgentStateChange: (state: AgentState) => void;
}) {
  const room = useRoomContext();
  const { localParticipant } = useLocalParticipant();
  const participants = useParticipants();
  const [isMuted, setIsMuted] = useState(false);
  const [showEndConfirm, setShowEndConfirm] = useState(false);
  const [transcriptions, setTranscriptions] = useState<
    { speaker: string; text: string }[]
  >([]);

  // Find the agent participant
  const agentParticipant = participants.find(
    (p) => p.identity.includes("agent") || p.isAgent
  );

  // Get audio tracks
  const audioTracks = useTracks([Track.Source.Microphone], {
    onlySubscribed: true,
  });

  // Determine agent state based on tracks and activity
  useEffect(() => {
    if (!agentParticipant) {
      onAgentStateChange("idle");
      return;
    }

    const agentAudioTrack = audioTracks.find(
      (t) => t.participant.identity === agentParticipant.identity
    );

    if (agentAudioTrack?.publication?.isMuted === false) {
      onAgentStateChange("speaking");
    } else if (localParticipant.isSpeaking) {
      onAgentStateChange("listening");
    } else {
      onAgentStateChange("idle");
    }
  }, [agentParticipant, audioTracks, localParticipant.isSpeaking, onAgentStateChange]);

  // Handle room events for transcription
  useEffect(() => {
    if (!room) return;

    const handleTranscription = (
      segments: { text: string; final: boolean }[],
      participant: { identity: string } | undefined
    ) => {
      const finalSegments = segments.filter((s) => s.final);
      if (finalSegments.length > 0) {
        const speaker = participant?.identity.includes("agent")
          ? "Coach"
          : "You";
        const text = finalSegments.map((s) => s.text).join(" ");
        setTranscriptions((prev) => [...prev.slice(-10), { speaker, text }]);
      }
    };

    room.on(RoomEvent.TranscriptionReceived, handleTranscription);
    return () => {
      room.off(RoomEvent.TranscriptionReceived, handleTranscription);
    };
  }, [room]);

  // Toggle mute
  const toggleMute = useCallback(async () => {
    await localParticipant.setMicrophoneEnabled(isMuted);
    setIsMuted(!isMuted);
  }, [localParticipant, isMuted]);

  // End call with confirmation
  const handleEndCall = useCallback(() => {
    room?.disconnect();
    onEnd();
  }, [room, onEnd]);

  const requestEndCall = useCallback(() => {
    setShowEndConfirm(true);
  }, []);

  const cancelEndCall = useCallback(() => {
    setShowEndConfirm(false);
  }, []);

  return (
    <div className="space-y-6">
      {/* Transcription area */}
      <GlassCard className="min-h-[200px] max-h-[300px] overflow-y-auto">
        <h3
          className="text-sm font-medium mb-3"
          style={{ color: "var(--text-secondary)" }}
        >
          Conversation
        </h3>
        <div className="space-y-3">
          {transcriptions.length === 0 ? (
            <p
              className="text-center py-8"
              style={{ color: "var(--text-secondary)" }}
            >
              Start speaking to begin your coaching session...
            </p>
          ) : (
            transcriptions.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-xl ${
                  t.speaker === "Coach"
                    ? "bg-[var(--accent-blue)]/10 ml-0 mr-8"
                    : "bg-[var(--glass-overlay-secondary)] ml-8 mr-0"
                }`}
              >
                <span
                  className="text-xs font-medium block mb-1"
                  style={{
                    color:
                      t.speaker === "Coach"
                        ? "var(--accent-blue)"
                        : "var(--text-secondary)",
                  }}
                >
                  {t.speaker}
                </span>
                <p style={{ color: "var(--text-primary)" }}>{t.text}</p>
              </motion.div>
            ))
          )}
        </div>
      </GlassCard>

      {/* End Session Confirmation Modal */}
      <AnimatePresence>
        {showEndConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm"
            >
              <GlassCard className="text-center">
                <div className="w-16 h-16 rounded-full bg-[var(--accent-red)]/10 flex items-center justify-center mx-auto mb-4">
                  <PhoneOff className="w-8 h-8" style={{ color: "var(--accent-red)" }} />
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: "var(--text-primary)" }}
                >
                  End Session?
                </h3>
                <p
                  className="mb-6"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Are you sure you want to end your coaching session?
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="glass"
                    onClick={cancelEndCall}
                    className="flex-1"
                  >
                    Continue
                  </Button>
                  <Button
                    onClick={handleEndCall}
                    className="flex-1"
                    style={{ backgroundColor: "var(--accent-red)" }}
                  >
                    End Session
                  </Button>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <Button
          variant="glass"
          onClick={toggleMute}
          className="w-16 h-16 rounded-full p-0"
        >
          {isMuted ? (
            <MicOff className="w-6 h-6" style={{ color: "var(--accent-red)" }} />
          ) : (
            <Mic className="w-6 h-6" style={{ color: "var(--accent-green)" }} />
          )}
        </Button>

        <Button
          onClick={requestEndCall}
          className="w-16 h-16 rounded-full p-0"
          style={{ backgroundColor: "var(--accent-red)" }}
        >
          <PhoneOff className="w-6 h-6 text-white" />
        </Button>
      </div>
    </div>
  );
}

// Main page component
export default function VoiceCoachPage() {
  const router = useRouter();
  const { user, profile, isAuthenticated, loading: authLoading } = useAuthContext();
  const { getToken, isLoading: tokenLoading, error: tokenError } = useLiveKit();

  const [connectionState, setConnectionState] = useState<
    "disconnected" | "connecting" | "connected"
  >("disconnected");
  const [agentState, setAgentState] = useState<AgentState>("idle");
  const [liveKitUrl, setLiveKitUrl] = useState<string | null>(null);
  const [liveKitToken, setLiveKitToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sessionDuration, setSessionDuration] = useState(0);

  // Session timer
  useEffect(() => {
    if (connectionState !== "connected") return;

    const interval = setInterval(() => {
      setSessionDuration((d) => d + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [connectionState]);

  // Format duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Start session
  const startSession = async () => {
    if (!user) {
      setError("Please sign in to start a session");
      return;
    }

    setConnectionState("connecting");
    setError(null);

    try {
      const roomName = `coach-${user.uid}-${Date.now()}`;
      const identity = `user-${user.uid}`;

      const userContext: UserContext = {
        userId: user.uid,
        voiceId: "Puck",
        name: profile?.displayName || user.displayName || "Athlete",
        sport: profile?.sport,
        streak: 0,
        goals: profile?.trainingGoals,
      };

      const tokenResponse = await getToken(roomName, identity, userContext);

      if (!tokenResponse) {
        throw new Error(tokenError || "Failed to get connection token");
      }

      setLiveKitUrl(tokenResponse.url);
      setLiveKitToken(tokenResponse.token);
      setConnectionState("connected");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Connection failed";
      setError(message);
      setConnectionState("disconnected");
    }
  };

  // End session
  const endSession = () => {
    setConnectionState("disconnected");
    setLiveKitUrl(null);
    setLiveKitToken(null);
    setSessionDuration(0);
    setAgentState("idle");
  };

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: "var(--accent-blue)" }} />
      </div>
    );
  }

  return (
    <AppShell>
      <div className="p-6 md:p-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <h1
              className="text-2xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Voice Coach
            </h1>

            {connectionState === "connected" && (
              <div
                className="text-sm font-mono"
                style={{ color: "var(--text-secondary)" }}
              >
                {formatDuration(sessionDuration)}
              </div>
            )}
          </motion.header>

        {/* Main content */}
        <GlassCard className="mb-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-cyan)] flex items-center justify-center mx-auto mb-4">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h1
              className="text-2xl font-bold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Voice Coach
            </h1>
            <p style={{ color: "var(--text-secondary)" }}>
              {connectionState === "connected"
                ? "Your AI coach is ready to help"
                : "Real-time AI coaching sessions"}
            </p>
          </div>

          {/* Agent state and visualizer */}
          {connectionState === "connected" && (
            <div className="flex flex-col items-center gap-4 mb-6">
              <AgentStateIndicator state={agentState} />
              <AudioVisualizer isActive={agentState === "speaking"} />
            </div>
          )}

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 rounded-xl bg-[var(--accent-red)]/10 border border-[var(--accent-red)]/20 flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5" style={{ color: "var(--accent-red)" }} />
              <p style={{ color: "var(--accent-red)" }}>{error}</p>
            </motion.div>
          )}

          {/* Connection states */}
          <AnimatePresence mode="wait">
            {connectionState === "disconnected" && (
              <motion.div
                key="disconnected"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <Button
                  onClick={startSession}
                  icon={Phone}
                  size="lg"
                  disabled={tokenLoading}
                  className="mx-auto"
                >
                  {tokenLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Connecting...
                    </>
                  ) : (
                    "Start Session"
                  )}
                </Button>
                <p
                  className="mt-4 text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Speak naturally with your AI coach about your mental game
                </p>
              </motion.div>
            )}

            {connectionState === "connecting" && (
              <motion.div
                key="connecting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <Loader2
                  className="w-12 h-12 animate-spin mx-auto mb-4"
                  style={{ color: "var(--accent-blue)" }}
                />
                <p style={{ color: "var(--text-secondary)" }}>
                  Connecting to your coach...
                </p>
              </motion.div>
            )}

            {connectionState === "connected" && liveKitUrl && liveKitToken && (
              <motion.div
                key="connected"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LiveKitRoom
                  serverUrl={liveKitUrl}
                  token={liveKitToken}
                  connect={true}
                  audio={true}
                  video={false}
                  onDisconnected={endSession}
                  onError={(err) => {
                    console.error("LiveKit error:", err);
                    setError("Connection error. Please try again.");
                    endSession();
                  }}
                >
                  <RoomAudioRenderer />
                  <RoomContent
                    onEnd={endSession}
                    onAgentStateChange={setAgentState}
                  />
                </LiveKitRoom>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>

        {/* Tips */}
        {connectionState === "disconnected" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard variant="compact">
              <h3
                className="font-semibold mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                Session Tips
              </h3>
              <ul
                className="space-y-2 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                <li>• Find a quiet space for your session</li>
                <li>• Speak naturally about your mental challenges</li>
                <li>• Ask about visualization, focus, or confidence</li>
                <li>• Sessions are private and not recorded</li>
              </ul>
            </GlassCard>
          </motion.div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
