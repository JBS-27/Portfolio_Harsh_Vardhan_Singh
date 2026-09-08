"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, site } from "@/lib/data";
import { cx } from "@/lib/utils";

const sections = ["work", "about", "studio", "notes", "experience", "contact"];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12);
      const marker = [...sections]
        .reverse()
        .find((id) => {
          const node = document.getElementById(id);
          return node ? node.getBoundingClientRect().top < 140 : false;
        });
      setActive(marker ?? "");
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-500",
        scrolled ? "bg-black/55 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="font-mono text-[11px] tracking-[0.28em] text-ink uppercase"
          onClick={() => setOpen(false)}
        >
          {site.initials}
          <span className="sr-only">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-4 lg:gap-6 md:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const id = link.href.replace("/#", "");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cx(
                  "relative font-mono text-[10px] tracking-[0.22em] uppercase transition-colors",
                  active === id ? "text-ink" : "text-faint hover:text-ink",
                )}
              >
                {link.label}
                {active === id ? (
                  <span className="absolute -bottom-2 left-0 h-px w-full grad-line" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden font-mono text-[10px] tracking-[0.2em] text-cyan uppercase lg:inline">
            {`SYS // ONLINE`}
          </span>
          <button
            type="button"
            className="grid size-9 place-items-center border border-white/10 text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            className="border-t border-white/8 bg-black md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="flex flex-col px-5 py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-3 font-mono text-sm tracking-[0.18em] text-ink uppercase"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
