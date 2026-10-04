import Image from "next/image";
import { FadeIn } from "@/components/fade-in";
import { SectionHeading } from "@/components/section-heading";
import { projects, studioPieces } from "@/lib/data";

export function Mission() {
  return (
    <section id="mission" className="relative scroll-mt-28 py-28 sm:py-40">
      <div className="section-veil section-veil-mission" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <FadeIn>
          <SectionHeading index="02" eyebrow="Mission" />
        </FadeIn>

        <FadeIn>
          <p className="type-display mt-14 max-w-[13ch] text-ink">
            I build
            <br />
            products that
            <br />
            <span className="text-[#efe6cc]">think</span>
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <FadeIn delay={0.06}>
            <p className="type-section max-w-[16ch] text-ink">
              and visuals
              <br />
              that have to
              <br />
              hold a glance.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="max-w-sm border-t border-white/12 pt-6">
              <p className="type-meta text-faint">Thesis / 001</p>
              <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">
                Architect like an agent should finish the job. Design like the
                piece has to land at 60 km/h. Attention is a system. So is
                the stack.
              </p>
              <p className="type-meta mt-8 text-faint">
                Build · Think · Make · Attention · Systems · Visuals
              </p>
            </div>
          </FadeIn>
        </div>

        <Collision />
      </div>
    </section>
  );
}

function Collision() {
  const ledger = projects
    .find((project) => project.slug === "nirmaan")
    ?.caseStudy.decisions.find((decision) => decision.title === "Ledger before LLM");
  const street = studioPieces.find((piece) => piece.id === "concept-13b");
  if (!ledger || !street) return null;

  return (
    <div className="mt-20 grid overflow-hidden border border-white/10 lg:mt-28 lg:grid-cols-2">
      <div className="flex flex-col justify-between gap-10 px-6 py-8 sm:px-8 sm:py-10">
        <p className="type-meta text-faint">Same instinct / 001</p>
        <div>
          <p className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-[0.95] tracking-[-0.045em] text-ink">
            {ledger.title}
          </p>
          <p className="mt-5 max-w-md text-[1.02rem] leading-relaxed text-muted">{ledger.body}</p>
        </div>
        <p className="type-meta text-faint">Nirmaan</p>
      </div>
      <figure className="relative min-h-[280px] border-t border-white/10 lg:border-t-0 lg:border-l">
        <Image
          src={street.src}
          alt={`${street.brand} — ${street.campaign}`}
          fill
          sizes="(min-width: 1024px) 46vw, 100vw"
          className="object-cover"
        />
        <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent px-6 py-5 sm:px-8">
          <p className="type-meta text-muted">{street.brand}</p>
          <p className="mt-2 font-display text-2xl tracking-[-0.04em] text-ink">{street.caption}</p>
        </figcaption>
      </figure>
    </div>
  );
}
