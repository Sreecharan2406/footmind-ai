"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { TopNav } from "@/components/dashboard/top-nav";
import { StatCards } from "@/components/dashboard/stat-cards";
import { FootballPitch } from "@/components/dashboard/football-pitch";
import { AICoach } from "@/components/dashboard/ai-coach";
import AccuracyChart from "@/components/dashboard/chart";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const [report, setReport] = useState("");
  const [loadingReport, setLoadingReport] = useState(false);
  const [coachName, setCoachName] = useState("");

  const stats = {
    passes: 1847,
    accuracy: 67,
    turnovers: 18,
  };

  // 🔐 LOGIN + LOAD DATA
  useEffect(() => {
    const name = localStorage.getItem("coachName");

    if (!name) {
      router.push("/login");
    } else {
      setCoachName(name);
    }

    // 🔥 Load saved report
    const savedReport = localStorage.getItem("lastReport");
    if (savedReport) setReport(savedReport);
  }, []);

  // 📄 REPORT
  const generateReport = async () => {
    setLoadingReport(true);

    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stats),
      });

      const data = await res.json();

      const finalReport = data.report || "No report generated.";

      setReport(finalReport);

      // 🔥 Save report
      localStorage.setItem("lastReport", finalReport);
    } catch (error) {
      console.error("Report error:", error);
      setReport("Failed to generate report.");
    } finally {
      setLoadingReport(false);
    }
  };

  // 🔓 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("coachName");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="pl-64">
        <TopNav />

        <main className="p-6">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Dashboard
              </h1>

              <p className="text-muted-foreground">
                Welcome back, {coachName || "Coach"} 👋. Here&apos;s your team performance overview.
              </p>
            </div>

            {/* 🔥 BUTTON GROUP */}
            <div className="flex items-center gap-3">
              <button
                onClick={generateReport}
                className="bg-purple-600 px-4 py-2 rounded-lg text-white hover:bg-purple-700 transition"
              >
                {loadingReport ? "Generating..." : "Generate Report"}
              </button>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Stats */}
          <StatCards />

          {/* Chart */}
          <div className="mt-6 rounded-xl border border-glass-border bg-card p-4">
            <h2 className="mb-3 text-lg font-semibold text-foreground">
              Accuracy Over Time
            </h2>
            <AccuracyChart />
          </div>

          {/* Empty State */}
          {!report && !loadingReport && (
            <div className="mt-6 text-sm text-muted-foreground">
              No report generated yet. Click "Generate Report" to analyze performance.
            </div>
          )}

          {/* Report */}
          {report && (
            <div className="mt-6 rounded-xl border border-glass-border bg-card p-4">
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                📊 Match Report
              </h2>

              <div className="space-y-2 text-sm">
                {report.split("\n").map((line, index) => (
                  <p key={index} className="text-muted-foreground">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Grid */}
          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <FootballPitch />
            </div>

            <div className="h-[500px]">
              <AICoach stats={stats} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}