"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AudioVisualizerProps {
  isActive: boolean;
  barCount?: number;
}

export function AudioVisualizer({
  isActive,
  barCount = 7,
}: AudioVisualizerProps) {
  const [heights, setHeights] = useState<number[]>(
    Array(barCount).fill(0.3)
  );

  useEffect(() => {
    if (!isActive) {
      setHeights(Array(barCount).fill(0.3));
      return;
    }

    const interval = setInterval(() => {
      setHeights(
        Array(barCount)
          .fill(0)
          .map(() => 0.3 + Math.random() * 0.7)
      );
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, barCount]);

  return (
    <div className="flex items-center justify-center gap-1 h-16">
      {heights.map((height, index) => (
        <motion.div
          key={index}
          className="w-2 rounded-full bg-gradient-to-t from-[var(--accent-blue)] to-[var(--accent-cyan)]"
          animate={{
            height: `${height * 100}%`,
            opacity: isActive ? 1 : 0.5,
          }}
          transition={{
            duration: 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
