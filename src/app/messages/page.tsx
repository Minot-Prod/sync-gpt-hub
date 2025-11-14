import ChatWindow from "@/components/ChatWindow";

export default function MessagesPage() {
  return (
    <ChatWindow
      agent="messages"
      title="Agent Rédaction & Scripts"
      subtitle="Courriels, messages LinkedIn et scripts d’appel adaptés à ton style."
      initialSystemHint="Dis pour qui tu écris, le canal (email/LinkedIn/appel) et l’objectif."
    />
  );
}
