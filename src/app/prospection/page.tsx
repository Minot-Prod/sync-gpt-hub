import ChatWindow from "@/components/ChatWindow";

export default function ProspectionPage() {
  return (
    <div className="h-[calc(100vh-150px)]">
      <ChatWindow
        title="Agent Prospection"
        subtitle="Identifie, filtre et priorise les entreprises cibles pour Sync Productions en fonction du type d'événement, du marché et des objectifs."
        agentId="prospection"
        placeholder="Décris le type d'entreprises que tu veux cibler (secteur, taille, région...) ou colle une liste brute à nettoyer."
        contextBadges={[
          "Listes d'entreprises",
          "Marchés & régions",
          "Type d'événement",
        ]}
        toneBadge="Précis, orienté action"
      />
    </div>
  );
}
