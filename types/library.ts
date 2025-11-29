// Training library types matching iOS app
// Firestore collection: swift_training_sessions

// ============================================================
// ENUMS & CONSTANTS
// ============================================================

export type TrainingCategory =
  | "pre_performance"
  | "skill_development"
  | "confidence"
  | "pressure"
  | "recovery"
  | "anxiety"
  | "wellness";

export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

export type SegmentType =
  | "intro"
  | "instruction"
  | "visualization"
  | "breathing"
  | "pause"
  | "closing";

export type TTSVoice =
  | "Kore"
  | "Puck"
  | "Charon"
  | "Fenrir"
  | "Aoede"
  | "Leda"
  | "Orus"
  | "Zephyr";

export type VoiceStyle = "calm" | "energetic" | "authoritative" | "motivating";

export type PlayerState =
  | "idle"
  | "loading"
  | "generating"
  | "ready"
  | "playing"
  | "paused"
  | "completed"
  | "error";

// ============================================================
// INTERFACES
// ============================================================

export interface TrainingSegment {
  id: string;
  type: SegmentType;
  content: string; // Text with {sport}, {skill} placeholders
  pause_after_seconds: number;
}

// Template stored in Firestore swift_training_sessions collection
export interface TrainingTemplate {
  id: string;
  title: string;
  description: string;
  category: TrainingCategory;
  duration_minutes: number;
  difficulty: DifficultyLevel;
  segments: TrainingSegment[];
  placeholders?: string[]; // e.g., ["sport", "skill", "venue"]
  default_voice?: TTSVoice;
  icon_name?: string;
  is_active: boolean;
  created_at: Date;
  updated_at?: Date;
}

// User-generated session after personalization
export interface PersonalizedSession {
  id: string;
  template_id: string;
  user_id: string;
  title: string;
  description: string;
  category: TrainingCategory;
  sport: string;
  voice_id: TTSVoice;
  segments: PersonalizedSegment[];
  total_duration_seconds: number;
  audio_url?: string; // Firebase Storage URL
  created_at: Date;
}

export interface PersonalizedSegment {
  id: string;
  content: string; // Personalized text (placeholders filled)
  pause_after_seconds: number;
  audio_url?: string;
}

// ============================================================
// CATEGORY METADATA
// ============================================================

export interface CategoryInfo {
  value: TrainingCategory;
  label: string;
  description: string;
  icon: string; // Lucide icon name
  color: string; // Hex color
}

export const TRAINING_CATEGORIES: CategoryInfo[] = [
  {
    value: "pre_performance",
    label: "Pre-Performance",
    description: "Prepare mentally before competition",
    icon: "Flag",
    color: "#8B5CF6",
  },
  {
    value: "skill_development",
    label: "Skill Development",
    description: "Perfect technique through mental rehearsal",
    icon: "Brain",
    color: "#06B6D4",
  },
  {
    value: "confidence",
    label: "Confidence",
    description: "Build unshakeable self-belief",
    icon: "Sparkles",
    color: "#F59E0B",
  },
  {
    value: "pressure",
    label: "Pressure Training",
    description: "Thrive in high-stakes moments",
    icon: "Flame",
    color: "#EF4444",
  },
  {
    value: "recovery",
    label: "Recovery",
    description: "Rest, heal, and restore",
    icon: "Heart",
    color: "#10B981",
  },
  {
    value: "anxiety",
    label: "Anxiety Relief",
    description: "Calm nerves and find peace",
    icon: "Wind",
    color: "#3B82F6",
  },
  {
    value: "wellness",
    label: "Wellness",
    description: "Overall mental wellbeing",
    icon: "Leaf",
    color: "#22C55E",
  },
];

// ============================================================
// VOICE METADATA
// ============================================================

export interface VoiceInfo {
  value: TTSVoice;
  label: string;
  description: string;
  style: VoiceStyle;
}

export const TTS_VOICES: VoiceInfo[] = [
  { value: "Kore", label: "Kore", description: "Warm and nurturing", style: "calm" },
  { value: "Puck", label: "Puck", description: "Friendly and energetic", style: "energetic" },
  { value: "Charon", label: "Charon", description: "Deep and calm", style: "authoritative" },
  { value: "Fenrir", label: "Fenrir", description: "Strong and commanding", style: "motivating" },
  { value: "Aoede", label: "Aoede", description: "Melodic and soothing", style: "calm" },
  { value: "Leda", label: "Leda", description: "Gentle and reassuring", style: "calm" },
  { value: "Orus", label: "Orus", description: "Wise and steady", style: "authoritative" },
  { value: "Zephyr", label: "Zephyr", description: "Light and flowing", style: "energetic" },
];

// ============================================================
// DIFFICULTY METADATA
// ============================================================

export const DIFFICULTY_LEVELS: { value: DifficultyLevel; label: string }[] = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

export function getCategoryInfo(category: TrainingCategory): CategoryInfo {
  return (
    TRAINING_CATEGORIES.find((c) => c.value === category) || TRAINING_CATEGORIES[0]
  );
}

export function getVoiceInfo(voice: TTSVoice): VoiceInfo {
  return TTS_VOICES.find((v) => v.value === voice) || TTS_VOICES[0];
}

export function formatDurationMinutes(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export function formatDurationSeconds(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

// Estimate speaking time based on word count (~150 wpm)
export function estimateSpeakingTime(text: string): number {
  const words = text.split(/\s+/).length;
  return Math.ceil((words / 150) * 60); // seconds
}

// Calculate total session duration including pauses
export function calculateTotalDuration(segments: TrainingSegment[]): number {
  return segments.reduce((total, segment) => {
    const speakingTime = estimateSpeakingTime(segment.content);
    return total + speakingTime + segment.pause_after_seconds;
  }, 0);
}
