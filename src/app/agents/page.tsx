import * as React from "react";
import { AppShell } from "../../components/layout/AppShell";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { SectionHeader } from "../../components/ui/SectionHeader";
import { syncAgents } from "../../lib/agents-sync";

const agentsList = Object.values(syncAgents);

export default function Page() {
  return (
    <AppShell
      title="Hub Sync – Agents IA Ventes"
      subtitle="Choisis un agent selon ce que tu veux faire : trouver des entreprises, rédiger des messages, analyser un client, te faire coacher ou repérer des opportunités."
    >
      <div className="stack" style={{ gap: "1.5rem" }}>
        <section className="stack" style={{ gap: "1rem" }}>
          <SectionHeader
            title="Agents IA pour ventes"
            subtitle="Chaque agent est spécialisé sur une partie du travail de vente. Tu peux les utiliser séparément ou les combiner."
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {agentsList.map((agent) => (
              <Card key={agent.id}>
                <div className="stack" style={{ gap: "0.5rem" }}>
                  <div className="row" style={{ alignItems: "center", gap: "0.6rem" }}>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "999px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.3rem",
                        background: "rgba(15, 23, 42, 0.9)",
                        border: "1px solid rgba(148, 163, 184, 0.4)",
                      }}
                    >
                      <span>{agent.avatar}</span>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{agent.name}</div>
                      <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                        {agent.tagline}
                      </div>
                    </div>
                  </div>

                  <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                    {agent.role.split("\n").slice(0, 4).join(" ")}
                  </div>

                  <div className="stack" style={{ gap: "0.35rem" }}>
                    <span className="text-muted" style={{ fontSize: "0.8rem" }}>
                      Exemples d’utilisation :
                    </span>
                    <ul
                      className="text-muted"
                      style={{
                        margin: 0,
                        paddingLeft: "1.1rem",
                        fontSize: "0.8rem",
                      }}
                    >
                      {agent.examples.slice(0, 2).map((ex) => (
                        <li key={ex} style={{ marginBottom: "0.25rem" }}>
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ marginTop: "0.5rem" }}>
                    <Button variant="ghost">
                      Ouvrir l’agent {agent.id}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}



