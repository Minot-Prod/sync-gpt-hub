import Link from "next/link";
import Image from "next/image";
import { agents } from "@/lib/agents";

export default function Home() {
  return (
    <div className="space-y-8">
      <header className="space-y-3 text-center">
        <div className="flex justify-center">
          <Image
            src="/images/sync-logo.png"
            alt="Sync Productions"
            width={80}
            height={80}
            className="mx-auto opacity-90 hover:opacity-100 transition"
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Hub Sync – Agents IA Ventes
          </h1>
          <p className="text-sm text-slate-400">
            Choisis un agent selon ce que tu veux faire : trouver des entreprises,
            rédiger des messages, analyser un client, te faire coacher ou repérer des opportunités d’événements.
          </p>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        {/* Prospection */}
        <Link
          href="/prospection"
          className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/80 p-4 text-sm shadow-sm transition hover:border-cyan-400 hover:bg-slate-900 hover:-translate-y-1"
        >
          <div className="flex flex-col items-center text-center gap-3">
            <div className="h-20 w-20 overflow-hidden rounded-full bg-slate-800">
              {agents.prospection.avatarSrc && (
                <Image
                  src={agents.prospection.avatarSrc}
                  alt={agents.prospection.name}
                  width={80}
                  height={80}
                  className="h-20 w-20 object-cover"
                />
              )}
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
              Trouver des entreprises cibles, segments et pistes de développement pour Sync.
            </p>
          </div>
        </Link>

        {/* Messages */}
        <Link
          href="/messages"
          className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/80 p-4 text-sm shadow-sm transition hover:border-cyan-400 hover:bg-slate-900 hover:-translate-y-1"
        >
          <div className="flex flex-col items-center text-center gap-3">
            <div className="h-20 w-20 overflow-hidden rounded-full bg-slate-800">
              {agents.messages.avatarSrc && (
                <Image
                  src={agents.messages.avatarSrc}
                  alt={agents.messages.name}
                  width={80}
                  height={80}
                  className="h-20 w-20 object-cover"
                />
              )}
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
              Générer des emails, messages LinkedIn et scripts d’appel alignés Sync.
            </p>
          </div>
        </Link>

        {/* Analyse */}
        <Link
          href="/analyse"
          className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/80 p-4 text-sm shadow-sm transition hover:border-cyan-400 hover:bg-slate-900 hover:-translate-y-1"
        >
          <div className="flex flex-col items-center text-center gap-3">
            <div className="h-20 w-20 overflow-hidden rounded-full bg-slate-800">
              {agents.analyse.avatarSrc && (
                <Image
                  src={agents.analyse.avatarSrc}
                  alt={agents.analyse.name}
                  width={80}
                  height={80}
                  className="h-20 w-20 object-cover"
                />
              )}
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

        {/* Coach */}
        <Link
          href="/coach"
          className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/80 p-4 text-sm shadow-sm transition hover:border-cyan-400 hover:bg-slate-900 hover:-translate-y-1"
        >
          <div className="flex flex-col items-center text-center gap-3">
            <div className="h-20 w-20 overflow-hidden rounded-full bg-slate-800">
              {agents.coach.avatarSrc && (
                <Image
                  src={agents.coach.avatarSrc}
                  alt={agents.coach.name}
                  width={80}
                  height={80}
                  className="h-20 w-20 object-cover"
                />
              )}
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

        {/* Zoé Radar */}
        <Link
          href="/radar"
          className="group flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-900/80 p-4 text-sm shadow-sm transition hover:border-emerald-400 hover:bg-slate-900 hover:-translate-y-1"
        >
          <div className="flex flex-col items-center text-center gap-3">
            <div className="h-20 w-20 overflow-hidden rounded-full bg-slate-800">
              {agents.radar.avatarSrc && (
                <Image
                  src={agents.radar.avatarSrc}
                  alt={agents.radar.name}
                  width={80}
                  height={80}
                  className="h-20 w-20 object-cover"
                />
              )}
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-50">
                {agents.radar.name}
              </h2>
              <p className="text-[0.7rem] uppercase tracking-[0.16em] text-emerald-300">
                Veille &amp; Opportunités · Agent
              </p>
            </div>
            <p className="mt-1 text-xs text-slate-200">
              Repérer à l’avance les événements (galas, conférences, remises de prix)
              où Sync peut vendre ses services, 6 à 36 mois à l’avance.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
