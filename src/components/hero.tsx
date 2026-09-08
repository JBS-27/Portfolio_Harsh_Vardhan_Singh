"use client";

import { ArrowUpRight, FileText } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { MagneticButton } from "@/components/magnetic-button";
import { GitHubIcon } from "@/components/social-icons";
import { site } from "@/lib/data";

export function Hero() {
  const reduce = useReducedMotion();
  const lines = ["Harsh", "Vardhan", "Singh"];

  return (
    <section className="relative isolate overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="mesh pointer-events-none absolute inset-0 -z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-linear-to-t from-bg to-transparent" />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-8 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
          <span className="text-accent">01 / Intro</span>
          <span className="h-px w-8 bg-line" />
          <span>{site.location}</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">{site.currently}</span>
        </div>

        <h1 className="font-display text-[16vw] leading-[0.86] tracking-[-0.04em] text-ink sm:text-[12vw] lg:text-[8.4rem]">
          {lines.map((line, index) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reduce ? false : { y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.9,
                  delay: 0.08 * index,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
          >
            <p className="max-w-xl text-xl leading-snug text-ink sm:text-2xl">
              {site.role}
            </p>
            <p className="mt-3 max-w-xl text-lg leading-relaxed text-muted">
              {site.tagline}
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-faint">
              {site.personality}
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col gap-4 sm:flex-row sm:flex-wrap lg:justify-end"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <MagneticButton
              href="/#work"
              className="bg-ink text-bg hover:bg-accent hover:text-bg"
            >
              View work
              <ArrowUpRight className="size-4" />
            </MagneticButton>
            <MagneticButton
              href={site.resumeUrl}
              className="border border-line bg-surface text-ink hover:border-accent/50"
            >
              <FileText className="size-4" />
              Resume
            </MagneticButton>
            <MagneticButton
              href={site.socials.github}
              external
              className="border border-line bg-transparent text-ink hover:border-accent/50"
            >
              <GitHubIcon className="size-4" />
              GitHub
            </MagneticButton>
          </motion.div>
        </div>

        <motion.p
          className="mt-14 inline-flex items-center gap-3 rounded-full border border-line bg-surface/70 px-4 py-2 text-sm text-muted backdrop-blur sm:hidden"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className="size-2 rounded-full bg-accent" />
          {site.currently}
        </motion.p>
      </div>
    </section>
  );
}
