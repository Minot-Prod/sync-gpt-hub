export type Role = "user" | "assistant" | "system";

export type ChatMessage = {
  role: Role;
  content: string;
};

export type AgentId = "prospection" | "messages" | "analyse" | "coach" | "radar";
