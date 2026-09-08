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
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan/35 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <FadeIn>
          <SectionHeading
            index="04"
            eyebrow="Transmission"
            title="Establish connection."
          />
        </FadeIn>

        <FadeIn>
          <div className="mt-16">
            <p className="font-mono text-[10px] tracking-[0.24em] text-faint uppercase">
              Email
            </p>
            <a
              href={`mailto:${site.email}`}
              data-cursor="send"
              className="group relative mt-4 inline-block font-display text-3xl tracking-[-0.04em] text-ink sm:text-5xl"
            >
              {site.email}
              <span className="absolute inset-x-0 -bottom-2 h-px origin-left scale-x-0 bg-linear-to-r from-violet via-cyan to-transparent transition-transform duration-500 group-hover:scale-x-100" />
            </a>
            <p className="mt-8 max-w-md text-muted">
              {site.availability}
            </p>
            <div className="mt-10 max-w-md">
              <ContactForm />
            </div>
            <div className="mt-8 flex flex-wrap gap-6">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-muted uppercase hover:text-ink"
                >
                  <social.icon className="size-3.5" />
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
