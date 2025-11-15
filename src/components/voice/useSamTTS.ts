export function useSamTTS() {
  async function speak(text: string) {
    console.log("[SAM TTS MOCK] ->", text);
    // Plus tard : appel réel à un service TTS
  }

  return { speak };
}
