"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/components/auth/auth-context";
import {
  ChevronRight,
  ChevronLeft,
  Target,
  User,
  Calendar,
  Dumbbell,
  Award,
  Loader2,
} from "lucide-react";
import {
  TRAINING_GOALS,
  EXPERIENCE_LEVELS,
  AGE_RANGES,
  POPULAR_SPORTS,
  ALL_SPORTS,
  type TrainingGoal,
  type ExperienceLevel,
  type AgeRange,
  type SportOption,
} from "@/types/user";
import { Search, X } from "lucide-react";

const STEPS = [
  { id: "goals", title: "Your Goals", icon: Target },
  { id: "name", title: "Your Name", icon: User },
  { id: "age", title: "Age Range", icon: Calendar },
  { id: "sport", title: "Your Sport", icon: Dumbbell },
  { id: "experience", title: "Experience", icon: Award },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { updateUserProfile, user } = useAuthContext();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [selectedGoals, setSelectedGoals] = useState<TrainingGoal[]>([]);
  const [displayName, setDisplayName] = useState("");
  const [ageRange, setAgeRange] = useState<AgeRange | "">("");
  const [sport, setSport] = useState("");
  const [sportDiscipline, setSportDiscipline] = useState("");
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel | "">("");

  // Sport search state
  const [sportSearch, setSportSearch] = useState("");

  // Filter sports based on search
  const filteredSports = sportSearch.trim() === ""
    ? POPULAR_SPORTS
    : ALL_SPORTS.filter((s) => {
        const searchLower = sportSearch.toLowerCase();
        // Match sport name
        if (s.label.toLowerCase().includes(searchLower)) return true;
        // Match disciplines
        if (s.disciplines.some(d => d.toLowerCase().includes(searchLower))) return true;
        // Match keywords (event names like "100m", "marathon")
        if (s.keywords?.some(k => k.toLowerCase().includes(searchLower))) return true;
        return false;
      });

  const currentStepData = STEPS[currentStep];
  const isLastStep = currentStep === STEPS.length - 1;

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return selectedGoals.length > 0;
      case 1:
        return displayName.trim().length >= 2;
      case 2:
        return ageRange !== "";
      case 3:
        return sport !== "";
      case 4:
        return experienceLevel !== "";
      default:
        return false;
    }
  };

  const handleNext = async () => {
    if (isLastStep) {
      // Save profile and complete onboarding
      setIsLoading(true);
      try {
        await updateUserProfile({
          displayName,
          trainingGoals: selectedGoals,
          ageRange: ageRange as AgeRange,
          sport,
          sportDiscipline: sportDiscipline || undefined,
          experienceLevel: experienceLevel as ExperienceLevel,
          onboardingCompleted: true,
        });
        router.push("/dashboard");
      } catch (error) {
        console.error("Failed to save profile:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const toggleGoal = (goal: TrainingGoal) => {
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const selectedSport = ALL_SPORTS.find((s) => s.value === sport);

  return (
    <div className="w-full">
      {/* Progress indicator */}
      <div className="flex justify-center gap-2 mb-6">
        {STEPS.map((step, index) => (
          <div
            key={step.id}
            className={`h-2 rounded-full transition-all duration-300 ${
              index <= currentStep ? "w-8 bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-cyan)]" : "w-2 bg-[var(--glass-border-primary)]"
            }`}
          />
        ))}
      </div>

      <GlassCard>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* Step header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-cyan)] flex items-center justify-center">
                <currentStepData.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                  Step {currentStep + 1} of {STEPS.length}
                </p>
                <h2
                  className="text-xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {currentStepData.title}
                </h2>
              </div>
            </div>

            {/* Step content */}
            {currentStep === 0 && (
              <div>
                <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
                  What do you want to improve? Select all that apply.
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {TRAINING_GOALS.map((goal) => (
                    <button
                      key={goal.value}
                      onClick={() => toggleGoal(goal.value)}
                      className={`p-3 rounded-xl text-left transition-all ${
                        selectedGoals.includes(goal.value)
                          ? "bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-cyan)] text-white"
                          : "glass-card-compact"
                      }`}
                      style={
                        !selectedGoals.includes(goal.value)
                          ? { color: "var(--text-primary)" }
                          : undefined
                      }
                    >
                      {goal.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div>
                <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
                  What should we call you?
                </p>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full p-4 rounded-xl glass-card-compact border-0 focus:ring-2 focus:ring-[var(--accent-blue)]"
                  style={{
                    color: "var(--text-primary)",
                    backgroundColor: "var(--glass-overlay-secondary)",
                  }}
                  autoFocus
                />
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
                  Select your age range.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {AGE_RANGES.map((age) => (
                    <button
                      key={age.value}
                      onClick={() => setAgeRange(age.value)}
                      className={`p-3 rounded-xl text-center transition-all ${
                        ageRange === age.value
                          ? "bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-cyan)] text-white"
                          : "glass-card-compact"
                      }`}
                      style={
                        ageRange !== age.value
                          ? { color: "var(--text-primary)" }
                          : undefined
                      }
                    >
                      {age.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
                  What sport do you compete in?
                </p>

                {/* Search input */}
                <div className="relative mb-4">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                    style={{ color: "var(--text-secondary)" }}
                  />
                  <input
                    type="text"
                    value={sportSearch}
                    onChange={(e) => setSportSearch(e.target.value)}
                    placeholder="Search sports or events (e.g., 100m, marathon)"
                    className="w-full pl-10 pr-10 py-3 rounded-xl border-0 focus:ring-2 focus:ring-[var(--accent-blue)]"
                    style={{
                      color: "var(--text-primary)",
                      backgroundColor: "var(--glass-overlay-secondary)",
                    }}
                  />
                  {sportSearch && (
                    <button
                      onClick={() => setSportSearch("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-[var(--glass-overlay-secondary)]"
                    >
                      <X className="w-4 h-4" style={{ color: "var(--text-secondary)" }} />
                    </button>
                  )}
                </div>

                {/* Section label */}
                <p
                  className="text-xs font-medium mb-3"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {sportSearch ? "Search Results" : "Popular Sports"}
                </p>

                {/* Sports grid */}
                <div className="grid grid-cols-2 gap-3 max-h-[280px] overflow-y-auto pr-1">
                  {filteredSports.length === 0 ? (
                    <div className="col-span-2 py-8 text-center">
                      <p style={{ color: "var(--text-secondary)" }}>
                        No sports found. Try a different search.
                      </p>
                    </div>
                  ) : (
                    filteredSports.map((s) => (
                      <button
                        key={s.value}
                        onClick={() => {
                          setSport(s.value);
                          setSportDiscipline("");
                          setSportSearch("");
                        }}
                        className={`p-4 rounded-xl flex flex-col items-center gap-2 transition-all border-2 ${
                          sport === s.value
                            ? "border-[var(--accent-blue)] bg-[var(--accent-blue)]/10"
                            : "border-transparent glass-card-compact hover:border-[var(--glass-border-primary)]"
                        }`}
                      >
                        <span className="text-2xl">{s.emoji}</span>
                        <span
                          className="text-sm font-medium text-center"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {s.label}
                        </span>
                      </button>
                    ))
                  )}
                </div>

                {/* Discipline selection */}
                {selectedSport && selectedSport.disciplines.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-[var(--glass-border-primary)]">
                    <p
                      className="text-sm mb-3"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Select your discipline (optional)
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSport.disciplines.map((d) => (
                        <button
                          key={d}
                          onClick={() =>
                            setSportDiscipline(sportDiscipline === d ? "" : d)
                          }
                          className={`px-3 py-2 rounded-lg text-sm transition-all ${
                            sportDiscipline === d
                              ? "bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-cyan)] text-white"
                              : "glass-card-compact"
                          }`}
                          style={
                            sportDiscipline !== d
                              ? { color: "var(--text-primary)" }
                              : undefined
                          }
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
                  What&apos;s your experience level?
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {EXPERIENCE_LEVELS.map((level) => (
                    <button
                      key={level.value}
                      onClick={() => setExperienceLevel(level.value)}
                      className={`p-4 rounded-xl text-left transition-all ${
                        experienceLevel === level.value
                          ? "bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-cyan)] text-white"
                          : "glass-card-compact"
                      }`}
                      style={
                        experienceLevel !== level.value
                          ? { color: "var(--text-primary)" }
                          : undefined
                      }
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
            className={currentStep === 0 ? "opacity-0" : ""}
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back
          </Button>

          <Button onClick={handleNext} disabled={!canProceed() || isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Saving...
              </>
            ) : isLastStep ? (
              "Get Started"
            ) : (
              <>
                Continue
                <ChevronRight className="w-5 h-5 ml-1" />
              </>
            )}
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}
