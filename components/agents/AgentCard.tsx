import { ChevronRight } from "lucide-react";
import Link from "next/link";

type AgentCardProps = {
  id: string;
  name: string;
  tagline: string;
  emoji: string;
  role: string;
  examples: string[];
};

export function AgentCard({
  id,
  name,
  tagline,
  emoji,
  role,
  examples,
}: AgentCardProps) {
  return (
    <Link
      href={`/${id}`}
      className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-4 shadow-sm shadow-slate-950/50 transition hover:-translate-y-0.5 hover:border-cyan-500/70 hover:bg-slate-900/80 hover:shadow-cyan-500/25"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-xl">
            {emoji}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-50">
              {name}
            </span>
            <span className="text-xs text-slate-400">
              {tagline}
            </span>
          </div>
        </div>
        <span className="rounded-full border border-slate-700 bg-slate-900 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-300">
          {role}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {examples.slice(0, 3).map((ex, i) => (
          <button
            key={i}
            type="button"
            className="max-w-full truncate rounded-full bg-slate-900/80 px-3 py-1 text-xs text-slate-300 ring-1 ring-slate-800 transition group-hover:bg-slate-900 group-hover:text-slate-100"
          >
            {ex}
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-cyan-400">
        <span className="flex items-center gap-1">
          Ouvrir l’agent
          <ChevronRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
