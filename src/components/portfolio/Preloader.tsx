import { AnimatePresence, motion } from "motion/react";

export function Preloader({ done }: { done: boolean }) {
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[80] flex items-end justify-between bg-background px-6 pb-8 sm:px-10 sm:pb-10"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="font-display text-[15vw] font-bold leading-none tracking-tighter sm:text-[10vw]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Hello.
          </motion.span>
          <motion.span
            className="label-xs pb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            01
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
