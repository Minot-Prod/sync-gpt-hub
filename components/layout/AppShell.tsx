import * as React from "react";

interface AppShellProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

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
              <li className="text-muted">• Dashboard</li>
              <li className="text-muted">• Prospection</li>
              <li className="text-muted">• Messages</li>
              <li className="text-muted">• Analyse</li>
              <li className="text-muted">• Radar</li>
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
