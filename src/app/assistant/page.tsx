"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { AppShell } from "../../components/layout/AppShell";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { syncAgents, type SyncAgentId } from "../../lib/agents-sync";
import type { ChatMessage } from "../../lib/types";

type UiMessage = ChatMessage & { id: string };

const agentIds = Object.keys(syncAgents) as SyncAgentId[];

function getInitialAgent(searchParams: URLSearchParams | null): SyncAgentId {
  if (!searchParams) return "prospection";
  const fromQuery = searchParams.get("agent") as SyncAgentId | null;
  if (fromQuery && agentIds.includes(fromQuery)) {
    return fromQuery;
  }
  return "prospection";
}

export default function Page() {
  const searchParams = useSearchParams();
  const [agentId, setAgentId] = React.useState<SyncAgentId>(() =>
    getInitialAgent(searchParams)
  );
  const [messages, setMessages] = React.useState<UiMessage[]>([]);
  const [input, setInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const bottomRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  React.useEffect(() => {
    // Quand l'URL change (ex: navigation depuis /agents), on met l'agent à jour
    setAgentId(getInitialAgent(searchParams));
    setMessages([]);
  }, [searchParams]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: UiMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agent: agentId,
          messages: nextMessages.map(({ role, content }) => ({
            role,
            content,
          })),
        }),
      });

      if (!res.ok) {
        throw new Error("Erreur API Hub");
      }

      const data = (await res.json()) as { answer?: string };
      const answerText = data.answer ?? "Pas de réponse reçue depuis le Hub.";

      const assistantMessage: UiMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: answerText,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage: UiMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          "Erreur côté Hub ou OpenAI. Vérifie OPENAI_API_KEY dans .env.local et réessaie.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  const agentOptions = Object.values(syncAgents);
  const currentAgent = syncAgents[agentId];

  return (
    <AppShell
      title="Assistant Sync – GPT connecté"
      subtitle="Pose une question à un agent IA de Sync. Le back /api/chat appelle directement l’API GPT."
    >
      <div className="stack" style={{ gap: "1.5rem" }}>
        <section className="stack" style={{ gap: "1rem" }}>
          <SectionHeader
            title="Assistant IA"
            subtitle="Choisis un agent, discute avec lui et récupère une réponse pilotée par l’API GPT."
            rightSlot={
              <select
                value={agentId}
                onChange={(e) => setAgentId(e.target.value as SyncAgentId)}
                style={{
                  background: "rgba(15,23,42,0.8)",
                  borderRadius: "999px",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--fg)",
                  padding: "0.35rem 0.9rem",
                  fontSize: "0.9rem",
                }}
              >
                {agentOptions.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name}
                  </option>
                ))}
              </select>
            }
          />
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2.2fr) minmax(0, 1.3fr)",
            gap: "1.5rem",
          }}
        >
          {/* Chat */}
          <Card>
            <div className="stack" style={{ gap: "1rem", height: "560px" }}>
              <div
                className="stack"
                style={{
                  gap: "0.75rem",
                  flex: 1,
                  overflowY: "auto",
                  paddingRight: "0.25rem",
                }}
              >
                {messages.length === 0 ? (
                  <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                    Commence par décrire ton contexte de vente, ton prospect ou
                    ton message à retravailler. L’agent te posera ensuite des
                    questions et répondra via l’API GPT.
                  </p>
                ) : (
                  messages.map((m) => (
                    <div
                      key={m.id}
                      className="row"
                      style={{
                        justifyContent:
                          m.role === "user" ? "flex-end" : "flex-start",
                      }}
                    >
                      <div
                        style={{
                          maxWidth: "70%",
                          padding: "0.7rem 0.9rem",
                          borderRadius:
                            m.role === "user"
                              ? "1rem 1rem 0.25rem 1rem"
                              : "1rem 1rem 1rem 0.25rem",
                          background:
                            m.role === "user"
                              ? "linear-gradient(135deg, var(--accent), var(--accent-strong))"
                              : "rgba(15,23,42,0.9)",
                          color: m.role === "user" ? "#ffffff" : "var(--fg)",
                          fontSize: "0.9rem",
                          lineHeight: 1.5,
                          border:
                            m.role === "assistant"
                              ? "1px solid var(--border-subtle)"
                              : "none",
                        }}
                      >
                        {m.content}
                      </div>
                    </div>
                  ))
                )}
                <div ref={bottomRef} />
              </div>

              <form onSubmit={handleSend} className="stack" style={{ gap: "0.5rem" }}>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={3}
                  placeholder="Décris ton besoin : entreprise à analyser, message à écrire, séquence à préparer, etc."
                  style={{
                    width: "100%",
                    resize: "none",
                    borderRadius: "0.75rem",
                    border: "1px solid var(--border-subtle)",
                    background: "rgba(15,23,42,0.9)",
                    color: "var(--fg)",
                    padding: "0.7rem 0.9rem",
                    fontSize: "0.9rem",
                    fontFamily: "inherit",
                  }}
                />
                <div className="row row--spread">
                  <span className="text-muted" style={{ fontSize: "0.8rem" }}>
                    Agent sélectionné :{" "}
                    <strong>{currentAgent?.name ?? "Inconnu"}</strong>
                  </span>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isLoading || !input.trim()}
                  >
                    {isLoading ? "Génération en cours..." : "Envoyer à l’agent GPT"}
                  </Button>
                </div>
              </form>
            </div>
          </Card>

          {/* Panneau contexte agent */}
          <Card soft>
            <div className="stack" style={{ gap: "0.75rem" }}>
              <h2 style={{ fontSize: "1.1rem" }}>À propos de l’agent</h2>
              {currentAgent && (
                <>
                  <div className="row" style={{ alignItems: "center", gap: "0.6rem" }}>
                    <div
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "999px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.3rem",
                        background: "rgba(15, 23, 42, 0.9)",
                        border: "1px solid rgba(148, 163, 184, 0.4)",
                      }}
                    >
                      <span>{currentAgent.avatar}</span>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{currentAgent.name}</div>
                      <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                        {currentAgent.tagline}
                      </div>
                    </div>
                  </div>

                  <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                    {currentAgent.role}
                  </div>

                  <div className="stack" style={{ gap: "0.35rem" }}>
                    <span className="text-muted" style={{ fontSize: "0.8rem" }}>
                      Exemples de requêtes :
                    </span>
                    <ul
                      className="text-muted"
                      style={{
                        margin: 0,
                        paddingLeft: "1.1rem",
                        fontSize: "0.8rem",
                      }}
                    >
                      {currentAgent.examples.slice(0, 3).map((ex) => (
                        <li key={ex} style={{ marginBottom: "0.25rem" }}>
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
