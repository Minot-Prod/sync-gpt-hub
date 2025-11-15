import * as React from "react";
import Link from "next/link";

interface AppShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Prospection", href: "/prospection" },
  { label: "Messages", href: "/messages" },
  { label: "Analyse", href: "/analyse" },
  { label: "Radar", href: "/radar" },
  { label: "Assistant", href: "/assistant" },
  { label: "Coach", href: "/coach" },
];

export function AppShell({ title, subtitle, children }: AppShellProps) {
  return (
    <div className="app-shell">
      <aside className="app-shell__sidebar">
        <div className="stack">
          <div>
            <h2>Sync GPT Hub</h2>
            <p className="text-muted">Cockpit des agents &amp; playbooks</p>
          </div>

          <nav className="stack">
            <span className="text-muted">Navigation</span>
            <ul className="stack" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted">
                    • {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="stack">
            <span className="text-muted">État</span>
            <span className="badge badge-pill">Hub connecté</span>
          </div>
        </div>
      </aside>

      <main className="app-shell__main">
        <header className="app-shell__topbar">
          <div>
            <h1>{title}</h1>
            {subtitle ? <p className="text-muted">{subtitle}</p> : null}
          </div>
          <div className="row">
            <span className="badge">Mode design front-only</span>
          </div>
        </header>

        <div className="app-shell__content">{children}</div>
      </main>
    </div>
  );
}
