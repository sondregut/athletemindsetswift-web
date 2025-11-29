// Training session types matching iOS app

export interface TrainingSession {
  id: string;
  userId: string;
  sessionDate: string; // YYYY-MM-DD format
  sessionType: SessionType;
  activity: string;

  // Pre-training (intention)
  mainFocus?: string;
  mindsetCues?: string[];
  quickNotes?: string;
  readinessRating?: number; // 1-10

  // During session
  startTime?: Date;
  endTime?: Date;
  sessionDuration?: number; // in seconds

  // Post-training (reflection)
  positives?: string[]; // up to 3
  stretchGoal?: string;
  rpe?: number; // 1-10 (Rate of Perceived Exertion)
  overallRating?: number; // 1-5

  createdAt: Date;
  updatedAt: Date;
}

export type SessionType = "training" | "competition" | "other";

export const SESSION_TYPES: { value: SessionType; label: string }[] = [
  { value: "training", label: "Training" },
  { value: "competition", label: "Competition" },
  { value: "other", label: "Other" },
];

// Mindset cues (matching iOS app)
export const MINDSET_CUES = [
  "Stay present",
  "Trust the process",
  "One rep at a time",
  "Breathe and reset",
  "Embrace the challenge",
  "Find your rhythm",
  "Stay loose",
  "Control what you can",
  "Enjoy the moment",
  "Be aggressive",
  "Stay patient",
  "Trust your training",
  "Visualize success",
  "Stay composed",
  "Give 100%",
];

// RPE scale labels
export const RPE_LABELS = [
  { value: 1, label: "Very Light" },
  { value: 2, label: "Light" },
  { value: 3, label: "Light" },
  { value: 4, label: "Moderate" },
  { value: 5, label: "Moderate" },
  { value: 6, label: "Somewhat Hard" },
  { value: 7, label: "Hard" },
  { value: 8, label: "Very Hard" },
  { value: 9, label: "Very Hard" },
  { value: 10, label: "Maximum Effort" },
];

// Overall rating labels
export const OVERALL_RATING_LABELS = [
  { value: 1, label: "Poor", emoji: "😞" },
  { value: 2, label: "Below Average", emoji: "😕" },
  { value: 3, label: "Average", emoji: "😐" },
  { value: 4, label: "Good", emoji: "🙂" },
  { value: 5, label: "Excellent", emoji: "🌟" },
];

// Format duration from seconds to readable string
export function formatDuration(seconds: number): string {
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
