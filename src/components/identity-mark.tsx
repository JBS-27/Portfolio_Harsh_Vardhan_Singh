"use client";

import ParticleText from "@/components/ParticleText";
import { site } from "@/lib/data";

const lines = [
  { text: "HARSH", color: "#f3f1ea" },
  { text: "VARDHAN", color: "#f3f1ea" },
  { text: "SINGH", color: "#efe6cc" },
] as const;

export function IdentityMark() {
  return (
    <h1 className="hero-name relative w-full min-w-0">
      <span className="sr-only">{site.name} — The Initiator</span>
      <span className="block" aria-hidden>
        {lines.map((line) => (
          <span key={line.text} className="block h-[clamp(5.6rem,15vw,12rem)]">
            <ParticleText
              text={line.text}
              fontFamily="inherit"
              fontWeight={560}
              fontSize="clamp(6.2rem, 20vw, 15.6rem)"
              color={line.color}
              highlightColor={line.color}
              particleSize={2.6}
              density={3}
              scatter={140}
              gatherDuration={1400}
              stagger={280}
              pointerRepel={0}
              idleDrift={0.25}
              trigger="mount"
              glow={false}
              className="pointer-events-none h-full bg-transparent"
              style={{ minHeight: 0, background: "transparent" }}
            />
          </span>
        ))}
      </span>
    </h1>
  );
}
