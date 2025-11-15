import * as React from "react";
import { AppShell } from "../../components/layout/AppShell";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { SectionHeader } from "../../components/ui/SectionHeader";

const inboxStats = [
  { label: "Messages à traiter", value: "19", hint: "Non lus ou en attente de réponse" },
  { label: "Réponses reçues", value: "7", hint: "Sur les 24 dernières heures" },
  { label: "Conversations prioritaires", value: "4", hint: "À escalader rapidement" },
];

const threads = [
  {
    contact: "Responsable achats · SaaS B2B",
    status: "Chaude",
    lastMessage: "Peut-on prévoir un call pour voir votre approche Sync GPT pour nos SDR ?",
  },
  {
    contact: "Directeur commercial · Industrie",
    status: "En cours",
    lastMessage: "Envoyez-moi un récap des cas clients et un exemple de séquence.",
  },
  {
    contact: "CEO · Startup série A",
    status: "À relancer",
    lastMessage: "Je regarde ça avec mon équipe et je reviens vers vous.",
  },
];

const suggestions = [
  "Synthétiser les 5 conversations les plus chaudes",
  "Préparer 3 réponses types à envoyer aux leads hésitants",
  "Identifier les messages à router vers le coach ou le manager",
];

export default function Page() {
  return (
    <AppShell
      title="Messages"
      subtitle="Centralise les échanges importants et laisse l’IA préparer tes prochaines réponses."
    >
      <div className="stack" style={{ gap: "1.5rem" }}>
        {/* Stats rapides */}
        <section>
          <SectionHeader
            title="Vue rapide"
            subtitle="État actuel de ta boîte de réception pilotée par Sync GPT."
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1rem",
            }}
          >
            {inboxStats.map((stat) => (
              <Card key={stat.label}>
                <p className="text-muted" style={{ marginBottom: "0.35rem" }}>
                  {stat.label}
                </p>
                <div
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: 600,
                    marginBottom: "0.25rem",
                  }}
                >
                  {stat.value}
                </div>
                <p className="text-muted" style={{ fontSize: "0.85rem" }}>
                  {stat.hint}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Conversations & IA */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.4fr)",
            gap: "1.5rem",
          }}
        >
          {/* Liste de conversations */}
          <div className="stack" style={{ gap: "1rem" }}>
            <SectionHeader
              title="Conversations en cours"
              subtitle="Les discussions qui comptent le plus pour le pipe."
              rightSlot={
                <Button variant="ghost">
                  Ouvrir la vue complète
                </Button>
              }
            />
            <Card soft>
              <div className="stack" style={{ gap: "0.75rem" }}>
                {threads.map((thread) => (
                  <div
                    key={thread.contact}
                    className="stack"
                    style={{ gap: "0.35rem", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(148, 163, 184, 0.2)" }}
                  >
                    <div className="row row--spread">
                      <div style={{ fontWeight: 500 }}>{thread.contact}</div>
                      <span className="badge badge-pill">{thread.status}</span>
                    </div>
                    <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                      {thread.lastMessage}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Assistant IA Messages */}
          <div className="stack" style={{ gap: "1rem" }}>
            <SectionHeader
              title="Assistant IA Messages"
              subtitle="Laisse l’agent préparer les réponses intelligentes."
            />
            <Card>
              <div className="stack" style={{ gap: "0.75rem" }}>
                <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                  L’agent Messages peut t’aider à résumer les échanges, proposer
                  des réponses adaptées au ton et à l’historique, et prioriser
                  les conversations qui ont le plus de valeur business.
                </p>
                <ul
                  className="text-muted"
                  style={{
                    margin: 0,
                    paddingLeft: "1.1rem",
                    fontSize: "0.85rem",
                  }}
                >
                  {suggestions.map((sugg) => (
                    <li key={sugg} style={{ marginBottom: "0.35rem" }}>
                      {sugg}
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: "1rem" }}>
                  <Button variant="primary">
                    Ouvrir l’agent Messages
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </AppShell>
  );
}



