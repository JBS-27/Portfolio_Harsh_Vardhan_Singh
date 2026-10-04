import { timeline } from "@/lib/data";
import { FadeIn } from "@/components/fade-in";
import { SectionHeading } from "@/components/section-heading";

const kindLabel = {
  work: "Work",
  education: "Study",
  award: "Mark",
};

export function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-28 py-28 sm:py-36">
      <div className="section-veil section-veil-experience" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <FadeIn>
          <SectionHeading
            index="06"
            eyebrow="Experience"
            title="A short record of where the work was done."
          />
        </FadeIn>

        <ol className="mt-20 divide-y divide-white/10 border-y border-white/10">
          {timeline.map((item, index) => (
            <li key={`${item.title}-${item.org}`}>
              <FadeIn delay={index * 0.03}>
                <div className="grid gap-5 py-10 sm:grid-cols-[200px_1fr] sm:py-12">
                  <div>
                    <p className="type-meta flex items-center gap-2 text-faint">
                      {index === 0 ? (
                        <span className="now-beacon inline-block size-1.5 rounded-full bg-accent" />
                      ) : null}
                      {index === 0 ? "Now" : kindLabel[item.kind]}{" "}
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-3 text-sm text-muted">{item.dates}</p>
                    {item.location ? (
                      <p className="text-sm text-faint">{item.location}</p>
                    ) : null}
                  </div>
                  <div>
                    <h3 className="font-display text-2xl tracking-[-0.03em] text-ink sm:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{item.org}</p>
                    <ul className="mt-5 max-w-2xl space-y-2 text-[0.98rem] leading-relaxed text-muted">
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
