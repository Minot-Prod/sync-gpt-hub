import ChatWindow from "@/components/ChatWindow";

export default function AnalysePage() {
  return (
    <ChatWindow
      agent="analyse"
      title="Analyste d’entreprise"
      subtitle="Comprendre un prospect et préparer un pitch Sync."
      initialSystemHint="Donne le nom de l’entreprise, une URL si tu l’as, et le type d’événement visé."
    />
  );
}
