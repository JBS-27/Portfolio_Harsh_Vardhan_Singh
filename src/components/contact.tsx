import { Mail } from "lucide-react";
import { site } from "@/lib/data";
import { ContactForm } from "@/components/contact-form";
import { FadeIn } from "@/components/fade-in";
import { MagneticButton } from "@/components/magnetic-button";
import { SectionHeading } from "@/components/section-heading";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/social-icons";

const socials = [
  { href: `mailto:${site.email}`, label: "Email", icon: Mail },
  { href: site.socials.github, label: "GitHub", icon: GitHubIcon },
  { href: site.socials.linkedin, label: "LinkedIn", icon: LinkedInIcon },
  { href: site.socials.twitter, label: "X / Twitter", icon: XIcon },
];

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <FadeIn>
          <SectionHeading
            index="06"
            eyebrow="Contact"
            title="If the work should exist, let’s put it on a wall — or in production."
            description="Open to freelance, internships, full-time conversations, and collaborations. Billboard briefs welcome."
          />
        </FadeIn>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <FadeIn>
            <div className="rounded-[2rem] border border-line bg-surface p-7 sm:p-10">
              <p className="font-display text-4xl tracking-tight text-ink sm:text-5xl">
                Say the thing.
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-5 inline-block text-lg text-accent underline-offset-4 hover:underline sm:text-xl"
              >
                {site.email}
              </a>
              <p className="mt-6 max-w-md text-muted">
                {site.availability}. I read everything that isn’t a wrapper of a wrapper.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {socials.map((social) => (
                  <MagneticButton
                    key={social.label}
                    href={social.href}
                    external={!social.href.startsWith("mailto:")}
                    className="border border-line bg-bg text-ink hover:border-accent/50"
                  >
                    <social.icon className="size-4" />
                    {social.label}
                  </MagneticButton>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="rounded-[2rem] border border-line bg-surface p-7 sm:p-10">
              <p className="mb-6 text-sm text-muted">
                Form posts to Resend or Formspree when configured — otherwise it opens mail.
              </p>
              <ContactForm />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
