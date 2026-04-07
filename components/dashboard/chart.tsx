"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "10m", accuracy: 60 },
  { name: "20m", accuracy: 65 },
  { name: "30m", accuracy: 68 },
  { name: "40m", accuracy: 66 },
  { name: "50m", accuracy: 70 },
];

export default function AccuracyChart() {
  return (
    <div className="h-60 w-full">
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="accuracy" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}