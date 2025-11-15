import ChatWindow from "@/components/ChatWindow";

export default function AssistantPage() {
  return (
    <div className="h-[calc(100vh-150px)]">
      <ChatWindow
        title="Agent Professeur / Assistant IA"
        subtitle="Forme les utilisateurs à parler à l'IA, reformule les prompts et accompagne la mise en place de bons réflexes IA au quotidien."
        agentId="assistant"
        placeholder="Explique ce que tu veux faire avec l'IA, colle un prompt maladroit ou demande un entraînement concret."
        contextBadges={["Formation IA", "Amélioration de prompts", "Onboarding"]}
        toneBadge="Pédagogue, très clair"
      />
    </div>
  );
}
