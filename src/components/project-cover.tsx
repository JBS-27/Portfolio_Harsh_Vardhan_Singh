import type { ReactNode } from "react";
import type { ProjectCoverMotif } from "@/lib/data";

const motifs: Record<ProjectCoverMotif, ReactNode> = {
  blueprint: (
    <>
      <rect x="40" y="48" width="240" height="140" rx="8" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M40 88h240M88 48v140M192 48v140" stroke="currentColor" strokeWidth="0.7" />
      <circle cx="88" cy="88" r="5" fill="currentColor" />
      <path d="M60 200c40-30 80-10 120-28s80-8 100-24" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </>
  ),
  wave: (
    <>
      <path
        d="M20 150c30-40 50-40 80 0s50 40 80 0 50-40 80 0 40 30 60 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M20 120c30-40 50-40 80 0s50 40 80 0 50-40 80 0 40 30 60 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        opacity="0.6"
      />
      <path
        d="M20 90c30-40 50-40 80 0s50 40 80 0 50-40 80 0 40 30 60 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.35"
      />
    </>
  ),
  ledger: (
    <>
      <rect x="70" y="40" width="180" height="200" rx="6" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M90 80h140M90 110h140M90 140h100M90 170h120" stroke="currentColor" strokeWidth="1" />
      <rect x="90" y="198" width="54" height="18" rx="3" fill="currentColor" opacity="0.85" />
    </>
  ),
  agent: (
    <>
      <circle cx="160" cy="120" r="26" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="160" cy="120" r="6" fill="currentColor" />
      <circle cx="70" cy="70" r="10" fill="none" stroke="currentColor" />
      <circle cx="250" cy="80" r="10" fill="none" stroke="currentColor" />
      <circle cx="80" cy="190" r="10" fill="none" stroke="currentColor" />
      <circle cx="240" cy="188" r="10" fill="none" stroke="currentColor" />
      <path
        d="M88 76l50 32M242 88l-56 22M90 182l48-40M232 180l-50-38"
        stroke="currentColor"
        strokeWidth="1"
      />
    </>
  ),
  globe: (
    <>
      <circle cx="160" cy="130" r="78" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="160" cy="130" rx="32" ry="78" fill="none" stroke="currentColor" strokeWidth="0.8" />
      <path d="M82 130h156M96 90h128M96 170h128" stroke="currentColor" strokeWidth="0.8" />
    </>
  ),
  orbit: (
    <>
      <circle cx="160" cy="130" r="8" fill="currentColor" />
      <ellipse cx="160" cy="130" rx="110" ry="42" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <ellipse
        cx="160"
        cy="130"
        rx="70"
        ry="88"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        transform="rotate(28 160 130)"
      />
      <circle cx="258" cy="114" r="5" fill="currentColor" />
      <circle cx="112" cy="208" r="4" fill="currentColor" />
    </>
  ),
};

export function ProjectCover({
  motif,
  title,
}: {
  motif: ProjectCoverMotif;
  title: string;
}) {
  return (
    <svg
      viewBox="0 0 320 240"
      className="h-full w-full text-white/55"
      role="img"
      aria-label={`${title} visual`}
    >
      {motifs[motif]}
    </svg>
  );
}
