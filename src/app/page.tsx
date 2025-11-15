// src/app/page.tsx
"use client";

import Link from "next/link";

const cards = [
  {
    href: "/prospection",
    title: "📞 Léa – Prospection",
    desc: "Ciblage, listes, angles d’approche pour lancer la machine commerciale.",
  },
  {
    href: "/coach",
    title: "🧠 Sam – Coach prospection",
    desc: "Structurer ta semaine, tes routines et tes objectifs de prospection.",
  },
  {
    href: "/analyse",
    title: "📊 Alex – Analyse",
    desc: "Analyser des sites / offres pour voir où Sync crée le plus de valeur.",
  },
  {
    href: "/radar",
    title: "📡 Zoé – Radar opportunités",
    desc: "Idées d’usages, secteurs prometteurs, scénarios avant / après.",
  },
  {
    href: "/messages",
    title: "💬 Bibliothèque de messages",
    desc: "Scripts, séquences et modèles produits par les agents.",
  },
  {
    href: "/assistant",
    title: "🤖 Console multi-agents",
    desc: "Une interface unique pour parler directement aux agents GPT.",
  },
];

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "60px 20px",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        background: "#050816",
        color: "#f9fafb",
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
        }}
      >
        <header style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1
            style={{
              fontSize: "40px",
              fontWeight: 700,
              marginBottom: "10px",
            }}
          >
            🚀 Sync GPT Hub — Pro Ready
          </h1>
          <p
            style={{
              fontSize: "18px",
              opacity: 0.9,
              maxWidth: "640px",
              margin: "0 auto",
            }}
          >
            Hub multi-agents de vente pour Sync.{" "}
            Le backend GPT tourne, tu peux maintenant piloter Léa, Nico, Alex, Sam
            et Zoé via l’API ou la console front.
          </p>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <article
                style={{
                  borderRadius: "16px",
                  border: "1px solid rgba(148, 163, 184, 0.3)",
                  background:
                    "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,64,175,0.5))",
                  padding: "18px 20px",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: "0 18px 40px rgba(15,23,42,0.7)",
                  transition: "transform 0.15s ease, box-shadow 0.15s ease",
                }}
              >
                <h2
                  style={{
                    fontSize: "18px",
                    marginBottom: "8px",
                    fontWeight: 600,
                  }}
                >
                  {card.title}
                </h2>
                <p
                  style={{
                    fontSize: "14px",
                    opacity: 0.95,
                    marginBottom: "10px",
                  }}
                >
                  {card.desc}
                </p>
                <span
                  style={{
                    fontSize: "13px",
                    opacity: 0.8,
                  }}
                >
                  ➜ Ouvrir
                </span>
              </article>
            </Link>
          ))}
        </section>

        <footer
          style={{
            marginTop: "40px",
            textAlign: "center",
            fontSize: "13px",
            opacity: 0.6,
          }}
        >
          Sync GPT Hub — mode labo activé.{" "}
          Backend : <code>/api/chat</code> · <code>/api/tts</code>
        </footer>
      </div>
    </main>
  );
}
