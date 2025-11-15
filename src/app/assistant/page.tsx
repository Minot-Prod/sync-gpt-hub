// src/app/assistant/page.tsx
"use client";

import React, { useState } from "react";

const AGENTS = [
  { key: "sync_lea", label: "Léa – Prospection" },
  { key: "sync_nico", label: "Nico – Rédaction / Scripts" },
  { key: "sync_alex", label: "Alex – Analyse" },
  { key: "sync_sam", label: "Sam – Coach" },
  { key: "sync_zoe", label: "Zoé – Opportunités" },
  { key: "default", label: "Default" },
];

export default function AssistantPage() {
  const [agent, setAgent] = useState<string>("sync_lea");
  const [message, setMessage] = useState<string>("");
  const [responseText, setResponseText] = useState<string>("");
  const [rawJson, setRawJson] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSend() {
    if (!message.trim() || loading) return;

    setLoading(true);
    setError(null);
    setResponseText("");
    setRawJson("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent,
          messages: [
            {
              role: "user",
              content: message,
            },
          ],
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status} – ${text}`);
      }

      const data = await res.json();
      setRawJson(JSON.stringify(data, null, 2));
      setResponseText(typeof data.output_text === "string" ? data.output_text : "");
    } catch (err: any) {
      console.error("Erreur API /api/chat:", err);
      setError(err?.message ?? "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 16px",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        background: "#020617",
        color: "#e5e7eb",
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
        }}
      >
        <header style={{ marginBottom: "24px" }}>
          <h1
            style={{
              fontSize: "32px",
              fontWeight: 700,
              marginBottom: "6px",
            }}
          >
            🤖 Console multi-agents Sync
          </h1>
          <p
            style={{
              fontSize: "14px",
              opacity: 0.8,
            }}
          >
            Sélectionne un agent, envoie un message, et vérifie que le backend Sync GPT Hub
            répond correctement avant d’intégrer ça dans n8n / Zapier / ton CRM.
          </p>
        </header>

        {/* Zone de contrôle */}
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginBottom: "24px",
          }}
        >
          <label
            style={{
              fontSize: "13px",
              fontWeight: 500,
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            Agent
            <select
              value={agent}
              onChange={(e) => setAgent(e.target.value)}
              style={{
                background: "#020617",
                color: "#e5e7eb",
                borderRadius: "8px",
                border: "1px solid #334155",
                padding: "8px 10px",
                fontSize: "14px",
              }}
            >
              {AGENTS.map((a) => (
                <option key={a.key} value={a.key}>
                  {a.label}
                </option>
              ))}
            </select>
          </label>

          <label
            style={{
              fontSize: "13px",
              fontWeight: 500,
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            Message
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Pose ta question à l’agent (Ctrl+Enter pour envoyer)…"
              rows={4}
              style={{
                background: "#020617",
                color: "#e5e7eb",
                borderRadius: "8px",
                border: "1px solid #334155",
                padding: "10px",
                fontSize: "14px",
                resize: "vertical",
              }}
            />
          </label>

          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <button
              type="button"
              onClick={handleSend}
              disabled={loading || !message.trim()}
              style={{
                padding: "8px 16px",
                borderRadius: "999px",
                border: "none",
                fontSize: "14px",
                fontWeight: 600,
                cursor: loading || !message.trim() ? "not-allowed" : "pointer",
                opacity: loading || !message.trim() ? 0.5 : 1,
                background:
                  "linear-gradient(135deg, #22c55e, #16a34a)",
                color: "#020617",
                boxShadow: "0 10px 25px rgba(34,197,94,0.35)",
              }}
            >
              {loading ? "Envoi..." : "Envoyer à l’agent"}
            </button>

            <span
              style={{
                fontSize: "12px",
                opacity: 0.7,
              }}
            >
              Raccourci : <code>Ctrl+Enter</code> / <code>Cmd+Enter</code>
            </span>
          </div>

          {error && (
            <div
              style={{
                marginTop: "4px",
                padding: "8px 10px",
                borderRadius: "8px",
                background: "rgba(248,113,113,0.1)",
                border: "1px solid rgba(248,113,113,0.4)",
                fontSize: "12px",
              }}
            >
              ❌ Erreur : {error}
            </div>
          )}
        </section>

        {/* Résultat + debug */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.5fr)",
            gap: "16px",
          }}
        >
          <div
            style={{
              borderRadius: "12px",
              border: "1px solid #1e293b",
              background: "rgba(15,23,42,0.9)",
              padding: "14px 16px",
            }}
          >
            <h2
              style={{
                fontSize: "14px",
                marginBottom: "8px",
                opacity: 0.85,
              }}
            >
              🧾 Réponse de l’agent
            </h2>
            <div
              style={{
                minHeight: "140px",
                whiteSpace: "pre-wrap",
                fontSize: "14px",
                lineHeight: 1.5,
              }}
            >
              {responseText || (
                <span style={{ opacity: 0.5 }}>
                  Envoie un message pour voir la réponse ici.
                </span>
              )}
            </div>
          </div>

          <div
            style={{
              borderRadius: "12px",
              border: "1px solid #1e293b",
              background: "rgba(15,23,42,0.9)",
              padding: "14px 16px",
            }}
          >
            <h2
              style={{
                fontSize: "14px",
                marginBottom: "8px",
                opacity: 0.85,
              }}
            >
              🧩 Debug JSON (retour brut de /api/chat)
            </h2>
            <pre
              style={{
                fontSize: "11px",
                lineHeight: 1.45,
                maxHeight: "220px",
                overflow: "auto",
                background: "#020617",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              {rawJson || "{ }"}
            </pre>
          </div>
        </section>
      </div>
    </main>
  );
}
