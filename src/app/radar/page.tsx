import * as React from "react";
import Link from "next/link";
import { AppShell } from "../../components/layout/AppShell";
import { Card } from "../../components/ui/Card";
import { SectionHeader } from "../../components/ui/SectionHeader";

const ideas = [
  "Formats hybrides pour congrès B2B.",
  "Expériences immersives pour galas internes.",
  "Tendances audiovisuelles pour scènes corporatives.",
];

export default function Page() {
  return (
    <AppShell
      title="Radar"
      subtitle="Surveille les tendances et opportunités marché avec l’IA."
    >
      <div className="stack" style={{ gap: "1.5rem" }}>
        <section className="stack" style={{ gap: "1rem" }}>
          <SectionHeader
            title="Idées & tendances"
            subtitle="Pistes à explorer pour différencier Sync."
          />
          <Card>
            <ul
              className="text-muted"
              style={{ margin: 0, paddingLeft: "1.1rem", fontSize: "0.9rem" }}
            >
              {ideas.map((i) => (
                <li key={i} style={{ marginBottom: "0.35rem" }}>
                  {i}
                </li>
              ))}
            </ul>
          </Card>
        </section>

        <section>
          <Card soft>
            <SectionHeader
              title="Agent Radar (Zoé)"
              subtitle="T’inspire avec des idées actionnables pour Sync."
            />
            <p className="text-muted" style={{ fontSize: "0.9rem" }}>
              Zoé te donne des tendances concrètes adaptées à ton marché :
              formats d’événements, angles de différenciation, questions à poser
              aux clients pour trouver des opportunités.
            </p>
            <ul
              className="text-muted"
              style={{ margin: 0, paddingLeft: "1.1rem", fontSize: "0.85rem" }}
            >
              <li>Explorer de nouveaux types d’événements pour Sync.</li>
              <li>Adapter l’offre aux tendances actuelles au Québec.</li>
              <li>Trouver des idées pour surprendre un client fidèle.</li>
            </ul>
            <div style={{ marginTop: "0.75rem" }}>
              <Link href="/assistant?agent=radar" className="btn btn-primary">
                Ouvrir l’agent Radar (GPT)
              </Link>
            </div>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
