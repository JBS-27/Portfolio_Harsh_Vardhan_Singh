"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, site, telemetry } from "@/lib/data";
import { cx } from "@/lib/utils";

const sections = ["work", "about", "studio", "notes", "experience", "contact"];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 16);
        ticking = false;
      });
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const visibility = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let best = "";
        let bestRatio = 0;
        for (const [id, ratio] of visibility) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        setActive(best);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.15, 0.4, 0.7] },
    );

    for (const id of sections) {
      const node = document.getElementById(id);
      if (node) observer.observe(node);
    }

    return () => observer.disconnect();
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
        "fixed inset-x-0 top-0 z-40 transition-[background,border-color] duration-500",
        scrolled ? "border-b border-white/8 bg-black/82" : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto grid h-[4.5rem] max-w-7xl grid-cols-[auto_1fr_auto] items-center px-5 sm:px-8">
        <Link
          href="/"
          className="font-mono text-[12px] tracking-[0.32em] text-ink uppercase"
          onClick={() => setOpen(false)}
        >
          {site.initials}
          <span className="sr-only">{site.name}</span>
        </Link>

        <nav
          className="hidden items-center justify-center md:flex"
          aria-label="Primary"
        >
          {navLinks.map((link, index) => {
            const id = link.href.replace("/#", "");
            const current = active === id;
            return (
              <span key={link.href} className="flex items-center">
                {index > 0 ? (
                  <span className="px-2.5 font-mono text-[9px] text-accent/55 lg:px-3.5">
                    /
                  </span>
                ) : null}
                <Link
                  href={link.href}
                  className={cx(
                    "relative py-1 font-mono text-[11px] tracking-[0.2em] uppercase transition-colors duration-300",
                    current ? "text-ink" : "text-faint hover:text-ink",
                  )}
                >
                  {link.label}
                  <span
                    className={cx(
                      "absolute inset-x-0 -bottom-1 h-px origin-left bg-ink transition-transform duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      current ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </Link>
              </span>
            );
          })}
        </nav>

        <div className="flex items-center justify-end gap-4">
          <NavClock />
          <span className="hidden font-mono text-[10px] tracking-[0.2em] text-faint uppercase lg:inline">
            {telemetry.system}
          </span>
          <button
            type="button"
            className="grid size-10 place-items-center border border-white/12 text-ink md:hidden"
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
            <div className="flex flex-col px-5 py-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="border-b border-white/6 py-4 font-display text-3xl tracking-[-0.04em] text-ink"
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

function NavClock() {
  const [label, setLabel] = useState("");

  useEffect(() => {
    const tick = () => {
      const time = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      }).format(new Date());
      setLabel(`${time} IST`);
    };

    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  if (!label) return null;

  return (
    <span className="hidden font-mono text-[10px] tracking-[0.2em] text-faint uppercase lg:inline">
      {label}
    </span>
  );
}
