"use client";

import Link from "next/link";

export type AgentId =
  | "prospection"
  | "messages"
  | "analyse"
  | "coach"
  | "radar"
  | "assistant";

interface AgentCardProps {
  id: AgentId;
  label: string;
  description: string;
  href: string;
  badge?: string;
}

export default function AgentCard({
  id,
  label,
  description,
  href,
  badge,
}: AgentCardProps) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col justify-between rounded-2xl border border-neutral-800 bg-neutral-950/90 p-4 shadow-lg shadow-black/50 hover:border-emerald-500/40 hover:bg-neutral-900 transition"
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[11px] uppercase tracking-wide text-neutral-400">
          Agent · {id}
        </span>
        {badge && (
          <span className="text-[10px] rounded-full bg-emerald-500/15 text-emerald-300 px-2 py-0.5">
            {badge}
          </span>
        )}
      </div>
      <h3 className="text-sm font-semibold text-neutral-50 mb-1">{label}</h3>
      <p className="text-xs text-neutral-300 leading-relaxed mb-3">
        {description}
      </p>
      <div className="flex items-center justify-between text-[11px] text-neutral-400">
        <span className="flex items-center gap-1">
          Ouvrir l&apos;agent{" "}
          <span className="group-hover:translate-x-0.5 transition">?</span>
        </span>
        <span className="text-[10px] text-neutral-500">
          IA assistée, terrain Sync
        </span>
      </div>
    </Link>
  );
}
