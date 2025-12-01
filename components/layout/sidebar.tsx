"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useAuthContext } from "@/components/auth/auth-context";
import {
  Brain,
  LayoutDashboard,
  Mic,
  BookOpen,
  Target,
  History,
  User,
  LogOut,
  Sun,
  Moon,
  ChevronLeft,
} from "lucide-react";
import { useState, useEffect } from "react";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const mainNavItems: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/coach", label: "Voice Coach", icon: Mic },
  { href: "/dashboard/training", label: "Training Library", icon: BookOpen },
  { href: "/dashboard/goals", label: "Goals", icon: Target },
  { href: "/dashboard/history", label: "History", icon: History },
];

export function Sidebar() {
  const pathname = usePathname();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { user, profile, signOut } = useAuthContext();
  const [mounted, setMounted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayName = profile?.displayName || user?.displayName || "Athlete";

  // Use resolvedTheme for the icon display (handles system theme)
  const currentTheme = mounted ? resolvedTheme : "light";

  return (
    <>
      {/* Desktop Sidebar - No animation to prevent layout shift */}
      <aside
        className={`hidden md:flex flex-col h-screen fixed left-0 top-0 z-40 transition-all duration-300 ${
          isCollapsed ? "w-[72px]" : "w-[240px]"
        }`}
        style={{
          backgroundColor: "var(--sidebar-bg)",
          borderRight: "1px solid var(--glass-border)",
        }}
      >
        {/* Logo */}
        <div className="p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-cyan)] flex items-center justify-center flex-shrink-0">
            <Brain className="w-6 h-6 text-white" />
          </div>
          {!isCollapsed && (
            <div className="overflow-hidden">
              <h1
                className="text-lg font-bold whitespace-nowrap"
                style={{ color: "var(--text-primary)" }}
              >
                Athlete Mindset
              </h1>
              <p
                className="text-xs whitespace-nowrap"
                style={{ color: "var(--text-secondary)" }}
              >
                Mental Performance
              </p>
            </div>
          )}
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-7 w-6 h-6 rounded-full flex items-center justify-center z-50"
          style={{
            backgroundColor: "var(--card-bg)",
            border: "1px solid var(--glass-border)",
          }}
        >
          <ChevronLeft
            className={`w-4 h-4 transition-transform ${isCollapsed ? "rotate-180" : ""}`}
            style={{ color: "var(--text-secondary)" }}
          />
        </button>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4">
          <div
            className="text-xs font-semibold uppercase tracking-wider mb-3 px-3"
            style={{ color: "var(--text-secondary)" }}
          >
            {!isCollapsed && "Main Menu"}
          </div>
          <ul className="space-y-1">
            {mainNavItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                      isActive
                        ? "text-white"
                        : "hover:bg-[var(--glass-overlay-secondary)]"
                    }`}
                    style={{
                      backgroundColor: isActive
                        ? "var(--accent-blue)"
                        : "transparent",
                      color: isActive ? "white" : "var(--text-primary)",
                    }}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="text-sm font-medium">{item.label}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="p-3 space-y-2">
          {/* Theme Toggle - Always render to prevent layout shift */}
          <button
            onClick={() => mounted && setTheme(currentTheme === "dark" ? "light" : "dark")}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all hover:bg-[var(--glass-overlay-secondary)]"
            title={isCollapsed ? "Toggle theme" : undefined}
            disabled={!mounted}
          >
            {currentTheme === "dark" ? (
              <Sun className="w-5 h-5" style={{ color: "var(--text-secondary)" }} />
            ) : (
              <Moon className="w-5 h-5" style={{ color: "var(--text-secondary)" }} />
            )}
            {!isCollapsed && (
              <span
                className="text-sm font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                {currentTheme === "dark" ? "Light Mode" : "Dark Mode"}
              </span>
            )}
          </button>

          {/* Profile */}
          <Link
            href="/dashboard/profile"
            className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all ${
              pathname === "/dashboard/profile"
                ? "bg-[var(--accent-blue)]"
                : "hover:bg-[var(--glass-overlay-secondary)]"
            }`}
            title={isCollapsed ? displayName : undefined}
          >
            <div
              className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-cyan)] flex items-center justify-center flex-shrink-0"
            >
              <User className="w-4 h-4 text-white" />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-medium truncate"
                  style={{
                    color:
                      pathname === "/dashboard/profile"
                        ? "white"
                        : "var(--text-primary)",
                  }}
                >
                  {displayName}
                </p>
              </div>
            )}
          </Link>

          {/* Sign Out */}
          <button
            onClick={() => signOut()}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all hover:bg-[var(--glass-overlay-secondary)]"
            title={isCollapsed ? "Sign out" : undefined}
          >
            <LogOut className="w-5 h-5" style={{ color: "var(--accent-red)" }} />
            {!isCollapsed && (
              <span
                className="text-sm font-medium"
                style={{ color: "var(--accent-red)" }}
              >
                Sign Out
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-2 pb-2"
        style={{
          backgroundColor: "var(--sidebar-bg)",
          borderTop: "1px solid var(--glass-border)",
        }}
      >
        <div className="flex items-center justify-around py-2">
          {mainNavItems.slice(0, 5).map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                  isActive ? "" : "opacity-60"
                }`}
                style={{
                  color: isActive ? "var(--accent-blue)" : "var(--text-secondary)",
                }}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label.split(" ")[0]}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
