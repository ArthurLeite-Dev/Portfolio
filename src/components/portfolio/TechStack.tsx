import { motion } from "motion/react";
import { useState } from "react";
import { usePointerFine } from "@/hooks/use-pointer-fine";
import { useLanguage } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function TechStack() {
  const fine = usePointerFine();
  const { t } = useLanguage();
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="stack" className="container-editorial scroll-mt-24 py-24 md:py-36">
      <SectionHeading index="02 / 06" title={t.stack.title} meta={t.stack.meta} />

      <ul className="mt-12 border-t border-border md:mt-20" onMouseLeave={() => setActive(null)}>
        {t.stack.items.map((tech, i) => (
          <Reveal as="li" key={tech.name} delay={i * 0.4} className="border-b border-border">
            <motion.div
              className="group relative flex items-center justify-between gap-4 py-4 md:py-6"
              onMouseEnter={() => fine && setActive(i)}
              animate={{
                opacity: active === null || active === i ? 1 : 0.35,
                x: fine && active === i ? 10 : 0,
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex min-w-0 items-baseline gap-4 md:gap-8">
                <span className="label-xs shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <motion.h3
                  className="truncate font-display text-xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
                  animate={{ scale: fine && active === i ? 1.03 : 1 }}
                  style={{ originX: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 22 }}
                >
                  {tech.name}
                </motion.h3>
              </div>

              <div className="flex shrink-0 items-center gap-4">
                <span className="hidden text-xs text-muted-foreground lg:block">{tech.note}</span>
                <motion.span
                  aria-hidden
                  className="font-display text-sm text-muted-foreground"
                  animate={{
                    opacity: fine ? (active === i ? 1 : 0) : 0.4,
                    x: fine && active === i ? 0 : -6,
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  →
                </motion.span>
              </div>

              <motion.span
                aria-hidden
                className="absolute bottom-0 left-0 h-px w-full bg-foreground"
                initial={false}
                animate={{ scaleX: active === i ? 1 : 0 }}
                style={{ originX: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
