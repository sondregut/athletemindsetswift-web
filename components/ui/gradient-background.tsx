"use client";

export function GradientBackground() {
  return (
    <div
      className="fixed inset-0 -z-10"
      style={{
        background: `linear-gradient(135deg,
          var(--background-top) 0%,
          var(--background-middle) 50%,
          var(--background-bottom) 100%)`,
      }}
    />
  );
}
