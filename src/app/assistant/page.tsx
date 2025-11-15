"use client";

import { useState } from "react";
import { ChatLayout } from "../../components/chat/ChatLayout";
import { VoiceDock } from "../../components/voice/VoiceDock";
import { useSamTTS } from "../../components/voice/useSamTTS";

type LocalMessage = {
  from: "user" | "assistant";
  text: string;
};

export default function AssistantPage() {
  const [messages, setMessages] = useState<LocalMessage[]>([
    {
      from: "assistant",
      text: "Salut, je suis Sam, ton assistant IA + coach. Dis-moi ce que tu veux ameliorer.",
    },
  ]);
  const [input, setInput] = useState("");

  const { isPlaying, rate, setRate, playFromUrl, togglePlay, stop } =
    useSamTTS();

  const sendMessage = async () => {
    const content = input.trim();
    if (!content) return;

    const nextMessages: LocalMessage[] = [
      ...messages,
      { from: "user", text: content },
    ];
    setMessages(nextMessages);
    setInput("");

    const fakeReply =
      "Branche-moi sur /api/chat pour que je puisse repondre reellement.";
    setMessages((prev) => [...prev, { from: "assistant", text: fakeReply }]);
  };

  const header = (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-xl">
          🤝
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-slate-50">
            Sam - Assistant IA + Coach
          </span>
          <span className="text-xs text-slate-400">
            Ton point d appui pour aller plus vite dans tes ventes.
          </span>
        </div>
      </div>

      <span className="rounded-full border border-slate-700 bg-slate-900 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-300">
        Copilote vocal
      </span>
    </div>
  );

  const messagesView = (
    <div className="space-y-3 text-sm">
      {messages.map((m, i) => (
        <div
          key={i}
          className={m.from === "user" ? "flex justify-end" : "flex justify-start"}
        >
          <div
            className={
              m.from === "user"
                ? "max-w-xl rounded-2xl bg-slate-900 px-3 py-2 text-slate-100"
                : "max-w-xl rounded-2xl border border-cyan-500/30 bg-slate-950 px-3 py-2 text-slate-100"
            }
          >
            {m.text}
          </div>
        </div>
      ))}
    </div>
  );

  const inputView = (
    <form
      className="flex items-center gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage();
      }}
    >
      <input
        className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
        placeholder="Explique ta situation a Sam..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        type="submit"
        className="rounded-xl bg-cyan-500 px-3 py-2 text-sm font-medium text-slate-950 shadow-md shadow-cyan-500/30 transition hover:bg-cyan-400"
      >
        Envoyer
      </button>
    </form>
  );

  return (
    <>
      <ChatLayout header={header} messages={messagesView} input={inputView} />
      <VoiceDock
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        onStop={stop}
        rate={rate}
        onRateChange={setRate}
        label="Sam te lit la reponse"
      />
    </>
  );
}
