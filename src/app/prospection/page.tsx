import * as React from "react";
import { AppShell } from "../../components/layout/AppShell";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { SectionHeader } from "../../components/ui/SectionHeader";

const sequences = [
  {
    name: "Cold email ICP France",
    status: "Actif",
    steps: 5,
    channel: "Email",
  },
  {
    name: "Relance LinkedIn warm",
    status: "Actif",
    steps: 4,
    channel: "LinkedIn",
  },
  {
    name: "Séquence multi-touch SDR",
    status: "Bêta",
    steps: 6,
    channel: "Email + LinkedIn",
  },
];

const pipelines = [
  { stage: "Nouveaux leads", count: 42, hint: "À qualifier par l’agent Prospection" },
  { stage: "Engagés", count: 18, hint: "Ont répondu ou cliqué" },
  { stage: "Opportunités", count: 7, hint: "À transmettre aux closers" },
];

export default function Page() {
  return (
    <AppShell
      title="Prospection"
      subtitle="Pilote les séquences et le flux de leads générés par les agents IA."
    >
      <div className="stack" style={{ gap: "1.5rem" }}>
        {/* Séquences actives */}
        <section className="stack" style={{ gap: "1rem" }}>
          <SectionHeader
            title="Séquences de prospection"
            subtitle="Les scénarios actuellement pilotés par le hub."
            rightSlot={
              <Button variant="primary">
                Créer une nouvelle séquence
              </Button>
            }
          />
          <Card soft>
            <div className="stack" style={{ gap: "0.75rem" }}>
              {sequences.map((seq) => (
                <div
                  key={seq.name}
                  className="row row--spread"
                  style={{ alignItems: "flex-start" }}
                >
                  <div>
                    <div style={{ fontWeight: 500 }}>{seq.name}</div>
                    <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                      {seq.steps} étapes · {seq.channel}
                    </div>
                  </div>
                  <span className="badge badge-pill">
                    {seq.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Pipeline */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.4fr)",
            gap: "1.5rem",
          }}
        >
          <div className="stack" style={{ gap: "1rem" }}>
            <SectionHeader
              title="Pipeline de leads"
              subtitle="Vue macro des volumes à chaque étape."
            />
            <Card>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "1rem",
                }}
              >
                {pipelines.map((p) => (
                  <div key={p.stage} className="stack" style={{ gap: "0.35rem" }}>
                    <div className="text-muted" style={{ fontSize: "0.8rem" }}>
                      {p.stage}
                    </div>
                    <div style={{ fontSize: "1.4rem", fontWeight: 600 }}>
                      {p.count}
                    </div>
                    <div className="text-muted" style={{ fontSize: "0.8rem" }}>
                      {p.hint}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Bloc IA */}
          <div className="stack" style={{ gap: "1rem" }}>
            <SectionHeader
              title="Assistant IA Prospection"
              subtitle="Laisse l’agent préparer le prochain mouvement."
            />
            <Card>
              <div className="stack" style={{ gap: "0.75rem" }}>
                <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                  Utilise cet assistant pour générer des séquences ou ajuster les paramètres
                  d’un scénario existant avant de le pousser à ton équipe.
                </p>
                <div>
                  <Button variant="primary">
                    Ouvrir l’agent Prospection
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
