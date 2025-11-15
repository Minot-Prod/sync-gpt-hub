import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { openai } from "@/lib/openai";
import { agents } from "@/lib/agents";
import { ratelimit } from "@/lib/ratelimit";

export const runtime = "edge";

const Body = z.object({
  agent: z.string().optional(),
  messages: z.array(
    z.object({
      role: z.enum(["user", "assistant", "system"]),
      content: z.string(),
    })
  ),
});

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for") ??
    req.headers.get("x-real-ip") ??
    "anonymous";

  const { success } = await ratelimit.limit(ip);
  if (!success) {
    return new Response("Rate limit exceeded", { status: 429 });
  }

  let body: z.infer<typeof Body>;
  try {
    body = Body.parse(await req.json());
  } catch (error) {
    console.error("[/api/chat] Invalid body:", error);
    return new Response("Invalid request body", { status: 400 });
  }

  const { agent: agentKey, messages } = body;

  const rawAgent =
    (agentKey && agents[agentKey as keyof typeof agents]) ??
    agents.default;

  const systemPrompt =
    typeof rawAgent === "string" ? rawAgent : rawAgent.systemPrompt;

  const response = await openai.responses.stream({
    model: "gpt-4.1-mini",
    input: [
      {
        role: "system",
        content: systemPrompt,
      },
      ...messages,
    ],
  });

  // Cast en any pour calmer TypeScript sur toReadableStream()
  const stream = (response as any).toReadableStream();

  return new NextResponse(stream);
}
