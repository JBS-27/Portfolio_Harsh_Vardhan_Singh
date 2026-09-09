"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ParticleText from "@/components/ParticleText";
import { HeroSignalProvider } from "@/components/hero-signal";
import { IdentityMark } from "@/components/identity-mark";
import { site, telemetry } from "@/lib/data";

const InitiatorGlobe = dynamic(
  () => import("@/components/initiator-globe").then((module) => module.InitiatorGlobe),
  { ssr: false },
);

export function Hero() {
  const reduce = useReducedMotion();
  const landRef = useRef<HTMLDivElement>(null);
  const [nameOn, setNameOn] = useState(!!reduce);

  useEffect(() => {
    const node = landRef.current;
    if (!node || reduce) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNameOn(true);
      },
      { threshold: 0.28 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduce]);

  const { scrollYProgress } = useScroll({
    target: landRef,
    offset: ["start start", "end start"],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const visualOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.18]);
  const typeY = useTransform(scrollYProgress, [0, 1], [0, -20]);

  return (
    <HeroSignalProvider>
      <section id="hero" className="relative isolate overflow-x-clip">
        {reduce ? null : (
          <div className="relative flex h-svh flex-col items-center justify-center px-5">
            <div className="bloom pointer-events-none absolute inset-0" />
            <p className="type-meta relative mb-6 text-faint">{telemetry.mission}</p>
            <div className="relative h-[min(72svh,34rem)] w-full max-w-[1400px] font-serif">
              <ParticleText
                text="THE INITIATOR"
                fontFamily="inherit"
                fontWeight={400}
                fontSize="clamp(3.6rem, 14vw, 11rem)"
                color="#f3f1ea"
                highlightColor="#efe6cc"
                particleSize={2.4}
                density={3}
                scatter={220}
                gatherDuration={1800}
                stagger={480}
                trigger="mount"
                glow
                className="h-full"
                style={{}}
              />
            </div>
            <p className="type-meta relative mt-8 text-faint">Scroll</p>
          </div>
        )}

        <div ref={landRef} className="relative min-h-svh overflow-x-clip pt-28 pb-10">
          <div className="bloom pointer-events-none absolute inset-0" />

          <div className="relative z-10 mx-auto min-h-[calc(100svh-7.5rem)] max-w-7xl px-5 sm:px-8">
            <p className="type-meta mb-6 text-faint">{telemetry.mission}</p>
            {nameOn ? <IdentityMark /> : (
              <h1 className="sr-only">{site.name} — The Initiator</h1>
            )}

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
    </HeroSignalProvider>
  );
}
