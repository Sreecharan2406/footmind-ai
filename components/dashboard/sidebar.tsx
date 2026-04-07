"use client";

import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Users,
  Settings,
  HelpCircle,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: BarChart3, label: "Analysis", active: false },
  { icon: FileText, label: "Reports", active: false },
  { icon: Users, label: "Team", active: false },
];

const bottomItems = [
  { icon: Settings, label: "Settings" },
  { icon: HelpCircle, label: "Help" },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-glass-border bg-sidebar backdrop-blur-xl">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-glass-border px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple shadow-lg shadow-neon-blue/30">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5 text-white"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2C12 2 14.5 5 14.5 12C14.5 19 12 22 12 22" />
            <path d="M12 2C12 2 9.5 5 9.5 12C9.5 19 12 22 12 22" />
            <path d="M2 12H22" />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-foreground">FootMind</span>
          <span className="text-xs font-medium text-neon-blue">AI</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={cn(
              "group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
              item.active
                ? "bg-gradient-to-r from-neon-blue/20 to-neon-purple/10 text-neon-blue shadow-sm shadow-neon-blue/10"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <item.icon
              className={cn(
                "h-5 w-5 transition-colors",
                item.active ? "text-neon-blue" : "text-muted-foreground group-hover:text-foreground"
              )}
            />
            {item.label}
            {item.active && (
              <div className="ml-auto h-2 w-2 rounded-full bg-neon-blue shadow-lg shadow-neon-blue/50" />
            )}
          </button>
        ))}
      </nav>

      {/* Bottom nav */}
      <div className="border-t border-glass-border px-3 py-4">
        {bottomItems.map((item) => (
          <button
            key={item.label}
            className="group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-foreground"
          >
            <item.icon className="h-5 w-5 transition-colors group-hover:text-foreground" />
            {item.label}
          </button>
        ))}
      </div>
    </aside>
  );
}
