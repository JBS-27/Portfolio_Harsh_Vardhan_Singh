"use client";

import { useState } from "react";
import { cx } from "@/lib/utils";

export function IdentityMark() {
  const [revealed, setRevealed] = useState(false);

  return (
    <h1 className="relative w-full min-w-0 overflow-visible">
      <button
        type="button"
        data-cursor={revealed ? "identity" : "initiator"}
        aria-label={
          revealed
            ? "Harsh Vardhan Singh. Press to return to The Initiator."
            : "The Initiator. Reveal Harsh Vardhan Singh."
        }
        aria-pressed={revealed}
        className="group relative block w-full overflow-visible text-left"
        onMouseEnter={() => setRevealed(true)}
        onMouseLeave={() => setRevealed(false)}
        onFocus={() => setRevealed(true)}
        onBlur={() => setRevealed(false)}
      >
        <span
          aria-hidden
          className="invisible block font-display text-[11vw] leading-[0.88] font-medium tracking-[-0.045em] sm:text-[7.2vw] lg:text-[5.4rem]"
        >
          HARSH
          <br />
          VARDHAN
          <br />
          SINGH
        </span>
        <span
          className={cx(
            "absolute inset-0 block font-display text-[12vw] leading-[0.86] font-medium tracking-[-0.055em] text-ink transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-[9vw] lg:text-[6.4rem]",
            revealed && "translate-x-3 opacity-0 blur-[6px]",
          )}
        >
          THE
          <br />
          INITIATOR
        </span>
        <span
          className={cx(
            "grad-text pointer-events-none absolute inset-0 block font-display text-[11vw] leading-[0.88] font-medium tracking-[-0.045em] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:text-[7.2vw] lg:text-[5.4rem]",
            revealed
              ? "translate-x-0 opacity-100 blur-0"
              : "-translate-x-4 opacity-0 blur-[8px]",
          )}
        >
          HARSH
          <br />
          VARDHAN
          <br />
          SINGH
        </span>
        <span
          aria-hidden
          className={cx(
            "pointer-events-none absolute top-1/2 left-0 h-px w-full origin-left bg-linear-to-r from-transparent via-cyan to-transparent transition-transform duration-700",
            revealed ? "scale-x-100" : "scale-x-0",
          )}
        />
      </button>
    </h1>
  );
}
