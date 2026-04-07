"use client";

import { useState } from "react";

// Heatmap data points (x, y, intensity)
const heatmapData = [
  // Midfield concentration
  { x: 50, y: 40, intensity: 0.9 },
  { x: 45, y: 50, intensity: 0.85 },
  { x: 55, y: 45, intensity: 0.8 },
  { x: 40, y: 55, intensity: 0.7 },
  { x: 60, y: 35, intensity: 0.75 },
  // Left wing
  { x: 25, y: 30, intensity: 0.6 },
  { x: 20, y: 50, intensity: 0.5 },
  { x: 30, y: 60, intensity: 0.55 },
  // Right wing
  { x: 75, y: 35, intensity: 0.65 },
  { x: 70, y: 55, intensity: 0.6 },
  { x: 80, y: 45, intensity: 0.5 },
  // Attacking third
  { x: 85, y: 40, intensity: 0.7 },
  { x: 90, y: 50, intensity: 0.65 },
  { x: 88, y: 55, intensity: 0.55 },
  // Defensive third
  { x: 15, y: 45, intensity: 0.4 },
  { x: 12, y: 50, intensity: 0.35 },
  { x: 18, y: 55, intensity: 0.3 },
];

// Player positions
const players = [
  { x: 8, y: 50, number: 1, position: "GK" },
  { x: 20, y: 25, number: 2, position: "RB" },
  { x: 18, y: 42, number: 4, position: "CB" },
  { x: 18, y: 58, number: 5, position: "CB" },
  { x: 20, y: 75, number: 3, position: "LB" },
  { x: 40, y: 35, number: 6, position: "CDM" },
  { x: 40, y: 65, number: 8, position: "CM" },
  { x: 55, y: 50, number: 10, position: "CAM" },
  { x: 70, y: 25, number: 7, position: "RW" },
  { x: 70, y: 75, number: 11, position: "LW" },
  { x: 80, y: 50, number: 9, position: "ST" },
];

export function FootballPitch() {
  const [selectedPlayer, setSelectedPlayer] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"heatmap" | "formation">("heatmap");

  return (
    <div className="overflow-hidden rounded-xl border border-glass-border bg-card/50 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-glass-border px-5 py-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Pitch Analysis</h3>
          <p className="text-sm text-muted-foreground">Live positioning & heatmap</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("heatmap")}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
              viewMode === "heatmap"
                ? "bg-neon-blue/20 text-neon-blue"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Heatmap
          </button>
          <button
            onClick={() => setViewMode("formation")}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
              viewMode === "formation"
                ? "bg-neon-blue/20 text-neon-blue"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Formation
          </button>
        </div>
      </div>

      {/* Pitch */}
      <div className="relative p-4">
        <svg viewBox="0 0 100 70" className="w-full" style={{ maxHeight: "400px" }}>
          {/* Pitch background */}
          <rect x="0" y="0" width="100" height="70" fill="#0D1117" rx="2" />

          {/* Pitch markings */}
          <g stroke="#1F4D2F" strokeWidth="0.3" fill="none">
            {/* Outer boundary */}
            <rect x="2" y="5" width="96" height="60" />

            {/* Center line */}
            <line x1="50" y1="5" x2="50" y2="65" />

            {/* Center circle */}
            <circle cx="50" cy="35" r="9" />
            <circle cx="50" cy="35" r="0.5" fill="#1F4D2F" />

            {/* Left penalty area */}
            <rect x="2" y="18" width="16" height="34" />
            <rect x="2" y="25" width="6" height="20" />
            <circle cx="12" cy="35" r="0.5" fill="#1F4D2F" />
            <path d="M 18 28 A 9 9 0 0 1 18 42" />

            {/* Right penalty area */}
            <rect x="82" y="18" width="16" height="34" />
            <rect x="92" y="25" width="6" height="20" />
            <circle cx="88" cy="35" r="0.5" fill="#1F4D2F" />
            <path d="M 82 28 A 9 9 0 0 0 82 42" />

            {/* Corner arcs */}
            <path d="M 2 7 A 2 2 0 0 0 4 5" />
            <path d="M 96 5 A 2 2 0 0 0 98 7" />
            <path d="M 2 63 A 2 2 0 0 1 4 65" />
            <path d="M 96 65 A 2 2 0 0 1 98 63" />
          </g>

          {/* Heatmap layer */}
          {viewMode === "heatmap" && (
            <g>
              {heatmapData.map((point, index) => (
                <circle
                  key={index}
                  cx={point.x}
                  cy={point.y * 0.7 + 5}
                  r={5 + point.intensity * 4}
                  fill={`rgba(59, 130, 246, ${point.intensity * 0.4})`}
                  className="transition-all duration-500"
                />
              ))}
              {heatmapData.map((point, index) => (
                <circle
                  key={`inner-${index}`}
                  cx={point.x}
                  cy={point.y * 0.7 + 5}
                  r={2 + point.intensity * 2}
                  fill={`rgba(139, 92, 246, ${point.intensity * 0.6})`}
                  className="transition-all duration-500"
                />
              ))}
            </g>
          )}

          {/* Players */}
          <g>
            {players.map((player) => (
              <g
                key={player.number}
                onClick={() => setSelectedPlayer(selectedPlayer === player.number ? null : player.number)}
                className="cursor-pointer"
              >
                {/* Glow effect for selected player */}
                {selectedPlayer === player.number && (
                  <circle
                    cx={player.x}
                    cy={player.y * 0.6 + 5}
                    r={4}
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="0.5"
                    className="animate-pulse"
                  />
                )}
                {/* Player circle */}
                <circle
                  cx={player.x}
                  cy={player.y * 0.6 + 5}
                  r={2.5}
                  fill={
                    selectedPlayer === player.number
                      ? "#3B82F6"
                      : player.position === "GK"
                      ? "#F59E0B"
                      : "#8B5CF6"
                  }
                  className="transition-all duration-200 hover:scale-110"
                  style={{ transformOrigin: `${player.x}px ${player.y * 0.6 + 5}px` }}
                />
                {/* Player number */}
                <text
                  x={player.x}
                  y={player.y * 0.6 + 6}
                  textAnchor="middle"
                  fill="white"
                  fontSize="2"
                  fontWeight="bold"
                >
                  {player.number}
                </text>
              </g>
            ))}
          </g>
        </svg>

        {/* Selected player info */}
        {selectedPlayer && (
          <div className="absolute bottom-6 left-6 rounded-lg border border-glass-border bg-secondary/80 px-4 py-2 backdrop-blur-sm">
            <p className="text-sm font-medium text-foreground">
              Player #{selectedPlayer}
            </p>
            <p className="text-xs text-muted-foreground">
              {players.find((p) => p.number === selectedPlayer)?.position}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
