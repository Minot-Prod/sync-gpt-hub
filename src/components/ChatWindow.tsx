"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { AgentId, ChatMessage } from "@/lib/types";
import { getAgentConfig } from "@/lib/agents";

type ChatWindowProps = {
  agentId?: AgentId; // nouveau: support agentId
  agent?: AgentId;   // rétrocompat: support prop agent
  title?: string;
  subtitle?: string;
  initialSystemMessage?: string;
  initialSystemHint?: string;
  placeholder?: string;
};

export default function ChatWindow({
  agentId,
  agent,
  title,
  subtitle,
  initialSystemMessage,
  initialSystemHint: initialSystemHintProp,
  placeholder,
}: ChatWindowProps) {
  const effectiveAgentId = (agentId ?? agent) as AgentId;
  const config = getAgentConfig(effectiveAgentId);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any | null>(null);

  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const initialSystemHint = initialSystemHintProp;

  const titleText = title ?? config?.name ?? "Agent IA Sync";
  const subtitleText =
    subtitle ?? config?.tagline ?? "Assistant IA personnalisé pour Sync.";

  // Init SpeechRecognition
  useEffect(() => {
    if (typeof window === "undefined") return;

    const w = window as any;
    const SpeechRecognition =
      w.SpeechRecognition || w.webkitSpeechRecognition || null;

    if (!SpeechRecognition) {
      console.warn("SpeechRecognition non disponible dans ce navigateur.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript as string;
      setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = (event: any) => {
      console.error("[SpeechRecognition] Erreur :", event);
      setListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current = null;
      }
    };
  }, []);

  // Auto-scroll vers le bas à chaque nouveau message
  useEffect(() => {
    if (!bottomRef.current) return;
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: trimmed,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    const payloadMessages: ChatMessage[] = initialSystemMessage
      ? [{ role: "system", content: initialSystemMessage }, ...newMessages]
      : newMessages;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agent: effectiveAgentId,
          messages: payloadMessages,
        }),
      });

      if (!res.ok) {
        console.error("[Chat] Erreur API chat:", await res.text());
        setLoading(false);
        return;
      }

      const data = await res.json();
      const answer = (data?.answer as string) ?? "";

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: answer,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("[Chat] Erreur réseau:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleExampleClick = (example: string) => {
    setInput(example);
  };

  const toggleVoiceInput = () => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      console.warn("SpeechRecognition non initialisé.");
      return;
    }

    if (listening) {
      recognition.stop();
      setListening(false);
    } else {
      try {
        recognition.start();
        setListening(true);
      } catch (err) {
        console.error("[SpeechRecognition] start() error:", err);
      }
    }
  };

  const playVoiceForMessage = async (index: number, content: string) => {
    if (!voiceEnabled) {
      console.warn("[TTS] Voix désactivée pour cet agent.");
      return;
    }

    setPlayingIndex(index);

    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: content,
          agentId: effectiveAgentId,
        }),
      });

      if (!res.ok) {
        console.error("[TTS] Erreur API TTS:", await res.text());
        setPlayingIndex(null);
        return;
      }

      const arrayBuffer = await res.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);

      audio.onended = () => {
        URL.revokeObjectURL(url);
        setPlayingIndex(null);
      };

      audio.onerror = () => {
        URL.revokeObjectURL(url);
        setPlayingIndex(null);
      };

      await audio.play();
    } catch (err) {
      console.error("[TTS] Erreur réseau:", err);
      setPlayingIndex(null);
    }
  };

  const placeholderText =
    placeholder ?? `Pose ta question à ${titleText}…`;

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-950/80 p-4 text-slate-100 shadow-xl">
      {/* HEADER */}
      <header className="space-y-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-slate-800 text-lg">
              {config?.avatarSrc ? (
                <Image
                  src={config.avatarSrc}
                  alt={titleText}
                  width={40}
                  height={40}
                  className="h-10 w-10 object-cover"
                />
              ) : (
                <span>{config?.avatar ?? "🤖"}</span>
              )}
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-50">
                {titleText}
              </h2>
              <p className="text-xs text-slate-400">{subtitleText}</p>
            </div>
          </div>

          {config?.voice && (
            <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-1.5">
              <label className="flex cursor-pointer items-center gap-2 text-[0.7rem] text-slate-200">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded border-slate-600 bg-slate-900 text-cyan-400"
                  checked={voiceEnabled}
                  onChange={(e) => setVoiceEnabled(e.target.checked)}
                />
                <span>Activer la voix de {titleText}</span>
              </label>
            </div>
          )}
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
              Conversation avec {titleText} – les messages s’affichent ici.
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
                  {titleText}.
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
                            alt={titleText}
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
                        <>
                          <div className="prose prose-invert prose-xs max-w-none break-words">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {m.content}
                            </ReactMarkdown>
                          </div>
                          {config?.voice && (
                            <button
                              type="button"
                              onClick={() =>
                                playVoiceForMessage(idx, m.content)
                              }
                              disabled={
                                !voiceEnabled || playingIndex === idx
                              }
                              className="mt-2 inline-flex items-center gap-1 rounded-full border border-slate-600 bg-slate-900 px-2 py-1 text-[0.65rem] text-slate-200 disabled:opacity-50"
                            >
                              {playingIndex === idx
                                ? "🔊 Lecture en cours…"
                                : "🔊 Écouter la réponse"}
                            </button>
                          )}
                        </>
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
              placeholder={placeholderText}
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
