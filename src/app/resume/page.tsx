import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileDown } from "lucide-react";
import { Footer } from "@/components/footer";
import { site, skillGroups, timeline } from "@/lib/data";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume — ${site.name}`,
};

export default function ResumePage() {
  const work = timeline.filter((item) => item.kind === "work");
  const education = timeline.filter((item) => item.kind !== "work");

  return (
    <main id="main" className="pt-28">
      <div className="mx-auto max-w-3xl px-5 pb-16 sm:px-8">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink"
          >
            <ArrowLeft className="size-4" />
            Back
          </Link>
          <a
            href="/Harsh_Vardhan_Singh_Resume.pdf"
            className="inline-flex items-center gap-2 border border-white/12 px-4 py-2 text-sm text-ink hover:border-cyan/40"
          >
            <FileDown className="size-4" />
            Download PDF
          </a>
        </div>

        <h1 className="font-display text-4xl tracking-tight text-ink sm:text-5xl">
          {site.name}
        </h1>
        <p className="mt-2 text-muted">{site.role}</p>
        <p className="mt-3 text-sm text-faint">
          {site.email} · {site.location}
        </p>
        <p className="mt-6 leading-relaxed text-muted">{site.tagline}</p>

        <section className="mt-12">
          <h2 className="font-display text-2xl text-ink">Experience</h2>
          <div className="mt-5 space-y-6">
            {work.map((item) => (
              <div key={item.org}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-medium text-ink">
                    {item.title} · {item.org}
                  </h3>
                  <p className="text-sm text-faint">{item.dates}</p>
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl text-ink">Education & awards</h2>
          <div className="mt-5 space-y-6">
            {education.map((item) => (
              <div key={item.org + item.title}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-medium text-ink">
                    {item.title} · {item.org}
                  </h3>
                  <p className="text-sm text-faint">{item.dates}</p>
                </div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl text-ink">Skills</h2>
          <div className="mt-5 space-y-3">
            {skillGroups.map((group) => (
              <p key={group.title} className="text-sm text-muted">
                <span className="text-ink">{group.title}: </span>
                {group.items.join(", ")}
              </p>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}
