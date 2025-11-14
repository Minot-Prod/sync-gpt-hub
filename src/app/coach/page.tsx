import Link from "next/link";
import ChatWindow from "@/components/ChatWindow";

export default function CoachPage() {
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
        agent="coach"
        title="Coach IA Vente"
        subtitle="Améliorer ta méthode, tes prompts et ta prospection."
        initialSystemHint="Explique comment tu fais ta prospection aujourd’hui ou colle un message type."
      />
    </div>
  );
}
