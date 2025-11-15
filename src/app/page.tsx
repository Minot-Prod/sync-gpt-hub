import Link from "next/link";
import AgentCard from "@/components/AgentCard";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4 h-full">
      <section className="grid gap-4 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/90 p-5 shadow-xl shadow-black/50">
          <div className="absolute -top-24 right-0 h-56 w-56 rounded-full bg-emerald-500/25 blur-3xl pointer-events-none" />
          <div className="relative space-y-3">
            <h2 className="text-lg font-semibold tracking-tight text-neutral-50">
              Hub IA des ventes Sync
            </h2>
            <p className="max-w-xl text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Agents IA spécialisés pour la prospection, les messages, l'analyse
              client, le coaching et le radar d'opportunités. Alignés sur la
              réalité terrain de Sync Productions.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px]">
              <span className="rounded-full bg-emerald-500/15 text-emerald-300 px-2 py-0.5">
                Ciblage plus précis
              </span>
              <span className="rounded-full bg-cyan-500/15 text-cyan-300 px-2 py-0.5">
                Messages alignés Sync
              </span>
              <span className="rounded-full bg-neutral-900 px-2 py-0.5 text-neutral-300">
                Formation & coaching intégrés
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-emerald-500/40 bg-neutral-950/90 p-4 shadow-lg shadow-black/40">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-emerald-300">
                Onboarding IA
              </p>
              <h3 className="text-sm font-medium text-neutral-50">
                Professeur / Assistant IA
              </h3>
            </div>
            <span className="text-[10px] rounded-full bg-emerald-500/15 text-emerald-300 px-2 py-0.5">
              Recommandé
            </span>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Idéal pour installer le réflexe IA chez les vendeurs : apprendre
            comment parler à l'IA, structurer ses prompts et réutiliser les
            bonnes pratiques.
          </p>
          <Link
            href="/assistant"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 px-3 py-1.5 text-[11px] font-medium text-neutral-950 shadow-lg shadow-emerald-500/40 hover:shadow-emerald-500/70 transition"
          >
            Ouvrir l'agent Professeur
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <AgentCard
          id="prospection"
          label="Agent Prospection"
          description="Identifie des entreprises cibles, filtre par pertinence pour Sync et prépare des listes qualifiées pour la prospection."
          href="/prospection"
          badge="Ciblage marchés"
        />
        <AgentCard
          id="messages"
          label="Agent Messages & Scripts"
          description="Rédige des messages LinkedIn, e-mails et scripts d'appels alignés avec le ton Sync et ta personnalité de vendeur."
          href="/messages"
          badge="Copy & scripts"
        />
        <AgentCard
          id="analyse"
          label="Agent Analyse Client"
          description="Analyse une entreprise, ses valeurs, ses enjeux et propose des angles d'approche et des idées d'événements."
          href="/analyse"
          badge="Analyste"
        />
        <AgentCard
          id="coach"
          label="Agent Coach & Training"
          description="Pose des questions, challenge ta démarche commerciale et t'aide à installer le réflexe IA dans ton quotidien."
          href="/coach"
          badge="Coaching"
        />
        <AgentCard
          id="radar"
          label="Agent Radar Opportunités"
          description="Repère des signaux, événements récurrents et opportunités dans ton portefeuille ou un marché donné."
          href="/radar"
          badge="Radar"
        />
        <AgentCard
          id="assistant"
          label="Agent Professeur / Assistant IA"
          description="T'aide à mieux utiliser l'IA, reformule tes prompts et t'accompagne dans l'apprentissage des bons réflexes."
          href="/assistant"
          badge="Formation IA"
        />
      </section>
    </div>
  );
}
