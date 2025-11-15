import * as React from "react";
import Link from "next/link";
import { AppShell } from "../../components/layout/AppShell";
import { Card } from "../../components/ui/Card";
import { SectionHeader } from "../../components/ui/SectionHeader";

const analyses = [
  { company: "Entreprise A", note: "Client régulier · fort potentiel upsell." },
  { company: "Agence B", note: "Agence événementielle · bon fit Sync." },
  { company: "Groupe C", note: "Grand groupe · cible pour galas annuels." },
];

export default function Page() {
  return (
    <AppShell
      title="Analyse"
      subtitle="Décode les entreprises et prépare tes angles de pitch avec l’IA."
    >
      <div className="stack" style={{ gap: "1.5rem" }}>
        <section className="stack" style={{ gap: "1rem" }}>
          <SectionHeader
            title="Analyses récentes"
            subtitle="Synthèses et opportunités déjà préparées."
          />
          <Card>
            <div className="stack" style={{ gap: "0.75rem" }}>
              {analyses.map((a) => (
                <div key={a.company} className="stack" style={{ gap: "0.25rem" }}>
                  <div style={{ fontWeight: 500 }}>{a.company}</div>
                  <div
                    className="text-muted"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {a.note}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.4fr)",
            gap: "1.5rem",
          }}
        >
          <Card>
            <SectionHeader
              title="Dossiers clients"
              subtitle="Structure les infos clés avant un rendez-vous."
            />
            <p className="text-muted" style={{ fontSize: "0.9rem" }}>
              Note les infos importantes sur chaque client : type d’événements,
              budget probable, style, enjeux. L’agent Analyse peut t’aider à
              transformer ça en angles de pitch concrets.
            </p>
          </Card>

          <Card soft>
            <SectionHeader
              title="Agent Analyse (Alex)"
              subtitle="Comprendre un client et préparer ton discours."
            />
            <p className="text-muted" style={{ fontSize: "0.9rem" }}>
              Alex analyse le profil d’une entreprise et t’aide à voir où Sync
              apporte le plus de valeur. Tu peux lui coller du texte, un site,
              une description, et il te sort un plan clair.
            </p>
            <ul
              className="text-muted"
              style={{ margin: 0, paddingLeft: "1.1rem", fontSize: "0.85rem" }}
            >
              <li>Résumer un site web client en points utiles pour la vente.</li>
              <li>Identifier 2–3 angles de pitch crédibles pour Sync.</li>
              <li>Préparer des questions intelligentes pour le rendez-vous.</li>
            </ul>
            <div style={{ marginTop: "0.75rem" }}>
              <Link href="/assistant?agent=analyse" className="btn btn-primary">
                Ouvrir l’agent Analyse (GPT)
              </Link>
            </div>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
