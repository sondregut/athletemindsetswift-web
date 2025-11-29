// Goal Types and Models

export type GoalType =
  | "technical_skills"
  | "mental_resilience"
  | "physical_conditioning"
  | "competition_performance"
  | "recovery_wellness"
  | "team_leadership"
  | "personal_development";

export type GoalTimeframe =
  | "vision"
  | "12_months"
  | "9_months"
  | "6_months"
  | "3_months"
  | "monthly"
  | "weekly"
  | "daily";

export type GoalStatus = "not_started" | "in_progress" | "completed";

export type GoalPriority = "low" | "medium" | "high";

export type GoalFilter = "all" | "active" | "completed";

export interface Goal {
  id?: string;
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

export interface GoalStats {
  totalGoals: number;
  activeGoals: number;
  completedGoals: number;
  completionRate: number;
}

// Goal Type Configuration
export const GOAL_TYPES: Record<
  GoalType,
  { displayName: string; icon: string; description: string }
> = {
  technical_skills: {
    displayName: "Technical Skills",
    icon: "Target",
    description: "Improve specific skills and techniques",
  },
  mental_resilience: {
    displayName: "Mental Resilience",
    icon: "Brain",
    description: "Build mental toughness and focus",
  },
  physical_conditioning: {
    displayName: "Physical Conditioning",
    icon: "Dumbbell",
    description: "Enhance strength, speed, or endurance",
  },
  competition_performance: {
    displayName: "Competition Performance",
    icon: "Trophy",
    description: "Achieve results in competitions",
  },
  recovery_wellness: {
    displayName: "Recovery & Wellness",
    icon: "Heart",
    description: "Prioritize rest and injury prevention",
  },
  team_leadership: {
    displayName: "Team Leadership",
    icon: "Users",
    description: "Lead and support teammates",
  },
  personal_development: {
    displayName: "Personal Development",
    icon: "TrendingUp",
    description: "Grow as a person and athlete",
  },
};

// Goal Timeframe Configuration
export const GOAL_TIMEFRAMES: Record<
  GoalTimeframe,
  { displayName: string; shortName: string; icon: string; sortOrder: number }
> = {
  vision: { displayName: "Vision", shortName: "Vision", icon: "Star", sortOrder: 0 },
  "12_months": { displayName: "12 Months", shortName: "12M", icon: "Calendar", sortOrder: 1 },
  "9_months": { displayName: "9 Months", shortName: "9M", icon: "Calendar", sortOrder: 2 },
  "6_months": { displayName: "6 Months", shortName: "6M", icon: "Calendar", sortOrder: 3 },
  "3_months": { displayName: "3 Months", shortName: "3M", icon: "Calendar", sortOrder: 4 },
  monthly: { displayName: "Monthly", shortName: "Month", icon: "CalendarClock", sortOrder: 5 },
  weekly: { displayName: "Weekly", shortName: "Week", icon: "Clock", sortOrder: 6 },
  daily: { displayName: "Daily", shortName: "Day", icon: "Sun", sortOrder: 7 },
};

// Goal Status Configuration
export const GOAL_STATUSES: Record<
  GoalStatus,
  { displayName: string; icon: string }
> = {
  not_started: { displayName: "Not Started", icon: "Circle" },
  in_progress: { displayName: "In Progress", icon: "CircleDot" },
  completed: { displayName: "Completed", icon: "CheckCircle" },
};

// Goal Priority Configuration
export const GOAL_PRIORITIES: Record<
  GoalPriority,
  { displayName: string; icon: string; sortOrder: number }
> = {
  high: { displayName: "High", icon: "ArrowUp", sortOrder: 0 },
  medium: { displayName: "Medium", icon: "Minus", sortOrder: 1 },
  low: { displayName: "Low", icon: "ArrowDown", sortOrder: 2 },
};

// Goal Filter Configuration
export const GOAL_FILTERS: Record<GoalFilter, { label: string; icon: string }> = {
  all: { label: "All", icon: "List" },
  active: { label: "Active", icon: "Flame" },
  completed: { label: "Completed", icon: "CheckCircle" },
};

// Helper function to calculate target date based on timeframe
export function calculateTargetDate(timeframe: GoalTimeframe): Date | undefined {
  const now = new Date();
  switch (timeframe) {
    case "vision":
      return undefined;
    case "12_months":
      return new Date(now.setMonth(now.getMonth() + 12));
    case "9_months":
      return new Date(now.setMonth(now.getMonth() + 9));
    case "6_months":
      return new Date(now.setMonth(now.getMonth() + 6));
    case "3_months":
      return new Date(now.setMonth(now.getMonth() + 3));
    case "monthly":
      return new Date(now.setMonth(now.getMonth() + 1));
    case "weekly":
      return new Date(now.setDate(now.getDate() + 7));
    case "daily":
      return new Date(now.setDate(now.getDate() + 1));
    default:
      return undefined;
  }
}

// Get color for goal type
export function getGoalTypeColor(type: GoalType): string {
  switch (type) {
    case "technical_skills":
      return "var(--accent-blue)";
    case "mental_resilience":
      return "var(--accent-purple)";
    case "physical_conditioning":
      return "var(--accent-green)";
    case "competition_performance":
      return "var(--accent-orange)";
    case "recovery_wellness":
      return "var(--accent-cyan)";
    case "team_leadership":
      return "var(--accent-blue)";
    case "personal_development":
      return "var(--accent-purple)";
    default:
      return "var(--accent-blue)";
  }
}

// Get color for priority
export function getPriorityColor(priority: GoalPriority): string {
  switch (priority) {
    case "high":
      return "var(--accent-orange)";
    case "medium":
      return "var(--accent-blue)";
    case "low":
      return "var(--text-secondary)";
    default:
      return "var(--text-secondary)";
  }
}

// Get color for status
export function getStatusColor(status: GoalStatus): string {
  switch (status) {
    case "not_started":
      return "var(--text-secondary)";
    case "in_progress":
      return "var(--accent-blue)";
    case "completed":
      return "var(--accent-green)";
    default:
      return "var(--text-secondary)";
  }
}
