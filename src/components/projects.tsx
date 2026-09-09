"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import { ProjectCard } from "@/components/project-card";
import { ProjectMedia } from "@/components/project-media";
import { SectionHeading } from "@/components/section-heading";
import { FadeIn } from "@/components/fade-in";

export function Projects() {
  const reduce = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Project | null>(null);

  const featured = projects.filter((project) => project.kind === "featured");
  const secondary = projects.filter((project) => project.kind === "secondary");
  const experimental = projects.filter((project) => project.kind === "experimental");

  function openProject(project: Project) {
    setSelectedItem(project);
    setIsOpen(true);
  }

  function closeProject() {
    setIsOpen(false);
    setSelectedItem(null);
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") closeProject();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <section id="work" className="relative scroll-mt-28 overflow-x-clip py-28 sm:py-36">
      <div className="section-veil section-veil-work" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <FadeIn>
          <SectionHeading
            index="03"
            eyebrow="Work"
            title="Work that had to survive contact with reality."
          />
        </FadeIn>

        <div className="mt-20 space-y-6">
          {featured.map((project) => (
            <ProjectCard
              key={project.slug}
              project={project}
              featured
              onOpen={openProject}
            />
          ))}
        </div>

        <div className="mt-6 space-y-6">
          {secondary.map((project) => (
            <ProjectCard key={project.slug} project={project} onOpen={openProject} />
          ))}
        </div>

        <p className="type-meta mt-16 text-faint">Experimental</p>
        <div className="mt-6 space-y-6">
          {experimental.map((project) => (
            <ProjectCard key={project.slug} project={project} onOpen={openProject} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && selectedItem ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-end justify-center overflow-y-auto bg-black/92 p-4 sm:items-center sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProject}
          >
            <button
              type="button"
              className="absolute top-5 right-5 grid size-10 place-items-center border border-white/15 text-ink"
              aria-label="Close project"
              onClick={closeProject}
            >
              <X className="size-4" />
            </button>
            <motion.article
              initial={reduce ? false : { opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative my-8 w-full max-w-[920px] sm:my-0"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-black">
                <ProjectMedia project={selectedItem} sizes="92vw" priority />
              </div>
              <div className="border border-t-0 border-white/10 bg-black/70 px-5 py-6 backdrop-blur-md sm:px-8 sm:py-8">
                <p className="type-meta text-faint">
                  Project {selectedItem.mission.padStart(2, "0")} · {selectedItem.year} ·{" "}
                  {selectedItem.discipline}
                </p>
                <h3 className="mt-3 font-display text-[clamp(1.8rem,4vw,3rem)] tracking-[-0.04em] text-ink">
                  {selectedItem.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{selectedItem.subtitle}</p>
                <p className="mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-muted">
                  {selectedItem.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {selectedItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-white/10 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-faint uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                  <Link
                    href={`/work/${selectedItem.slug}`}
                    className="type-meta text-ink underline-offset-4 hover:underline"
                  >
                    Open case
                  </Link>
                  {selectedItem.liveUrl ? (
                    <a
                      href={selectedItem.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="type-meta text-faint underline-offset-4 hover:text-ink hover:underline"
                    >
                      Live
                    </a>
                  ) : null}
                  {selectedItem.repoUrl ? (
                    <a
                      href={selectedItem.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="type-meta text-faint underline-offset-4 hover:text-ink hover:underline"
                    >
                      Repository
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.article>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
