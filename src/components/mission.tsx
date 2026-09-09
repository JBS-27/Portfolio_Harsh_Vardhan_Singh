import { FadeIn } from "@/components/fade-in";
import { SectionHeading } from "@/components/section-heading";

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
      </div>
    </section>
  );
}
