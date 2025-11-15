import * as React from "react";
import Link from "next/link";
import { AppShell } from "../../components/layout/AppShell";
import { Card } from "../../components/ui/Card";
import { SectionHeader } from "../../components/ui/SectionHeader";

const topics = [
  "Formuler de meilleurs prompts pour la prospection.",
  "Utiliser l’IA pour préparer un rendez-vous client.",
  "Structurer sa journée de vente avec les agents Sync.",
];

export default function Page() {
  return (
    <AppShell
      title="Coach"
      subtitle="Apprends à utiliser l’IA dans ton quotidien de vente."
    >
      <div className="stack" style={{ gap: "1.5rem" }}>
        <section className="stack" style={{ gap: "1rem" }}>
          <SectionHeader
            title="Coaching IA"
            subtitle="Thèmes fréquents que tu peux travailler avec Sam."
          />
          <Card>
            <ul
              className="text-muted"
              style={{ margin: 0, paddingLeft: "1.1rem", fontSize: "0.9rem" }}
            >
              {topics.map((t) => (
                <li key={t} style={{ marginBottom: "0.35rem" }}>
                  {t}
                </li>
              ))}
            </ul>
          </Card>
        </section>

        <section>
          <Card soft>
            <SectionHeader
              title="Agent Coach (Sam)"
              subtitle="Un prof calme qui t’aide à mieux utiliser l’IA."
            />
            <p className="text-muted" style={{ fontSize: "0.9rem" }}>
              Sam te pose des questions, reformule ton objectif, puis te propose
              des prompts et des manières d’utiliser les autres agents
              (Prospection, Messages, Analyse, Radar).
            </p>
            <ul
              className="text-muted"
              style={{ margin: 0, paddingLeft: "1.1rem", fontSize: "0.85rem" }}
            >
              <li>Clarifier une situation de vente qui te bloque.</li>
              <li>Apprendre à enchaîner plusieurs agents dans un même flow.</li>
              <li>Améliorer ta façon de parler à l’IA au quotidien.</li>
            </ul>
            <div style={{ marginTop: "0.75rem" }}>
              <Link href="/assistant?agent=coach" className="btn btn-primary">
                Ouvrir l’agent Coach (GPT)
              </Link>
            </div>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
