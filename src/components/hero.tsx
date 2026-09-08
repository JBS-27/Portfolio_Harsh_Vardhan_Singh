"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { EarthField } from "@/components/earth-field";
import { IdentityMark } from "@/components/identity-mark";
import { MagneticButton } from "@/components/magnetic-button";
import { site, telemetry } from "@/lib/data";

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const visualX = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const visualOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.08]);
  const typeY = useTransform(scrollYProgress, [0, 1], [0, -28]);
  const typeX = useTransform(scrollYProgress, [0, 1], [0, -8]);

  return (
    <section
      ref={ref}
      className="relative isolate min-h-svh overflow-x-clip pt-24 pb-14"
    >
      <div className="bloom pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-7rem)] max-w-7xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          style={reduce ? undefined : { y: typeY, x: typeX }}
          className="pt-4"
        >
          <p className="mb-8 font-mono text-[10px] tracking-[0.28em] text-faint uppercase">
            {telemetry.mission}
          </p>

          <IdentityMark />

          <motion.div
            className="mt-10 max-w-md"
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
            className="mt-8 flex flex-wrap items-center gap-5"
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
            <div className="relative h-28 w-24 overflow-hidden rounded-3xl border border-white/15 shadow-[0_0_28px_rgb(124_58_237/0.2)] sm:h-36 sm:w-28">
              <Image
                src={site.portrait.src}
                alt={site.portrait.alt}
                fill
                sizes="112px"
                className="object-cover object-[50%_18%]"
              />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-[560px] lg:max-w-none"
          style={reduce ? undefined : { y: visualY, x: visualX, opacity: visualOpacity }}
        >
          <EarthField />
        </motion.div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-7xl justify-between px-5 sm:px-8">
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
  );
}
