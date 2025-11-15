import * as React from "react";
import { AppShell } from "../../components/layout/AppShell";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { SectionHeader } from "../../components/ui/SectionHeader";

const quickIntents = [
  "Rédiger un script de prospection pour un nouveau persona",
  "Refactorer un message trop long en version punchy",
  "Préparer un argumentaire pour un call de closing",
  "Synthétiser les retours prospects en 5 points actionnables",
];

const templates = [
  {
    name: "Brief de séquence",
    desc: "Structure pour décrire une séquence (cible, objectif, ton, canaux).",
  },
  {
    name: "Brief de script unique",
    desc: "Template rapide pour un message email / LinkedIn individuel.",
  },
  {
    name: "Brief d’analyse",
    desc: "Forme standardisée pour demander un rapport d’analyse à l’IA.",
  },
];

export default function Page() {
  return (
    <AppShell
      title="Assistant"
      subtitle="Un espace pour brainstormer, rédiger et tester rapidement des idées avec l’IA."
    >
      <div className="stack" style={{ gap: "1.5rem" }}>
        {/* Bloc principal assistant */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.7fr) minmax(0, 1.3fr)",
            gap: "1.5rem",
          }}
        >
          {/* Zone de travail assistant */}
          <div className="stack" style={{ gap: "1rem" }}>
            <SectionHeader
              title="Espace de travail"
              subtitle="Décris ce que tu veux que l’IA construise ou améliore."
              rightSlot={
                <Button variant="primary">
                  Démarrer une nouvelle session
                </Button>
              }
            />
            <Card>
              <div className="stack" style={{ gap: "0.75rem" }}>
                <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                  Cet assistant est pensé comme ton espace “bac à sable” :
                  tests de scripts, prompts rapides, idées de séquences… le tout
                  avant d’envoyer quoi que ce soit en prod vers les équipes.
                </p>
                <div
                  style={{
                    borderRadius: "0.75rem",
                    border: "1px solid rgba(148, 163, 184, 0.35)",
                    padding: "0.75rem 0.9rem",
                    background: "rgba(15, 23, 42, 0.65)",
                    fontSize: "0.9rem",
                  }}
                >
                  <span className="text-muted">
                    Zone saisie / interface IA réelle ici dans la version connectée.
                    Pour l’instant, cette page pose la structure UX et le ton.
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Intentions rapides */}
          <div className="stack" style={{ gap: "1rem" }}>
            <SectionHeader
              title="Intents rapides"
              subtitle="Exemples d’usages typiques de l’assistant."
            />
            <Card soft>
              <ul
                className="text-muted"
                style={{
                  margin: 0,
                  paddingLeft: "1.1rem",
                  fontSize: "0.9rem",
                }}
              >
                {quickIntents.map((intent) => (
                  <li key={intent} style={{ marginBottom: "0.4rem" }}>
                    {intent}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>

        {/* Templates & historique */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.4fr)",
            gap: "1.5rem",
          }}
        >
          {/* Templates */}
          <div className="stack" style={{ gap: "1rem" }}>
            <SectionHeader
              title="Templates de brief"
              subtitle="Standardise la manière de parler à l’IA pour avoir des résultats constants."
            />
            <Card>
              <div className="stack" style={{ gap: "0.75rem" }}>
                {templates.map((tpl) => (
                  <div
                    key={tpl.name}
                    className="stack"
                    style={{
                      gap: "0.35rem",
                      paddingBottom: "0.5rem",
                      borderBottom: "1px solid rgba(148, 163, 184, 0.2)",
                    }}
                  >
                    <div style={{ fontWeight: 500 }}>{tpl.name}</div>
                    <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                      {tpl.desc}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Historique (placeholder UX) */}
          <div className="stack" style={{ gap: "1rem" }}>
            <SectionHeader
              title="Historique des sessions"
              subtitle="Les derniers échanges importants avec l’assistant."
            />
            <Card>
              <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                Ici pourront apparaître les dernières sessions (scripts testés,
                prompts de brainstorming, analyses demandées). Pour l’instant,
                la page est prête à accueillir tes futures intégrations IA.
              </p>
              <div style={{ marginTop: "0.75rem" }}>
                <Button variant="ghost">
                  Voir l’historique complet
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
