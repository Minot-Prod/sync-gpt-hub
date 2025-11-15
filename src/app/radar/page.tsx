import Link from "next/link";
import ChatWindow from "@/components/ChatWindow";

export default function RadarPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            Zoé – Radar opportunités
          </h1>
          <p className="text-sm text-slate-400">
            Veille événements (galas, conférences, remises de prix…) pour détecter
            des opportunités 6 à 36 mois à l’avance pour Sync Productions.
          </p>
        </div>
        <Link
          href="/"
          className="text-xs text-slate-400 hover:text-slate-200 underline-offset-4 hover:underline"
        >
          ← Retour au Hub
        </Link>
      </div>

      <ChatWindow
        agent="radar"
        title="Zoé – Radar opportunités"
        subtitle="Trouver des événements où Sync peut vendre ses services."
        initialSystemHint="Précise la zone (Montréal, Québec, Canada…), le type d’événements (galas, conférences, remises de prix…) et l’horizon (6–12 mois, 12–24 mois, etc.)."
      />
    </div>
  );
}
