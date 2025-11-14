"use client";

import { useEffect, useRef, useState } from "react";
import type { AgentId, ChatMessage } from "@/lib/types";

type Props = {
  agent: AgentId;
  title: string;
  subtitle?: string;
  initialSystemHint?: string;
};

export default function ChatWindow({
  agent,
  title,
  subtitle,
  initialSystemHint,
}: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = { role: "user", content: trimmed };
    const nextMessages = [...messages, userMsg];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agent, messages: nextMessages }),
      });

      if (!res.ok) throw new Error(`Erreur API (${res.status})`);

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        role: "assistant",
        content: data.answer ?? "",
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      const assistantMsg: ChatMessage = {
        role: "assistant",
        content:
          "Erreur côté Hub. Vérifie la configuration (clé OpenAI) ou réessaie dans quelques secondes.",
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <header>
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-sm text-slate-300">{subtitle}</p>
        )}
        {initialSystemHint && (
          <p className="mt-1 text-xs text-slate-400">
            <span className="font-semibold">Conseil :</span> {initialSystemHint}
          </p>
        )}
      </header>

      <div className="flex flex-col gap-3">
        <div className="min-h-[260px] max-h-[460px] overflow-y-auto rounded-xl border border-slate-800 bg-slate-950/80 p-4 text-sm">
          {messages.length === 0 && (
            <p className="text-xs text-slate-500">
              Commence en expliquant ton contexte. Plus tu es précis, plus
              l’agent sera utile.
            </p>
          )}

          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`mb-2 flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] whitespace-pre-wrap rounded-lg px-3 py-2 text-xs ${
                  m.role === "user"
                    ? "bg-blue-600 text-slate-50"
                    : "bg-slate-800 text-slate-100"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <p className="mt-1 text-xs text-slate-400">L’agent réfléchit…</p>
          )}

          <div ref={bottomRef} />
        </div>

        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            className="flex-1 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-100 outline-none focus:border-cyan-400"
            placeholder="Écris ta demande ici…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-cyan-400 px-4 py-2 text-xs font-semibold text-slate-900 disabled:cursor-not-allowed disabled:bg-slate-700"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}
