import { projects } from "@/lib/data";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { FadeIn } from "@/components/fade-in";

export function Projects() {
  const featured = projects.filter((project) => project.kind === "featured");
  const secondary = projects.filter((project) => project.kind === "secondary");
  const experimental = projects.filter((project) => project.kind === "experimental");

  return (
    <section id="work" className="relative scroll-mt-28 py-28 sm:py-36">
      <div className="section-veil section-veil-work" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <FadeIn>
          <SectionHeading
            index="03"
            eyebrow="Work"
            title="Work that had to survive contact with reality."
          />
        </FadeIn>

        <div className="mt-20 space-y-24">
          {featured.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              featured
              reverse={index % 2 === 1}
            />
          ))}
        </div>

        <div className="mt-24 grid gap-16 lg:grid-cols-2">
          {secondary.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <p className="type-meta mt-24 text-faint">Experimental</p>
        <div className="mt-8 grid gap-16 lg:grid-cols-2">
          {experimental.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
