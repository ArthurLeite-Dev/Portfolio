import { motion } from "motion/react";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, toggleLanguage } = useLanguage();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={lang === "en"}
      onClick={toggleLanguage}
      aria-label={lang === "pt" ? "Switch to English" : "Mudar para Português"}
      className={cn(
        "relative inline-grid h-11 w-20 shrink-0 grid-cols-2 items-center rounded-full border border-border-strong",
        className,
      )}
    >
      <motion.span
        aria-hidden
        className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-foreground"
        animate={{ x: lang === "pt" ? "0%" : "100%" }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
      />
      <span
        className={cn(
          "relative z-10 text-center font-display text-xs uppercase tracking-[0.14em] transition-colors duration-300",
          lang === "pt" ? "text-background" : "text-muted-foreground",
        )}
      >
        PT
      </span>
      <span
        className={cn(
          "relative z-10 text-center font-display text-xs uppercase tracking-[0.14em] transition-colors duration-300",
          lang === "en" ? "text-background" : "text-muted-foreground",
        )}
      >
        EN
      </span>
    </button>
  );
}
