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

// Sport type definition
export interface SportOption {
  value: string;
  label: string;
  emoji: string;
  disciplines: string[];
  keywords?: string[]; // For search - event names, aliases
}

// Popular sports (shown by default) - matching iOS app
export const POPULAR_SPORTS: SportOption[] = [
  {
    value: "track",
    label: "Track & Field",
    emoji: "🏃",
    disciplines: ["Sprints", "Distance", "Hurdles", "Jumps", "Throws", "Pole Vault"],
    keywords: ["100m", "200m", "400m", "800m", "1500m", "5k", "10k", "marathon", "110m hurdles", "400m hurdles", "high jump", "long jump", "triple jump", "shot put", "discus", "javelin", "hammer", "decathlon", "heptathlon", "relay", "running", "athletics"]
  },
  { value: "basketball", label: "Basketball", emoji: "🏀", disciplines: [] },
  { value: "soccer", label: "Soccer", emoji: "⚽️", disciplines: [] },
  { value: "football", label: "Football", emoji: "🏈", disciplines: ["Quarterback", "Wide Receiver", "Running Back", "Linebacker", "Defensive Back"] },
  { value: "tennis", label: "Tennis", emoji: "🎾", disciplines: ["Singles", "Doubles"] },
  {
    value: "swimming",
    label: "Swimming",
    emoji: "🏊",
    disciplines: ["Freestyle", "Backstroke", "Breaststroke", "Butterfly", "IM"],
    keywords: ["50m", "100m", "200m", "400m", "1500m", "medley", "relay"]
  },
  { value: "golf", label: "Golf", emoji: "⛳️", disciplines: [] },
  { value: "baseball", label: "Baseball", emoji: "⚾️", disciplines: ["Pitcher", "Catcher", "Infielder", "Outfielder"] },
  { value: "volleyball", label: "Volleyball", emoji: "🏐", disciplines: ["Indoor", "Beach"] },
  {
    value: "gymnastics",
    label: "Gymnastics",
    emoji: "🤸",
    disciplines: ["Artistic", "Rhythmic", "Trampoline"],
    keywords: ["vault", "bars", "beam", "floor", "rings", "pommel horse", "parallel bars", "horizontal bar"]
  },
  {
    value: "cycling",
    label: "Cycling",
    emoji: "🚴",
    disciplines: ["Road", "Track", "Mountain", "BMX"],
    keywords: ["criterium", "time trial", "velodrome", "downhill", "cross country"]
  },
  {
    value: "martial_arts",
    label: "Martial Arts",
    emoji: "🥋",
    disciplines: ["Karate", "Judo", "Taekwondo", "Boxing", "MMA"],
    keywords: ["kickboxing", "bjj", "wrestling", "kung fu", "muay thai"]
  },
  {
    value: "skiing",
    label: "Skiing",
    emoji: "⛷️",
    disciplines: ["Alpine", "Cross-Country", "Freestyle"],
    keywords: ["slalom", "giant slalom", "downhill", "super g", "moguls", "aerials"]
  },
  { value: "hockey", label: "Hockey", emoji: "🏒", disciplines: ["Forward", "Defense", "Goalie"] },
  { value: "wrestling", label: "Wrestling", emoji: "🤼", disciplines: ["Freestyle", "Greco-Roman", "Folkstyle"] },
  { value: "rowing", label: "Rowing", emoji: "🚣", disciplines: ["Single", "Double", "Quad", "Eight"] },
  { value: "crossfit", label: "CrossFit", emoji: "💪", disciplines: [] },
  {
    value: "triathlon",
    label: "Triathlon",
    emoji: "🏊‍♂️",
    disciplines: ["Sprint", "Olympic", "Half Ironman", "Ironman"],
    keywords: ["ironman", "70.3", "duathlon"]
  },
];

// Additional sports (shown in search) - matching iOS app
export const ADDITIONAL_SPORTS: SportOption[] = [
  { value: "archery", label: "Archery", emoji: "🏹", disciplines: ["Recurve", "Compound"] },
  { value: "badminton", label: "Badminton", emoji: "🏸", disciplines: ["Singles", "Doubles"] },
  {
    value: "climbing",
    label: "Climbing",
    emoji: "🧗",
    disciplines: ["Bouldering", "Lead", "Speed"],
    keywords: ["rock climbing", "sport climbing"]
  },
  { value: "fencing", label: "Fencing", emoji: "🤺", disciplines: ["Foil", "Epee", "Sabre"] },
  { value: "figure_skating", label: "Figure Skating", emoji: "⛸️", disciplines: ["Singles", "Pairs", "Ice Dance"] },
  { value: "lacrosse", label: "Lacrosse", emoji: "🥍", disciplines: ["Attack", "Midfield", "Defense", "Goalie"] },
  { value: "rugby", label: "Rugby", emoji: "🏉", disciplines: ["Sevens", "Fifteens"] },
  { value: "skateboarding", label: "Skateboarding", emoji: "🛹", disciplines: ["Street", "Park", "Vert"] },
  { value: "snowboarding", label: "Snowboarding", emoji: "🏂", disciplines: ["Freestyle", "Alpine", "Freeride"] },
  { value: "surfing", label: "Surfing", emoji: "🏄", disciplines: [] },
  { value: "table_tennis", label: "Table Tennis", emoji: "🏓", disciplines: ["Singles", "Doubles"] },
  { value: "weightlifting", label: "Weightlifting", emoji: "🏋️", disciplines: ["Olympic", "Powerlifting"] },
  { value: "other", label: "Other", emoji: "🎯", disciplines: [] },
];

// All sports combined
export const ALL_SPORTS: SportOption[] = [...POPULAR_SPORTS, ...ADDITIONAL_SPORTS];

// Legacy export for backwards compatibility
export const SPORTS = ALL_SPORTS.map(s => ({
  value: s.value,
  label: s.label,
  disciplines: s.disciplines,
}));
