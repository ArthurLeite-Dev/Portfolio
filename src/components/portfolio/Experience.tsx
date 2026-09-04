import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { useLanguage } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const scaleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1]), {
    stiffness: 80,
    damping: 24,
  });

  return (
    <section id="experience" className="container-editorial scroll-mt-24 py-24 md:py-36">
      <SectionHeading index="04 / 06" title={t.experience.title} meta={t.experience.meta} />

      <div ref={ref} className="relative mt-14 pl-6 md:mt-24 md:pl-10">
        <div aria-hidden className="absolute left-0 top-0 h-full w-px bg-border" />
        <motion.div
          aria-hidden
          className="absolute left-0 top-0 h-full w-px origin-top bg-foreground/60"
          style={{ scaleY }}
        />

        <ol className="flex flex-col">
          {t.experience.items.map((item, i) => (
            <Reveal as="li" key={item.period} delay={i} className="relative py-8 md:py-12">
              <span
                aria-hidden
                className="absolute -left-6 top-[2.6rem] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-foreground md:-left-10 md:top-[3.7rem]"
              />
              <div className="grid gap-3 md:grid-cols-12 md:gap-8">
                <p className="label-xs md:col-span-3 md:pt-2">{item.period}</p>
                <div className="md:col-span-9">
                  <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                    {item.role}
                  </h3>
                  <p className="mt-1 font-display text-sm uppercase tracking-[0.16em] text-muted-foreground">
                    {item.company}
                  </p>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
              {i < t.experience.items.length - 1 && (
                <span aria-hidden className="absolute bottom-0 left-0 h-px w-full bg-border" />
              )}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
