import { learningNow, skillGroups } from "@/lib/data";
import { FadeIn } from "@/components/fade-in";
import { SectionHeading } from "@/components/section-heading";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <FadeIn>
          <SectionHeading
            index="04"
            eyebrow="Skills & tools"
            title="A stack that can train, ship, and still look like it meant to."
            description="Grouped the way I actually work — interfaces, services, models, and the craft around them."
          />
        </FadeIn>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {skillGroups.map((group, index) => (
            <FadeIn key={group.title} delay={index * 0.04}>
              <div className="rounded-3xl border border-line bg-surface p-6">
                <h3 className="font-display text-xl text-ink">{group.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-line bg-bg px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent/50 hover:text-ink"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="mt-6 rounded-3xl border border-dashed border-accent/40 bg-accent/5 p-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              Currently learning
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {learningNow.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-surface px-3 py-1.5 text-sm text-ink"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
