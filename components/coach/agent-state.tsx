"use client";

import { motion } from "framer-motion";
import { Mic, Brain, Volume2, Pause } from "lucide-react";

export type AgentState = "idle" | "listening" | "thinking" | "speaking";

interface AgentStateIndicatorProps {
  state: AgentState;
}

const stateConfig = {
  idle: {
    icon: Pause,
    label: "Ready",
    color: "var(--text-secondary)",
    pulse: false,
  },
  listening: {
    icon: Mic,
    label: "Listening...",
    color: "var(--accent-green)",
    pulse: true,
  },
  thinking: {
    icon: Brain,
    label: "Thinking...",
    color: "var(--accent-cyan)",
    pulse: true,
  },
  speaking: {
    icon: Volume2,
    label: "Speaking...",
    color: "var(--accent-blue)",
    pulse: true,
  },
};

export function AgentStateIndicator({ state }: AgentStateIndicatorProps) {
  const config = stateConfig[state];
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-3">
      <motion.div
        className="relative"
        animate={config.pulse ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {config.pulse && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: config.color }}
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${config.color}20` }}
        >
          <Icon className="w-5 h-5" style={{ color: config.color }} />
        </div>
      </motion.div>
      <span
        className="text-sm font-medium"
        style={{ color: config.color }}
      >
        {config.label}
      </span>
    </div>
  );
}
