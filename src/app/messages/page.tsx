import Link from "next/link";
import ChatWindow from "@/components/ChatWindow";

export default function MessagesPage() {
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
        agent="messages"
        title="Agent Rédaction & Scripts"
        subtitle="Courriels, messages LinkedIn et scripts d’appel adaptés à ton style."
        initialSystemHint="Dis pour qui tu écris, le canal (email/LinkedIn/appel) et l’objectif."
      />
    </div>
  );
}
