import Image from "next/image";
import { about, site } from "@/lib/data";
import { FadeIn } from "@/components/fade-in";
import { SectionHeading } from "@/components/section-heading";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <FadeIn>
          <SectionHeading
            index="03"
            eyebrow="About"
            title={about.lead}
          />
        </FadeIn>

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn>
            <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface p-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-elevated">
                <Image
                  src={site.portrait.src}
                  alt={site.portrait.alt}
                  fill
                  sizes="(min-width: 1024px) 420px, 90vw"
                  className="object-cover grayscale transition duration-500 hover:grayscale-0"
                />
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/55 to-transparent p-5">
                  <p className="font-display text-xl text-white">{site.name}</p>
                  <p className="text-sm text-white/75">{site.role}</p>
                </div>
              </div>
              <p className="px-3 py-4 font-mono text-[11px] uppercase tracking-[0.18em] text-faint">
                Poster frame · GitHub portrait
              </p>
            </div>
          </FadeIn>

          <div>
            <FadeIn delay={0.08}>
              <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
                {about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p className="text-ink">{about.outside}</p>
                <p className="border-l-2 border-accent pl-4 text-ink">
                  {about.availability}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.16}>
              <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {about.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="rounded-2xl border border-line bg-surface px-4 py-4"
                  >
                    <dt className="text-[11px] uppercase tracking-[0.14em] text-faint">
                      {fact.label}
                    </dt>
                    <dd className="mt-2 font-display text-2xl text-ink">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
