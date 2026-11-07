import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { profile } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { LanguageToggle } from "./LanguageToggle";

export function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500",
          scrolled || open
            ? "border-border bg-background/95"
            : "border-transparent bg-background/60",
        )}
      >
        <nav
          aria-label={t.a11y.mainNav}
          className="container-editorial grid h-16 grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 md:h-20 md:gap-4"
        >
          <a
            href="#top"
            className="min-w-0 truncate font-display text-sm font-bold uppercase tracking-[0.2em]"
          >
            {profile.name}
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <ul className="flex items-center gap-7">
              {t.nav.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="link-underline font-display text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="rounded-full border border-border-strong px-5 py-2 font-display text-[11px] uppercase tracking-[0.18em] transition-colors duration-500 hover:bg-foreground hover:text-background"
            >
              {t.nav.talk}
            </a>
          </div>

          <LanguageToggle className="justify-self-end" />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            className="-mr-2 flex h-12 w-12 shrink-0 items-center justify-center md:hidden"
          >
            <span className="relative block h-3 w-6">
              <motion.span
                className="absolute left-0 block h-px w-6 bg-foreground"
                animate={open ? { top: 6, rotate: 45 } : { top: 0, rotate: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.span
                className="absolute left-0 block h-px w-6 bg-foreground"
                animate={open ? { top: 6, rotate: -45 } : { top: 12, rotate: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-background pt-24 md:hidden"
          >
            <nav aria-label={t.a11y.mobileNav} className="container-editorial flex flex-1 flex-col">
              <ul className="flex flex-col">
                {t.nav.links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.06 + i * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="border-b border-border"
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-5 font-display text-3xl font-bold tracking-tight"
                    >
                      {l.label}
                      <span className="label-xs">{String(i + 1).padStart(2, "0")}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mt-auto pb-10 pt-10"
              >
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex min-h-14 w-full items-center justify-center rounded-full bg-foreground font-display text-xs uppercase tracking-[0.2em] text-background"
                >
                  {t.nav.mobileContact}
                </a>
                <p className="mt-6 text-center text-xs text-muted-foreground">{profile.email}</p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
