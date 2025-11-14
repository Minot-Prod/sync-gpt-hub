import Link from "next/link";
import Image from "next/image";
import { agents } from "@/lib/agents";

export default function Home() {
  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Hub Sync – Agents IA Ventes
        </h1>
        <p className="text-sm text-slate-400">
          Choisis un agent selon ce que tu veux faire : trouver des entreprises,
          rédiger des messages, analyser un client ou te faire coacher.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-4">
        {/* Prospection */}
        <Link
          href="/prospection"
          className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/80 p-4 text-sm shadow-sm transition hover:border-cyan-400 hover:bg-slate-900"
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-800">
              {agents.prospection.avatarSrc && (
                <Image
                  src={agents.prospection.avatarSrc}
                  alt={agents.prospection.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 object-cover"
                />
              )}
            </div>
            <div>
              <h2 className="text-base font-semibold">Prospection</h2>
              <p className="text-[0.7rem] uppercase tracking-[0.16em] text-cyan-300">
                Agent
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-200">
            Trouver des entreprises cibles, segments et pistes de
            développement pour Sync.
          </p>
        </Link>

        {/* Rédaction & Scripts */}
        <Link
          href="/messages"
          className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/80 p-4 text-sm shadow-sm transition hover:border-cyan-400 hover:bg-slate-900"
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-800">
              {agents.messages.avatarSrc && (
                <Image
                  src={agents.messages.avatarSrc}
                  alt={agents.messages.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 object-cover"
                />
              )}
            </div>
            <div>
              <h2 className="text-base font-semibold">Rédaction &amp; Scripts</h2>
              <p className="text-[0.7rem] uppercase tracking-[0.16em] text-cyan-300">
                Agent
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-200">
            Générer des emails, messages LinkedIn et scripts d’appel alignés Sync.
          </p>
        </Link>

        {/* Analyse d’entreprise */}
        <Link
          href="/analyse"
          className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/80 p-4 text-sm shadow-sm transition hover:border-cyan-400 hover:bg-slate-900"
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-800">
              {agents.analyse.avatarSrc && (
                <Image
                  src={agents.analyse.avatarSrc}
                  alt={agents.analyse.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 object-cover"
                />
              )}
            </div>
            <div>
              <h2 className="text-base font-semibold">Analyste d’entreprise</h2>
              <p className="text-[0.7rem] uppercase tracking-[0.16em] text-cyan-300">
                Agent
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-200">
            Comprendre un prospect et préparer un pitch événementiel.
          </p>
        </Link>

        {/* Coach IA Vente */}
        <Link
          href="/coach"
          className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/80 p-4 text-sm shadow-sm transition hover:border-cyan-400 hover:bg-slate-900"
        >
          <div className="mb-3 flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full bg-slate-800">
              {agents.coach.avatarSrc && (
                <Image
                  src={agents.coach.avatarSrc}
                  alt={agents.coach.name}
                  width={40}
                  height={40}
                  className="h-10 w-10 object-cover"
                />
              )}
            </div>
            <div>
              <h2 className="text-base font-semibold">Coach IA Vente</h2>
              <p className="text-[0.7rem] uppercase tracking-[0.16em] text-cyan-300">
                Coach
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-200">
            Améliorer ta façon d’utiliser l’IA et structurer ta prospection.
          </p>
        </Link>
      </div>
    </div>
  );
}
