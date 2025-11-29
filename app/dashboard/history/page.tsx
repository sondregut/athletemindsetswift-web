"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { useAuthContext } from "@/components/auth/auth-context";
import { useHistory } from "@/lib/hooks/useHistory";
import {
  HistoryItem,
  TimeFilter,
  ContentFilter,
  TIME_FILTERS,
  CONTENT_FILTERS,
  getItemTitle,
  getItemSubtitle,
  getItemAccentColor,
  getRelativeTimeString,
  getMoodEmoji,
  getRpeColor,
} from "@/types/history";
import { TrainingSession } from "@/types/training";
import { DailyCheckIn } from "@/types/checkin";
import { VoiceSession } from "@/types/history";
import {
  Loader2,
  Flame,
  Heart,
  Dumbbell,
  Mic,
  LayoutGrid,
  Calendar,
  ChevronRight,
  Clock,
  Star,
  X,
  MessageSquare,
  Lightbulb,
  ListChecks,
  Brain,
  Zap,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";

// Icon mapping for content filters
const ContentFilterIconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  LayoutGrid,
  Mic,
  Dumbbell,
  Heart,
};

// Icon mapping for history items
const HistoryItemIconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Heart,
  Dumbbell,
  Mic,
};

export default function HistoryPage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuthContext();
  const {
    filteredItems,
    stats,
    isLoading,
    timeFilter,
    setTimeFilter,
    contentFilter,
    setContentFilter,
    loadHistory,
  } = useHistory();

  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2
          className="w-8 h-8 animate-spin"
          style={{ color: "var(--accent-blue)" }}
        />
      </div>
    );
  }

  return (
    <AppShell>
      <div className="p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1
              className="text-2xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              History
            </h1>
          </motion.header>

          {/* Time Filter Tabs */}
          <div className="flex gap-2 mb-4">
            {TIME_FILTERS.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setTimeFilter(filter.value)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  timeFilter === filter.value
                    ? "text-white"
                    : "text-[var(--text-secondary)]"
                }`}
                style={{
                  backgroundColor:
                    timeFilter === filter.value
                      ? "var(--accent-blue)"
                      : "var(--glass-overlay-secondary)",
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Content Filter Bar */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {CONTENT_FILTERS.map((filter) => {
              const Icon = ContentFilterIconMap[filter.icon];
              const isSelected = contentFilter === filter.value;
              return (
                <button
                  key={filter.value}
                  onClick={() => setContentFilter(filter.value)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    backgroundColor: isSelected
                      ? "var(--accent-blue)15"
                      : "transparent",
                    border: `1px solid ${isSelected ? "var(--accent-blue)50" : "var(--glass-border)"}`,
                    color: isSelected
                      ? "var(--accent-blue)"
                      : "var(--text-secondary)",
                  }}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {filter.label}
                </button>
              );
            })}
          </div>

          {/* Stats Bar */}
          {(stats.totalCheckIns > 0 || stats.totalTrainingSessions > 0 || stats.totalVoiceSessions > 0) && (
            <GlassCard className="mb-6">
              <div className="flex items-center gap-6 flex-wrap">
                <StatItem
                  icon={Heart}
                  value={stats.totalCheckIns}
                  label="Check-ins"
                  color="var(--accent-green)"
                />

                <div
                  className="h-8 w-px hidden sm:block"
                  style={{ backgroundColor: "var(--glass-border)" }}
                />

                <StatItem
                  icon={Dumbbell}
                  value={stats.totalTrainingSessions}
                  label="Sessions"
                  color="var(--accent-blue)"
                />

                <div
                  className="h-8 w-px hidden sm:block"
                  style={{ backgroundColor: "var(--glass-border)" }}
                />

                <StatItem
                  icon={Mic}
                  value={stats.totalVoiceSessions}
                  label="Voice"
                  color="var(--accent-cyan)"
                />

                <div
                  className="h-8 w-px hidden sm:block"
                  style={{ backgroundColor: "var(--glass-border)" }}
                />

                <StatItem
                  icon={Flame}
                  value={stats.currentStreak}
                  label="Day Streak"
                  color="var(--accent-orange)"
                />
              </div>
            </GlassCard>
          )}

          {/* History List */}
          {filteredItems.length === 0 ? (
            <EmptyHistoryView contentFilter={contentFilter} />
          ) : (
            <div className="space-y-3">
              {filteredItems.map((item) => (
                <HistoryCard
                  key={item.id}
                  item={item}
                  onClick={() => setSelectedItem(item)}
                />
              ))}
            </div>
          )}

          {/* Detail Modal */}
          <AnimatePresence>
            {selectedItem && (
              <HistoryDetailModal
                item={selectedItem}
                onClose={() => setSelectedItem(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </AppShell>
  );
}

// Stat Item Component
function StatItem({
  icon: Icon,
  value,
  label,
  color,
}: {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  value: number;
  label: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="w-5 h-5" style={{ color }} />
      <div>
        <span
          className="text-xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          {value}
        </span>
        <span
          className="text-sm ml-2"
          style={{ color: "var(--text-secondary)" }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}

// Empty State Component
function EmptyHistoryView({ contentFilter }: { contentFilter: ContentFilter }) {
  const messages: Record<ContentFilter, { title: string; message: string }> = {
    all: {
      title: "No Activity Yet",
      message: "Start a check-in or training session to see your progress here.",
    },
    voice: {
      title: "No Voice Sessions Yet",
      message: "Have a voice coaching session to see it here.",
    },
    training: {
      title: "No Training Sessions Yet",
      message: "Log a training session to track your progress.",
    },
    checkIns: {
      title: "No Check-ins Yet",
      message: "Complete a daily check-in to see it here.",
    },
  };

  const { title, message } = messages[contentFilter];

  return (
    <GlassCard className="text-center py-16">
      <Calendar
        className="w-16 h-16 mx-auto mb-4"
        style={{ color: "var(--text-secondary)" }}
      />
      <h2
        className="text-xl font-bold mb-2"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h2>
      <p style={{ color: "var(--text-secondary)" }}>{message}</p>
    </GlassCard>
  );
}

// History Card Component
function HistoryCard({
  item,
  onClick,
}: {
  item: HistoryItem;
  onClick: () => void;
}) {
  const accentColor = getItemAccentColor(item.type);
  const IconComponent = item.type === "checkIn"
    ? Heart
    : item.type === "trainingSession"
      ? Dumbbell
      : Mic;

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className="w-full text-left"
    >
      <div
        className="flex items-center gap-3 p-4 rounded-2xl"
        style={{
          backgroundColor: "var(--glass-overlay-primary)",
          border: "1px solid var(--glass-border)",
        }}
      >
        {/* Accent Bar */}
        <div
          className="w-1 h-16 rounded-full"
          style={{ backgroundColor: accentColor }}
        />

        {/* Icon */}
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${accentColor}20` }}
        >
          <IconComponent className="w-5 h-5" style={{ color: accentColor }} />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className="font-semibold truncate"
            style={{ color: "var(--text-primary)" }}
          >
            {getItemTitle(item)}
          </h3>

          <p
            className="text-sm truncate"
            style={{ color: "var(--text-secondary)" }}
          >
            {getItemSubtitle(item)}
          </p>

          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap mt-1">
            <span
              className="text-xs"
              style={{ color: "var(--text-secondary)", opacity: 0.7 }}
            >
              {getRelativeTimeString(item.date)}
            </span>
            <ItemBadges item={item} />
          </div>
        </div>

        <ChevronRight
          className="w-4 h-4 flex-shrink-0"
          style={{ color: "var(--text-secondary)" }}
        />
      </div>
    </motion.button>
  );
}

