import { FadeIn } from "@/components/fade-in";
import { SectionHeading } from "@/components/section-heading";
import { thoughts } from "@/lib/data";
import { formatOrbitDate } from "@/lib/orbit";
import type { OrbitPost } from "@/lib/orbit-parse";

const pipeline = ["Resume in", "Profile out", "Human signs"];

export function Thoughts({ notes = [] }: { notes?: OrbitPost[] }) {
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

        {notes.length ? (
          <div className="mt-16 divide-y divide-white/10 border-t border-white/10">
            <p className="type-meta pt-8 text-faint">From the wire</p>
            {notes.map((note) => (
              <a
                key={note.id}
                href={note.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-8"
              >
                <p className="type-meta text-faint">{formatOrbitDate(note.createdAt)}</p>
                <p className="mt-3 max-w-3xl font-display text-[clamp(1.5rem,3vw,2.35rem)] leading-[1.15] tracking-[-0.035em] text-ink">
                  {note.text}
                </p>
              </a>
            ))}
          </div>
        ) : null}

        <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
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
                  {thought.id === "wrappers" ? (
                    <ol className="mt-8 grid gap-3 sm:grid-cols-3">
                      {pipeline.map((step, stepIndex) => (
                        <li key={step} className="border border-white/10 px-4 py-4">
                          <p className="type-meta text-faint">
                            {String(stepIndex + 1).padStart(2, "0")}
                          </p>
                          <p className="mt-2 font-display text-xl tracking-[-0.03em] text-ink">
                            {step}
                          </p>
                        </li>
                      ))}
                    </ol>
                  ) : null}
                </div>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
