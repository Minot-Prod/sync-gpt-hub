import * as React from "react";
import Link from "next/link";
import { AppShell } from "../../components/layout/AppShell";
import { Card } from "../../components/ui/Card";
import { SectionHeader } from "../../components/ui/SectionHeader";

const templates = [
  {
    title: "Cold email gala annuel",
    context: "Prospection à froid · Grandes entreprises",
  },
  {
    title: "Relance après soumission",
    context: "Suivi · Clients chauds",
  },
  {
    title: "Message LinkedIn d’ouverture",
    context: "Social selling · Décideurs marketing",
  },
];

export default function Page() {
  return (
    <AppShell
      title="Messages"
      subtitle="Centralise les scripts, courriels et messages LinkedIn générés par l’IA."
    >
      <div className="stack" style={{ gap: "1.5rem" }}>
        <section className="stack" style={{ gap: "1rem" }}>
          <SectionHeader
            title="Templates récents"
            subtitle="Bases de messages que tu peux réutiliser et adapter."
          />
          <Card>
            <div className="stack" style={{ gap: "0.75rem" }}>
              {templates.map((tpl) => (
                <div
                  key={tpl.title}
                  className="row row--spread"
                  style={{ alignItems: "flex-start" }}
                >
                  <div>
                    <div style={{ fontWeight: 500 }}>{tpl.title}</div>
                    <div
                      className="text-muted"
                      style={{ fontSize: "0.85rem" }}
                    >
                      {tpl.context}
                    </div>
                  </div>
                  <span className="badge">Script IA</span>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.6fr) minmax(0, 1.4fr)",
            gap: "1.5rem",
          }}
        >
          <Card>
            <SectionHeader
              title="Boîte à messages"
              subtitle="Visualise comment l’IA structure tes scripts."
            />
            <p className="text-muted" style={{ fontSize: "0.9rem" }}>
              Utilise cette vue pour garder une trace des meilleurs scripts :
              objets d’email, accroches LinkedIn, relances, etc. Tu peux ensuite
              les retravailler avec l’agent Messages.
            </p>
          </Card>

          <Card soft>
            <SectionHeader
              title="Agent Messages (Nico)"
              subtitle="Rédaction & optimisation de tes messages commerciaux."
            />
            <p className="text-muted" style={{ fontSize: "0.9rem" }}>
              Nico t’aide à écrire des messages qui sonnent juste : courriels,
              LinkedIn, scripts d’appel. Tu lui donnes le contexte, il te
              propose plusieurs versions prêtes à envoyer.
            </p>
            <ul
              className="text-muted"
              style={{ margin: 0, paddingLeft: "1.1rem", fontSize: "0.85rem" }}
            >
              <li>Écrire un message d’ouverture pour un nouveau prospect.</li>
              <li>Reformuler un courriel trop lourd ou trop froid.</li>
              <li>Adapter le ton à Pascal, Dan ou un autre vendeur.</li>
            </ul>
            <div style={{ marginTop: "0.75rem" }}>
              <Link
                href="/assistant?agent=messages"
                className="btn btn-primary"
              >
                Ouvrir l’agent Messages (GPT)
              </Link>
            </div>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
