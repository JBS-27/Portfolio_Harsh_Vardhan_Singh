"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { Project } from "@/lib/data";
import { ProjectCover } from "@/components/project-cover";
import { cx } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
};

export function ProjectCard({ project, featured }: ProjectCardProps) {
  const reduce = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 220, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 220, damping: 18 });

  function onMove(event: React.MouseEvent<HTMLAnchorElement>) {
    if (reduce) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateX.set((0.5 - py) * 8);
    rotateY.set((px - 0.5) * 10);
  }

  function onLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.article
      className={cx(featured && "lg:col-span-1")}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/work/${project.slug}`}
        data-cursor="hover"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group block h-full rounded-3xl focus-visible:outline-none"
      >
        <motion.div
          style={{
            rotateX: springX,
            rotateY: springY,
            transformPerspective: 900,
          }}
          className="h-full overflow-hidden rounded-3xl border border-line bg-surface transition-shadow duration-300 group-hover:shadow-[0_0_0_1px_var(--accent),0_24px_80px_var(--glow)]"
        >
          <div
            className={cx(
              "relative overflow-hidden",
              featured ? "aspect-[16/10]" : "aspect-[16/11]",
            )}
            style={{
              background: `linear-gradient(145deg, ${project.cover.from}, ${project.cover.to})`,
            }}
          >
            <div className="absolute inset-0 opacity-90 transition-transform duration-500 group-hover:scale-[1.04]">
              <ProjectCover motif={project.cover.motif} title={project.title} />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
            <span className="absolute top-4 left-4 rounded-full border border-white/15 bg-black/25 px-3 py-1 font-mono text-[11px] text-white/80 backdrop-blur">
              {project.year}
            </span>
          </div>

          <div className="p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-faint">
                  {project.subtitle}
                </p>
                <h3 className="mt-1 font-display text-2xl tracking-tight text-ink">
                  {project.title}
                </h3>
              </div>
              <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors group-hover:border-accent group-hover:text-accent">
                <ArrowUpRight className="size-4" />
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-[15px]">
              {project.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line bg-bg px-2.5 py-1 text-[11px] text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              View case study
            </p>
          </div>
        </motion.div>
      </Link>
    </motion.article>
  );
}
