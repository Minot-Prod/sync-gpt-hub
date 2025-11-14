"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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

  const placeholder =
    config?.name != null
      ? `Écris ici ton message pour ${config.name}…`
      : "Écris ici ton message pour l’agent…";

  return (
    <div className="space-y-4">
      {/* EN-TÊTE AGENT */}
      <header className="space-y-3 rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-slate-800 text-xl">
            {config?.avatarSrc ? (
              <Image
                src={config.avatarSrc}
                alt={config.name}
                width={48}
                height={48}
                className="h-12 w-12 object-cover"
              />
            ) : (
              <span>{config?.avatar ?? "🤖"}</span>
            )}
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">
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
          <p className="mt-2 rounded-lg bg-slate-900/70 px-3 py-2 text-xs text-slate-300">
            <span className="font-semibold">Conseil : </span>
            {initialSystemHint}
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

      {/* ZONE DE DISCUSSION + INPUT */}
      <div className="space-y-3">
        <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-950/90 to-slate-950/70 p-4 shadow-lg">
          <div className="mb-3 flex items-center justify-between text-[0.7rem] text-slate-400">
            <span>
              Conversation avec {config?.name ?? "l’agent"} – les messages
              s’affichent ici.
            </span>
            <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.14em] text-slate-300">
              Zone de discussion
            </span>
          </div>

          <div className="min-h-[220px] max-h-[420px] space-y-2 overflow-y-auto pr-1">
            {messages.length === 0 && (
              <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-950/60 px-4 py-8 text-center text-xs text-slate-500">
                <p>
                  Commence la discussion en écrivant ton message ci-dessous
                  ou en utilisant le bouton 🎙 pour parler à{" "}
                  {config?.name ?? "l’agent"}.
                </p>
              </div>
            )}

            {messages.map((m, idx) => {
              const isUser = m.role === "user";
              const showAgentAvatar = !isUser;

              return (
                <div
                  key={idx}
                  className={`mb-3 flex ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex max-w-[80%] items-start gap-3 ${
                      isUser ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {showAgentAvatar && (
                      <div className="mt-1 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-slate-800 text-xs">
                        {config?.avatarSrc ? (
                          <Image
                            src={config.avatarSrc}
                            alt={config?.name}
                            width={32}
                            height={32}
                            className="h-8 w-8 object-cover"
                          />
                        ) : (
                          <span>{config?.avatar ?? "🤖"}</span>
                        )}
                      </div>
                    )}

                    <div
                      className={`whitespace-pre-wrap rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-md ${
                        isUser
                          ? "bg-cyan-400 text-slate-900"
                          : "bg-slate-800 text-slate-100 border border-slate-700"
                      }`}
                    >
                      {isUser ? (
                        <span className="break-words">{m.content}</span>
                      ) : (
                        <div className="prose prose-invert prose-xs max-w-none break-words">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {m.content}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {loading && (
              <p className="mt-1 text-xs text-slate-400">L’agent réfléchit…</p>
            )}

            <div ref={bottomRef} />
          </div>
        </div>

        <form onSubmit={handleSend} className="flex flex-col gap-2">
          <div className="flex gap-2">
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
              placeholder={placeholder}
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
          </div>

          <p className="text-[0.65rem] text-slate-500">
            Appuie sur Entrée pour envoyer. Utilise le micro pour dicter un
            message plus long.
          </p>
        </form>
      </div>
    </div>
  );
}
