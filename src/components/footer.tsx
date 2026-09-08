"use client";

import { ArrowUp } from "lucide-react";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/social-icons";
import { site } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-white/8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="mt-2 text-xs text-faint">
            Built with Next.js + Tailwind + Framer Motion
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={site.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid size-9 place-items-center border border-white/10 text-muted hover:text-ink"
          >
            <GitHubIcon className="size-4" />
          </a>
          <a
            href={site.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid size-9 place-items-center border border-white/10 text-muted hover:text-ink"
          >
            <LinkedInIcon className="size-4" />
          </a>
          <a
            href={site.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X / Twitter"
            className="grid size-9 place-items-center border border-white/10 text-muted hover:text-ink"
          >
            <XIcon className="size-4" />
          </a>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 border border-white/10 px-3 py-2 font-mono text-[10px] tracking-[0.18em] text-muted uppercase hover:text-ink"
          >
            Relaunch
            <ArrowUp className="size-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
