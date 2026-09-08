"use client";

import { useHeroSignal } from "@/components/hero-signal";
import { cx } from "@/lib/utils";
import { TypeAnimation } from 'react-type-animation';

export function IdentityMark() {
  const { revealed, setRevealed } = useHeroSignal();

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
        {/* Invisible placeholder to maintain the exact height and width of the layout */}
        <span
          aria-hidden
          className="invisible block font-display text-[11vw] leading-[0.88] font-medium tracking-[-0.045em] sm:text-[7.2vw] lg:text-[4.7rem] whitespace-pre-line"
        >
          {'HARSH\nVARDHAN\nSINGH'}
        </span>

        {/* The Typing Animation replacing the static text */}
        <TypeAnimation
          sequence={[
            'THE\nINITIATOR',
            2000, // Significant pause
            'HARSH\nVARDHAN\nSINGH',
            2500, // Pause before repeating
          ]}
          wrapper="span"
          cursor={true}
          speed={30}
          deletionSpeed={40}
          repeat={Infinity}
          className="grad-text absolute inset-0 block font-display text-[11vw] leading-[0.88] font-medium tracking-[-0.045em] sm:text-[7.2vw] lg:text-[4.7rem] whitespace-pre-line"
        />

        {/* Existing decoration lines and sweeps */}
        <span
          aria-hidden
          className={cx(
            "pointer-events-none absolute top-1/2 left-0 h-px w-full origin-left bg-linear-to-r from-transparent via-cyan to-transparent transition-transform duration-700",
            revealed ? "scale-x-100" : "scale-x-0",
          )}
        />
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
