import ChatWindow from "@/components/ChatWindow";

export default function AnalysePage() {
  return (
    <div className="h-[calc(100vh-150px)]">
      <ChatWindow
        title="Agent Analyse Client"
        subtitle="Analyse une entreprise, ses valeurs, son historique d'événements et ses enjeux pour proposer des angles d'approche pertinents."
        agentId="analyse"
        placeholder="Colle l'URL d'un site, des notes sur un client ou une description d'entreprise à analyser."
        contextBadges={["Site web client", "Notes terrain", "Historique"]}        
        toneBadge="Structuré, orienté insight"
      />
    </div>
  );
}
