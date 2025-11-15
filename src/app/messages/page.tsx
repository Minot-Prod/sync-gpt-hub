import ChatWindow from "@/components/ChatWindow";

export default function MessagesPage() {
  return (
    <div className="h-[calc(100vh-150px)]">
      <ChatWindow
        title="Agent Messages & Scripts"
        subtitle="Génère des messages LinkedIn, e-mails, scripts d'appels et relances alignés avec la culture Sync et ta façon de parler."
        agentId="messages"
        placeholder="Explique ton contexte (prospect, canal, objectif) ou colle un message brut à améliorer."
        contextBadges={["LinkedIn", "E-mails", "Scripts d'appel"]}
        toneBadge="Naturel, humain, efficace"
      />
    </div>
  );
}
