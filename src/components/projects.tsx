import { projects } from "@/lib/data";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { FadeIn } from "@/components/fade-in";

export function Projects() {
  const featured = projects.filter((project) => project.kind === "featured");
  const secondary = projects.filter((project) => project.kind === "secondary");
  const experimental = projects.filter((project) => project.kind === "experimental");

  return (
    <section id="work" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-violet/50 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <FadeIn>
          <SectionHeading
            index="02"
            eyebrow="Missions"
            title="Work that had to survive contact with reality."
            description="Featured systems first. Then platforms. Then experiments — the pieces that test attention and physics."
          />
        </FadeIn>

        <div className="mt-16 space-y-8">
          {featured.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              featured
              reverse={index % 2 === 1}
            />
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {secondary.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <p className="mt-14 font-mono text-[10px] tracking-[0.24em] text-faint uppercase">
          Experimental
        </p>
        <div className="mt-4 grid gap-8 lg:grid-cols-2">
          {experimental.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
