"use client";

import { cn } from "@/lib/utils/cn";
import { motion, HTMLMotionProps } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "gradient" | "glass" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
}

export function Button({
  variant = "gradient",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  className,
  children,
  ...props
}: ButtonProps) {
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantStyles = {
    gradient: "btn-gradient",
    glass: "glass-card-compact hover:opacity-90",
    ghost:
      "bg-transparent hover:bg-[var(--glass-overlay-secondary)] rounded-full",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-all",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {Icon && iconPosition === "left" && <Icon size={size === "sm" ? 16 : size === "lg" ? 24 : 20} />}
      {children}
      {Icon && iconPosition === "right" && <Icon size={size === "sm" ? 16 : size === "lg" ? 24 : 20} />}
    </motion.button>
  );
}
