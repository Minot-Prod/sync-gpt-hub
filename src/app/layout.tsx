import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sync GPT Hub",
  description: "Hub d’agents IA pour Sync Productions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-slate-950 text-slate-100">
        <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <div className="text-lg font-semibold tracking-tight">
              Sync GPT Hub
            </div>
            <div className="text-xs text-slate-400">
              Agents IA pour ventes · Sync Productions
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
