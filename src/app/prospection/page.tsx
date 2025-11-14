import ChatWindow from "@/components/ChatWindow";

export default function ProspectionPage() {
  return (
    <ChatWindow
      agent="prospection"
      title="Agent Prospection"
      subtitle="Trouver des entreprises et segments à cibler pour Sync."
      initialSystemHint="Donne le secteur, la région et le type d’événement que tu vises."
    />
  );
}
