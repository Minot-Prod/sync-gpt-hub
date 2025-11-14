import { NextResponse } from "next/server";
import type { AgentId, ChatMessage } from "@/lib/types";
import { getAgentConfig } from "@/lib/agents";
import { callOpenAIChat } from "@/lib/openai";

type RequestBody = {
  agent: AgentId;
  messages: ChatMessage[];
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RequestBody;
    const { agent, messages } = body;

    if (!agent) {
      return NextResponse.json({ error: "Agent manquant." }, { status: 400 });
    }

    const config = getAgentConfig(agent);

    const answer = await callOpenAIChat({
      systemPrompt: config.systemPrompt,
      messages,
    });

    return NextResponse.json({ answer });
  } catch (err) {
    console.error("Erreur /api/chat:", err);
    return NextResponse.json(
      { error: "Erreur interne Hub." },
      { status: 500 },
    );
  }
}
