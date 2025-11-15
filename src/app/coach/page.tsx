import ChatWindow from "@/components/ChatWindow";

export default function CoachPage() {
  return (
    <div className="h-[calc(100vh-150px)]">
      <ChatWindow
        title="Agent Coach & Training"
        subtitle="Te pose les bonnes questions, challenge ta démarche commerciale et t'aide à installer le réflexe IA dans ton quotidien."
        agentId="coach"
        placeholder="Décris ta situation (pipeline, blocage, nouveau segment) ou demande un plan d'entraînement IA."
        contextBadges={["Coaching ventes", "Habitudes IA", "Feedback"]}
        toneBadge="Coach, bienveillant mais franc"
      />
    </div>
  );
}
