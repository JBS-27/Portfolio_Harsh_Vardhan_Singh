"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import ParticleText from "@/components/ParticleText";
import { HeroSignalProvider, useHeroSignal } from "@/components/hero-signal";
import { cx } from "@/lib/utils";
import { site, telemetry } from "@/lib/data";

const InitiatorGlobe = dynamic(
  () => import("@/components/initiator-globe").then((module) => module.InitiatorGlobe),
  { ssr: false },
);

function HeroStage() {
  const reduce = useReducedMotion();
  const pinRef = useRef<HTMLDivElement>(null);
  const [released, setReleased] = useState(false);
  const { setRevealed } = useHeroSignal();

  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });

  const cueOpacity = useTransform(scrollYProgress, [0, 0.08, 0.22], [1, 0.35, 0]);
  const visualY = useTransform(scrollYProgress, [0.86, 1], [24, 0]);
  const visualOpacity = useTransform(scrollYProgress, [0.86, 1], [0.2, 1]);
  const typeY = useTransform(scrollYProgress, [0.86, 1], [16, 0]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setReleased((was) => (value >= 0.998 ? true : value < 0.99 ? false : was));
    if (value >= 0.86) setRevealed(true);
  });

  return (
    <section id="hero" className="relative isolate">
      <h1 className="sr-only">{site.name} — The Initiator</h1>

      {reduce ? (
        <div className="flex h-svh flex-col items-center justify-center px-5">
          <p className="type-meta mb-6 text-faint">{telemetry.mission}</p>
          <p className="font-serif text-[clamp(2.4rem,8vw,6rem)] tracking-[-0.04em] text-ink">
            THE INITIATOR
          </p>
          <p className="mt-6 text-center font-display text-[clamp(2.2rem,7vw,5.4rem)] leading-[0.86] tracking-[-0.06em] text-ink">
            {site.name}
          </p>
        </div>
      ) : (
        <div ref={pinRef} className="relative h-[240svh] md:h-[280svh]">
          <div
            className={cx(
              "isolate flex h-svh w-full flex-col items-center justify-center overflow-hidden px-5",
              released ? "absolute inset-x-0 bottom-0" : "fixed inset-x-0 top-0 z-[1]",
            )}
          >
            <div className="bloom pointer-events-none absolute inset-0" />
            <p className="type-meta relative z-10 mb-4 text-faint sm:mb-6">{telemetry.mission}</p>
            <div className="relative z-10 h-[min(78svh,42rem)] w-full max-w-[1400px]">
              <ParticleText
                fromText="THE INITIATOR"
                toText={"HARSH\nVARDHAN\nSINGH"}
                progress={scrollYProgress}
                fromFontFamily="var(--font-display-face), ui-sans-serif, sans-serif"
                toFontFamily="var(--font-display-face), ui-sans-serif, sans-serif"
                fromFontWeight={560}
                toFontWeight={560}
                fromFontSize="clamp(3.6rem, 11vw, 8.8rem)"
                toFontSize="clamp(4.2rem, 13vw, 10.8rem)"
                color="#f3f1ea"
                highlightColor="#efe6cc"
                particleSize={2.4}
                density={3}
                scatter={260}
                pointerRepel={36}
                repelRadius={130}
                idleDrift={0.35}
                glow
                className="particle-text--stage h-full"
                style={{ minHeight: 0 }}
              />
            </div>
            <motion.p style={{ opacity: cueOpacity }} className="type-meta relative z-10 mt-6 text-faint">
              Scroll
            </motion.p>
          </div>
        </div>
      )}

      <div className="relative min-h-svh overflow-x-clip pt-28 pb-10">
        <div className="bloom pointer-events-none absolute inset-0" />

        <div className="relative z-10 mx-auto min-h-[calc(100svh-7.5rem)] max-w-7xl px-5 sm:px-8">
          <p className="type-meta mb-6 text-faint">{telemetry.mission}</p>
          <p className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] tracking-[-0.04em] text-ink/80 italic">
            The Initiator
          </p>

          <div className="mt-8 grid items-center gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <motion.div
              style={reduce ? undefined : { y: typeY }}
              className="relative z-20"
            >
              <motion.p
                className="type-sub mt-10 max-w-[22ch] text-ink/90 sm:max-w-[26ch]"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.75 }}
              >
                I build products that think —
                <br />
                and visuals that have to hold a glance.
              </motion.p>

              <motion.dl
                className="mt-12 grid max-w-xl grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.34 }}
              >
                <div className="border-t border-white/10 pt-4">
                  <dt className="type-meta text-faint">Sys.loc</dt>
                  <dd className="mt-2 font-display text-[1.15rem] tracking-[-0.03em] text-ink">
                    {site.location.split(",")[0]}
                  </dd>
                  <dd className="mt-1 text-sm text-muted">
                    India · {telemetry.lat}
                  </dd>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <dt className="type-meta text-faint">Role.def</dt>
                  <dd className="mt-2 font-display text-[1.15rem] tracking-[-0.03em] text-ink">
                    {site.currentRole.title}
                  </dd>
                  <dd className="mt-1 text-sm text-muted">{site.currentRole.org}</dd>
                </div>
                <div className="col-span-2 border-t border-white/10 pt-4 sm:col-span-1">
                  <dt className="type-meta text-faint">Sys.mail</dt>
                  <dd className="mt-2">
                    <a
                      href={`mailto:${site.email}`}
                      className="group relative inline-block text-sm tracking-[-0.01em] text-ink"
                    >
                      {site.email}
                      <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-ink/50 transition-transform duration-500 group-hover:scale-x-100" />
                    </a>
                  </dd>
                </div>
              </motion.dl>

              <motion.div
                className="mt-12"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.46 }}
              >
                <Link
                  href="/#work"
                  className="group inline-flex items-center gap-3 font-display text-lg tracking-[-0.03em] text-ink"
                >
                  Selected work
                  <span className="block h-px w-10 origin-left bg-ink/50 transition-all duration-500 group-hover:w-16" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative mx-auto flex w-full justify-center"
              style={reduce ? undefined : { y: visualY, opacity: visualOpacity }}
            >
              <InitiatorGlobe reduce={!!reduce} />
            </motion.div>
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-2 flex max-w-7xl justify-between px-5 sm:px-8">
          <p className="type-meta text-faint">
            {`Lat // ${telemetry.lat}`} · {`Lng // ${telemetry.lng}`}
          </p>
          <a href="#about" className="type-meta text-muted">
            Index
          </a>
        </div>
      </div>
    </section>
  );
}

export function Hero() {
  return (
    <HeroSignalProvider>
      <HeroStage />
    </HeroSignalProvider>
  );
}
