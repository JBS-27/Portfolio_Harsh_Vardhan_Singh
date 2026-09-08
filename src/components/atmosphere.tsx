"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  depth: number;
  phase: number;
  twinkle: boolean;
  vx: number;
  vy: number;
  idleVx: number;
  idleVy: number;
};

function randomHeading(speed: number) {
  const angle = Math.random() * Math.PI * 2;
  return {
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
  };
}

export function Atmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const node = canvasRef.current;
    if (!node) return;
    const surface: HTMLCanvasElement = node;
    const ctx = surface.getContext("2d", { alpha: true }) as CanvasRenderingContext2D;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = reduce ? 36 : fine ? 260 : 80;

    let stars: Star[] = [];
    const mouse = { x: -9999, y: -9999, vx: 0, vy: 0, px: -9999, py: -9999 };
    let frame = 0;
    let raf = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;

    function seed() {
      stars = Array.from({ length: count }, () => {
        const speed = 0.08 + Math.random() * 0.28;
        const heading = randomHeading(speed);
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() ** 2.4 * 1.6 + 0.18,
          depth: Math.random(),
          phase: Math.random() * Math.PI * 2,
          twinkle: Math.random() < 0.28,
          vx: heading.vx,
          vy: heading.vy,
          idleVx: heading.vx,
          idleVy: heading.vy,
        };
      });
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      surface.width = width * dpr;
      surface.height = height * dpr;
      surface.style.width = `${width}px`;
      surface.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (stars.length === 0) seed();
    }

    function onMove(event: MouseEvent) {
      if (mouse.px > -9000) {
        mouse.vx = event.clientX - mouse.px;
        mouse.vy = event.clientY - mouse.py;
      }
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.px = event.clientX;
      mouse.py = event.clientY;
    }

    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.vx = 0;
      mouse.vy = 0;
    }

    function wrap(star: Star) {
      const pad = 12;
      if (star.x < -pad) star.x = width + pad;
      if (star.x > width + pad) star.x = -pad;
      if (star.y < -pad) star.y = height + pad;
      if (star.y > height + pad) star.y = -pad;
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const radius = fine ? 168 : 96;
      const radiusSq = radius * radius;

      for (const star of stars) {
        if (!reduce) {
          if (Math.random() < 0.003) {
            const next = randomHeading(0.08 + Math.random() * 0.32);
            star.idleVx = next.vx;
            star.idleVy = next.vy;
          }

          const dx = star.x - mouse.x;
          const dy = star.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < radiusSq && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / radius) ** 2;
            star.vx += (dx / dist) * force * 1.15;
            star.vy += (dy / dist) * force * 1.15;
            star.vx += (Math.random() - 0.5) * force * 2.4;
            star.vy += (Math.random() - 0.5) * force * 2.4;
            star.vx += mouse.vx * force * 0.045;
            star.vy += mouse.vy * force * 0.045;
          }

          star.vx += (star.idleVx - star.vx) * 0.018;
          star.vy += (star.idleVy - star.vy) * 0.018;
          star.vx *= 0.986;
          star.vy *= 0.986;
          star.x += star.vx;
          star.y += star.vy;
          wrap(star);
        }

        const base = 0.18 + star.depth * 0.55;
        const twinkle =
          !reduce && star.twinkle
            ? base + (Math.sin(frame * 0.012 + star.phase) + 1) * 0.14
            : base;

        ctx.beginPath();
        ctx.fillStyle = `rgba(236, 240, 248, ${twinkle})`;
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      }

      mouse.vx *= 0.86;
      mouse.vy *= 0.86;
      frame += 1;
      raf = requestAnimationFrame(draw);
    }

    resize();
    raf = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    if (fine && !reduce) {
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
