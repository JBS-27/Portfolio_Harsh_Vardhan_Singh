import { timeline } from "@/lib/data";
import { FadeIn } from "@/components/fade-in";
import { SectionHeading } from "@/components/section-heading";

const kindLabel = {
  work: "Flight",
  education: "Ground",
  award: "Mark",
};

export function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/12 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <FadeIn>
          <SectionHeading
            index="03"
            eyebrow="Flight history"
            title="A short record of where the work was done."
          />
        </FadeIn>

        <ol className="mt-16 divide-y divide-white/8 border-y border-white/8">
          {timeline.map((item, index) => (
            <li key={`${item.title}-${item.org}`}>
              <FadeIn delay={index * 0.04}>
                <div className="grid gap-4 py-8 sm:grid-cols-[160px_1fr]">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.2em] text-cyan uppercase">
                      {index === 0 && item.kind === "work"
                        ? "Current mission"
                        : `${kindLabel[item.kind]} ${String(index + 1).padStart(2, "0")}`}
                    </p>
                    <p className="mt-2 text-sm text-muted">{item.dates}</p>
                    {item.location ? (
                      <p className="text-sm text-faint">{item.location}</p>
                    ) : null}
                  </div>
                  <div>
                    <h3 className="text-2xl tracking-tight text-ink">{item.title}</h3>
                    <p className="mt-1 text-sm text-violet">{item.org}</p>
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
