"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { useReducedMotion } from "framer-motion";

export function OrbitalField() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const craftRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const node = rootRef.current;
    const craftNode = craftRef.current;
    if (!node || !craftNode) return;
    const field: HTMLDivElement = node;
    const craft: HTMLImageElement = craftNode;

    let raf = 0;
    let angle = -0.6;
    let time = 0;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const fine = window.matchMedia("(pointer: fine)").matches;

    function onMove(event: MouseEvent) {
      const rect = field.getBoundingClientRect();
      pointer.tx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.ty = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    }

    function point(a: number) {
      const rot = (-18 * Math.PI) / 180;
      const x = 228 * Math.cos(a);
      const y = 92 * Math.sin(a);
      return {
        x: 260 + x * Math.cos(rot) - y * Math.sin(rot),
        y: 260 + x * Math.sin(rot) + y * Math.cos(rot),
      };
    }

    function tick() {
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      time += 1;
      if (!reduce) {
        angle += 0.0036 + 0.0011 * Math.sin(time * 0.01);
      }

      const now = point(angle);
      const next = point(angle + 0.04);
      const rot = (Math.atan2(next.y - now.y, next.x - now.x) * 180) / Math.PI;
      const depth = 0.86 + ((Math.sin(angle) + 1) / 2) * 0.22;

      field.style.setProperty("--ox", `${pointer.x}`);
      field.style.setProperty("--oy", `${pointer.y}`);
      craft.style.left = `${(now.x / 520) * 100}%`;
      craft.style.top = `${(now.y / 520) * 100}%`;
      craft.style.transform = `translate(-50%, -50%) rotate(${rot}deg) scale(${depth}) translate(${pointer.x * 6}px, ${pointer.y * 4}px)`;
      craft.style.filter = `drop-shadow(0 0 ${10 + depth * 10}px rgb(124 58 237 / 0.28))`;

      raf = requestAnimationFrame(tick);
    }

    const start = point(angle);
    craft.style.left = `${(start.x / 520) * 100}%`;
    craft.style.top = `${(start.y / 520) * 100}%`;

    raf = requestAnimationFrame(tick);
    if (fine && !reduce) field.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      field.removeEventListener("mousemove", onMove);
    };
  }, [reduce]);

  return (
    <div
      ref={rootRef}
      className="relative mx-auto aspect-square w-full max-w-[560px]"
      style={{ "--ox": 0, "--oy": 0 } as CSSProperties}
    >
      <svg
        viewBox="0 0 520 520"
        className="h-full w-full overflow-visible"
        role="img"
        aria-label="Orbital path"
      >
        <defs>
          <linearGradient id="orbitStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <g
          style={{
            transform: `translate(calc(var(--ox) * 10px), calc(var(--oy) * 8px))`,
          }}
        >
          <ellipse
            cx="260"
            cy="260"
            rx="228"
            ry="92"
            fill="none"
            stroke="url(#orbitStroke)"
            strokeWidth="0.7"
            transform="rotate(-18 260 260)"
          />
          <ellipse
            cx="260"
            cy="260"
            rx="150"
            ry="150"
            fill="none"
            stroke="rgb(255 255 255 / 0.05)"
            strokeWidth="0.5"
          />
          <circle cx="388" cy="198" r="1.6" fill="#22d3ee" opacity="0.55" />
          <circle cx="142" cy="318" r="1.2" fill="#c4b5fd" opacity="0.45" />
        </g>
      </svg>

      {/* Decorative orbital craft; next/image is awkward on a continuously transformed node. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={craftRef}
        src="/spacecraft.png"
        alt=""
        aria-hidden
        data-cursor="orbit"
        className="pointer-events-none absolute w-[22%] max-w-[118px] select-none will-change-transform"
      />
    </div>
  );
}