// Item Badges Component
function ItemBadges({ item }: { item: HistoryItem }) {
  switch (item.type) {
    case "checkIn": {
      const checkIn = item.data as DailyCheckIn;
      return (
        <div className="flex items-center gap-1">
          <MetricBadge
            label="M"
            value={checkIn.mentalReadiness}
            color="var(--accent-blue)"
          />
          <MetricBadge
            label="E"
            value={checkIn.energyLevel}
            color="var(--accent-green)"
          />
          {checkIn.sleepQuality && (
            <MetricBadge
              label="S"
              value={checkIn.sleepQuality}
              color="var(--accent-purple)"
            />
          )}
        </div>
      );
    }
    case "trainingSession": {
      const session = item.data as TrainingSession;
      return (
        <div className="flex items-center gap-1">
          {session.rpe && (
            <MetricBadge
              label="RPE"
              value={session.rpe}
              color={getRpeColor(session.rpe)}
            />
          )}
          {session.overallRating && (
            <RatingBadge rating={session.overallRating} />
          )}
        </div>
      );
    }
    case "voiceSession": {
      const voice = item.data as VoiceSession;
      return (
        <div className="flex items-center gap-1">
          <span className="text-sm">{getMoodEmoji(voice.breakdown.moodAnalysis.overallMood)}</span>
          {voice.breakdown.keyTopics.length > 0 && (
            <span
              className="px-2 py-0.5 rounded text-[10px] font-medium truncate max-w-[100px]"
              style={{
                backgroundColor: "var(--accent-cyan)15",
                color: "var(--accent-cyan)",
              }}
            >
              {voice.breakdown.keyTopics[0]}
            </span>
          )}
        </div>
      );
    }
  }
}

