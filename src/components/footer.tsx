"use client";

import { ArrowUp } from "lucide-react";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/social-icons";
import { site } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="mt-1 text-xs text-faint">
            Built with Next.js + Tailwind + Framer Motion
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={site.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid size-10 place-items-center rounded-full border border-line text-muted hover:text-ink"
          >
            <GitHubIcon className="size-4" />
          </a>
          <a
            href={site.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid size-10 place-items-center rounded-full border border-line text-muted hover:text-ink"
          >
            <LinkedInIcon className="size-4" />
          </a>
          <a
            href={site.socials.twitter}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X / Twitter"
            className="grid size-10 place-items-center rounded-full border border-line text-muted hover:text-ink"
          >
            <XIcon className="size-4" />
          </a>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-muted hover:text-ink"
          >
            Back to top
            <ArrowUp className="size-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
