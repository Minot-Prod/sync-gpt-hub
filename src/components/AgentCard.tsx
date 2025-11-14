"use client";

type Props = {
  title: string;
  badge: string;
  description: string;
};

export default function AgentCard({ title, badge, description }: Props) {
  return (
    <div className="h-full cursor-pointer rounded-xl border border-slate-800 bg-slate-900/70 p-4 shadow-sm transition hover:-translate-y-1 hover:border-cyan-400 hover:shadow-cyan-500/20">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-base font-semibold">{title}</h2>
        <span className="rounded-full border border-cyan-400 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.12em] text-cyan-300">
          {badge}
        </span>
      </div>
      <p className="text-xs text-slate-300">{description}</p>
    </div>
  );
}
