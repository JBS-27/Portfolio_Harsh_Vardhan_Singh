import { projects } from "@/lib/data";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { FadeIn } from "@/components/fade-in";

export function Projects() {
  const featured = projects.filter((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  return (
    <section id="work" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <FadeIn>
          <SectionHeading
            index="02"
            eyebrow="Selected work"
            title="Projects that had to survive contact with reality."
            description="Two large builds up top — a construction OS and a city-scale forecast — then the systems, platforms, and visual experiments around them."
          />
        </FadeIn>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} featured />
          ))}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
