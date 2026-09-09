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

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/work/${project.slug}`}
        className={cx(
          "group grid items-stretch",
          featured ? "lg:grid-cols-[1.2fr_0.8fr] lg:gap-10" : "gap-5",
          featured && reverse && "lg:grid-cols-[0.8fr_1.2fr]",
        )}
      >
        <div
          className={cx(
            "relative overflow-hidden bg-black",
            featured ? "min-h-[320px] lg:min-h-[560px]" : "min-h-[240px] sm:min-h-[300px]",
            featured && reverse && "lg:order-2",
          )}
        >
          <Image
            src={project.image}
            alt={`${project.title} — ${project.subtitle}`}
            fill
            sizes={
              featured
                ? "(min-width: 1024px) 58vw, 100vw"
                : "(min-width: 768px) 46vw, 100vw"
            }
            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
        </div>

        <div className={cx("flex flex-col justify-end", featured ? "lg:py-4" : "")}>
          <p className="type-meta text-faint">
            Project {project.mission.padStart(2, "0")}
          </p>
          <h3 className="mt-3 font-display text-[clamp(1.8rem,3.2vw,2.8rem)] tracking-[-0.04em] text-ink">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-muted">{project.discipline}</p>
          {featured ? (
            <p className="mt-5 max-w-md text-[0.98rem] leading-relaxed text-muted">
              {project.description}
            </p>
          ) : null}
        </div>
      </Link>
    </motion.article>
  );
}
