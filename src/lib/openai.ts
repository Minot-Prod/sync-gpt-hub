import type { ChatMessage } from "./types";

const apiKey = process.env.OPENAI_API_KEY;
const baseUrl = process.env.OPENAI_BASE_URL || "https://api.openai.com/v1";

export async function callOpenAIChat({
  systemPrompt,
  messages,
}: {
  systemPrompt: string;
  messages: ChatMessage[];
}): Promise<string> {
  if (!apiKey) {
    console.warn("⚠️ OPENAI_API_KEY manquant");
    throw new Error("OPENAI_API_KEY manquant");
  }

  const payloadMessages = [
    { role: "system", content: systemPrompt },
    ...messages.map((m) => ({ role: m.role, content: m.content })),
  ];

  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: payloadMessages,
      temperature: 0.7,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Erreur OpenAI:", res.status, text);
    throw new Error(`Erreur OpenAI: ${res.status}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "Aucune réponse générée.";
}
