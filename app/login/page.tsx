"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!name.trim()) return;

    localStorage.setItem("coachName", name);
    router.push("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="w-80 rounded-xl border border-glass-border bg-card p-6">
        <h1 className="mb-4 text-xl font-bold">Welcome Coach</h1>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 w-full rounded-lg border border-glass-border bg-secondary px-4 py-2"
        />

        <button
          onClick={handleLogin}
          className="w-full rounded-lg bg-blue-600 py-2 text-white"
        >
          Enter Dashboard
        </button>
      </div>
    </div>
  );
}