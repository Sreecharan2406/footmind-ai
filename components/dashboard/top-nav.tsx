"use client";

import { Search, Bell, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export function TopNav() {
  const [coachName, setCoachName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("coachName");
    if (name) setCoachName(name);
  }, []);

  // 🔥 Get initials (JD → SR etc)
  const initials = coachName
    ? coachName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "C";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-glass-border bg-background/80 px-6 backdrop-blur-xl">
      {/* Search */}
      <div className="relative max-w-md flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search players, matches, or insights…"
          className="h-10 w-full rounded-lg border border-glass-border bg-secondary/50 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-neon-blue/50 focus:outline-none focus:ring-1 focus:ring-neon-blue/30 transition-all"
        />
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-neon-blue shadow-lg shadow-neon-blue/50" />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-3 rounded-lg py-1.5 pl-1.5 pr-3 transition-colors hover:bg-secondary">
          <div className="h-8 w-8 overflow-hidden rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple">
            <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-white">
              {initials}
            </div>
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-medium text-foreground">
              {coachName || "Coach"}
            </p>
            <p className="text-xs text-muted-foreground">Head Coach</p>
          </div>

          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}