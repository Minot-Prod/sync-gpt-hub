import ChatWindow from "@/components/ChatWindow";

export default function RadarPage() {
  return (
    <div className="h-[calc(100vh-150px)]">
      <ChatWindow
        title="Agent Radar Opportunités"
        subtitle="Repère des signaux d'affaires, événements récurrents et nouvelles opportunités dans ton portefeuille ou un secteur donné."
        agentId="radar"
        placeholder="Décris ton portefeuille, un secteur ou colle des infos clients pour détecter des opportunités."
        contextBadges={["Signaux faibles", "Opportunités", "Portefeuille"]}
        toneBadge="Explorateur, pragmatique"
      />
    </div>
  );
}
