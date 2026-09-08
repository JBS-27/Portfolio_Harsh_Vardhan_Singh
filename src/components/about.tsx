import Image from "next/image";
import { about, learningNow, site, skillGroups } from "@/lib/data";
import { FadeIn } from "@/components/fade-in";
import { SectionHeading } from "@/components/section-heading";

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/12 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <FadeIn>
          <SectionHeading index="01" eyebrow="Trajectory" title={about.lead} />
        </FadeIn>

        <div className="mt-16 grid items-start gap-14 lg:grid-cols-[0.72fr_1.28fr]">
          <FadeIn>
            <div className="relative">
              <div className="absolute -top-3 -left-3 font-mono text-[10px] tracking-[0.22em] text-faint">
                {`REF // 00`}
              </div>
              <div className="relative mx-auto aspect-[4/5] max-w-[280px] overflow-hidden rounded-3xl border border-white/10 shadow-[0_0_48px_rgb(124_58_237/0.16)]">
                <Image
                  src={site.portrait.src}
                  alt={site.portrait.alt}
                  fill
                  sizes="(min-width: 1024px) 280px, 70vw"
                  className="object-cover object-[50%_18%]"
                />
              </div>
              <div className="mt-4 flex justify-between font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
                <span>{site.location}</span>
                <span>IIIT Surat</span>
              </div>
            </div>
          </FadeIn>

          <div>
            <FadeIn delay={0.06}>
              <div className="space-y-5 text-[15px] leading-relaxed text-muted sm:text-base">
                {about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p className="text-ink">{about.outside}</p>
                <p className="border-l border-cyan/60 pl-4 text-ink">
                  {about.availability}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <dl className="mt-12 grid grid-cols-2 gap-px bg-white/8 sm:grid-cols-4">
                {about.facts.map((fact) => (
                  <div key={fact.label} className="bg-black px-4 py-5">
                    <dt className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
                      {fact.label}
                    </dt>
                    <dd className="mt-2 text-2xl tracking-tight text-ink">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </FadeIn>
          </div>
        </div>

        <div id="skills" className="mt-20 scroll-mt-24">
          <p className="font-mono text-[10px] tracking-[0.24em] text-faint uppercase">
            Systems onboard
          </p>
          <div className="mt-6 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {skillGroups.slice(0, 4).map((group) => (
              <div key={group.title}>
                <h3 className="text-sm text-ink">{group.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {group.items.join(" · ")}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 font-mono text-[10px] tracking-[0.18em] text-cyan uppercase">
            {`Learning // ${learningNow.join(" / ")}`}
          </p>
        </div>
      </div>
    </section>
  );
}
