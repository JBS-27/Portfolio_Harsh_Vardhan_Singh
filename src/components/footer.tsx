"use client";

import { ArrowUp } from "lucide-react";
import { site } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-white/8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <p className="type-meta text-faint">
            © {new Date().getFullYear()} {site.name}
          </p>
          <p className="mt-2 text-xs text-faint">
            Systems · visuals · outdoor
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex items-center gap-2 type-meta text-faint hover:text-ink"
        >
          Top
          <ArrowUp className="size-3.5" />
        </button>
      </div>
    </footer>
  );
}
