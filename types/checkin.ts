// Daily check-in types matching iOS app

export interface DailyCheckIn {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD format
  mentalReadiness: number; // 1-5
  energyLevel: number; // 1-5
  sleepQuality?: number; // 1-5, optional
  notes?: string;
  sport?: string;
  timestamp: Date;
}

// Helper to format date as YYYY-MM-DD
export function formatDateKey(date: Date): string {
  return date.toISOString().split("T")[0];
}

// Helper to get today's date key
export function getTodayDateKey(): string {
  return formatDateKey(new Date());
}

// Rating labels
export const READINESS_LABELS = [
  { value: 1, label: "Not Ready", emoji: "😫" },
  { value: 2, label: "Struggling", emoji: "😕" },
  { value: 3, label: "Okay", emoji: "😐" },
  { value: 4, label: "Good", emoji: "🙂" },
  { value: 5, label: "Peak Ready", emoji: "🔥" },
];

export const ENERGY_LABELS = [
  { value: 1, label: "Exhausted", emoji: "😴" },
  { value: 2, label: "Low", emoji: "😔" },
  { value: 3, label: "Moderate", emoji: "😊" },
  { value: 4, label: "High", emoji: "💪" },
  { value: 5, label: "Energized", emoji: "⚡" },
];

export const SLEEP_LABELS = [
  { value: 1, label: "Terrible", emoji: "😵" },
  { value: 2, label: "Poor", emoji: "😩" },
  { value: 3, label: "Fair", emoji: "😑" },
  { value: 4, label: "Good", emoji: "😌" },
  { value: 5, label: "Excellent", emoji: "😴" },
];

// Check-in streak calculation
export interface StreakInfo {
  currentStreak: number;
  longestStreak: number;
  totalCheckIns: number;
  lastCheckInDate?: string;
}

export function calculateStreak(checkIns: DailyCheckIn[]): StreakInfo {
  if (checkIns.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
      totalCheckIns: 0,
    };
  }

  // Sort by date descending
  const sorted = [...checkIns].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const today = getTodayDateKey();
  const yesterday = formatDateKey(
    new Date(Date.now() - 24 * 60 * 60 * 1000)
  );

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;
  let lastDate: Date | null = null;

  for (const checkIn of sorted) {
    const checkInDate = new Date(checkIn.date);

    if (lastDate === null) {
      // First check-in
      if (checkIn.date === today || checkIn.date === yesterday) {
        tempStreak = 1;
        currentStreak = 1;
      } else {
        tempStreak = 1;
      }
    } else {
      const dayDiff = Math.floor(
        (lastDate.getTime() - checkInDate.getTime()) / (24 * 60 * 60 * 1000)
      );

      if (dayDiff === 1) {
        tempStreak++;
        if (currentStreak > 0) {
          currentStreak++;
        }
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
      }
    }

    lastDate = checkInDate;
    longestStreak = Math.max(longestStreak, tempStreak);
  }

  return {
    currentStreak,
    longestStreak,
    totalCheckIns: checkIns.length,
    lastCheckInDate: sorted[0]?.date,
  };
}
