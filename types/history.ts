// History types matching iOS app

import { TrainingSession } from "./training";
import { DailyCheckIn } from "./checkin";

// Voice Session types
export interface VoiceMessage {
  role: "user" | "assistant";
  content: string;
}

export interface MoodAnalysis {
  overallMood: "positive" | "neutral" | "challenging" | "mixed";
  confidenceLevel: "high" | "medium" | "low";
  energyLevel: "high" | "medium" | "low";
  notes: string;
}

export interface VoiceSessionBreakdown {
  summary: string;
  keyTopics: string[];
  exercisesPerformed: string[];
  actionItems: string[];
  moodAnalysis: MoodAnalysis;
  coachingInsights: string[];
  techniquesUsed: string[];
}

export interface VoiceSession {
  id: string;
  transcript: string;
  messages: VoiceMessage[];
  durationSeconds: number;
  breakdown: VoiceSessionBreakdown;
  userName?: string;
  userSport?: string;
  messageCount: number;
  createdAt: Date;
  updatedAt?: Date;
}

// History Item (union type)
export type HistoryItemType = "checkIn" | "trainingSession" | "voiceSession";

export interface HistoryItem {
  id: string;
  type: HistoryItemType;
  date: Date;
  data: DailyCheckIn | TrainingSession | VoiceSession;
}

// Time Filter
export type TimeFilter = "all" | "thisWeek" | "thisMonth";

export const TIME_FILTERS: { value: TimeFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "thisWeek", label: "This Week" },
  { value: "thisMonth", label: "This Month" },
];

// Content Filter
export type ContentFilter = "all" | "voice" | "training" | "checkIns";

export const CONTENT_FILTERS: {
  value: ContentFilter;
  label: string;
  icon: string;
}[] = [
  { value: "all", label: "All", icon: "LayoutGrid" },
  { value: "voice", label: "Voice", icon: "Mic" },
  { value: "training", label: "Training", icon: "Dumbbell" },
  { value: "checkIns", label: "Check-ins", icon: "Heart" },
];

// History Stats
export interface HistoryStats {
  totalCheckIns: number;
  totalTrainingSessions: number;
  totalTrainingMinutes: number;
  totalVoiceSessions: number;
  totalVoiceMinutes: number;
  averageMentalReadiness?: number;
  averageEnergy?: number;
  currentStreak: number;
}

export const EMPTY_STATS: HistoryStats = {
  totalCheckIns: 0,
  totalTrainingSessions: 0,
  totalTrainingMinutes: 0,
  totalVoiceSessions: 0,
  totalVoiceMinutes: 0,
  currentStreak: 0,
};

// Helper functions
export function getItemTitle(item: HistoryItem): string {
  switch (item.type) {
    case "checkIn":
      return "Daily Check-In";
    case "trainingSession":
      return (item.data as TrainingSession).activity;
    case "voiceSession":
      return "Voice Coaching";
  }
}

export function getItemSubtitle(item: HistoryItem): string {
  switch (item.type) {
    case "checkIn": {
      const checkIn = item.data as DailyCheckIn;
      return formatDate(checkIn.timestamp);
    }
    case "trainingSession": {
      const session = item.data as TrainingSession;
      const parts: string[] = [getSessionTypeLabel(session.sessionType)];
      if (session.sessionDuration) {
        parts.push(formatDuration(session.sessionDuration));
      }
      return parts.join(" \u2022 ");
    }
    case "voiceSession": {
      const voice = item.data as VoiceSession;
      const parts: string[] = [formatDuration(voice.durationSeconds)];
      if (voice.breakdown.keyTopics.length > 0) {
        parts.push(voice.breakdown.keyTopics[0]);
      }
      return parts.join(" \u2022 ");
    }
  }
}

export function getItemIcon(type: HistoryItemType): string {
  switch (type) {
    case "checkIn":
      return "Heart";
    case "trainingSession":
      return "Dumbbell";
    case "voiceSession":
      return "Mic";
  }
}

export function getItemAccentColor(type: HistoryItemType): string {
  switch (type) {
    case "checkIn":
      return "var(--accent-green)";
    case "trainingSession":
      return "var(--accent-blue)";
    case "voiceSession":
      return "var(--accent-cyan)";
  }
}

export function getMoodEmoji(mood: string): string {
  switch (mood.toLowerCase()) {
    case "positive":
      return "\uD83D\uDE0A"; // smiling face
    case "challenging":
      return "\uD83D\uDE24"; // face with steam
    case "mixed":
      return "\uD83D\uDE10"; // neutral face
    default:
      return "\uD83D\uDE42"; // slightly smiling
  }
}

function getSessionTypeLabel(type: string): string {
  switch (type) {
    case "training":
      return "Training";
    case "competition":
      return "Competition";
    default:
      return "Other";
  }
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  }
  return `${secs}s`;
}

export function getRelativeTimeString(date: Date): string {
  const now = new Date();
  const interval = (now.getTime() - date.getTime()) / 1000;

  if (interval < 60) {
    return "Just now";
  } else if (interval < 3600) {
    const minutes = Math.floor(interval / 60);
    return `${minutes} min ago`;
  } else if (interval < 86400) {
    const hours = Math.floor(interval / 3600);
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (interval < 172800) {
    return "Yesterday";
  } else if (interval < 604800) {
    const days = Math.floor(interval / 86400);
    return `${days} days ago`;
  } else {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }
}

export function filterByTime(items: HistoryItem[], filter: TimeFilter): HistoryItem[] {
  const now = new Date();

  switch (filter) {
    case "all":
      return items;
    case "thisWeek": {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return items.filter((item) => item.date >= weekAgo);
    }
    case "thisMonth": {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      return items.filter((item) => item.date >= monthAgo);
    }
  }
}

export function filterByContent(
  items: HistoryItem[],
  filter: ContentFilter
): HistoryItem[] {
  switch (filter) {
    case "all":
      return items;
    case "voice":
      return items.filter((item) => item.type === "voiceSession");
    case "training":
      return items.filter((item) => item.type === "trainingSession");
    case "checkIns":
      return items.filter((item) => item.type === "checkIn");
  }
}

// RPE color helper
export function getRpeColor(rpe: number): string {
  if (rpe <= 3) return "var(--accent-green)";
  if (rpe <= 6) return "var(--accent-blue)";
  if (rpe <= 8) return "var(--accent-orange)";
  return "var(--accent-red)";
}
