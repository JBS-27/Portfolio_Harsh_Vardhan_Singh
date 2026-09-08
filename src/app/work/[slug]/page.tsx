import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/footer";
import { ProjectCover } from "@/components/project-cover";
import { getProject, projects } from "@/lib/data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: `${project.title} — ${project.subtitle}`,
      description: project.description,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { caseStudy } = project;

  return (
    <main id="main" className="pt-24 pb-10">
      <article className="mx-auto max-w-5xl px-5 sm:px-8">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-faint uppercase hover:text-ink"
        >
          <ArrowLeft className="size-3.5" />
          All missions
        </Link>

        <p className="mt-10 font-mono text-[10px] tracking-[0.24em] text-cyan uppercase">
          Project {project.mission} · {project.year} · {project.kind}
        </p>
        <h1 className="mt-4 font-display text-4xl tracking-[-0.05em] text-ink sm:text-6xl">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{project.description}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white px-4 py-2 text-sm text-black"
            >
              Live
              <ArrowUpRight className="size-4" />
            </a>
          ) : null}
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/12 px-4 py-2 text-sm text-ink"
            >
              Repository
              <ArrowUpRight className="size-4" />
            </a>
          ) : null}
        </div>

        <div
          className="mt-12 overflow-hidden border border-white/8"
          style={{
            background: `linear-gradient(145deg, ${project.cover.from}, ${project.cover.to})`,
          }}
        >
          <div className="aspect-[16/8]">
            <ProjectCover motif={project.cover.motif} title={project.title} />
          </div>
        </div>

        <section className="mt-16 grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="font-mono text-[10px] tracking-[0.24em] text-cyan uppercase">
              Mission
            </h2>
            <p className="mt-3 leading-relaxed text-muted">{caseStudy.problem}</p>
          </div>
          <div>
            <h2 className="font-mono text-[10px] tracking-[0.24em] text-cyan uppercase">
              Context
            </h2>
            <p className="mt-3 leading-relaxed text-muted">{caseStudy.role}</p>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-mono text-[10px] tracking-[0.24em] text-cyan uppercase">
            System
          </h2>
          <ol className="mt-5 space-y-px bg-white/8">
            {caseStudy.approach.map((step, index) => (
              <li key={step} className="bg-black px-5 py-4 text-muted">
                <span className="mr-3 font-mono text-[10px] text-violet">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14">
          <h2 className="font-mono text-[10px] tracking-[0.24em] text-cyan uppercase">
            Process
          </h2>
          <div className="mt-5 divide-y divide-white/8 border-y border-white/8">
            {caseStudy.decisions.map((decision) => (
              <div key={decision.title} className="py-6">
                <h3 className="text-xl text-ink">{decision.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{decision.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-mono text-[10px] tracking-[0.24em] text-cyan uppercase">
            Result
          </h2>
          <dl className="mt-5 grid grid-cols-2 gap-px bg-white/8 sm:grid-cols-4">
            {caseStudy.results.map((result) => (
              <div key={result.label} className="bg-black px-4 py-5">
                <dt className="font-mono text-[10px] tracking-[0.16em] text-faint uppercase">
                  {result.label}
                </dt>
                <dd className="mt-2 text-xl text-ink">{result.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-14 mb-10">
          <h2 className="font-mono text-[10px] tracking-[0.24em] text-cyan uppercase">
            Technology
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {caseStudy.tech.map((item) => (
              <span
                key={item}
                className="border border-white/10 px-3 py-1.5 font-mono text-[11px] text-muted"
              >
                {item}
              </span>
            ))}
          </div>
        </section>
      </article>
      <Footer />
    </main>
  );
}
