import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/fade-in";
import { SectionHeading } from "@/components/section-heading";
import { thoughts } from "@/lib/data";

export function Thoughts() {
  return (
    <section id="notes" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan/35 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <FadeIn>
          <SectionHeading
            index="04"
            eyebrow="Field notes"
            title="Things I meant when I posted them."
            description="Philosophical lines and the agent thesis, taken from LinkedIn — not rewritten for the site."
          />
        </FadeIn>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {thoughts.map((thought, index) => (
            <FadeIn key={thought.id} delay={index * 0.05}>
              <a
                href={thought.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glow-card group flex h-full flex-col rounded-[1.6rem] border border-white/10 bg-surface/70 p-6 sm:p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="font-mono text-[10px] tracking-[0.22em] text-cyan uppercase">
                    LinkedIn · {thought.date}
                  </p>
                  <ArrowUpRight className="size-4 text-faint transition group-hover:text-cyan" />
                </div>
                <p className="mt-3 text-sm text-muted">{thought.title}</p>
                <blockquote className="glow-title mt-5 font-serif text-2xl leading-snug text-ink sm:text-[1.7rem]">
                  {thought.quote}
                </blockquote>
                <p className="mt-5 text-sm leading-relaxed text-muted">{thought.body}</p>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
