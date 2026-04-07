"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Sparkles, Bot, User } from "lucide-react";

interface Message {
  id: number;
  type: "ai" | "user";
  content: string;
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    type: "ai",
    content:
      "Good morning, Coach! I've analyzed last night's match data.",
    timestamp: "9:00 AM",
  },
];

export function AICoach({ stats }: { stats: any }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      await new Promise((r) => setTimeout(r, 800));

      const res = await fetch("/api/coach", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          passes: 842,
          accuracy: 68,
          turnovers: 41,
        }),
      });

      const data = await res.json();

      const aiMessage: Message = {
        id: userMessage.id + 1,
        type: "ai",
        content: data.message,
        timestamp: "Now",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-glass-border bg-card/50 backdrop-blur-sm">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-glass-border px-5 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">AI Coach</h3>
          <p className="text-sm text-muted-foreground">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${
              message.type === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
              {message.type === "ai" ? <Bot /> : <User />}
            </div>

            <div
              className={`max-w-[80%] rounded-xl px-4 py-3 ${
                message.type === "ai"
                  ? "bg-secondary"
                  : "bg-blue-600 text-white"
              }`}
            >
              <p>{message.content}</p>
              <span className="text-xs">{message.timestamp}</span>
            </div>
          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div className="text-sm text-muted-foreground">
            🤖 AI is analyzing...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t p-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask the AI Coach..."
          className="flex-1 border px-4 py-2 rounded-lg"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          <Send />
        </button>
      </div>
    </div>
  );
}