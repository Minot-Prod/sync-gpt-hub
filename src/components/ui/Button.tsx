import * as React from "react";

export type ButtonVariant = "primary" | "ghost";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  const base = "btn";
  const variantClass = variant === "primary" ? "btn-primary" : "btn-ghost";
  const classes = [base, variantClass, className].filter(Boolean).join(" ");
  return <button className={classes} {...props} />;
}
