"use client";

import { Pause, Play, Square, Volume2 } from "lucide-react";

type VoiceDockProps = {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onStop: () => void;
  rate: number;
  onRateChange: (rate: number) => void;
  label?: string;
};

export function VoiceDock({
  isPlaying,
  onTogglePlay,
  onStop,
  rate,
  onRateChange,
  label = "Sam te lit la réponse",
}: VoiceDockProps) {
  return (
    <div className="fixed inset-x-4 bottom-4 z-40 mx-auto flex max-w-3xl items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-950/90 px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400">
          <Volume2 className="h-4 w-4" />
        </div>
        <div className="flex flex-col text-sm">
          <span className="font-medium text-slate-100">
            {label}
          </span>
          <span className="text-xs text-slate-400">
            Ajuste la vitesse, mets en pause ou stoppe quand tu veux.
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <select
          className="rounded-lg border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-200"
          value={rate}
          onChange={(e) => onRateChange(Number(e.target.value))}
        >
          <option value={0.75}>0.75x</option>
          <option value={1}>1.0x</option>
          <option value={1.25}>1.25x</option>
          <option value={1.5}>1.5x</option>
        </select>

        <button
          className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30 transition hover:bg-cyan-400"
          onClick={onTogglePlay}
          aria-label={isPlaying ? "Mettre en pause" : "Lire"}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </button>

        <button
          className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-slate-200 transition hover:border-slate-500 hover:bg-slate-900"
          onClick={onStop}
          aria-label="Stop"
        >
          <Square className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

