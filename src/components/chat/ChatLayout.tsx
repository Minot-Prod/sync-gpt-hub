import { ReactNode } from "react";

interface ChatLayoutProps {
  title: string;
  children: ReactNode;
}

export default function ChatLayout({ title, children }: ChatLayoutProps) {
  return (
    <div className="flex flex-col h-[calc(100vh-150px)]">
      <h1 className="text-sm font-semibold text-neutral-50 mb-2">{title}</h1>
      <div className="flex-1">{children}</div>
    </div>
  );
}
