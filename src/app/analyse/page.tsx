import Link from "next/link";
import ChatWindow from "@/components/ChatWindow";

export default function AnalysePage() {
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
        agent="analyse"
        title="Analyste d’entreprise"
        subtitle="Comprendre un prospect et préparer un pitch Sync."
        initialSystemHint="Donne le nom de l’entreprise, une URL si tu l’as, et le type d’événement visé."
      />
    </div>
  );
}
