export default function Topbar() {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-sm">
      <div className="flex flex-col gap-0.5">
        <span className="text-[11px] uppercase tracking-wide text-neutral-400">
          Espace Sync · IA ventes
        </span>
        <span className="text-xs text-neutral-200">
          Agents IA connectés à la réalité terrain (prospection, messages, analyse, coaching).
        </span>
      </div>
      <div className="flex items-center gap-2 text-[11px]">
        <span className="hidden sm:inline text-neutral-400">Connecté :</span>
        <div className="flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900 px-2 py-1">
          <div className="h-6 w-6 rounded-full bg-neutral-800 flex items-center justify-center text-[10px] font-semibold">
            VG
          </div>
          <span className="hidden sm:inline text-neutral-200">
            Vincent / Max
          </span>
        </div>
      </div>
    </header>
  );
}
