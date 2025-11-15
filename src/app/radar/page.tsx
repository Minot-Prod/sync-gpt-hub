import * as React from "react";
import { AppShell } from "../../components/layout/AppShell";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { SectionHeader } from "../../components/ui/SectionHeader";

const signals = [
  {
    label: "Nouvelle interaction LinkedIn",
    source: "LinkedIn",
    detail: "3 décideurs ont visité la page Sync GPT / Hub Sales cette semaine.",
    urgency: "À surveiller",
  },
  {
    label: "Pics d’ouverture emails",
    source: "Email",
    detail: "Taux d’ouverture anormalement élevé sur la séquence SDR Europe.",
    urgency: "À creuser",
  },
  {
    label: "Retour positif sur démo",
    source: "CRM",
    detail: "Deux prospects ont demandé un plan de déploiement pour leurs équipes.",
    urgency: "Chaude",
  },
];

const watchlist = [
  {
    name: "Comptes stratégiques",
    count: 12,
    desc: "Grandes structures où Sync GPT pourrait devenir la stack standard.",
  },
  {
    name: "Startups série A/B",
    count: 27,
    desc: "Équipes sales en train de se structurer, besoin de productivité.",
  },
  {
    name: "Agences partenaires",
    count: 9,
    desc: "Relais potentiels pour distribuer Sync GPT à leurs clients.",
  },
];

const actions = [
  "Proposer un atelier 'stack IA sales' aux comptes chauds du moment.",
  "Identifier les signaux LinkedIn qui précèdent le plus souvent une demande de démo.",
  "Créer une séquence spéciale pour les prospects qui consultent plusieurs fois ta page pricing.",
];

export default function Page() {
  return (
    <AppShell
      title="Radar"
      subtitle="Surveille les signaux faibles et les opportunités détectées par tes agents."
    >
      <div className="stack" style={{ gap: "1.5rem" }}>
        {/* Signaux en temps réel */}
        <section>
          <SectionHeader
            title="Signaux détectés"
            subtitle="Les signaux récents que Sync GPT remonte pour ton funnel."
            rightSlot={
              <Button variant="ghost">
                Rafraîchir le radar
              </Button>
            }
          />
          <Card soft>
            <div className="stack" style={{ gap: "0.75rem" }}>
              {signals.map((signal) => (
                <div
                  key={signal.label}
                  className="stack"
                  style={{
                    gap: "0.35rem",
                    paddingBottom: "0.5rem",
                    borderBottom: "1px solid rgba(148, 163, 184, 0.2)",
                  }}
                >
                  <div className="row row--spread">
                    <div style={{ fontWeight: 500 }}>{signal.label}</div>
                    <span className="badge badge-pill">{signal.urgency}</span>
                  </div>
                  <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                    Source : {signal.source}
                  </div>
                  <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                    {signal.detail}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Watchlist & actions IA */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.4fr)",
            gap: "1.5rem",
          }}
        >
          {/* Watchlist */}
          <div className="stack" style={{ gap: "1rem" }}>
            <SectionHeader
              title="Watchlist"
              subtitle="Les segments et comptes à garder sous surveillance."
            />
            <Card>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "1rem",
                }}
              >
                {watchlist.map((item) => (
                  <div key={item.name} className="stack" style={{ gap: "0.35rem" }}>
                    <div style={{ fontWeight: 500 }}>{item.name}</div>
                    <div style={{ fontSize: "1.4rem", fontWeight: 600 }}>
                      {item.count}
                    </div>
                    <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                      {item.desc}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Bloc IA Radar */}
          <div className="stack" style={{ gap: "1rem" }}>
            <SectionHeader
              title="Assistant IA Radar"
              subtitle="Transforme les signaux en plan d’attaque concret."
            />
            <Card>
              <div className="stack" style={{ gap: "0.75rem" }}>
                <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                  Utilise le radar pour faire remonter automatiquement les comptes et signaux
                  qui méritent une action humaine : séquences spéciales, relances manuelles,
                  ou passage au coach / manager.
                </p>
                <ul
                  className="text-muted"
                  style={{
                    margin: 0,
                    paddingLeft: "1.1rem",
                    fontSize: "0.85rem",
                  }}
                >
                  {actions.map((action) => (
                    <li key={action} style={{ marginBottom: "0.35rem" }}>
                      {action}
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: "1rem" }}>
                  <Button variant="primary">
                    Générer un plan d’actions
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
