import { motion, useMotionTemplate, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";
import { usePointerFine } from "@/hooks/use-pointer-fine";

/** Extremely subtle achromatic light that follows the cursor. Desktop only. */
export function SpotlightBackground() {
  const fine = usePointerFine();
  const mx = useSpring(useMotionValue(50), { stiffness: 60, damping: 25 });
  const my = useSpring(useMotionValue(30), { stiffness: 60, damping: 25 });

  useEffect(() => {
    if (!fine) return;
    const move = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 100);
      my.set((e.clientY / window.innerHeight) * 100);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [fine, mx, my]);

  const background = useMotionTemplate`radial-gradient(60rem 60rem at ${mx}% ${my}%, rgba(255,255,255,0.055), transparent 70%)`;

  if (!fine) {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(40rem 40rem at 50% -10%, rgba(255,255,255,0.05), transparent 70%)",
        }}
      />
    );
  }

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ background }}
    />
  );
}
