import * as React from "react";
import { AppShell } from "../../components/layout/AppShell";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { SectionHeader } from "../../components/ui/SectionHeader";

const kpis = [
  {
    label: "Taux de réponse global",
    value: "24%",
    hint: "Tous canaux confondus sur les 30 derniers jours.",
  },
  {
    label: "RDV générés",
    value: "17",
    hint: "Meetings attribués à Sync GPT Hub.",
  },
  {
    label: "Temps gagné",
    value: "+9h / semaine",
    hint: "Estimation sur la base des tâches automatisées.",
  },
];

const reports = [
  {
    title: "Performance par séquence",
    desc: "Compare le taux d’ouverture, de clic et de réponse pour chaque séquence.",
  },
  {
    title: "Analyse par persona",
    desc: "Identifie les personas qui réagissent le mieux à tes messages actuels.",
  },
  {
    title: "Analyse par canal",
    desc: "Répartition Email / LinkedIn / autres canaux et impact dans le pipeline.",
  },
];

const insights = [
  "Les séquences multi-touch obtiennent 1.7x plus de réponses que les séquences mono-canal.",
  "Les messages courts en ouverture performent mieux sur les décideurs C-level.",
  "Les relances au jour 3 et 7 génèrent la majorité des réponses positives.",
];

export default function Page() {
  return (
    <AppShell
      title="Analyse"
      subtitle="Comprends ce que tes agents IA produisent réellement en termes de business."
    >
      <div className="stack" style={{ gap: "1.5rem" }}>
        {/* KPIs principaux */}
        <section>
          <SectionHeader
            title="KPIs clés"
            subtitle="Vue d’ensemble des résultats générés par Sync GPT Hub."
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1rem",
            }}
          >
            {kpis.map((kpi) => (
              <Card key={kpi.label}>
                <p className="text-muted" style={{ marginBottom: "0.35rem" }}>
                  {kpi.label}
                </p>
                <div
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: 600,
                    marginBottom: "0.25rem",
                  }}
                >
                  {kpi.value}
                </div>
                <p className="text-muted" style={{ fontSize: "0.85rem" }}>
                  {kpi.hint}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Rapports & insights */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.4fr)",
            gap: "1.5rem",
          }}
        >
          {/* Rapports dispo */}
          <div className="stack" style={{ gap: "1rem" }}>
            <SectionHeader
              title="Rapports disponibles"
              subtitle="Les vues que tu peux générer ou envoyer à ton board."
              rightSlot={
                <Button variant="ghost">
                  Exporter en PDF
                </Button>
              }
            />
            <Card soft>
              <div className="stack" style={{ gap: "0.75rem" }}>
                {reports.map((report) => (
                  <div
                    key={report.title}
                    className="stack"
                    style={{ gap: "0.35rem", paddingBottom: "0.5rem", borderBottom: "1px solid rgba(148, 163, 184, 0.2)" }}
                  >
                    <div style={{ fontWeight: 500 }}>{report.title}</div>
                    <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                      {report.desc}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Bloc insights IA */}
          <div className="stack" style={{ gap: "1rem" }}>
            <SectionHeader
              title="Insights IA"
              subtitle="Observations prêtes à être partagées en réunion."
            />
            <Card>
              <div className="stack" style={{ gap: "0.75rem" }}>
                <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                  Ce bloc est pensé pour regrouper les points que Sync GPT remonte
                  automatiquement après analyse des campagnes, messages et pipelines.
                </p>
                <ul
                  className="text-muted"
                  style={{
                    margin: 0,
                    paddingLeft: "1.1rem",
                    fontSize: "0.85rem",
                  }}
                >
                  {insights.map((insight) => (
                    <li key={insight} style={{ marginBottom: "0.35rem" }}>
                      {insight}
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: "1rem" }}>
                  <Button variant="primary">
                    Générer un rapport complet
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



