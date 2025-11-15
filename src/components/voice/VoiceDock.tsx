"use client";

interface VoiceDockProps {
  disabled?: boolean;
}

export default function VoiceDock({ disabled }: VoiceDockProps) {
  return (
    <div className="mt-2 flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-2 text-[11px] text-neutral-400">
      <span>Module voix (bientôt connecté à SAM TTS)</span>
      <button
        type="button"
        disabled={disabled}
        className="rounded-lg border border-neutral-700 px-2 py-1 text-[11px] text-neutral-200 disabled:opacity-40"
      >
        ??? Tester la voix
      </button>
    </div>
  );
}
