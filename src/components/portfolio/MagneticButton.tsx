import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  href: string;
  className?: string;
  variant?: "solid" | "outline" | "ghost";
  ariaLabel?: string;
};

const base =
  "group relative inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 py-3 font-display text-xs uppercase tracking-[0.18em] transition-colors duration-300 sm:px-8";

const styles = {
  solid: "bg-foreground text-background hover:bg-foreground/90",
  outline: "border border-border-strong text-foreground hover:bg-surface-hover",
  ghost: "text-muted-foreground hover:text-foreground",
};

export function MagneticButton({
  children,
  href,
  className,
  variant = "outline",
  ariaLabel,
}: Props) {
  const isExternal = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={cn(base, styles[variant], className)}
    >
      {children}
    </a>
  );
}
