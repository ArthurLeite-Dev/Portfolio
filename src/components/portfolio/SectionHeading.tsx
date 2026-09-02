import { motion } from "motion/react";
import { usePointerFine } from "@/hooks/use-pointer-fine";
import { Reveal } from "./Reveal";

export function SectionHeading({
  title,
  index,
  meta,
}: {
  title: string;
  index: string;
  meta?: string;
}) {
  const fine = usePointerFine();

  return (
    <div className="flex flex-col gap-6">
      <Reveal className="flex items-baseline justify-between gap-4 border-t border-border pt-4">
        <span className="label-xs">{index}</span>
        {meta ? <span className="label-xs text-right">{meta}</span> : null}
      </Reveal>
      <Reveal delay={1}>
        <motion.h2
          className="display-section inline-block origin-left will-change-transform"
          {...(fine ? { whileHover: { scale: 1.02, x: 8, rotate: -0.6 } } : {})}
          transition={{ type: "spring", stiffness: 180, damping: 20, mass: 0.6 }}
        >
          {title}
        </motion.h2>
      </Reveal>
    </div>
  );
}
