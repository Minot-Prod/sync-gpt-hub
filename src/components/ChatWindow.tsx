"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { AgentId, ChatMessage } from "@/lib/types";
import { getAgentConfig } from "@/lib/agents";

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
  const [listening, setListening] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);

  const config = getAgentConfig(agent);
  const headingTitle = config?.name || title;

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

  function handleExampleClick(example: string) {
    setInput(example);
  }

  function toggleVoiceInput() {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert(
        "La dictée vocale n’est pas supportée par ce navigateur. Essaie avec Chrome ou Edge."
      );
      return;
    }

    if (!listening) {
      const recognition = new SpeechRecognition();
      recognition.lang = "fr-FR";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript;
        if (transcript) {
          setInput((prev) => (prev ? prev + " " + transcript : transcript));
        }
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognition.onerror = () => {
        setListening(false);
      };

      recognitionRef.current = recognition;
      setListening(true);
      recognition.start();
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setListening(false);
    }
  }

  return (
    <div className="space-y-4">
      <header className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-slate-800 text-xl">
            {config?.avatarSrc ? (
              <Image
                src={config.avatarSrc}
                alt={config.name}
                width={40}
                height={40}
                className="h-10 w-10 object-cover"
              />
            ) : (
              <span>{config?.avatar ?? "🤖"}</span>
            )}
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              {headingTitle}
            </h1>
            {config?.tagline && (
              <p className="text-xs text-slate-300">{config.tagline}</p>
            )}
            {subtitle && (
              <p className="text-xs text-slate-400">{subtitle}</p>
            )}
          </div>
        </div>

        {initialSystemHint && (
          <p className="mt-1 text-xs text-slate-400">
            <span className="font-semibold">Conseil :</span> {initialSystemHint}
          </p>
        )}

        {config?.examples?.length > 0 && (
          <div className="mt-2 space-y-1">
            <p className="text-[0.7rem] uppercase tracking-[0.16em] text-slate-500">
              Exemples de questions
            </p>
            <div className="flex flex-wrap gap-2">
              {config.examples.map((ex, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleExampleClick(ex)}
                  className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-[0.7rem] text-slate-100 transition hover:border-cyan-400 hover:bg-slate-800"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <div className="flex flex-col gap-3">
        <div className="min-h-[260px] max-h-[460px] overflow-y-auto rounded-xl border border-slate-800 bg-slate-950/80 p-4 text-sm">
          {messages.length === 0 && (
            <p className="text-xs text-slate-500">
              Tu peux parler à l’agent comme à un collègue. Clique sur un
              exemple ci-dessus ou utilise le micro pour lui expliquer ta
              situation.
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
          <button
            type="button"
            onClick={toggleVoiceInput}
            className={`flex items-center justify-center rounded-lg px-3 py-2 text-xs font-semibold ${
              listening
                ? "bg-red-500 text-slate-900"
                : "bg-slate-800 text-slate-100"
            }`}
          >
            {listening ? "🎙️ Stop" : "🎙️ Parler"}
          </button>

          <input
            type="text"
            className="flex-1 rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-100 outline-none focus:border-cyan-400"
            placeholder="Écris ta demande… ou clique sur 🎙️ pour parler."
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
