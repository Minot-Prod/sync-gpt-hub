import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { ReactNode } from "react";

export const metadata = {
  title: "Sync GPT Hub — Premium",
  description: "Hub IA Premium pour Sync Productions",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className="h-full bg-neutral-950">
      <body className="h-full flex text-white bg-neutral-950">
        {/* Sidebar gauche */}
        <Sidebar />

        {/* Zone principale */}
        <main className="flex flex-col flex-1 h-full overflow-hidden">
          {/* Topbar */}
          <Topbar />

          {/* Contenu dynamique */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
