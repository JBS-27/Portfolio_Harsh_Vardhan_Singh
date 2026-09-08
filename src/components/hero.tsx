"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { HeroSignalProvider } from "@/components/hero-signal";
import { IdentityMark } from "@/components/identity-mark";
import { MagneticButton } from "@/components/magnetic-button";
import { site, telemetry } from "@/lib/data";

const InitiatorGlobe = dynamic(
  () => import("@/components/initiator-globe").then((module) => module.InitiatorGlobe),
  { ssr: false },
);

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const visualOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.12]);
  const typeY = useTransform(scrollYProgress, [0, 1], [0, -28]);
  const typeX = useTransform(scrollYProgress, [0, 1], [0, -8]);

  return (
    <HeroSignalProvider>
      <section
        ref={ref}
        className="relative isolate min-h-svh overflow-x-clip pt-24 pb-14"
      >
        <div className="bloom pointer-events-none absolute inset-0" />

        <svg
          aria-hidden
          viewBox="0 0 1200 720"
          className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        >
          <path
            d="M 390 250 C 520 180 640 210 760 330"
            fill="none"
            stroke="url(#orbitLink)"
            strokeWidth="0.8"
            opacity="0.38"
          />
          <defs>
            <linearGradient id="orbitLink" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="42%" stopColor="#fff8d6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#fff1a8" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative z-10 mx-auto grid min-h-[calc(100svh-7rem)] max-w-7xl items-center gap-6 px-5 sm:px-8 lg:grid-cols-[0.92fr_1.18fr]">
          <motion.div
            style={reduce ? undefined : { y: typeY, x: typeX }}
            className="relative z-20 pt-4"
          >
            <p className="mb-5 font-mono text-[10px] tracking-[0.28em] text-faint uppercase">
              {telemetry.mission}
            </p>

            <IdentityMark />

            <motion.div
              className="mt-7 max-w-md"
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <p className="text-lg leading-snug text-ink sm:text-xl">
                Computer Science Engineer building intelligent systems and ambitious digital experiences.
              </p>
              <p className="mt-5 font-mono text-[10px] tracking-[0.22em] text-faint uppercase">
                {site.currentRole.label}
              </p>
              <p className="mt-1 text-sm text-muted">
                {site.currentRole.title} @ {site.currentRole.org}
              </p>
              <a
                href={`mailto:${site.email}`}
                data-cursor="send"
                className="group mt-6 inline-block font-mono text-sm tracking-[0.04em] text-ink"
              >
                <span className="block text-[10px] tracking-[0.22em] text-faint uppercase">
                  Email
                </span>
                <span className="relative mt-1 inline-block">
                  {site.email}
                  <span className="absolute inset-x-0 -bottom-1 h-px origin-left scale-x-0 bg-cyan transition-transform duration-500 group-hover:scale-x-100" />
                </span>
              </a>
            </motion.div>

            <motion.div
              className="mt-6 flex flex-wrap items-center gap-5"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
            >
              <MagneticButton
                href="/#work"
                className="border border-white/10 bg-white text-black hover:bg-cyan hover:text-black"
              >
                Enter work
              </MagneticButton>
              
            </motion.div>
          </motion.div>

          <motion.div
            className="pointer-events-none relative mx-auto flex w-full justify-center max-lg:absolute max-lg:top-24 max-lg:right-[-4%] max-lg:opacity-50 lg:static lg:opacity-100"
            style={reduce ? undefined : { y: visualY, opacity: visualOpacity }}
            aria-hidden
          >
            <InitiatorGlobe reduce={!!reduce} />
          </motion.div>
        </div>

        <div className="relative z-10 mx-auto mt-6 flex max-w-7xl justify-between px-5 sm:px-8">
          <p className="font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
            {`LAT // ${telemetry.lat}`} · {`LNG // ${telemetry.lng}`}
          </p>
          <a
            href="#about"
            className="font-mono text-[10px] tracking-[0.22em] text-muted uppercase"
          >
            Scroll
          </a>
        </div>
      </section>
    </HeroSignalProvider>
  );
}
