import { motion } from "motion/react";
import { usePointerFine } from "@/hooks/use-pointer-fine";
import { facts } from "@/lib/portfolio-data";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function About() {
  const fine = usePointerFine();

  return (
    <section id="about" className="container-editorial scroll-mt-24 py-24 md:py-36">
      <SectionHeading index="01 / 06" title="About" meta="Quem constrói" />

      <div className="mt-14 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-16">
        <Reveal className="md:col-span-6">
          <h3 className="font-display text-3xl font-bold leading-[0.95] tracking-tight sm:text-4xl lg:text-5xl">
            Building things
            <br />
            that matter.
          </h3>
        </Reveal>

        <div className="flex flex-col gap-6 md:col-span-6">
          <Reveal delay={1}>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Sou estudante de Ciência da Computação (Universidade FUMEC) e técnico em Tecnologia
              pelo COTEMIG, com experiência prática construindo aplicações full-stack em TypeScript,
              React, Node.js e Firebase.
            </p>
          </Reveal>
          <Reveal delay={2}>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Idealizei, arquitetei e apresentei o Co-Up — da arquitetura do backend à lógica de
              recomendação entre usuários — a investidores no Minas Summit. Busco aplicar lógica de
              programação, automação e boas práticas de engenharia em produtos orientados a dados.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((f, i) => (
          <Reveal key={f.label} delay={i}>
            <motion.div
              className="h-full bg-background p-6 transition-colors duration-500 md:p-8"
              {...(fine
                ? {
                    whileHover: {
                      y: -4,
                      backgroundColor: "rgba(255,255,255,0.035)",
                    },
                  }
                : {})}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="label-xs">{f.label}</p>
              <p className="mt-4 font-display text-base font-medium leading-snug sm:text-lg">
                {f.value}
              </p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
