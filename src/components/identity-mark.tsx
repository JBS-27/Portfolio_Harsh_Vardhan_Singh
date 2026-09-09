"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useHeroSignal } from "@/components/hero-signal";
import { cx } from "@/lib/utils";

const lines = [
  { text: "HARSH", indent: "pl-0" },
  { text: "VARDHAN", indent: "pl-[0.06em] sm:pl-[0.12em]" },
  { text: "SINGH", indent: "pl-[0.14em] sm:pl-[0.28em] text-[#efe6cc]" },
] as const;

export function IdentityMark() {
  const reduce = useReducedMotion();
  const { revealed, setRevealed } = useHeroSignal();

  return (
    <h1 className="relative w-full min-w-0">
      <button
        type="button"
        aria-label={
          revealed
            ? "Harsh Vardhan Singh. Return to The Initiator."
            : "The Initiator. Reveal Harsh Vardhan Singh."
        }
        aria-pressed={revealed}
        className="group relative block w-full text-left"
        onMouseEnter={() => setRevealed(true)}
        onMouseLeave={() => setRevealed(false)}
        onFocus={() => setRevealed(true)}
        onBlur={() => setRevealed(false)}
      >
        <span className="font-serif text-[clamp(1.15rem,2.1vw,1.55rem)] tracking-[-0.02em] text-white/50 italic">
          The Initiator
        </span>

        <span className="hero-name mt-4 block text-ink">
          {lines.map((line, index) => (
            <motion.span
              key={line.text}
              className={cx("block", line.indent)}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1 + index * 0.08,
                duration: 0.74,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {line.text}
            </motion.span>
          ))}
        </span>

        <span
          aria-hidden
          className={cx(
            "identity-sweep pointer-events-none absolute inset-0 overflow-hidden",
            revealed && "is-active",
          )}
        />
      </button>
    </h1>
  );
}
