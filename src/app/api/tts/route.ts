import { NextRequest, NextResponse } from "next/server";
import { agents } from "@/lib/agents";

type TtsRequestBody = {
  text: string;
  agentId: string;
};

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as TtsRequestBody | null;

    if (!body || !body.text || !body.agentId) {
      return NextResponse.json(
        { error: "Missing 'text' or 'agentId' in body." },
        { status: 400 }
      );
    }

    const { text, agentId } = body;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("[TTS] OPENAI_API_KEY manquant");
      return NextResponse.json(
        { error: "OPENAI_API_KEY is not configured on the server." },
        { status: 500 }
      );
    }

    const agent = (agents as any)[agentId];
    if (!agent) {
      console.error("[TTS] Agent introuvable pour id:", agentId);
      return NextResponse.json(
        { error: "Unknown agentId" },
        { status: 400 }
      );
    }

    if (!agent.voice) {
      console.error("[TTS] Aucune config 'voice' pour agent:", agentId);
      return NextResponse.json(
        { error: "Agent does not have a voice configuration." },
        { status: 400 }
      );
    }

    const model =
      process.env.OPENAI_TTS_MODEL ||
      agent.voice.model ||
      "gpt-4o-mini-tts";

    const voice = agent.voice.voice;

    const ttsResponse = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: Bearer ,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        voice,
        input: text,
        format: "mp3",
      }),
    });

    if (!ttsResponse.ok) {
      const errorText = await ttsResponse.text().catch(() => "");
      console.error("[TTS] Erreur OpenAI:", ttsResponse.status, errorText);
      return NextResponse.json(
        {
          error: "OpenAI TTS request failed.",
          status: ttsResponse.status,
        },
        { status: 502 }
      );
    }

    const audioBuffer = await ttsResponse.arrayBuffer();

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[TTS] Erreur serveur:", err);
    return NextResponse.json(
      { error: "Internal server error in /api/tts." },
      { status: 500 }
    );
  }
}
