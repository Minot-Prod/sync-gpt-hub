import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  soft?: boolean;
}

export function Card({ soft, className, ...props }: CardProps) {
  const base = soft ? "card card--soft" : "card";
  const classes = [base, className].filter(Boolean).join(" ");
  return <div className={classes} {...props} />;
}
