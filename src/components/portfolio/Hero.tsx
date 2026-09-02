import { motion } from "motion/react";
import { usePointerFine } from "@/hooks/use-pointer-fine";
import { profile } from "@/lib/portfolio-data";
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
  const base = 0.1;

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between pb-10 pt-28 md:pb-14 md:pt-32"
    >
      <div className="container-editorial flex flex-1 flex-col justify-center">
        <motion.p
          className="label-xs"
          initial={{ opacity: 0, y: 12 }}
          animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.8, delay: base, ease }}
        >
          Hello, I&apos;m
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
              Full-Stack
            </HoverWord>{" "}
            <HoverWord delay={base + 0.38} start={start}>
              Developer
            </HoverWord>
          </span>
        </h1>

        <motion.p
          className="mt-8 max-w-xl text-balance text-sm leading-relaxed text-muted-foreground sm:text-base md:mt-12"
          initial={{ opacity: 0, y: 16 }}
          animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.9, delay: base + 0.55, ease }}
        >
          Estudante de Ciência da Computação que gosta de ir do código à apresentação do produto —
          como fiz com o Co-Up, plataforma que idealizei e levei a investidores no Minas Summit.
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-12"
          initial={{ opacity: 0, y: 16 }}
          animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.9, delay: base + 0.75, ease }}
        >
          <MagneticButton href="#work" variant="solid" className="w-full sm:w-auto">
            Ver projetos
          </MagneticButton>
          <MagneticButton href="#contact" className="w-full sm:w-auto">
            Entre em contato
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        className="container-editorial mt-12 flex items-end justify-between gap-4 border-t border-border pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: start ? 1 : 0 }}
        transition={{ duration: 1, delay: base + 1, ease }}
      >
        <span className="label-xs">{profile.location}</span>
        <span className="label-xs flex items-center gap-3">
          Scroll
          <motion.span
            aria-hidden
            className="block h-6 w-px bg-border-strong"
            animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
