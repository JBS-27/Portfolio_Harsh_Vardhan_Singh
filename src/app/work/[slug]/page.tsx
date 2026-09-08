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
    <main id="main" className="pt-28 pb-10">
      <article className="mx-auto max-w-4xl px-5 sm:px-8">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink"
        >
          <ArrowLeft className="size-4" />
          All work
        </Link>

        <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
          {project.year} · {project.subtitle}
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-ink sm:text-6xl">
          {project.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          {project.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm text-bg hover:bg-accent hover:text-bg"
            >
              Live demo
              <ArrowUpRight className="size-4" />
            </a>
          ) : null}
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ink hover:border-accent/50"
            >
              Repository
              <ArrowUpRight className="size-4" />
            </a>
          ) : null}
        </div>

        <div
          className="mt-12 overflow-hidden rounded-[2rem] border border-line"
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
            <h2 className="font-display text-2xl text-ink">Problem</h2>
            <p className="mt-3 leading-relaxed text-muted">{caseStudy.problem}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-ink">Role & approach</h2>
            <p className="mt-3 leading-relaxed text-muted">{caseStudy.role}</p>
          </div>
        </section>

        <ol className="mt-8 space-y-3">
          {caseStudy.approach.map((step, index) => (
            <li
              key={step}
              className="rounded-2xl border border-line bg-surface px-5 py-4 text-muted"
            >
              <span className="mr-3 font-mono text-xs text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              {step}
            </li>
          ))}
        </ol>

        <section className="mt-16">
          <h2 className="font-display text-2xl text-ink">Key decisions</h2>
          <div className="mt-6 grid gap-4">
            {caseStudy.decisions.map((decision) => (
              <div
                key={decision.title}
                className="rounded-3xl border border-line bg-surface p-6"
              >
                <h3 className="font-display text-xl text-ink">{decision.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{decision.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl text-ink">Results</h2>
          <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {caseStudy.results.map((result) => (
              <div
                key={result.label}
                className="rounded-2xl border border-line bg-surface px-4 py-5"
              >
                <dt className="text-[11px] uppercase tracking-[0.14em] text-faint">
                  {result.label}
                </dt>
                <dd className="mt-2 font-display text-xl text-ink">{result.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-16 mb-10">
          <h2 className="font-display text-2xl text-ink">Tech used</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {caseStudy.tech.map((item) => (
              <span
                key={item}
                className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-muted"
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
