import { Brain } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <Link href="/" className="mb-8 flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-cyan)] flex items-center justify-center">
          <Brain className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Athlete Mindset
          </h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Mental Performance Training
          </p>
        </div>
      </Link>

      {/* Auth content */}
      <div className="w-full max-w-md">{children}</div>

      {/* Footer */}
      <p
        className="mt-8 text-sm text-center"
        style={{ color: "var(--text-secondary)" }}
      >
        Train your mind. Elevate your game.
      </p>
    </div>
  );
}
