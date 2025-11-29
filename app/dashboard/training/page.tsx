"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/components/auth/auth-context";
import { useTrainingLibrary } from "@/lib/hooks/useTrainingLibrary";
import { generateSession } from "@/lib/services/tts-service";
import {
  TrainingTemplate,
  PersonalizedSession,
  TrainingCategory,
  TTSVoice,
  TRAINING_CATEGORIES,
  TTS_VOICES,
  getCategoryInfo,
  formatDurationMinutes,
} from "@/types/library";
import { AppShell } from "@/components/layout/app-shell";
import {
  Loader2,
  Play,
  Clock,
  Flag,
  Brain,
  Sparkles,
  Flame,
  Heart,
  Wind,
  Leaf,
  X,
  ChevronRight,
  Volume2,
  Music,
  CheckCircle,
  Library,
  History,
} from "lucide-react";

// Icon mapping for categories
const CategoryIconMap: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  Flag,
  Brain,
  Sparkles,
  Flame,
  Heart,
  Wind,
  Leaf,
};

type ViewMode = "library" | "sessions";

export default function TrainingLibraryPage() {
  const router = useRouter();
  const { user, profile, isAuthenticated, loading: authLoading, getIdToken } = useAuthContext();
  const {
    templates,
    userSessions,
    isLoading,
    getTemplatesByCategory,
    saveSession,
  } = useTrainingLibrary();

  const [viewMode, setViewMode] = useState<ViewMode>("library");
  const [selectedCategory, setSelectedCategory] = useState<TrainingCategory | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TrainingTemplate | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState<string | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<TTSVoice>("Kore");

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  const filteredTemplates = getTemplatesByCategory(selectedCategory);
  const userSport = profile?.sport || "your sport";

  // Handle template selection
  const handleTemplateSelect = (template: TrainingTemplate) => {
    setSelectedTemplate(template);
  };

  // Handle session generation
  const handleGenerateSession = async () => {
    if (!selectedTemplate || !user || !getIdToken) return;

    setIsGenerating(true);
    setGenerationProgress("Personalizing script...");

    try {
      const session = await generateSession(
        selectedTemplate,
        user.uid,
        userSport,
        selectedVoice,
        getIdToken,
        (progress) => {
          const stages: Record<string, string> = {
            fetching: "Fetching template...",
            personalizing: "Personalizing script...",
            generating: "Generating audio...",
            uploading: "Saving session...",
            complete: "Complete!",
          };
          setGenerationProgress(stages[progress.stage] || "Processing...");
        }
      );

      // Save session to Firestore
      await saveSession(session);

      // Close modal and switch to sessions view
      setSelectedTemplate(null);
      setViewMode("sessions");
      setGenerationProgress(null);
    } catch (error) {
      console.error("Generation failed:", error);
      setGenerationProgress("Generation failed. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

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
            className="flex items-center justify-between mb-6"
          >
            <h1
              className="text-2xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Training Library
            </h1>
          </motion.header>

          {/* View Mode Toggle */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setViewMode("library")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                viewMode === "library" ? "text-white" : "text-[var(--text-secondary)]"
              }`}
              style={{
                backgroundColor:
                  viewMode === "library"
                    ? "var(--accent-blue)"
                    : "var(--glass-overlay-secondary)",
              }}
            >
              <Library className="w-4 h-4" />
              Templates
            </button>
            <button
              onClick={() => setViewMode("sessions")}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                viewMode === "sessions" ? "text-white" : "text-[var(--text-secondary)]"
              }`}
              style={{
                backgroundColor:
                  viewMode === "sessions"
                    ? "var(--accent-blue)"
                    : "var(--glass-overlay-secondary)",
              }}
            >
              <History className="w-4 h-4" />
              My Sessions ({userSessions.length})
            </button>
          </div>

          {viewMode === "library" ? (
            <>
              {/* Category Filter */}
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === null
                      ? "text-white"
                      : "text-[var(--text-secondary)]"
                  }`}
                  style={{
                    backgroundColor:
                      selectedCategory === null
                        ? "var(--accent-purple)"
                        : "var(--glass-overlay-secondary)",
                  }}
                >
                  All
                </button>
                {TRAINING_CATEGORIES.map((cat) => {
                  const Icon = CategoryIconMap[cat.icon];
                  const isSelected = selectedCategory === cat.value;
                  return (
                    <button
                      key={cat.value}
                      onClick={() => setSelectedCategory(cat.value)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all`}
                      style={{
                        backgroundColor: isSelected ? cat.color : "var(--glass-overlay-secondary)",
                        color: isSelected ? "white" : "var(--text-secondary)",
                      }}
                    >
                      {Icon && <Icon className="w-4 h-4" />}
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Templates Grid */}
              {filteredTemplates.length === 0 ? (
                <GlassCard className="text-center py-16">
                  <Brain
                    className="w-16 h-16 mx-auto mb-4"
                    style={{ color: "var(--text-secondary)" }}
                  />
                  <h2
                    className="text-xl font-bold mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    No Templates Found
                  </h2>
                  <p style={{ color: "var(--text-secondary)" }}>
                    Check back soon for new training content.
                  </p>
                </GlassCard>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredTemplates.map((template) => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      onClick={() => handleTemplateSelect(template)}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            /* My Sessions View */
            <>
              {userSessions.length === 0 ? (
                <GlassCard className="text-center py-16">
                  <Music
                    className="w-16 h-16 mx-auto mb-4"
                    style={{ color: "var(--text-secondary)" }}
                  />
                  <h2
                    className="text-xl font-bold mb-2"
                    style={{ color: "var(--text-primary)" }}
                  >
                    No Sessions Yet
                  </h2>
                  <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
                    Generate your first personalized training session.
                  </p>
                  <Button onClick={() => setViewMode("library")}>
                    Browse Templates
                  </Button>
                </GlassCard>
              ) : (
                <div className="space-y-3">
                  {userSessions.map((session) => (
                    <SessionCard
                      key={session.id}
                      session={session}
                      onClick={() => {
                        // Navigate to player
                        router.push(`/dashboard/training/player?sessionId=${session.id}`);
                      }}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Template Detail / Generation Modal */}
          <AnimatePresence>
            {selectedTemplate && (
              <GenerateModal
                template={selectedTemplate}
                sport={userSport}
                selectedVoice={selectedVoice}
                onVoiceChange={setSelectedVoice}
                isGenerating={isGenerating}
                progress={generationProgress}
                onGenerate={handleGenerateSession}
                onClose={() => {
                  if (!isGenerating) {
                    setSelectedTemplate(null);
                    setGenerationProgress(null);
                  }
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </AppShell>
  );
}

// Template Card Component
function TemplateCard({
  template,
  onClick,
}: {
  template: TrainingTemplate;
  onClick: () => void;
}) {
  const categoryInfo = getCategoryInfo(template.category);
  const Icon = CategoryIconMap[categoryInfo.icon];

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full text-left"
    >
      <div
        className="p-4 rounded-2xl h-full"
        style={{
          backgroundColor: "var(--glass-overlay-primary)",
          border: "1px solid var(--glass-border)",
        }}
      >
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${categoryInfo.color}20` }}
          >
            {Icon && (
              <Icon className="w-5 h-5" style={{ color: categoryInfo.color }} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3
              className="font-semibold truncate"
              style={{ color: "var(--text-primary)" }}
            >
              {template.title}
            </h3>
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: `${categoryInfo.color}15`,
                color: categoryInfo.color,
              }}
            >
              {categoryInfo.label}
            </span>
          </div>
        </div>

        {/* Description */}
        <p
          className="text-sm mb-3 line-clamp-2"
          style={{ color: "var(--text-secondary)" }}
        >
          {template.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className="flex items-center gap-1 text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              <Clock className="w-3.5 h-3.5" />
              {formatDurationMinutes(template.duration_minutes)}
            </span>
            <span
              className="text-xs px-2 py-0.5 rounded-full capitalize"
              style={{
                backgroundColor: "var(--glass-overlay-secondary)",
                color: "var(--text-secondary)",
              }}
            >
              {template.difficulty}
            </span>
          </div>
          <ChevronRight
            className="w-4 h-4"
            style={{ color: "var(--text-secondary)" }}
          />
        </div>
      </div>
    </motion.button>
  );
}

// Session Card Component
function SessionCard({
  session,
  onClick,
}: {
  session: PersonalizedSession;
  onClick: () => void;
}) {
  const categoryInfo = getCategoryInfo(session.category);
  const Icon = CategoryIconMap[categoryInfo.icon];
  const durationMinutes = Math.ceil(session.total_duration_seconds / 60);

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
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: `${categoryInfo.color}20` }}
        >
          {Icon && (
            <Icon className="w-6 h-6" style={{ color: categoryInfo.color }} />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3
            className="font-semibold truncate"
            style={{ color: "var(--text-primary)" }}
          >
            {session.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span
              className="text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              {session.sport}
            </span>
            <span style={{ color: "var(--text-secondary)" }}>·</span>
            <span
              className="flex items-center gap-1 text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              <Clock className="w-3 h-3" />
              {durationMinutes} min
            </span>
            <span style={{ color: "var(--text-secondary)" }}>·</span>
            <span
              className="flex items-center gap-1 text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              <Volume2 className="w-3 h-3" />
              {session.voice_id}
            </span>
          </div>
        </div>

        {/* Play Button */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "var(--accent-blue)" }}
        >
          <Play className="w-5 h-5 text-white ml-0.5" />
        </div>
      </div>
    </motion.button>
  );
}

// Generate Modal Component
function GenerateModal({
  template,
  sport,
  selectedVoice,
  onVoiceChange,
  isGenerating,
  progress,
  onGenerate,
  onClose,
}: {
  template: TrainingTemplate;
  sport: string;
  selectedVoice: TTSVoice;
  onVoiceChange: (voice: TTSVoice) => void;
  isGenerating: boolean;
  progress: string | null;
  onGenerate: () => void;
  onClose: () => void;
}) {
  const categoryInfo = getCategoryInfo(template.category);
  const Icon = CategoryIconMap[categoryInfo.icon];

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
              style={{ backgroundColor: `${categoryInfo.color}20` }}
            >
              {Icon && (
                <Icon className="w-6 h-6" style={{ color: categoryInfo.color }} />
              )}
            </div>
            <div>
              <h2
                className="text-lg font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {template.title}
              </h2>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                {formatDurationMinutes(template.duration_minutes)} · {template.difficulty}
              </p>
            </div>
          </div>
          {!isGenerating && (
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[var(--glass-overlay-secondary)]"
            >
              <X className="w-5 h-5" style={{ color: "var(--text-secondary)" }} />
            </button>
          )}
        </div>

        {/* Description */}
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          {template.description}
        </p>

        {/* Sport Info */}
        <div
          className="flex items-center gap-3 p-3 rounded-xl mb-6"
          style={{ backgroundColor: "var(--glass-overlay-primary)" }}
        >
          <Brain className="w-5 h-5" style={{ color: "var(--accent-blue)" }} />
          <div>
            <p
              className="text-sm font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Personalized for {sport}
            </p>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              AI will customize the script for your sport
            </p>
          </div>
        </div>

        {/* Voice Selection */}
        <div className="mb-6">
          <h3
            className="text-sm font-semibold mb-3"
            style={{ color: "var(--text-primary)" }}
          >
            Choose Voice
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {TTS_VOICES.map((voice) => {
              const isSelected = selectedVoice === voice.value;
              return (
                <button
                  key={voice.value}
                  onClick={() => !isGenerating && onVoiceChange(voice.value)}
                  disabled={isGenerating}
                  className="flex items-center gap-2 p-3 rounded-xl text-left transition-all"
                  style={{
                    backgroundColor: isSelected
                      ? "var(--accent-blue)15"
                      : "var(--glass-overlay-primary)",
                    border: `2px solid ${
                      isSelected ? "var(--accent-blue)" : "var(--glass-border)"
                    }`,
                    opacity: isGenerating ? 0.5 : 1,
                  }}
                >
                  <Volume2
                    className="w-4 h-4"
                    style={{
                      color: isSelected ? "var(--accent-blue)" : "var(--text-secondary)",
                    }}
                  />
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {voice.label}
                    </p>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      {voice.description}
                    </p>
                  </div>
                  {isSelected && (
                    <CheckCircle
                      className="w-4 h-4 ml-auto"
                      style={{ color: "var(--accent-blue)" }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Generation Progress */}
        {isGenerating && progress && (
          <div
            className="flex items-center gap-3 p-4 rounded-xl mb-6"
            style={{ backgroundColor: "var(--glass-overlay-primary)" }}
          >
            <Loader2
              className="w-5 h-5 animate-spin"
              style={{ color: "var(--accent-blue)" }}
            />
            <p className="text-sm" style={{ color: "var(--text-primary)" }}>
              {progress}
            </p>
          </div>
        )}

        {/* Generate Button */}
        <Button
          className="w-full"
          onClick={onGenerate}
          disabled={isGenerating}
          icon={isGenerating ? undefined : Play}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Generating...
            </>
          ) : (
            "Generate Session"
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
}
