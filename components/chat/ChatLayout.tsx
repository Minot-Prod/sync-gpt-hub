import { ReactNode } from "react";

export function ChatLayout({
  header,
  messages,
  input,
}: {
  header: ReactNode;
  messages: ReactNode;
  input: ReactNode;
}) {
  return (
    <div className="flex h-full flex-col">
      <header className="border-b border-slate-800 px-4 py-3">
        {header}
      </header>
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {messages}
      </div>
      <footer className="border-t border-slate-800 bg-slate-950/90 px-4 py-3">
        {input}
      </footer>
    </div>
  );
}
