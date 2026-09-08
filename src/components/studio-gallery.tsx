"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { FadeIn } from "@/components/fade-in";
import { SectionHeading } from "@/components/section-heading";
import { studioPieces } from "@/lib/data";
import { cx } from "@/lib/utils";

export function StudioGallery() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const count = studioPieces.length;
  const current = studioPieces[active];

  const go = useCallback(
    (direction: number) => {
      setActive((value) => (value + direction + count) % count);
    },
    [count],
  );

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section id="studio" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-violet/45 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <FadeIn>
          <SectionHeading
            index="03"
            eyebrow="Studio"
            title="Work that has to hold a glance from the street."
            description="Billboard concepts and product stills from X. Move both ways. The current frame sits larger — click it to open it fully."
          />
        </FadeIn>

        <div className="relative mt-16">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              className="grid size-11 place-items-center rounded-full border border-white/12 bg-black/50 text-ink backdrop-blur-sm transition hover:border-cyan/50 hover:shadow-[0_0_22px_rgb(34_211_238/0.25)]"
              aria-label="Previous piece"
            >
              <ChevronLeft className="size-5" />
            </button>
            <p className="font-mono text-[10px] tracking-[0.22em] text-faint uppercase">
              {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </p>
            <button
              type="button"
              onClick={() => go(1)}
              className="grid size-11 place-items-center rounded-full border border-white/12 bg-black/50 text-ink backdrop-blur-sm transition hover:border-cyan/50 hover:shadow-[0_0_22px_rgb(34_211_238/0.25)]"
              aria-label="Next piece"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>

          <motion.div
            className="relative mt-8 flex h-[420px] touch-pan-y items-center justify-center sm:h-[520px] lg:h-[580px]"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              if (info.offset.x < -70) go(1);
              if (info.offset.x > 70) go(-1);
            }}
          >
            {studioPieces.map((piece, index) => {
              const offset = index - active;
              const wrapped =
                offset < -Math.floor(count / 2)
                  ? offset + count
                  : offset > Math.floor(count / 2)
                    ? offset - count
                    : offset;
              const isCurrent = wrapped === 0;
              const hidden = Math.abs(wrapped) > 2;

              return (
                <motion.button
                  key={piece.id}
                  type="button"
                  aria-label={
                    isCurrent
                      ? `Open ${piece.title} larger`
                      : `Show ${piece.title}`
                  }
                  onClick={() => (isCurrent ? setOpen(true) : setActive(index))}
                  className={cx(
                    "absolute overflow-hidden rounded-[1.6rem] border border-white/10 bg-black text-left",
                    isCurrent ? "glow-card z-20 cursor-zoom-in" : "z-10 cursor-pointer",
                    hidden && "pointer-events-none",
                  )}
                  initial={false}
                  animate={{
                    x: wrapped * (isCurrent ? 0 : 210),
                    scale: isCurrent ? 1 : 0.78 - Math.abs(wrapped) * 0.06,
                    opacity: hidden ? 0 : isCurrent ? 1 : 0.45,
                    zIndex: 20 - Math.abs(wrapped),
                  }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 260, damping: 28 }
                  }
                  style={{ width: isCurrent ? "min(78vw, 720px)" : "min(52vw, 420px)" }}
                >
                  <div className={cx("relative", isCurrent ? "aspect-[16/10]" : "aspect-[16/11]")}>
                    <Image
                      src={piece.src}
                      alt={piece.title}
                      fill
                      sizes={isCurrent ? "(min-width: 1024px) 720px, 78vw" : "420px"}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-transparent" />
                    {isCurrent ? (
                      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                        <p className="font-mono text-[10px] tracking-[0.22em] text-cyan uppercase">
                          From X
                        </p>
                        <p className="mt-1 font-display text-2xl tracking-tight text-ink sm:text-3xl">
                          {piece.title}
                        </p>
                        <p className="mt-2 max-w-lg text-sm text-muted">{piece.caption}</p>
                      </div>
                    ) : null}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/86 p-4 backdrop-blur-md sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <button
              type="button"
              className="absolute top-5 right-5 grid size-11 place-items-center rounded-full border border-white/15 text-ink"
              aria-label="Close larger view"
              onClick={() => setOpen(false)}
            >
              <X className="size-5" />
            </button>
            <motion.figure
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative w-full max-w-5xl overflow-hidden rounded-[1.6rem] border border-white/12 shadow-[0_0_80px_rgb(124_58_237/0.28)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={current.src}
                  alt={current.title}
                  fill
                  sizes="90vw"
                  className="object-cover"
                  priority
                />
              </div>
              <figcaption className="bg-black/80 px-5 py-4 sm:px-7">
                <p className="font-display text-xl text-ink">{current.title}</p>
                <p className="mt-1 text-sm text-muted">{current.caption}</p>
                <a
                  href={current.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-block font-mono text-[10px] tracking-[0.2em] text-cyan uppercase"
                >
                  Open on X
                </a>
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
