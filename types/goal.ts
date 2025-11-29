// Goal types matching iOS app

export interface Goal {
  id: string;
  userId: string;
  title: string;
  description: string;
  type: GoalType;
  timeframe: GoalTimeframe;
  status: GoalStatus;
  priority: GoalPriority;
  progress: number; // 0-100
  targetDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export type GoalType =
  | "technicalSkills"
  | "mentalResilience"
  | "physicalConditioning"
  | "competitionPerformance"
  | "recoveryWellness"
  | "teamLeadership"
  | "personalDevelopment";

export type GoalTimeframe =
  | "vision"
  | "12mo"
  | "9mo"
  | "6mo"
  | "3mo"
  | "monthly"
  | "weekly"
  | "daily";

export type GoalStatus = "notStarted" | "inProgress" | "completed";

export type GoalPriority = "low" | "medium" | "high";

export const GOAL_TYPES: { value: GoalType; label: string; icon: string }[] = [
  { value: "technicalSkills", label: "Technical Skills", icon: "Target" },
  { value: "mentalResilience", label: "Mental Resilience", icon: "Brain" },
  { value: "physicalConditioning", label: "Physical Conditioning", icon: "Dumbbell" },
  { value: "competitionPerformance", label: "Competition Performance", icon: "Trophy" },
  { value: "recoveryWellness", label: "Recovery & Wellness", icon: "Heart" },
  { value: "teamLeadership", label: "Team Leadership", icon: "Users" },
  { value: "personalDevelopment", label: "Personal Development", icon: "Star" },
];

export const GOAL_TIMEFRAMES: { value: GoalTimeframe; label: string }[] = [
  { value: "vision", label: "Vision (Long-term)" },
  { value: "12mo", label: "12 Months" },
  { value: "9mo", label: "9 Months" },
  { value: "6mo", label: "6 Months" },
  { value: "3mo", label: "3 Months" },
  { value: "monthly", label: "Monthly" },
  { value: "weekly", label: "Weekly" },
  { value: "daily", label: "Daily" },
];

export const GOAL_STATUSES: { value: GoalStatus; label: string; color: string }[] = [
  { value: "notStarted", label: "Not Started", color: "gray" },
  { value: "inProgress", label: "In Progress", color: "blue" },
  { value: "completed", label: "Completed", color: "green" },
];

export const GOAL_PRIORITIES: { value: GoalPriority; label: string; color: string }[] = [
  { value: "low", label: "Low", color: "gray" },
  { value: "medium", label: "Medium", color: "orange" },
  { value: "high", label: "High", color: "red" },
];

// Helper to create a new goal
export function createGoal(
  userId: string,
  data: Omit<Goal, "id" | "userId" | "createdAt" | "updatedAt" | "progress" | "status">
): Omit<Goal, "id"> {
  return {
    ...data,
    userId,
    progress: 0,
    status: "notStarted",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
