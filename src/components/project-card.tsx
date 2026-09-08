"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/data";
import { cx } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
  reverse?: boolean;
};

export function ProjectCard({ project, featured, reverse }: ProjectCardProps) {
  const reduce = useReducedMotion();
  const experimental = project.kind === "experimental";

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/work/${project.slug}`}
        data-cursor="project"
        className={cx(
          "glow-card group grid items-stretch overflow-hidden rounded-[1.75rem] border border-white/10 bg-surface/80",
          featured
            ? "lg:grid-cols-[1.15fr_0.85fr]"
            : experimental
              ? "grid-rows-[auto_1fr]"
              : "md:grid-cols-2",
          featured && reverse && "lg:grid-cols-[0.85fr_1.15fr]",
        )}
      >
        <div
          className={cx(
            "relative overflow-hidden",
            featured ? "min-h-[320px] lg:min-h-[520px]" : "min-h-[240px]",
            featured && reverse && "lg:order-2",
          )}
        >
          <Image
            src={project.image}
            alt={`${project.title} — ${project.subtitle}`}
            fill
            sizes={
              featured
                ? "(min-width: 1024px) 55vw, 100vw"
                : "(min-width: 768px) 40vw, 100vw"
            }
            className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgb(124_58_237/0.22),transparent_55%)]" />
          <span className="absolute top-5 left-5 rounded-full border border-white/15 bg-black/40 px-3 py-1 font-mono text-[10px] tracking-[0.24em] text-white/80 backdrop-blur-sm">
            PROJECT {project.mission}
          </span>
        </div>

        <div className="flex flex-col justify-between p-6 sm:p-8">
          <div>
            <p className="font-mono text-[10px] tracking-[0.22em] text-faint uppercase">
              {`Mission ${project.mission}`} · {project.year} · {project.role}
            </p>
            <h3 className="glow-title mt-3 font-display text-3xl tracking-[-0.04em] text-ink transition duration-500 group-hover:text-white sm:text-4xl">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-cyan">{project.subtitle}</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              {project.description}
            </p>
          </div>
          <div className="mt-8">
            <p className="font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
              Stack
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/8 bg-white/3 px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-muted uppercase transition-colors group-hover:border-cyan/25 group-hover:text-ink"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
