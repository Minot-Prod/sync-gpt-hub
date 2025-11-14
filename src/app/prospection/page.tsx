import Link from "next/link";
import ChatWindow from "@/components/ChatWindow";

export default function ProspectionPage() {
  return (
    <div className="space-y-4">
      <div>
        <Link
          href="/"
          className="text-xs text-slate-400 hover:text-cyan-400 transition"
        >
          ← Retour au Hub
        </Link>
      </div>
      <ChatWindow
        agent="prospection"
        title="Agent Prospection"
        subtitle="Trouver des entreprises et segments à cibler pour Sync."
        initialSystemHint="Donne le secteur, la région et le type d’événement que tu vises."
      />
    </div>
  );
}
