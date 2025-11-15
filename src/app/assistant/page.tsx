"use client";

import * as React from "react";
import { useState } from "react";
import { AppShell } from "../../components/layout/AppShell";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { SectionHeader } from "../../components/ui/SectionHeader";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function Page() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend(e?: React.FormEvent) {
    if (e) e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: text },
    ];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!res.ok) {
        throw new Error("Erreur API");
      }

      const data = await res.json();

      const reply =
        data?.message ??
        data?.reply ??
        data?.content ??
        data?.choices?.[0]?.message?.content ??
        "[Assistant] Réponse reçue, mais format inattendu. Vérifie le format JSON retourné par /api/chat.";

      setMessages([
        ...nextMessages,
        { role: "assistant", content: String(reply) },
      ]);
    } catch (error) {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            "Je n’ai pas pu contacter l’API de Sync. Vérifie /api/chat ou les clés OpenAI côté backend.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell
      title="Assistant GPT Sync"
      subtitle="Pose une question, l’assistant se charge d’orchestrer les agents et les prompts."
    >
      <div className="stack" style={{ gap: "1.5rem" }}>
        {/* Historique de conversation */}
        <section>
          <SectionHeader
            title="Conversation"
            subtitle="Historique des échanges avec l’assistant."
          />
          <Card>
            <div
              style={{
                maxHeight: "420px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {messages.length === 0 && (
                <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                  Commence par une question du type : “Génère un script de call pour ce persona”
                  ou “Analyse ce compte et propose une séquence”.
                </p>
              )}

              {messages.map((m, idx) => (
                <div
                  key={idx}
                  style={{
                    alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                    maxWidth: "72%",
                  }}
                >
                  <div
                    style={{
                      padding: "0.7rem 1rem",
                      borderRadius: 18,
                      fontSize: "0.9rem",
                      background:
                        m.role === "user"
                          ? "linear-gradient(135deg, var(--accent), var(--accent-strong))"
                          : "rgba(255, 255, 255, 0.95)",
                      color: m.role === "user" ? "#ffffff" : "#0f172a",
                      boxShadow: "0 12px 30px rgba(15, 23, 42, 0.14)",
                    }}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {loading && (
                <span className="text-muted" style={{ fontSize: "0.85rem" }}>
                  L’assistant réfléchit…
                </span>
              )}
            </div>
          </Card>
        </section>

        {/* Zone d’entrée */}
        <section>
          <SectionHeader
            title="Entrée"
            subtitle="Formule ta demande le plus concrètement possible."
          />
          <Card soft>
            <form
              className="stack"
              style={{ gap: "0.75rem" }}
              onSubmit={handleSend}
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={4}
                placeholder="Ex : Génère une séquence multi-canaux pour un DAF de PME déjà en contact avec Sync."
                style={{
                  width: "100%",
                  resize: "vertical",
                  borderRadius: 16,
                  border: "1px solid rgba(209, 213, 219, 0.9)",
                  padding: "0.75rem 0.9rem",
                  fontFamily: "inherit",
                  fontSize: "0.95rem",
                }}
              />

              <div className="row row--spread">
                <span className="text-muted" style={{ fontSize: "0.8rem" }}>
                  L’assistant peut orchestrer les agents (prospection, scripts, coach, analyse).
                </span>
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? "En cours..." : "Envoyer à l’assistant"}
                </Button>
              </div>
            </form>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}

