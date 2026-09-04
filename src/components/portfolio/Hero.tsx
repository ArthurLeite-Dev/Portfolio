import { motion } from "motion/react";
import { usePointerFine } from "@/hooks/use-pointer-fine";
import { useLanguage } from "@/lib/i18n";
import { MagneticButton } from "./MagneticButton";

const ease = [0.16, 1, 0.3, 1] as const;

function HoverWord({
  children,
  delay,
  start,
}: {
  children: string;
  delay: number;
  start: boolean;
}) {
  const fine = usePointerFine();
  return (
    <motion.span
      className="inline-block origin-bottom will-change-transform"
      initial={{ opacity: 0, y: "0.25em" }}
      animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: "0.25em" }}
      transition={{ duration: 1, delay, ease }}
      {...(fine ? { whileHover: { scale: 1.04, rotate: -1.5, y: -6 } } : {})}
    >
      {children}
    </motion.span>
  );
}

export function Hero({ start }: { start: boolean }) {
  const { t } = useLanguage();
  const base = 0.1;

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col pb-10 pt-28 md:pb-14 md:pt-32"
    >
      <div className="container-editorial flex flex-1 flex-col justify-center">
        <motion.p
          className="label-xs"
          initial={{ opacity: 0, y: 12 }}
          animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.8, delay: base, ease }}
        >
          {t.hero.hello}
        </motion.p>

        <h1 className="display-hero mt-5 md:mt-8">
          <span className="block">
            <HoverWord delay={base + 0.12} start={start}>
              Arthur
            </HoverWord>{" "}
            <HoverWord delay={base + 0.2} start={start}>
              Leite
            </HoverWord>
          </span>
          <span className="mt-1 block text-muted-foreground md:mt-2">
            <HoverWord delay={base + 0.3} start={start}>
              {t.hero.roleLine1}
            </HoverWord>{" "}
            <HoverWord delay={base + 0.38} start={start}>
              {t.hero.roleLine2}
            </HoverWord>
          </span>
        </h1>

        <motion.p
          className="mt-8 max-w-xl text-balance text-sm leading-relaxed text-muted-foreground sm:text-base md:mt-12"
          initial={{ opacity: 0, y: 16 }}
          animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.9, delay: base + 0.55, ease }}
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-12"
          initial={{ opacity: 0, y: 16 }}
          animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.9, delay: base + 0.75, ease }}
        >
          <MagneticButton href="#work" variant="solid" className="w-full sm:w-auto">
            {t.hero.ctaProjects}
          </MagneticButton>
          <MagneticButton href="#contact" className="w-full sm:w-auto">
            {t.hero.ctaContact}
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
