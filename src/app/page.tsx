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
          <div className="flex flex-col items-center text-center gap-3">
            <div className="relative">
              <div className="h-28 w-28 overflow-hidden rounded-full bg-slate-800">
                {agents.prospection.avatarSrc && (
                  <Image
                    src={agents.prospection.avatarSrc}
                    alt={agents.prospection.name}
                    width={112}
                    height={112}
                    className="h-28 w-28 object-cover"
                  />
                )}
              </div>
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-50">
                {agents.prospection.name}
              </h2>
              <p className="text-[0.7rem] uppercase tracking-[0.16em] text-cyan-300">
                Prospection · Agent
              </p>
            </div>
            <p className="mt-1 text-xs text-slate-200">
              Trouver des entreprises cibles, segments et pistes de
              développement pour Sync.
            </p>
          </div>
        </Link>

        {/* Rédaction & Scripts */}
        <Link
          href="/messages"
          className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/80 p-4 text-sm shadow-sm transition hover:border-cyan-400 hover:bg-slate-900"
        >
          <div className="flex flex-col items-center text-center gap-3">
            <div className="relative">
              <div className="h-28 w-28 overflow-hidden rounded-full bg-slate-800">
                {agents.messages.avatarSrc && (
                  <Image
                    src={agents.messages.avatarSrc}
                    alt={agents.messages.name}
                    width={112}
                    height={112}
                    className="h-28 w-28 object-cover"
                  />
                )}
              </div>
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-50">
                {agents.messages.name}
              </h2>
              <p className="text-[0.7rem] uppercase tracking-[0.16em] text-cyan-300">
                Rédaction &amp; Scripts · Agent
              </p>
            </div>
            <p className="mt-1 text-xs text-slate-200">
              Générer des emails, messages LinkedIn et scripts d’appel alignés
              Sync.
            </p>
          </div>
        </Link>

        {/* Analyse d’entreprise */}
        <Link
          href="/analyse"
          className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/80 p-4 text-sm shadow-sm transition hover:border-cyan-400 hover:bg-slate-900"
        >
          <div className="flex flex-col items-center text-center gap-3">
            <div className="relative">
              <div className="h-28 w-28 overflow-hidden rounded-full bg-slate-800">
                {agents.analyse.avatarSrc && (
                  <Image
                    src={agents.analyse.avatarSrc}
                    alt={agents.analyse.name}
                    width={112}
                    height={112}
                    className="h-28 w-28 object-cover"
                  />
                )}
              </div>
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-50">
                {agents.analyse.name}
              </h2>
              <p className="text-[0.7rem] uppercase tracking-[0.16em] text-cyan-300">
                Analyse d’entreprise · Agent
              </p>
            </div>
            <p className="mt-1 text-xs text-slate-200">
              Comprendre un prospect et préparer un pitch événementiel.
            </p>
          </div>
        </Link>

        {/* Coach IA Vente */}
        <Link
          href="/coach"
          className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/80 p-4 text-sm shadow-sm transition hover:border-cyan-400 hover:bg-slate-900"
        >
          <div className="flex flex-col items-center text-center gap-3">
            <div className="relative">
              <div className="h-28 w-28 overflow-hidden rounded-full bg-slate-800">
                {agents.coach.avatarSrc && (
                  <Image
                    src={agents.coach.avatarSrc}
                    alt={agents.coach.name}
                    width={112}
                    height={112}
                    className="h-28 w-28 object-cover"
                  />
                )}
              </div>
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-50">
                {agents.coach.name}
              </h2>
              <p className="text-[0.7rem] uppercase tracking-[0.16em] text-cyan-300">
                Coach IA Vente · Coach
              </p>
            </div>
            <p className="mt-1 text-xs text-slate-200">
              Améliorer ta façon d’utiliser l’IA et structurer ta prospection.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
