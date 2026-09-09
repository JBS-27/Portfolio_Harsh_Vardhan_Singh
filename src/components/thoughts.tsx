import { FadeIn } from "@/components/fade-in";
import { SectionHeading } from "@/components/section-heading";
import { thoughts } from "@/lib/data";

export function Thoughts() {
  return (
    <section id="notes" className="relative scroll-mt-28 py-28 sm:py-36">
      <div className="section-veil section-veil-notes" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <FadeIn>
          <SectionHeading
            index="05"
            eyebrow="Notes"
            title="Things I meant when I posted them."
          />
        </FadeIn>

        <div className="mt-20 divide-y divide-white/10 border-y border-white/10">
          {thoughts.map((thought, index) => (
            <FadeIn key={thought.id} delay={index * 0.04}>
              <a
                href={thought.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid gap-6 py-10 sm:grid-cols-[140px_1fr] sm:py-14"
              >
                <p className="type-meta pt-2 text-faint">
                  {String(index + 1).padStart(2, "0")} / {thought.date}
                </p>
                <div>
                  <p className="text-sm text-muted">{thought.title}</p>
                  <blockquote className="mt-3 max-w-3xl font-display text-[clamp(1.5rem,3vw,2.35rem)] leading-[1.15] tracking-[-0.035em] text-ink">
                    {thought.quote}
                  </blockquote>
                  <p className="mt-5 max-w-2xl text-[0.98rem] leading-relaxed text-muted">
                    {thought.body}
                  </p>
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
