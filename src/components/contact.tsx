import { site } from "@/lib/data";
import { ContactForm } from "@/components/contact-form";
import { FadeIn } from "@/components/fade-in";
import { SectionHeading } from "@/components/section-heading";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/social-icons";

const socials = [
  { href: site.socials.github, label: "GitHub", icon: GitHubIcon },
  { href: site.socials.linkedin, label: "LinkedIn", icon: LinkedInIcon },
  { href: site.socials.twitter, label: "X", icon: XIcon },
];

export function Contact() {
  return (
    <section id="contact" className="relative scroll-mt-28 py-28 sm:py-36">
      <div className="section-veil section-veil-contact" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <FadeIn>
          <SectionHeading index="07" eyebrow="Contact" />
        </FadeIn>

        <FadeIn>
          <a
            href={`mailto:${site.email}`}
            className="group mt-12 block font-display text-[clamp(1.6rem,5vw,4.2rem)] leading-[1.05] tracking-[-0.045em] text-ink"
          >
            {site.email}
            <span className="mt-3 block h-px max-w-0 bg-ink/40 transition-all duration-500 group-hover:max-w-full" />
          </a>
        </FadeIn>

        <div className="mt-16 grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <FadeIn>
            <p className="max-w-md text-[1.05rem] leading-relaxed text-muted">
              {site.availability}
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 type-meta text-faint hover:text-ink"
                >
                  <social.icon className="size-3.5" />
                  {social.label}
                </a>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.06}>
            <ContactForm />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
