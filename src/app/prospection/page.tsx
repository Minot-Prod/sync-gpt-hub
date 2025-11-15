import * as React from "react";
import Link from "next/link";
import { AppShell } from "../../components/layout/AppShell";
import { Card } from "../../components/ui/Card";
import { SectionHeader } from "../../components/ui/SectionHeader";

const sequences = [
  {
    name: "Cold email ICP France",
    steps: "3 étapes · Email",
    status: "Actif",
  },
  {
    name: "Relance LinkedIn warm",
    steps: "4 étapes · LinkedIn",
    status: "Actif",
  },
  {
    name: "Séquence multi-touch SDR",
    steps: "6 étapes · Email + LinkedIn",
    status: "Bêta",
  },
];

const pipelineStats = [
  { label: "Nouveaux leads", value: "42", hint: "À qualifier par l’agent Prospection" },
  { label: "Engagés", value: "18", hint: "Ont répondu ou cliqué" },
  { label: "Opportunités", value: "7", hint: "À transmettre aux closers" },
];

export default function Page() {
  return (
    <AppShell
      title="Prospection"
      subtitle="Pilote les séquences et le flux de leads générés par les agents IA."
    >
      <div className="stack" style={{ gap: "1.5rem" }}>
        {/* Séquences */}
        <section className="stack" style={{ gap: "1rem" }}>
          <SectionHeader
            title="Séquences de prospection"
            subtitle="Les scénarios actuellement pilotés par le hub."
            rightSlot={
              <button className="btn btn-ghost" type="button">
                Créer une nouvelle séquence
              </button>
            }
          />

          <Card>
            <div className="stack" style={{ gap: "0.75rem" }}>
              {sequences.map((seq) => (
                <div
                  key={seq.name}
                  className="row row--spread"
                  style={{ alignItems: "flex-start" }}
                >
                  <div>
                    <div style={{ fontWeight: 500 }}>{seq.name}</div>
                    <div
                      className="text-muted"
                      style={{ fontSize: "0.85rem" }}
                    >
                      {seq.steps}
                    </div>
                  </div>
                  <span className="badge badge-pill">{seq.status}</span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Pipeline + Assistant */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.6fr) minmax(0, 1.4fr)",
            gap: "1.5rem",
          }}
        >
          {/* Pipeline */}
          <Card>
            <SectionHeader
              title="Pipeline de leads"
              subtitle="Vue macro des volumes à chaque étape."
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "1rem",
              }}
            >
              {pipelineStats.map((stat) => (
                <div key={stat.label} className="stack" style={{ gap: "0.25rem" }}>
                  <div className="text-muted" style={{ fontSize: "0.8rem" }}>
                    {stat.label}
                  </div>
                  <div style={{ fontSize: "1.4rem", fontWeight: 600 }}>
                    {stat.value}
                  </div>
                  <div
                    className="text-muted"
                    style={{ fontSize: "0.8rem", lineHeight: 1.4 }}
                  >
                    {stat.hint}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Assistant IA Prospection */}
          <Card soft>
            <SectionHeader
              title="Assistant IA Prospection"
              subtitle="Laisse l’agent préparer le prochain mouvement."
            />
            <div className="stack" style={{ gap: "0.75rem" }}>
              <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                Utilise cet assistant pour générer des séquences ou ajuster les
                paramètres d’un scénario existant avant de le pousser à ton
                équipe.
              </p>
              <ul
                className="text-muted"
                style={{
                  margin: 0,
                  paddingLeft: "1.1rem",
                  fontSize: "0.85rem",
                }}
              >
                <li>Définir une nouvelle séquence ciblée sur un segment précis.</li>
                <li>Adapter les messages à un nouveau persona ou territoire.</li>
                <li>Demander une revue IA des résultats de la semaine.</li>
              </ul>
              <div style={{ marginTop: "0.75rem" }}>
                <Link
                  href="/assistant?agent=prospection"
                  className="btn btn-primary"
                >
                  Ouvrir l’agent Prospection (GPT)
                </Link>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
