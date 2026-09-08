import Image from "next/image";
import { about, learningNow, site, skillGroups } from "@/lib/data";
import { FadeIn } from "@/components/fade-in";
import { SectionHeading } from "@/components/section-heading";
import { SkillChip } from "@/components/skill-icons";

export function About() {
  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/12 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <FadeIn>
          <SectionHeading index="01" eyebrow="Trajectory" title={about.lead} />
        </FadeIn>

        <div className="mt-16 grid gap-10 lg:grid-cols-[minmax(300px,0.9fr)_1.1fr] lg:items-stretch lg:gap-14">
          <FadeIn className="h-full min-h-[420px]">
            <div className="relative h-full min-h-[420px]">
              <div className="absolute -top-3 -left-3 z-10 font-mono text-[10px] tracking-[0.22em] text-faint">
                {`REF // 00`}
              </div>
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_0_48px_rgb(124_58_237/0.22)] lg:absolute lg:inset-0 lg:mx-0 lg:aspect-auto lg:max-w-none">
                <Image
                  src={site.portrait.src}
                  alt={site.portrait.alt}
                  fill
                  sizes="(min-width: 1024px) 420px, 70vw"
                  className="object-cover object-[50%_18%]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent" />
                <div className="absolute inset-x-4 bottom-4 hidden justify-between font-mono text-[10px] tracking-[0.2em] text-white/75 uppercase lg:flex">
                  <span>{site.location}</span>
                  <span>IIIT Surat</span>
                </div>
              </div>
              <div className="mt-4 flex justify-between font-mono text-[10px] tracking-[0.2em] text-faint uppercase lg:hidden">
                <span>{site.location}</span>
                <span>IIIT Surat</span>
              </div>
            </div>
          </FadeIn>

          <div className="flex flex-col justify-center">
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
              <dl className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {about.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="glow-card rounded-2xl border border-white/8 bg-black/60 px-4 py-5"
                  >
                    <dt className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
                      {fact.label}
                    </dt>
                    <dd className="glow-title mt-2 font-display text-2xl tracking-tight text-ink">
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
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {skillGroups.slice(0, 4).map((group) => (
              <div
                key={group.title}
                className="glow-card rounded-[1.4rem] border border-white/8 bg-surface/60 p-5"
              >
                <h3 className="font-display text-lg tracking-tight text-ink">
                  {group.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <SkillChip key={item} name={item} />
                  ))}
                </div>
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
