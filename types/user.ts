// User profile types matching iOS app

export interface UserProfile {
  displayName?: string;
  email?: string;
  sport?: string;
  sportDiscipline?: string;
  experienceLevel?: ExperienceLevel;
  ageRange?: AgeRange;
  trainingGoals?: TrainingGoal[];
  onboardingCompleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type ExperienceLevel = "beginner" | "intermediate" | "advanced" | "elite";

export type AgeRange =
  | "under18"
  | "18-24"
  | "25-34"
  | "35-44"
  | "45-54"
  | "55+";

export type TrainingGoal =
  | "improveFocus"
  | "reduceNerves"
  | "performUnderPressure"
  | "buildConfidence"
  | "recoverFromSetbacks"
  | "improveConsistency"
  | "enhanceVisualization"
  | "manageEmotions";

export const TRAINING_GOALS: { value: TrainingGoal; label: string }[] = [
  { value: "improveFocus", label: "Improve Focus" },
  { value: "reduceNerves", label: "Reduce Pre-Competition Nerves" },
  { value: "performUnderPressure", label: "Perform Under Pressure" },
  { value: "buildConfidence", label: "Build Confidence" },
  { value: "recoverFromSetbacks", label: "Recover From Setbacks" },
  { value: "improveConsistency", label: "Improve Consistency" },
  { value: "enhanceVisualization", label: "Enhance Visualization" },
  { value: "manageEmotions", label: "Manage Emotions" },
];

export const EXPERIENCE_LEVELS: { value: ExperienceLevel; label: string }[] = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "elite", label: "Elite/Professional" },
];

export const AGE_RANGES: { value: AgeRange; label: string }[] = [
  { value: "under18", label: "Under 18" },
  { value: "18-24", label: "18-24" },
  { value: "25-34", label: "25-34" },
  { value: "35-44", label: "35-44" },
  { value: "45-54", label: "45-54" },
  { value: "55+", label: "55+" },
];

// Sports list matching iOS app
export const SPORTS = [
  { value: "soccer", label: "Soccer", disciplines: ["Forward", "Midfielder", "Defender", "Goalkeeper"] },
  { value: "basketball", label: "Basketball", disciplines: ["Point Guard", "Shooting Guard", "Small Forward", "Power Forward", "Center"] },
  { value: "tennis", label: "Tennis", disciplines: ["Singles", "Doubles"] },
  { value: "golf", label: "Golf", disciplines: [] },
  { value: "swimming", label: "Swimming", disciplines: ["Freestyle", "Backstroke", "Breaststroke", "Butterfly", "IM"] },
  { value: "track", label: "Track & Field", disciplines: ["Sprints", "Distance", "Jumps", "Throws", "Multi-events"] },
  { value: "cycling", label: "Cycling", disciplines: ["Road", "Track", "Mountain", "BMX"] },
  { value: "triathlon", label: "Triathlon", disciplines: ["Sprint", "Olympic", "Half Ironman", "Ironman"] },
  { value: "crossfit", label: "CrossFit", disciplines: [] },
  { value: "weightlifting", label: "Weightlifting", disciplines: ["Olympic", "Powerlifting"] },
  { value: "martial_arts", label: "Martial Arts", disciplines: ["Boxing", "MMA", "Judo", "Taekwondo", "BJJ"] },
  { value: "gymnastics", label: "Gymnastics", disciplines: ["Artistic", "Rhythmic", "Trampoline"] },
  { value: "skiing", label: "Skiing", disciplines: ["Alpine", "Nordic", "Freestyle"] },
  { value: "snowboarding", label: "Snowboarding", disciplines: ["Freestyle", "Alpine", "Freeride"] },
  { value: "surfing", label: "Surfing", disciplines: [] },
  { value: "volleyball", label: "Volleyball", disciplines: ["Indoor", "Beach"] },
  { value: "baseball", label: "Baseball", disciplines: ["Pitcher", "Catcher", "Infielder", "Outfielder"] },
  { value: "hockey", label: "Hockey", disciplines: ["Forward", "Defense", "Goalie"] },
  { value: "rowing", label: "Rowing", disciplines: ["Single", "Double", "Quad", "Eight"] },
  { value: "other", label: "Other", disciplines: [] },
] as const;
