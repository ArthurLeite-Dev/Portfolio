import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";
import { usePointerFine } from "@/hooks/use-pointer-fine";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  href: string;
  className?: string;
  variant?: "solid" | "outline" | "ghost";
  strength?: number;
  ariaLabel?: string;
};

const base =
  "group relative inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 py-3 font-display text-xs uppercase tracking-[0.18em] transition-colors duration-500 sm:px-8";

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
  strength = 14,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const fine = usePointerFine();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const isExternal = /^https?:\/\//.test(href);

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      data-cursor="link"
      {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      style={{ x, y }}
      {...(fine ? { whileHover: { scale: 1.03 } } : {})}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      onMouseMove={(e) => {
        if (!fine || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set(((e.clientX - r.left) / r.width - 0.5) * strength * 2);
        y.set(((e.clientY - r.top) / r.height - 0.5) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={cn(base, styles[variant], className)}
    >
      {children}
    </motion.a>
  );
}
