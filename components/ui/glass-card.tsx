"use client";

import { cn } from "@/lib/utils/cn";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "compact";
  children: React.ReactNode;
}

export function GlassCard({
  variant = "default",
  className,
  children,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        variant === "default" ? "glass-card p-5" : "glass-card-compact p-4",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface StaticGlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "compact";
  children: React.ReactNode;
}

export function StaticGlassCard({
  variant = "default",
  className,
  children,
  ...props
}: StaticGlassCardProps) {
  return (
    <div
      className={cn(
        variant === "default" ? "glass-card p-5" : "glass-card-compact p-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
