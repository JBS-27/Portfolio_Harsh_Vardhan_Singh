"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/data";
import { ProjectMedia } from "@/components/project-media";
import { SkillGlyph, skillGlow } from "@/components/skill-icons";
import { cx } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  featured?: boolean;
  onOpen: (project: Project) => void;
};

const TECH_ALIAS: Record<string, string> = {
  "React 19": "React",
  Tailwind: "Tailwind CSS",
  REST: "REST APIs",
  AI: "LLMs",
  "Valuation models": "Python",
};

const tones: Record<string, string> = {
  React: "text-[#61DAFB] bg-[#61DAFB]/12",
  "Next.js": "text-white bg-white/10",
  TypeScript: "text-[#3178C6] bg-[#3178C6]/15",
  JavaScript: "text-[#F7DF1E] bg-[#F7DF1E]/12",
  "Tailwind CSS": "text-[#38BDF8] bg-[#38BDF8]/12",
  "Framer Motion": "text-[#A78BFA] bg-[#A78BFA]/12",
  "Node.js": "text-[#5FA04E] bg-[#5FA04E]/12",
  FastAPI: "text-[#009688] bg-[#009688]/15",
  Python: "text-[#3776AB] bg-[#3776AB]/15",
  "REST APIs": "text-cyan bg-cyan/10",
  JWT: "text-amber bg-amber/10",
  TensorFlow: "text-[#FF6F00] bg-[#FF6F00]/12",
  "scikit-learn": "text-[#F7931E] bg-[#F7931E]/12",
  Streamlit: "text-[#FF4B4B] bg-[#FF4B4B]/12",
  LLMs: "text-violet bg-violet/15",
  SHAP: "text-[#60A5FA] bg-[#60A5FA]/12",
  MongoDB: "text-[#47A248] bg-[#47A248]/12",
  Postgres: "text-[#4169E1] bg-[#4169E1]/15",
};

export function ProjectCard({ project, featured, onOpen }: ProjectCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        data-cursor="interactive"
        aria-label={`Open ${project.title}`}
        className="group grid w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_0_44px_2px_rgba(243,241,234,0.14),0_28px_64px_-18px_rgba(0,0,0,0.85)] lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
      >
        <div
          className={cx(
            "relative overflow-hidden bg-black",
            featured
              ? "aspect-[16/10] min-h-[220px] sm:min-h-[300px] lg:aspect-auto lg:min-h-[460px]"
              : "aspect-[16/10] min-h-[200px] sm:min-h-[260px] lg:aspect-auto lg:min-h-[340px]",
          )}
        >
          <ProjectMedia
            project={project}
            sizes={
              featured
                ? "(min-width: 1024px) 52vw, 100vw"
                : "(min-width: 1024px) 48vw, 100vw"
            }
            className="transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
        </div>

        <div className="flex flex-col justify-center border-t border-white/10 px-5 py-6 sm:px-8 sm:py-8 lg:border-t-0 lg:border-l lg:px-10 lg:py-10">
          <p className="type-meta text-faint">
            Project {project.mission.padStart(2, "0")} · {project.year}
          </p>
          <h3 className="mt-3 font-display text-[clamp(1.85rem,3.4vw,3.15rem)] leading-[0.95] tracking-[-0.045em] text-ink">
            {project.title}
          </h3>
          <p className="mt-2 font-serif text-[1.05rem] text-white/55 italic">
            {project.subtitle}
          </p>
          <p className="type-meta mt-3 text-faint">{project.discipline}</p>
          <p className="mt-5 max-w-md text-[0.98rem] leading-relaxed text-muted">
            {project.description}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => {
              const icon = TECH_ALIAS[tag] ?? tag;
              return (
                <li
                  key={tag}
                  className="inline-flex max-w-full items-center gap-2 rounded-lg border border-white/8 bg-black/35 py-1.5 pr-2.5 pl-1.5"
                >
                  <span
                    className={cx(
                      "grid size-7 shrink-0 place-items-center rounded-md",
                      tones[icon] ?? "bg-white/8 text-ink",
                    )}
                    style={{
                      boxShadow: `0 0 16px -6px ${skillGlow[icon] ?? "rgba(243,241,234,0.2)"}`,
                    }}
                  >
                    <SkillGlyph name={icon} className="size-3.5" />
                  </span>
                  <span className="truncate text-[0.78rem] tracking-[-0.01em] text-ink/90">
                    {tag}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </button>
    </motion.article>
  );
}
