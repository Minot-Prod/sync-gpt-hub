import Link from "next/link";
import AgentCard from "@/components/AgentCard";

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="mb-1 text-2xl font-semibold tracking-tight">
          Hub Sync – Agents IA Ventes
        </h1>
        <p className="max-w-2xl text-sm text-slate-300">
          Choisis un agent selon ce que tu veux faire : trouver des entreprises,
          rédiger des messages, analyser un client ou te faire coacher.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link href="/prospection">
          <AgentCard
            title="Prospection"
            badge="Agent"
            description="Trouver des entreprises cibles, segments et pistes de développement pour Sync."
          />
        </Link>

        <Link href="/messages">
          <AgentCard
            title="Rédaction & Scripts"
            badge="Agent"
            description="Générer des emails, messages LinkedIn et scripts d’appel alignés Sync."
          />
        </Link>

        <Link href="/analyse">
          <AgentCard
            title="Analyste d’entreprise"
            badge="Agent"
            description="Comprendre un prospect et préparer un pitch événementiel."
          />
        </Link>

        <Link href="/coach">
          <AgentCard
            title="Coach IA Vente"
            badge="Coach"
            description="Améliorer ta façon d’utiliser l’IA et structurer ta prospection."
          />
        </Link>
      </div>
    </div>
  );
}
