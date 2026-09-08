import { timeline } from "@/lib/data";
import { FadeIn } from "@/components/fade-in";
import { SectionHeading } from "@/components/section-heading";

const kindLabel = {
  work: "Experience",
  education: "Education",
  award: "Award",
};

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <FadeIn>
          <SectionHeading
            index="05"
            eyebrow="Path"
            title="A short timeline — work, school, and a Scout badge that still matters."
          />
        </FadeIn>

        <ol className="relative mt-14 space-y-0 border-l border-line pl-0 sm:ml-2">
          {timeline.map((item, index) => (
            <li key={`${item.title}-${item.org}`} className="relative">
              <FadeIn delay={index * 0.05}>
                <div className="grid gap-4 py-8 pl-8 sm:grid-cols-[180px_1fr] sm:pl-12">
                  <span className="absolute top-10 left-[-5px] size-2.5 rounded-full bg-accent ring-4 ring-bg" />
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-faint">
                      {kindLabel[item.kind]}
                    </p>
                    <p className="mt-2 text-sm text-muted">{item.dates}</p>
                    {item.location ? (
                      <p className="text-sm text-faint">{item.location}</p>
                    ) : null}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl tracking-tight text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-accent">{item.org}</p>
                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted sm:text-[15px]">
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
