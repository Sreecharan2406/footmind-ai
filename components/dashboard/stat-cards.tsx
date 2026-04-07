"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, Repeat2, Target, Zap, RefreshCw } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ElementType;
  accentColor: "blue" | "purple" | "cyan" | "green";
}

const colorMap = {
  blue: {
    gradient: "from-neon-blue/20 to-neon-blue/5",
    shadow: "shadow-neon-blue/20",
    icon: "text-neon-blue",
    glow: "bg-neon-blue",
  },
  purple: {
    gradient: "from-neon-purple/20 to-neon-purple/5",
    shadow: "shadow-neon-purple/20",
    icon: "text-neon-purple",
    glow: "bg-neon-purple",
  },
  cyan: {
    gradient: "from-neon-cyan/20 to-neon-cyan/5",
    shadow: "shadow-neon-cyan/20",
    icon: "text-neon-cyan",
    glow: "bg-neon-cyan",
  },
  green: {
    gradient: "from-emerald-500/20 to-emerald-500/5",
    shadow: "shadow-emerald-500/20",
    icon: "text-emerald-400",
    glow: "bg-emerald-400",
  },
};

function StatCard({ title, value, change, icon: Icon, accentColor }: StatCardProps) {
  const colors = colorMap[accentColor];
  const isPositive = change >= 0;

  return (
    <div className="group relative overflow-hidden rounded-xl border border-glass-border bg-card/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-glass-border hover:bg-card/70">
      {/* Subtle glow effect */}
      <div
        className={cn(
          "absolute -right-8 -top-8 h-24 w-24 rounded-full blur-3xl opacity-30 transition-opacity group-hover:opacity-50",
          colors.glow
        )}
      />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br shadow-lg",
              colors.gradient,
              colors.shadow
            )}
          >
            <Icon className={cn("h-5 w-5", colors.icon)} />
          </div>

          <div
            className={cn(
              "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
              isPositive
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-red-500/10 text-red-400"
            )}
          >
            {isPositive ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {Math.abs(change)}%
          </div>
        </div>

        <div className="mt-4">
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className="mt-1 text-sm text-muted-foreground">{title}</p>
        </div>
      </div>
    </div>
  );
}

const stats = [
  { title: "Total Passes", value: "1,847", change: 12.5, icon: Repeat2, accentColor: "blue" as const },
  { title: "Shots Taken", value: "24", change: 8.2, icon: Target, accentColor: "purple" as const },
  { title: "Attack Efficiency", value: "67%", change: 4.1, icon: Zap, accentColor: "cyan" as const },
  { title: "Possession Turnovers", value: "18", change: -3.2, icon: RefreshCw, accentColor: "green" as const },
];

export function StatCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
