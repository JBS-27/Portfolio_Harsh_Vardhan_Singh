"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/data";
import { ProjectCover } from "@/components/project-cover";
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
          "group grid items-stretch border border-white/8 transition-colors hover:border-white/18",
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
          style={{
            background: `linear-gradient(160deg, ${project.cover.from}, ${project.cover.to})`,
          }}
        >
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]">
            <ProjectCover motif={project.cover.motif} title={project.title} />
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
          <span className="absolute top-5 left-5 font-mono text-[10px] tracking-[0.24em] text-white/70">
            PROJECT {project.mission}
          </span>
        </div>

        <div className="flex flex-col justify-between p-6 sm:p-8">
          <div>
            <p className="font-mono text-[10px] tracking-[0.22em] text-faint uppercase">
              {`Mission ${project.mission}`} · {project.year} · {project.role}
            </p>
            <h3 className="mt-3 font-display text-3xl tracking-[-0.04em] text-ink sm:text-4xl">
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
                  className="border border-white/8 px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-muted uppercase"
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
