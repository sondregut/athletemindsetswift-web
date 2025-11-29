"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/components/auth/auth-context";
import { useGoals } from "@/lib/hooks/useGoals";
import {
  Goal,
  GoalFilter,
  GoalType,
  GoalTimeframe,
  GoalPriority,
  GOAL_FILTERS,
  GOAL_TYPES,
  GOAL_TIMEFRAMES,
  GOAL_PRIORITIES,
  GOAL_STATUSES,
  getGoalTypeColor,
  getStatusColor,
  getPriorityColor,
} from "@/lib/types/goals";
import {
  ArrowLeft,
  Plus,
  Loader2,
  Flame,
  CheckCircle,
  TrendingUp,
  Target,
  Brain,
  Dumbbell,
  Trophy,
  Heart,
  Users,
  Calendar,
  Clock,
  Star,
  Sun,
  ArrowUp,
  Minus,
  ArrowDown,
  ChevronRight,
  Circle,
  CircleDot,
  X,
  List,
} from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/layout/app-shell";

// Icon mapping
const IconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Target,
  Brain,
  Dumbbell,
  Trophy,
  Heart,
  Users,
  TrendingUp,
  Calendar,
  CalendarClock: Calendar,
  Clock,
  Star,
  Sun,
  ArrowUp,
  Minus,
  ArrowDown,
  Circle,
  CircleDot,
  CheckCircle,
  List,
  Flame,
};

