"use client";

import { FormEvent, useState } from "react";

type Role = "user" | "assistant";

interface Message {
  id: string;
  role: Role;
  content: string;
}

interface ChatWindowProps {
  title: string;
  subtitle: string;
  agentId: string;
  placeholder?: string;
  contextBadges?: string[];
  toneBadge?: string;
}

export default function ChatWindow({
  title,
  subtitle,
  agentId,
  placeholder,
  contextBadges = [],
  toneBadge,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim() || isSending) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsSending(true);

    try {
      // MOCK pour le front — à remplacer par un appel API plus tard
      await new Promise((r) => setTimeout(r, 600));

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Réponse simulée côté front pour l'agent \"" +
          agentId +
          "\". Quand l'API sera branchée, ce message sera généré par l'IA (agents-sync.ts).",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Une erreur s'est produite dans le mock front. Quand l'API sera branchée, les erreurs seront gérées proprement.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-[11px] font-semibold text-neutral-950 shadow-lg shadow-emerald-500/40">
            IA
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-semibold text-neutral-50">{title}</h1>
            <p className="text-[11px] text-neutral-400 max-w-xl">{subtitle}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 text-[10px]">
          <span className="rounded-full bg-neutral-900 px-2 py-0.5 text-neutral-300">
            Agent : <span className="text-emerald-300">{agentId}</span>
          </span>
          {toneBadge && (
            <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-emerald-300">
              {toneBadge}
            </span>
          )}
          {contextBadges.map((b) => (
            <span
              key={b}
              className="rounded-full bg-neutral-900 px-2 py-0.5 text-neutral-400"
            >
              {b}
            </span>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 rounded-2xl border border-neutral-800 bg-neutral-950/90 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3 text-xs">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-neutral-500 text-[11px] gap-2 text-center">
              <div>?</div>
              <p>
                Commence par décrire ton contexte (client, événement, objectif),
                et l'agent te guidera étape par étape.
              </p>
            </div>
          )}

          {messages.map((m) => (
            <div
              key={m.id}
              className={
                m.role === "user"
                  ? "flex justify-end"
                  : "flex justify-start"
              }
            >
              <div
                className={
                  m.role === "user"
                    ? "bg-emerald-500 text-neutral-950 rounded-2xl px-3 py-2 max-w-[80%] text-xs"
                    : "bg-neutral-900 text-neutral-100 rounded-2xl px-3 py-2 max-w-[80%] text-xs border border-neutral-700"
                }
              >
                <div className="whitespace-pre-wrap">{m.content}</div>
              </div>
            </div>
          ))}

          {isSending && (
            <div className="flex justify-start">
              <div className="inline-flex items-center gap-1 rounded-2xl bg-neutral-900 px-3 py-1.5 text-[11px] text-neutral-300 border border-neutral-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                L'agent réfléchit…
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex items-end gap-2 mt-1">
        <div className="flex-1 rounded-2xl border border-neutral-800 bg-neutral-950 px-3 py-2 shadow-inner shadow-black/60">
          <textarea
            rows={2}
            className="w-full bg-transparent text-xs text-neutral-50 placeholder:text-neutral-500 focus:outline-none resize-none"
            placeholder={
              placeholder ??
              "Décris ton contexte client, ton objectif ou colle un texte à retravailler."
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={isSending || !input.trim()}
          className="h-9 px-3 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-[11px] font-medium text-neutral-950 shadow-lg shadow-emerald-500/40 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {isSending ? "…" : "Envoyer"}
        </button>
      </form>
    </div>
  );
}