// Metric Badge Component
function MetricBadge({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <span
      className="px-2 py-0.5 rounded text-[10px] font-semibold"
      style={{
        backgroundColor: `${color}15`,
        color,
      }}
    >
      {label}:{value}
    </span>
  );
}

// Rating Badge Component
function RatingBadge({ rating }: { rating: number }) {
  return (
    <span
      className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold"
      style={{
        backgroundColor: "var(--accent-orange)15",
        color: "var(--accent-orange)",
      }}
    >
      <Star className="w-2.5 h-2.5" />
      {rating}
    </span>
  );
}

// History Detail Modal
function HistoryDetailModal({
  item,
  onClose,
}: {
  item: HistoryItem;
  onClose: () => void;
}) {
  const accentColor = getItemAccentColor(item.type);
  const IconComponent = item.type === "checkIn"
    ? Heart
    : item.type === "trainingSession"
      ? Dumbbell
      : Mic;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-lg rounded-3xl p-6 max-h-[90vh] overflow-y-auto"
        style={{
          backgroundColor: "var(--card-bg)",
          border: "1px solid var(--glass-border)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${accentColor}20` }}
            >
              <IconComponent className="w-6 h-6" style={{ color: accentColor }} />
            </div>
            <div>
              <h2
                className="text-lg font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {getItemTitle(item)}
              </h2>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                {item.date.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[var(--glass-overlay-secondary)]"
          >
            <X className="w-5 h-5" style={{ color: "var(--text-secondary)" }} />
          </button>
        </div>

        {/* Content based on type */}
        {item.type === "checkIn" && (
          <CheckInDetail checkIn={item.data as DailyCheckIn} />
        )}
        {item.type === "trainingSession" && (
          <TrainingSessionDetail session={item.data as TrainingSession} />
        )}
        {item.type === "voiceSession" && (
          <VoiceSessionDetail session={item.data as VoiceSession} />
        )}
      </motion.div>
    </motion.div>
  );
}

// Check-In Detail
function CheckInDetail({ checkIn }: { checkIn: DailyCheckIn }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <DetailMetric
          label="Mental Readiness"
          value={checkIn.mentalReadiness}
          max={5}
          color="var(--accent-blue)"
        />
        <DetailMetric
          label="Energy Level"
          value={checkIn.energyLevel}
          max={5}
          color="var(--accent-green)"
        />
        {checkIn.sleepQuality && (
          <DetailMetric
            label="Sleep Quality"
            value={checkIn.sleepQuality}
            max={5}
            color="var(--accent-purple)"
          />
        )}
      </div>

      {checkIn.notes && (
        <div
          className="p-4 rounded-xl"
          style={{
            backgroundColor: "var(--glass-overlay-primary)",
            border: "1px solid var(--glass-border)",
          }}
        >
          <h4
            className="text-sm font-semibold mb-2"
            style={{ color: "var(--text-secondary)" }}
          >
            Notes
          </h4>
          <p style={{ color: "var(--text-primary)" }}>{checkIn.notes}</p>
        </div>
      )}
    </div>
  );
}

// Training Session Detail
function TrainingSessionDetail({ session }: { session: TrainingSession }) {
  return (
    <div className="space-y-4">
      {/* Session Info */}
      <div className="grid grid-cols-2 gap-3">
        <InfoItem label="Type" value={session.sessionType} />
        {session.sessionDuration && (
          <InfoItem
            label="Duration"
            value={`${Math.floor(session.sessionDuration / 60)}m`}
          />
        )}
        {session.rpe && (
          <InfoItem label="RPE" value={`${session.rpe}/10`} />
        )}
        {session.overallRating && (
          <InfoItem label="Rating" value={`${session.overallRating}/5`} />
        )}
      </div>

      {/* Main Focus */}
      {session.mainFocus && (
        <div
          className="p-4 rounded-xl"
          style={{
            backgroundColor: "var(--glass-overlay-primary)",
            border: "1px solid var(--glass-border)",
          }}
        >
          <h4
            className="text-sm font-semibold mb-2 flex items-center gap-2"
            style={{ color: "var(--text-secondary)" }}
          >
            <Brain className="w-4 h-4" />
            Main Focus
          </h4>
          <p style={{ color: "var(--text-primary)" }}>{session.mainFocus}</p>
        </div>
      )}

      {/* Mindset Cues */}
      {session.mindsetCues && session.mindsetCues.length > 0 && (
        <div
          className="p-4 rounded-xl"
          style={{
            backgroundColor: "var(--glass-overlay-primary)",
            border: "1px solid var(--glass-border)",
          }}
        >
          <h4
            className="text-sm font-semibold mb-2"
            style={{ color: "var(--text-secondary)" }}
          >
            Mindset Cues
          </h4>
          <div className="flex flex-wrap gap-2">
            {session.mindsetCues.map((cue, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: "var(--accent-blue)15",
                  color: "var(--accent-blue)",
                }}
              >
                {cue}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Positives */}
      {session.positives && session.positives.length > 0 && (
        <div
          className="p-4 rounded-xl"
          style={{
            backgroundColor: "var(--glass-overlay-primary)",
            border: "1px solid var(--glass-border)",
          }}
        >
          <h4
            className="text-sm font-semibold mb-2 flex items-center gap-2"
            style={{ color: "var(--text-secondary)" }}
          >
            <Zap className="w-4 h-4" style={{ color: "var(--accent-green)" }} />
            Positives
          </h4>
          <ul className="space-y-1">
            {session.positives.map((positive, i) => (
              <li
                key={i}
                className="text-sm"
                style={{ color: "var(--text-primary)" }}
              >
                {positive}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Voice Session Detail
function VoiceSessionDetail({ session }: { session: VoiceSession }) {
  const { breakdown } = session;

  return (
    <div className="space-y-4">
      {/* Duration and Mood */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />
          <span style={{ color: "var(--text-primary)" }}>
            {session.durationSeconds < 60
              ? `${session.durationSeconds}s`
              : `${Math.floor(session.durationSeconds / 60)}m ${session.durationSeconds % 60}s`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />
          <span style={{ color: "var(--text-primary)" }}>
            {session.messageCount} messages
          </span>
        </div>
        <span className="text-2xl">{getMoodEmoji(breakdown.moodAnalysis.overallMood)}</span>
      </div>

      {/* Summary */}
      {breakdown.summary && (
        <div
          className="p-4 rounded-xl"
          style={{
            backgroundColor: "var(--glass-overlay-primary)",
            border: "1px solid var(--glass-border)",
          }}
        >
          <h4
            className="text-sm font-semibold mb-2"
            style={{ color: "var(--text-secondary)" }}
          >
            Summary
          </h4>
          <p style={{ color: "var(--text-primary)" }}>{breakdown.summary}</p>
        </div>
      )}

      {/* Key Topics */}
      {breakdown.keyTopics.length > 0 && (
        <div
          className="p-4 rounded-xl"
          style={{
            backgroundColor: "var(--glass-overlay-primary)",
            border: "1px solid var(--glass-border)",
          }}
        >
          <h4
            className="text-sm font-semibold mb-2"
            style={{ color: "var(--text-secondary)" }}
          >
            Key Topics
          </h4>
          <div className="flex flex-wrap gap-2">
            {breakdown.keyTopics.map((topic, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: "var(--accent-cyan)15",
                  color: "var(--accent-cyan)",
                }}
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Coaching Insights */}
      {breakdown.coachingInsights.length > 0 && (
        <div
          className="p-4 rounded-xl"
          style={{
            backgroundColor: "var(--glass-overlay-primary)",
            border: "1px solid var(--glass-border)",
          }}
        >
          <h4
            className="text-sm font-semibold mb-2 flex items-center gap-2"
            style={{ color: "var(--text-secondary)" }}
          >
            <Lightbulb className="w-4 h-4" style={{ color: "var(--accent-gold)" }} />
            Coaching Insights
          </h4>
          <ul className="space-y-2">
            {breakdown.coachingInsights.map((insight, i) => (
              <li
                key={i}
                className="text-sm"
                style={{ color: "var(--text-primary)" }}
              >
                {insight}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Action Items */}
      {breakdown.actionItems.length > 0 && (
        <div
          className="p-4 rounded-xl"
          style={{
            backgroundColor: "var(--glass-overlay-primary)",
            border: "1px solid var(--glass-border)",
          }}
        >
          <h4
            className="text-sm font-semibold mb-2 flex items-center gap-2"
            style={{ color: "var(--text-secondary)" }}
          >
            <ListChecks className="w-4 h-4" style={{ color: "var(--accent-green)" }} />
            Action Items
          </h4>
          <ul className="space-y-2">
            {breakdown.actionItems.map((item, i) => (
              <li
                key={i}
                className="text-sm flex items-start gap-2"
                style={{ color: "var(--text-primary)" }}
              >
                <span style={{ color: "var(--accent-green)" }}>•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Exercises Performed */}
      {breakdown.exercisesPerformed.length > 0 && (
        <div
          className="p-4 rounded-xl"
          style={{
            backgroundColor: "var(--glass-overlay-primary)",
            border: "1px solid var(--glass-border)",
          }}
        >
          <h4
            className="text-sm font-semibold mb-2"
            style={{ color: "var(--text-secondary)" }}
          >
            Exercises Performed
          </h4>
          <div className="flex flex-wrap gap-2">
            {breakdown.exercisesPerformed.map((exercise, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: "var(--accent-purple)15",
                  color: "var(--accent-purple)",
                }}
              >
                {exercise}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Detail Metric Component
function DetailMetric({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  return (
    <div
      className="p-3 rounded-xl text-center"
      style={{
        backgroundColor: "var(--glass-overlay-primary)",
        border: "1px solid var(--glass-border)",
      }}
    >
      <div className="text-2xl font-bold" style={{ color }}>
        {value}
        <span className="text-sm opacity-50">/{max}</span>
      </div>
      <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
        {label}
      </div>
    </div>
  );
}

// Info Item Component
function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="p-3 rounded-xl"
      style={{
        backgroundColor: "var(--glass-overlay-primary)",
        border: "1px solid var(--glass-border)",
      }}
    >
      <div className="text-xs mb-1" style={{ color: "var(--text-secondary)" }}>
        {label}
      </div>
      <div
        className="font-semibold capitalize"
        style={{ color: "var(--text-primary)" }}
      >
        {value}
      </div>
    </div>
  );
}
