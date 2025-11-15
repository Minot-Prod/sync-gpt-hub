import * as React from "react";
import { AppShell } from "../../components/layout/AppShell";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { SectionHeader } from "../../components/ui/SectionHeader";

const reviews = [
  {
    title: "Séquence SDR Europe",
    level: "Priorité haute",
    summary: "Le ton est bon mais certains messages sont trop longs et manquent de clarté.",
  },
  {
    title: "Script de relance warm",
    level: "Correct",
    summary: "Bonne structure globale, mais manque d’ancrage sur les pain points métier.",
  },
  {
    title: "Message LinkedIn d’ouverture",
    level: "À améliorer",
    summary: "Trop générique, peu différenciant par rapport aux autres approches sur le marché.",
  },
];

const coachingTips = [
  "Commencer par reformuler le contexte business du prospect avant de proposer ta solution.",
  "Limiter chaque message à une seule idée forte pour éviter la dilution du message.",
  "Terminer chaque script par un call-to-action simple et concret (call, démo, réponse courte).",
];

export default function Page() {
  return (
    <AppShell
      title="Coach"
      subtitle="Relectures, feedback et amélioration continue des scripts générés par l’IA."
    >
      <div className="stack" style={{ gap: "1.5rem" }}>
        {/* Relectures récentes */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 2fr) minmax(0, 1.4fr)",
            gap: "1.5rem",
          }}
        >
          <div className="stack" style={{ gap: "1rem" }}>
            <SectionHeader
              title="Relectures récentes"
              subtitle="Scripts passés au crible par le coach."
              rightSlot={
                <Button variant="primary">
                  Envoyer un script au coach
                </Button>
              }
            />
            <Card soft>
              <div className="stack" style={{ gap: "0.75rem" }}>
                {reviews.map((review) => (
                  <div
                    key={review.title}
                    className="stack"
                    style={{
                      gap: "0.35rem",
                      paddingBottom: "0.5rem",
                      borderBottom: "1px solid rgba(148, 163, 184, 0.2)",
                    }}
                  >
                    <div className="row row--spread">
                      <div style={{ fontWeight: 500 }}>{review.title}</div>
                      <span className="badge badge-pill">{review.level}</span>
                    </div>
                    <div className="text-muted" style={{ fontSize: "0.85rem" }}>
                      {review.summary}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Tips généraux */}
          <div className="stack" style={{ gap: "1rem" }}>
            <SectionHeader
              title="Conseils de coaching"
              subtitle="Rappels clés à garder en tête pour chaque message."
            />
            <Card>
              <ul
                className="text-muted"
                style={{
                  margin: 0,
                  paddingLeft: "1.1rem",
                  fontSize: "0.85rem",
                }}
              >
                {coachingTips.map((tip) => (
                  <li key={tip} style={{ marginBottom: "0.4rem" }}>
                    {tip}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: "1rem" }}>
                <Button variant="ghost">
                  Voir un exemple annoté
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Bloc “avant / après” placeholder */}
        <section className="stack" style={{ gap: "1rem" }}>
          <SectionHeader
            title="Avant / Après coaching"
            subtitle="Visualiser l’impact concrèt des retouches proposées."
          />
          <Card>
            <div className="stack" style={{ gap: "0.75rem" }}>
              <p className="text-muted" style={{ fontSize: "0.9rem" }}>
                Cette zone pourra accueillir un comparatif visuel entre la version initiale
                d’un script et la version améliorée après passage par le coach (ou l’agent IA).
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
                  gap: "1rem",
                  fontSize: "0.85rem",
                }}
              >
                <div
                  style={{
                    padding: "0.75rem",
                    borderRadius: "0.75rem",
                    border: "1px solid rgba(148, 163, 184, 0.3)",
                    background: "rgba(15, 23, 42, 0.65)",
                  }}
                >
                  <div className="text-muted" style={{ marginBottom: "0.5rem" }}>
                    Version initiale
                  </div>
                  <div className="text-muted">
                    Bloc placeholder pour un exemple de script avant coaching.
                  </div>
                </div>
                <div
                  style={{
                    padding: "0.75rem",
                    borderRadius: "0.75rem",
                    border: "1px solid rgba(99, 102, 241, 0.6)",
                    background: "rgba(15, 23, 42, 0.9)",
                  }}
                >
                  <div className="text-muted" style={{ marginBottom: "0.5rem" }}>
                    Version coachée
                  </div>
                  <div className="text-muted">
                    Bloc placeholder pour la version retravaillée, plus claire et orientée résultat.
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}



