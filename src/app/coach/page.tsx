import ChatWindow from "@/components/ChatWindow";

export default function CoachPage() {
  return (
    <ChatWindow
      agent="coach"
      title="Coach IA Vente"
      subtitle="Améliorer ta méthode, tes prompts et ta prospection."
      initialSystemHint="Explique comment tu fais ta prospection aujourd’hui ou colle un message type."
    />
  );
}
