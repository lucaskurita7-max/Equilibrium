import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function Button({ variant = "primary", className = "", ...props }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50";
  const styles =
    variant === "primary"
      ? "bg-white text-zinc-950 hover:bg-zinc-200"
      : variant === "secondary"
      ? "bg-white/10 text-white hover:bg-white/15 border border-white/10"
      : "bg-transparent text-white/80 hover:text-white hover:bg-white/5";
  return <button className={`${base} ${styles} ${className}`} {...props} />;
}
