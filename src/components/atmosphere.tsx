"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  depth: number;
  phase: number;
  twinkle: boolean;
  spark: boolean;
  vx: number;
  vy: number;
  idleVx: number;
  idleVy: number;
  hue: number;
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
    const count = reduce ? 90 : fine ? 1100 : 280;

    let stars: Star[] = [];
    const mouse = { x: -9999, y: -9999, vx: 0, vy: 0, px: -9999, py: -9999 };
    const parallax = { x: 0, y: 0, tx: 0, ty: 0 };
    let frame = 0;
    let raf = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;

    function seed() {
      stars = Array.from({ length: count }, () => {
        const speed = 0.04 + Math.random() * 0.22;
        const heading = randomHeading(speed);
        const depth = Math.random();
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: depth < 0.72 ? Math.random() ** 2.6 * 1.15 + 0.14 : Math.random() * 1.8 + 0.5,
          depth,
          phase: Math.random() * Math.PI * 2,
          twinkle: Math.random() < 0.62,
          spark: Math.random() < 0.045,
          vx: heading.vx,
          vy: heading.vy,
          idleVx: heading.vx,
          idleVy: heading.vy,
          hue: Math.random() < 0.12 ? 1 : 0,
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
      parallax.tx = (event.clientX / width - 0.5) * 2;
      parallax.ty = (event.clientY / height - 0.5) * 2;
    }

    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
      mouse.vx = 0;
      mouse.vy = 0;
    }

    function wrap(star: Star) {
      const pad = 16;
      if (star.x < -pad) star.x = width + pad;
      if (star.x > width + pad) star.x = -pad;
      if (star.y < -pad) star.y = height + pad;
      if (star.y > height + pad) star.y = -pad;
    }

    function color(star: Star, alpha: number) {
      if (star.hue > 0.5) return `rgba(255, 241, 168, ${alpha * 0.85})`;
      return `rgba(255, 253, 242, ${alpha})`;
    }

    function drawSpark(star: Star, x: number, y: number, alpha: number) {
      const arm = star.r * 3.4;
      ctx.strokeStyle = color(star, alpha * 0.85);
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(x - arm, y);
      ctx.lineTo(x + arm, y);
      ctx.moveTo(x, y - arm);
      ctx.lineTo(x, y + arm);
      ctx.stroke();
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      parallax.x += (parallax.tx - parallax.x) * 0.04;
      parallax.y += (parallax.ty - parallax.y) * 0.04;
      
      // DECREASED RADIUS: Was 190 : 108. Now 80 : 50 for a tighter hover effect.
      const radius = fine ? 80 : 50; 
      const radiusSq = radius * radius;

      for (const star of stars) {
        if (!reduce) {
          if (Math.random() < 0.0024) {
            const next = randomHeading(0.04 + Math.random() * 0.24);
            star.idleVx = next.vx;
            star.idleVy = next.vy;
          }

          const dx = star.x - mouse.x;
          const dy = star.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < radiusSq && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / radius) ** 2;
            star.vx += (dx / dist) * force * 1.05;
            star.vy += (dy / dist) * force * 1.05;
            star.vx += (Math.random() - 0.5) * force * 2.8;
            star.vy += (Math.random() - 0.5) * force * 2.8;
            star.vx += mouse.vx * force * 0.05;
            star.vy += mouse.vy * force * 0.05;
          }

          star.vx += (star.idleVx - star.vx) * 0.016;
          star.vy += (star.idleVy - star.vy) * 0.016;
          star.vx *= 0.987;
          star.vy *= 0.987;
          star.x += star.vx;
          star.y += star.vy;
          wrap(star);
        }

        const layer = 0.25 + star.depth * 0.9;
        const px = star.x + parallax.x * 16 * layer;
        const py = star.y + parallax.y * 10 * layer;
        const base = 0.22 + star.depth * 0.68;
        const twinkle = !reduce && star.twinkle
          ? base + (Math.sin(frame * (0.018 + star.depth * 0.02) + star.phase) + 1) * (0.18 + star.depth * 0.12)
          : base;

        if (star.spark && twinkle > 0.55) {
          drawSpark(star, px, py, twinkle);
        }

        ctx.beginPath();
        ctx.fillStyle = color(star, twinkle);
        ctx.arc(px, py, star.r, 0, Math.PI * 2);
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