export default function GoalsPage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuthContext();
  const { goals, stats, isLoading, getFilteredGoals, createGoal, updateProgress, completeGoal, deleteGoal } = useGoals();

  const [selectedFilter, setSelectedFilter] = useState<GoalFilter>("active");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

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

  const filteredGoals = getFilteredGoals(selectedFilter);

  return (
    <AppShell>
      <div className="p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
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
              Goals
            </h1>

            <Button onClick={() => setShowCreateModal(true)} icon={Plus}>
              New Goal
            </Button>
          </motion.header>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6">
            {(Object.keys(GOAL_FILTERS) as GoalFilter[]).map((filter) => {
              const config = GOAL_FILTERS[filter];
              const Icon = IconMap[config.icon];
              return (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    selectedFilter === filter
                      ? "text-white"
                      : "text-[var(--text-secondary)]"
                  }`}
                  style={{
                    backgroundColor:
                      selectedFilter === filter
                        ? "var(--accent-blue)"
                        : "var(--glass-overlay-secondary)",
                  }}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {config.label}
                </button>
              );
            })}
          </div>

          {/* Stats Bar */}
          {stats.totalGoals > 0 && (
            <GlassCard className="mb-6">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <Flame
                    className="w-5 h-5"
                    style={{ color: "var(--accent-orange)" }}
                  />
                  <div>
                    <span
                      className="text-xl font-bold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {stats.activeGoals}
                    </span>
                    <span
                      className="text-sm ml-2"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Active
                    </span>
                  </div>
                </div>

                <div
                  className="h-8 w-px"
                  style={{ backgroundColor: "var(--glass-border)" }}
                />

                <div className="flex items-center gap-3">
                  <CheckCircle
                    className="w-5 h-5"
                    style={{ color: "var(--accent-green)" }}
                  />
                  <div>
                    <span
                      className="text-xl font-bold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {stats.completedGoals}
                    </span>
                    <span
                      className="text-sm ml-2"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Completed
                    </span>
                  </div>
                </div>

                <div
                  className="h-8 w-px"
                  style={{ backgroundColor: "var(--glass-border)" }}
                />

                <div className="flex items-center gap-3">
                  <TrendingUp
                    className="w-5 h-5"
                    style={{ color: "var(--accent-blue)" }}
                  />
                  <div>
                    <span
                      className="text-xl font-bold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {Math.round(stats.completionRate * 100)}%
                    </span>
                    <span
                      className="text-sm ml-2"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Success
                    </span>
                  </div>
                </div>
              </div>
            </GlassCard>
          )}

          {/* Goals List */}
          {filteredGoals.length === 0 ? (
            <EmptyGoalsView
              filter={selectedFilter}
              onCreate={() => setShowCreateModal(true)}
            />
          ) : (
            <div className="space-y-3">
              {filteredGoals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onClick={() => setSelectedGoal(goal)}
                />
              ))}
            </div>
          )}

          {/* Create Goal Modal */}
          <AnimatePresence>
            {showCreateModal && (
              <CreateGoalModal
                onClose={() => setShowCreateModal(false)}
                onSave={async (data) => {
                  await createGoal(data);
                  setShowCreateModal(false);
                }}
              />
            )}
          </AnimatePresence>

          {/* Goal Detail Modal */}
          <AnimatePresence>
            {selectedGoal && (
              <GoalDetailModal
                goal={selectedGoal}
                onClose={() => setSelectedGoal(null)}
                onUpdateProgress={async (progress) => {
                  await updateProgress(selectedGoal.id!, progress);
                  setSelectedGoal(null);
                }}
                onComplete={async () => {
                  await completeGoal(selectedGoal.id!);
                  setSelectedGoal(null);
                }}
                onDelete={async () => {
                  await deleteGoal(selectedGoal.id!);
                  setSelectedGoal(null);
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </AppShell>
  );
}

// Empty State Component
function EmptyGoalsView({
  filter,
  onCreate,
}: {
  filter: GoalFilter;
  onCreate: () => void;
}) {
  const messages = {
    all: { title: "No Goals Yet", message: "Set your first goal to start tracking your progress." },
    active: { title: "No Active Goals", message: "Create a new goal or check your completed goals." },
    completed: { title: "No Completed Goals", message: "Keep working on your goals - you'll get there!" },
  };

  const { title, message } = messages[filter];

  return (
    <GlassCard className="text-center py-16">
      <Target
        className="w-16 h-16 mx-auto mb-4"
        style={{ color: "var(--text-secondary)" }}
      />
      <h2
        className="text-xl font-bold mb-2"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h2>
      <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
        {message}
      </p>
      {filter !== "completed" && (
        <Button onClick={onCreate} icon={Plus}>
          Create Goal
        </Button>
      )}
    </GlassCard>
  );
}

// Goal Card Component
function GoalCard({ goal, onClick }: { goal: Goal; onClick: () => void }) {
  const typeConfig = GOAL_TYPES[goal.type];
  const timeframeConfig = GOAL_TIMEFRAMES[goal.timeframe];
  const statusConfig = GOAL_STATUSES[goal.status];
  const TypeIcon = IconMap[typeConfig.icon];
  const accentColor = getGoalTypeColor(goal.type);

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
          {TypeIcon && (
            <TypeIcon className="w-5 h-5" style={{ color: accentColor }} />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className="font-semibold truncate"
            style={{ color: "var(--text-primary)" }}
          >
            {goal.title}
          </h3>

          {/* Progress Bar */}
          <div className="h-1.5 rounded-full mt-2 mb-2 overflow-hidden" style={{ backgroundColor: "var(--glass-overlay-secondary)" }}>
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${goal.progress}%`,
                backgroundColor: goal.status === "completed" ? "var(--accent-green)" : accentColor,
              }}
            />
          </div>

          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge icon={timeframeConfig.icon} text={timeframeConfig.shortName} />
            {goal.priority === "high" && (
              <Badge
                icon="ArrowUp"
                text="High"
                color="var(--accent-orange)"
              />
            )}
            <Badge
              icon={statusConfig.icon}
              text={statusConfig.displayName}
              color={getStatusColor(goal.status)}
            />
            <span
              className="ml-auto text-xs font-bold"
              style={{ color: goal.status === "completed" ? "var(--accent-green)" : accentColor }}
            >
              {goal.progress}%
            </span>
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

// Badge Component
function Badge({
  icon,
  text,
  color,
}: {
  icon: string;
  text: string;
  color?: string;
}) {
  const Icon = IconMap[icon];
  const textColor = color || "var(--text-secondary)";

  return (
    <span
      className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-semibold"
      style={{
        backgroundColor: color ? `${color}15` : "var(--glass-overlay-secondary)",
        color: textColor,
      }}
    >
      {Icon && <Icon className="w-3 h-3" />}
      {text}
    </span>
  );
}

// Create Goal Modal
function CreateGoalModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (data: Omit<Goal, "id" | "userId" | "createdAt" | "updatedAt">) => Promise<void>;
}) {
  const [step, setStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [type, setType] = useState<GoalType>("technical_skills");
  const [timeframe, setTimeframe] = useState<GoalTimeframe>("monthly");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<GoalPriority>("medium");

  const canProceed = step < 2 || (step === 2 && title.trim().length > 0) || step === 3;

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsSaving(true);
      try {
        await onSave({
          title: title.trim(),
          description: description.trim(),
          type,
          timeframe,
          priority,
          status: "not_started",
          progress: 0,
        });
      } finally {
        setIsSaving(false);
      }
    }
  };

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
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Create Goal
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[var(--glass-overlay-secondary)]"
          >
            <X className="w-5 h-5" style={{ color: "var(--text-secondary)" }} />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-8">
          {["Type", "Timeframe", "Details", "Priority"].map((label, i) => (
            <div key={label} className="flex items-center gap-2 flex-1">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: i <= step ? "var(--accent-blue)" : "var(--glass-overlay-secondary)",
                  color: i <= step ? "white" : "var(--text-secondary)",
                }}
              >
                {i < step ? <CheckCircle className="w-4 h-4" /> : i + 1}
              </div>
              {i < 3 && (
                <div
                  className="flex-1 h-0.5 rounded"
                  style={{
                    backgroundColor: i < step ? "var(--accent-blue)" : "var(--glass-overlay-secondary)",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[300px]">
          {step === 0 && (
            <StepType selectedType={type} onSelect={setType} />
          )}
          {step === 1 && (
            <StepTimeframe selectedTimeframe={timeframe} onSelect={setTimeframe} />
          )}
          {step === 2 && (
            <StepDetails
              title={title}
              description={description}
              onTitleChange={setTitle}
              onDescriptionChange={setDescription}
            />
          )}
          {step === 3 && (
            <StepPriority
              selectedPriority={priority}
              onSelect={setPriority}
              summary={{ type, timeframe, title, priority }}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          {step > 0 ? (
            <Button variant="glass" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          ) : (
            <div />
          )}
          <Button onClick={handleNext} disabled={!canProceed || isSaving}>
            {isSaving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : step === 3 ? (
              "Create Goal"
            ) : (
              "Next"
            )}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Step Components
function StepType({
  selectedType,
  onSelect,
}: {
  selectedType: GoalType;
  onSelect: (type: GoalType) => void;
}) {
  return (
    <div>
      <h3
        className="text-lg font-semibold mb-2 text-center"
        style={{ color: "var(--text-primary)" }}
      >
        What type of goal?
      </h3>
      <p
        className="text-sm text-center mb-6"
        style={{ color: "var(--text-secondary)" }}
      >
        Choose the area you want to focus on
      </p>
      <div className="grid grid-cols-2 gap-3">
        {(Object.keys(GOAL_TYPES) as GoalType[]).map((type) => {
          const config = GOAL_TYPES[type];
          const Icon = IconMap[config.icon];
          const isSelected = selectedType === type;
          return (
            <button
              key={type}
              onClick={() => onSelect(type)}
              className="p-4 rounded-xl text-center transition-all"
              style={{
                backgroundColor: isSelected
                  ? "var(--accent-blue)15"
                  : "var(--glass-overlay-primary)",
                border: `2px solid ${isSelected ? "var(--accent-blue)" : "var(--glass-border)"}`,
              }}
            >
              {Icon && (
                <Icon
                  className="w-7 h-7 mx-auto mb-2"
                  style={{ color: isSelected ? "var(--accent-blue)" : "var(--text-secondary)" }}
                />
              )}
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {config.displayName}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepTimeframe({
  selectedTimeframe,
  onSelect,
}: {
  selectedTimeframe: GoalTimeframe;
  onSelect: (timeframe: GoalTimeframe) => void;
}) {
  return (
    <div>
      <h3
        className="text-lg font-semibold mb-2 text-center"
        style={{ color: "var(--text-primary)" }}
      >
        Set your timeframe
      </h3>
      <p
        className="text-sm text-center mb-6"
        style={{ color: "var(--text-secondary)" }}
      >
        When do you want to achieve this?
      </p>
      <div className="space-y-2">
        {(Object.keys(GOAL_TIMEFRAMES) as GoalTimeframe[]).map((tf) => {
          const config = GOAL_TIMEFRAMES[tf];
          const Icon = IconMap[config.icon];
          const isSelected = selectedTimeframe === tf;
          return (
            <button
              key={tf}
              onClick={() => onSelect(tf)}
              className="w-full flex items-center gap-3 p-3 rounded-xl transition-all"
              style={{
                backgroundColor: isSelected
                  ? "var(--accent-blue)10"
                  : "var(--glass-overlay-primary)",
                border: `2px solid ${isSelected ? "var(--accent-blue)" : "var(--glass-border)"}`,
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: isSelected
                    ? "var(--accent-blue)15"
                    : "var(--glass-overlay-secondary)",
                }}
              >
                {Icon && (
                  <Icon
                    className="w-5 h-5"
                    style={{ color: isSelected ? "var(--accent-blue)" : "var(--text-secondary)" }}
                  />
                )}
              </div>
              <span
                className="font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {config.displayName}
              </span>
              {isSelected && (
                <CheckCircle
                  className="w-5 h-5 ml-auto"
                  style={{ color: "var(--accent-blue)" }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepDetails({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
}: {
  title: string;
  description: string;
  onTitleChange: (val: string) => void;
  onDescriptionChange: (val: string) => void;
}) {
  return (
    <div>
      <h3
        className="text-lg font-semibold mb-2 text-center"
        style={{ color: "var(--text-primary)" }}
      >
        Describe your goal
      </h3>
      <p
        className="text-sm text-center mb-6"
        style={{ color: "var(--text-secondary)" }}
      >
        Be specific about what you want to achieve
      </p>

      <div className="space-y-4">
        <div>
          <label
            className="block text-sm font-semibold mb-2"
            style={{ color: "var(--text-secondary)" }}
          >
            Goal Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="e.g., Improve my sprint technique"
            className="w-full p-4 rounded-xl outline-none"
            style={{
              backgroundColor: "var(--glass-overlay-primary)",
              border: "1px solid var(--glass-border)",
              color: "var(--text-primary)",
            }}
          />
        </div>

        <div>
          <label
            className="block text-sm font-semibold mb-2"
            style={{ color: "var(--text-secondary)" }}
          >
            Description <span className="font-normal opacity-70">(optional)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Add more details about your goal..."
            rows={4}
            className="w-full p-4 rounded-xl outline-none resize-none"
            style={{
              backgroundColor: "var(--glass-overlay-primary)",
              border: "1px solid var(--glass-border)",
              color: "var(--text-primary)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function StepPriority({
  selectedPriority,
  onSelect,
  summary,
}: {
  selectedPriority: GoalPriority;
  onSelect: (priority: GoalPriority) => void;
  summary: { type: GoalType; timeframe: GoalTimeframe; title: string; priority: GoalPriority };
}) {
  return (
    <div>
      <h3
        className="text-lg font-semibold mb-2 text-center"
        style={{ color: "var(--text-primary)" }}
      >
        Set priority
      </h3>
      <p
        className="text-sm text-center mb-6"
        style={{ color: "var(--text-secondary)" }}
      >
        How important is this goal?
      </p>

      <div className="space-y-2 mb-6">
        {(Object.keys(GOAL_PRIORITIES) as GoalPriority[]).map((p) => {
          const config = GOAL_PRIORITIES[p];
          const Icon = IconMap[config.icon];
          const isSelected = selectedPriority === p;
          const color = getPriorityColor(p);
          return (
            <button
              key={p}
              onClick={() => onSelect(p)}
              className="w-full flex items-center gap-3 p-3 rounded-xl transition-all"
              style={{
                backgroundColor: isSelected ? `${color}10` : "var(--glass-overlay-primary)",
                border: `2px solid ${isSelected ? color : "var(--glass-border)"}`,
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${color}15` }}
              >
                {Icon && <Icon className="w-5 h-5" style={{ color }} />}
              </div>
              <span
                className="font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {config.displayName} Priority
              </span>
              {isSelected && (
                <CheckCircle className="w-5 h-5 ml-auto" style={{ color }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Summary */}
      <div
        className="p-4 rounded-xl"
        style={{
          backgroundColor: "var(--glass-overlay-primary)",
          border: "1px solid var(--glass-border)",
        }}
      >
        <h4
          className="text-sm font-semibold mb-3"
          style={{ color: "var(--text-secondary)" }}
        >
          Goal Summary
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span style={{ color: "var(--text-secondary)" }}>Type</span>
            <span style={{ color: "var(--text-primary)" }}>
              {GOAL_TYPES[summary.type].displayName}
            </span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "var(--text-secondary)" }}>Timeframe</span>
            <span style={{ color: "var(--text-primary)" }}>
              {GOAL_TIMEFRAMES[summary.timeframe].displayName}
            </span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "var(--text-secondary)" }}>Title</span>
            <span
              style={{ color: "var(--text-primary)" }}
              className="truncate max-w-[200px]"
            >
              {summary.title || "Not set"}
            </span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: "var(--text-secondary)" }}>Priority</span>
            <span style={{ color: "var(--text-primary)" }}>
              {GOAL_PRIORITIES[summary.priority].displayName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Goal Detail Modal
function GoalDetailModal({
  goal,
  onClose,
  onUpdateProgress,
  onComplete,
  onDelete,
}: {
  goal: Goal;
  onClose: () => void;
  onUpdateProgress: (progress: number) => Promise<void>;
  onComplete: () => Promise<void>;
  onDelete: () => Promise<void>;
}) {
  const [progress, setProgress] = useState(goal.progress);
  const [isUpdating, setIsUpdating] = useState(false);

  const typeConfig = GOAL_TYPES[goal.type];
  const TypeIcon = IconMap[typeConfig.icon];
  const accentColor = getGoalTypeColor(goal.type);

  const handleUpdateProgress = async () => {
    setIsUpdating(true);
    try {
      await onUpdateProgress(progress);
    } finally {
      setIsUpdating(false);
    }
  };

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
        className="w-full max-w-md rounded-3xl p-6"
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
              {TypeIcon && (
                <TypeIcon className="w-6 h-6" style={{ color: accentColor }} />
              )}
            </div>
            <div>
              <h2
                className="text-lg font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {goal.title}
              </h2>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                {typeConfig.displayName}
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

        {goal.description && (
          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
            {goal.description}
          </p>
        )}

        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--text-secondary)" }}
            >
              Progress
            </span>
            <span
              className="text-lg font-bold"
              style={{ color: accentColor }}
            >
              {progress}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              backgroundColor: "var(--glass-overlay-secondary)",
              accentColor: accentColor,
            }}
          />
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {progress !== goal.progress && (
            <Button
              className="w-full"
              onClick={handleUpdateProgress}
              disabled={isUpdating}
            >
              {isUpdating ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Update Progress"
              )}
            </Button>
          )}

          {goal.status !== "completed" && (
            <Button
              variant="glass"
              className="w-full"
              onClick={onComplete}
              icon={CheckCircle}
            >
              Mark Complete
            </Button>
          )}

          <Button
            variant="ghost"
            className="w-full"
            onClick={onDelete}
            style={{ color: "var(--accent-red)" }}
          >
            Delete Goal
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
