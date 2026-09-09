import Image from "next/image";
import { about, learningNow, site, skillGroups } from "@/lib/data";
import { FadeIn } from "@/components/fade-in";
import { SectionHeading } from "@/components/section-heading";
import { StatNum } from "@/components/stat-num";

export function About() {
  return (
    <section id="about" className="relative scroll-mt-28 py-28 sm:py-36">
      <div className="section-veil section-veil-about" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <FadeIn>
          <SectionHeading index="01" eyebrow="About" />
        </FadeIn>

        <FadeIn>
          <p className="type-display mt-10 max-w-[14ch] text-ink sm:mt-14">
            I like systems
            <br />
            that hold together —
            <br />
            and surfaces
            <br />
            that refuse to be ignored.
          </p>
        </FadeIn>

        <div className="mt-20 grid items-end gap-12 lg:mt-28 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <FadeIn>
            <figure className="relative">
              <p className="type-meta mb-4 text-faint">Ref. // 001</p>
              <div className="relative aspect-[4/5] overflow-hidden bg-black">
                <Image
                  src={site.portrait.src}
                  alt={site.portrait.alt}
                  fill
                  sizes="(min-width: 1024px) 36vw, 88vw"
                  className="object-cover object-[50%_18%]"
                />
              </div>
              <figcaption className="mt-3 flex justify-between type-meta text-faint">
                <span>{site.location}</span>
                <span>IIIT Surat</span>
              </figcaption>
            </figure>
          </FadeIn>

          <div className="lg:pb-6">
            <FadeIn delay={0.06}>
              <div className="max-w-xl space-y-5 text-[1.05rem] leading-[1.75] text-muted">
                {about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p className="text-ink">{about.outside}</p>
                <p className="border-l border-white/20 pl-5 text-ink">
                  {about.availability}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        <dl className="mt-24 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-white/10 pt-12 sm:grid-cols-4 sm:gap-x-10">
          {about.facts.map((fact) => (
            <div key={fact.label} className="min-w-0">
              <dt className="type-meta text-faint">{fact.label}</dt>
              <dd className="mt-4 font-display text-[clamp(2.4rem,5vw,4rem)] leading-none tracking-[-0.05em] text-ink">
                <StatNum
                  value={"value" in fact ? fact.value : undefined}
                  decimals={"decimals" in fact ? fact.decimals : 0}
                  suffix={"suffix" in fact ? fact.suffix : ""}
                  display={"display" in fact ? fact.display : undefined}
                />
              </dd>
              {"detail" in fact ? (
                <dd className="mt-3 text-sm text-muted">{fact.detail}</dd>
              ) : null}
            </div>
          ))}
        </dl>

        <div id="skills" className="mt-24 scroll-mt-28 border-t border-white/10 pt-12">
          <p className="type-meta text-faint">Systems onboard</p>
          <div className="mt-8 grid gap-10 sm:grid-cols-2">
            {skillGroups.slice(0, 4).map((group) => (
              <div key={group.title}>
                <h3 className="font-display text-xl tracking-[-0.03em] text-ink">
                  {group.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {group.items.join("  ·  ")}
                </p>
              </div>
            ))}
          </div>
          <p className="type-meta mt-10 text-faint">
            {`Learning // ${learningNow.join(" / ")}`}
          </p>
        </div>
      </div>
    </section>
  );
}
