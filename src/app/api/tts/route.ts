import { NextResponse } from "next/server";
import { agents } from "@/lib/agents";

export async function POST(req: Request) {
  try {
    const { text, agentId } = await req.json();

    if (!text || !agentId) {
      return NextResponse.json(
        { error: "Missing text or agentId" },
        { status: 400 }
      );
    }

    const config = agents[agentId as keyof typeof agents];

    if (!config?.voice) {
      return NextResponse.json(
        { error: "No voice configured for this agent" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY" },
        { status: 500 }
      );
    }

    const { model, voice } = config.voice;

    const openaiRes = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        voice,
        input: text,
        format: "mp3",
      }),
    });

    if (!openaiRes.ok) {
      const errText = await openaiRes.text();
      console.error("TTS error:", errText);
      return NextResponse.json(
        { error: "TTS API error" },
        { status: 500 }
      );
    }

    const audioBuffer = await openaiRes.arrayBuffer();

    return new Response(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
