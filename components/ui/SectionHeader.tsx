import * as React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
}

export function SectionHeader({ title, subtitle, rightSlot }: SectionHeaderProps) {
  return (
    <div className="row row--spread" style={{ marginBottom: "0.75rem" }}>
      <div>
        <h2>{title}</h2>
        {subtitle ? <p className="text-muted">{subtitle}</p> : null}
      </div>
      {rightSlot ? <div>{rightSlot}</div> : null}
    </div>
  );
}
