import * as React from "react";
import { AppShell } from "../../components/layout/AppShell";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { SectionHeader } from "../../components/ui/SectionHeader";

const metrics = [
  {
    label: "Agents actifs",
    value: "8",
    hint: "Prospection, scripts, coaching, radar",
  },
  {
    label: "Playbooks en prod",
    value: "14",
    hint: "Sync Sales / Sync Hub / Messages",
  },
  {
    label: "Séquences cette semaine",
    value: "32",
    hint: "Campagnes multi-agents",
  },
];

const nextActions = [
  {
    title: "Prioriser les comptes chauds",
    detail: "Analyser les signaux forts et classer les comptes à traiter aujourd’hui.",
  },
  {
    title: "Optimiser les scripts d’ouverture",
    detail: "Comparer les performances des messages d’accroche et tester une variante IA.",
  },
  {
    title: "Passer en revue le radar d’opportunités",
    detail: "Scanner les signaux LinkedIn / CRM et générer un plan d’attaque quotidien.",
  },
];

const agents = [
  { name: "Agent Prospection", status: "Actif", focus: "Cold email & LinkedIn" },
  { name: "Agent Scripts Sync", status: "Actif", focus: "Scripts adaptés à chaque persona" },
  { name: "Agent Coach", status: "Actif", focus: "Relecture et coaching des messages" },
  { name: "Agent Analyse", status: "Bêta", focus: "Rapports et synthèses pour le board" },
];

export default function Page() {
  return (
    <AppShell
      title="Dashboard Sync GPT Hub"
      subtitle="Vue d’ensemble des agents, des playbooks et des actions de vente pilotées par l’IA."
    >
      <div className="stack" style={{ gap: "1.5rem" }}>
        {/* Ligne de métriques */}
        <section>
          <SectionHeader
            title="Vue globale"
            subtitle="Résumé rapide de l’activité du hub."
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1rem",
            }}
          >
            {metrics.map((metric) => (
              <Card key={metric.label}>
                <p className="text-muted" style={{ marginBottom: "0.35rem" }}>
                  {metric.label}
                </p>
                <div
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: 600,
                    marginBottom: "0.25rem",
                  }}
                >
                  {metric.value}
                </div>
                <p className="text-muted" style={{ fontSize: "0.85rem" }}>
                  {metric.hint}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Agents & playbooks */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.4fr)",
            gap: "1.5rem",
          }}
        >
          <div className="stack" style={{ gap: "1rem" }}>
            <SectionHeader
              title="Agents & playbooks"
              subtitle="Ce que le hub peut déclencher pour ton équipe."
              rightSlot={
                <Button variant="ghost">
                  Voir tous les agents
                </Button>
              }
            />
            <Card soft>
              <div className="stack" style={{ gap: "0.75rem" }}>
                {agents.map((agent) => (
                  <div
                    key={agent.name}
                    className="row row--spread"
                    style={{ alignItems: "flex-start" }}
                  >
                    <div>
                      <div style={{ fontWeight: 500 }}>{agent.name}</div>
                      <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                        {agent.focus}
                      </div>
                    </div>
                    <span className="badge badge-pill">
                      {agent.status}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Prochaines actions */}
          <div className="stack" style={{ gap: "1rem" }}>
            <SectionHeader
              title="Prochaines actions"
              subtitle="3 actions IA qui ont le plus d’impact business aujourd’hui."
            />
            <Card>
              <div className="stack" style={{ gap: "0.75rem" }}>
                {nextActions.map((action) => (
                  <div key={action.title} className="stack">
                    <div style={{ fontWeight: 500 }}>{action.title}</div>
                    <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                      {action.detail}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: "1rem" }}>
                <Button variant="primary">
                  Lancer ces actions dans le hub
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
