"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { FadeIn } from "@/components/fade-in";
import { SectionHeading } from "@/components/section-heading";
import { studioPieces, type StudioPiece } from "@/lib/data";
import { cx } from "@/lib/utils";

export function StudioGallery() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<StudioPiece | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function openPiece(piece: StudioPiece) {
    setOpen(piece);
    setPaused(true);
  }

  return (
    <section id="studio" className="relative scroll-mt-28 overflow-x-clip py-28 sm:py-36">
      <div className="section-veil section-veil-studio" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <FadeIn>
          <SectionHeading
            index="04"
            eyebrow="Studio"
            title="Work that has to hold a glance from the street."
            description="An advertising archive. Concept, copy, brand, outdoor — one idea, no second chance."
          />
        </FadeIn>
      </div>

      <div
        className="relative mt-16 w-full py-8"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          if (!open) setPaused(false);
        }}
      >
        <div className={cx(reduce && "overflow-x-auto")}>
          <div
            className={cx(
              reduce ? "flex w-max px-5 sm:px-8" : "billboard-track",
              !reduce && (paused || open) && "is-paused",
            )}
          >
            {(reduce ? [studioPieces] : [studioPieces, studioPieces]).map((set, setIndex) => (
              <div key={setIndex} className={reduce ? "flex gap-3.5" : "billboard-set"}>
                {set.map((piece) => (
                  <button
                    key={`${piece.id}-${setIndex}`}
                    type="button"
                    onClick={() => openPiece(piece)}
                    onFocus={() => setPaused(true)}
                    className="group relative h-[min(58vw,300px)] w-[min(90vw,620px)] shrink-0 overflow-hidden rounded-[1.35rem] bg-black text-left sm:h-[min(40vw,560px)] sm:w-[min(78vw,1120px)]"
                  >
                    <Image
                      src={piece.src}
                      alt={`${piece.brand} — ${piece.campaign}`}
                      fill
                      sizes="(min-width: 768px) 70vw, 86vw"
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 via-black/20 to-transparent px-5 py-4 opacity-0 transition duration-400 group-hover:opacity-100">
                      <p className="type-meta text-white/70">{piece.brand}</p>
                      <p className="mt-1 font-display text-lg tracking-[-0.03em] text-ink">
                        {piece.campaign}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setOpen(null);
              setPaused(false);
            }}
          >
            <button
              type="button"
              className="absolute top-5 right-5 grid size-10 place-items-center border border-white/15 text-ink"
              aria-label="Close"
              onClick={() => {
                setOpen(null);
                setPaused(false);
              }}
            >
              <X className="size-4" />
            </button>
            <motion.figure
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[1280px]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative aspect-[2/1] overflow-hidden rounded-[1.2rem] bg-black">
                <Image
                  src={open.src}
                  alt={open.title}
                  fill
                  sizes="92vw"
                  className="object-cover"
                  priority
                />
              </div>
              <figcaption className="mt-5 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="type-meta text-faint">
                    {open.brand} · {open.medium}
                  </p>
                  <p className="mt-2 font-display text-2xl tracking-[-0.03em] text-ink">
                    {open.campaign}
                  </p>
                  <p className="mt-1 text-sm text-muted">{open.caption}</p>
                </div>
                <PieceLink piece={open} />
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function PieceLink({ piece }: { piece: StudioPiece }) {
  const external = piece.href.startsWith("http");
  const className = "type-meta text-ink underline-offset-4 hover:underline";
  if (external) {
    return (
      <a href={piece.href} target="_blank" rel="noopener noreferrer" className={className}>
        Open on X
      </a>
    );
  }
  return (
    <Link href={piece.href} className={className}>
      Open project
    </Link>
  );
}
