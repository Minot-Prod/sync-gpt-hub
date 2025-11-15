"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Hub" },
  { href: "/prospection", label: "Prospection" },
  { href: "/messages", label: "Messages & scripts" },
  { href: "/analyse", label: "Analyse client" },
  { href: "/coach", label: "Coach & training" },
  { href: "/radar", label: "Radar opportunités" },
  { href: "/assistant", label: "Professeur IA" },
];

function classNames(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex h-full flex-col w-56 border-r border-neutral-800 bg-neutral-950/95 px-3 py-4 gap-4">
      <div className="flex items-center gap-2 px-1">
        <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-[11px] font-bold text-neutral-950 shadow-lg shadow-emerald-500/40">
          SYNC
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold tracking-tight">
            Sync GPT Hub
          </span>
          <span className="text-[10px] text-neutral-400">
            Ventes & évènementiel
          </span>
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-1 text-[12px]">
        {links.map((link) => {
          const active =
            pathname === link.href ||
            (link.href !== "/" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={classNames(
                "flex items-center justify-between rounded-lg px-2 py-1.5 transition",
                active
                  ? "bg-emerald-500/15 text-emerald-200 border border-emerald-500/40"
                  : "text-neutral-300 hover:bg-neutral-900 hover:text-white"
              )}
            >
              <span>{link.label}</span>
              {active && (
                <span className="text-[10px] rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-emerald-200">
                  actif
                </span>
              )}
            </Link>
          );
        })}

        <div className="mt-auto rounded-lg border border-dashed border-emerald-500/40 bg-neutral-950/80 px-2 py-2 text-[11px] text-neutral-300">
          <div className="font-medium text-emerald-300 mb-1">
            Conseil d&apos;utilisation
          </div>
          <p>
            Commence toujours par le contexte : client, type d&apos;événement,
            objectif, budget, contraintes.
          </p>
        </div>
      </nav>
    </aside>
  );
}
