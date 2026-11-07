import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { usePointerFine } from "@/hooks/use-pointer-fine";

type Mode = "default" | "link" | "view";

export function CustomCursor() {
  const fine = usePointerFine();
  const [mode, setMode] = useState<Mode>("default");
  const [visible, setVisible] = useState(false);
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, { stiffness: 700, damping: 45, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 700, damping: 45, mass: 0.4 });

  useEffect(() => {
    if (!fine) return;
    document.documentElement.classList.add("cursor-none-desktop");

    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setVisible(true);
      const el = (e.target as HTMLElement | null)?.closest?.("[data-cursor]") as HTMLElement | null;
      const next = (el?.dataset["cursor"] as Mode | undefined) ?? "default";
      setMode(
        next === "view" || next === "link"
          ? next
          : el || (e.target as HTMLElement)?.closest("a,button")
            ? "link"
            : "default",
      );
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      document.documentElement.classList.remove("cursor-none-desktop");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [fine, rawX, rawY]);

  if (!fine) return null;

  const size = mode === "view" ? 84 : mode === "link" ? 44 : 14;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70] flex items-center justify-center rounded-full border border-foreground/60 mix-blend-difference"
      style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: size,
        height: size,
        opacity: visible ? (mode === "default" ? 0.9 : 1) : 0,
        backgroundColor: mode === "default" ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.06)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
    >
      <AnimatePresence>
        {mode === "view" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="font-display text-[10px] uppercase tracking-[0.24em] text-foreground"
          >
            View
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
