"use client";

import { useEffect, useRef } from "react";
import { getRuntimeQuality } from "@/lib/runtime-quality";

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
  twinkleAmp: number;
  twinkleSpeed: number;
  wander: number;
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
    const surface = node;
    const rawCtx =
      surface.getContext("2d", { alpha: true, desynchronized: true })
      ?? surface.getContext("2d", { alpha: true });
    if (!rawCtx) return;
    const ctx = rawCtx;

    const quality = getRuntimeQuality();
    const fine = quality.finePointer;
    const reduce = quality.reduceMotion;
    const count = reduce ? Math.min(70, quality.stars) : quality.stars;
    const allowSparks = quality.tier === "high" && !reduce;

    let stars: Star[] = [];
    const mouse = { x: -9999, y: -9999, vx: 0, vy: 0, px: -9999, py: -9999 };
    const parallax = { x: 0, y: 0, tx: 0, ty: 0 };
    let frame = 0;
    let raf = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;

    function seed() {
      stars = Array.from({ length: count }, () => {
        const speed = 0.04 + Math.random() * 0.2;
        const heading = randomHeading(speed);
        const depth = Math.random();
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: depth < 0.72 ? Math.random() ** 2.4 * 1.15 + 0.14 : Math.random() * 1.65 + 0.45,
          depth,
          phase: Math.random() * Math.PI * 2,
          twinkle: Math.random() < 0.88,
          spark: allowSparks && Math.random() < 0.07,
          vx: heading.vx,
          vy: heading.vy,
          idleVx: heading.vx,
          idleVy: heading.vy,
          hue: Math.random() < 0.16 ? 1 : 0,
          twinkleAmp: 0.14 + Math.random() * 0.26,
          twinkleSpeed: 0.018 + Math.random() * 0.042,
          wander: 0.55 + Math.random() * 1.35,
        };
      });
    }

    function resize() {
      const dpr = quality.dpr;
      width = window.innerWidth;
      height = window.innerHeight;
      surface.width = Math.max(1, Math.floor(width * dpr));
      surface.height = Math.max(1, Math.floor(height * dpr));
      surface.style.width = `${width}px`;
      surface.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (stars.length === 0) seed();
      else {
        for (const star of stars) {
          if (star.x > width || star.y > height) {
            star.x = Math.random() * width;
            star.y = Math.random() * height;
          }
        }
      }
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
      if (star.hue > 0.5) return `rgba(255, 244, 214, ${alpha * 0.8})`;
      return `rgba(255, 252, 244, ${alpha})`;
    }

    function drawSpark(star: Star, x: number, y: number, alpha: number) {
      const arm = star.r * 3;
      ctx.strokeStyle = color(star, alpha * 0.7);
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(x - arm, y);
      ctx.lineTo(x + arm, y);
      ctx.moveTo(x, y - arm);
      ctx.lineTo(x, y + arm);
      ctx.stroke();
    }

    function draw() {
      if (document.hidden) {
        raf = 0;
        return;
      }

      ctx.clearRect(0, 0, width, height);
      parallax.x += (parallax.tx - parallax.x) * 0.03;
      parallax.y += (parallax.ty - parallax.y) * 0.03;

      const radius = fine ? 54 : 36;
      const radiusSq = radius * radius;

      for (let i = 0; i < stars.length; i += 1) {
        const star = stars[i];
        if (!reduce) {
          if ((frame + i) % 140 === 0) {
            const next = randomHeading(0.035 + ((i * 17) % 22) / 100);
            star.idleVx = next.vx;
            star.idleVy = next.vy;
          }

          const dx = star.x - mouse.x;
          const dy = star.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < radiusSq && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / radius) ** 2;
            star.vx += (dx / dist) * force * 0.35;
            star.vy += (dy / dist) * force * 0.35;
          }

          star.vx += Math.sin(frame * 0.011 + star.phase) * 0.006 * star.wander;
          star.vy += Math.cos(frame * 0.014 + star.phase * 1.7) * 0.006 * star.wander;
          star.vx += (star.idleVx - star.vx) * 0.018;
          star.vy += (star.idleVy - star.vy) * 0.018;
          star.vx *= 0.985;
          star.vy *= 0.985;
          star.x += star.vx;
          star.y += star.vy;
          wrap(star);
        }

        const layer = 0.25 + star.depth * 0.9;
        const px = star.x + parallax.x * 12 * layer;
        const py = star.y + parallax.y * 8 * layer;
        const base = 0.18 + star.depth * 0.58;
        const pulse = Math.sin(frame * star.twinkleSpeed + star.phase);
        const flicker = Math.sin(frame * star.twinkleSpeed * 2.4 + star.phase * 2.1);
        const twinkle = !reduce && star.twinkle
          ? base * (0.28 + 0.72 * (0.5 + 0.5 * pulse)) + (flicker + 1) * star.twinkleAmp
          : base;

        if (star.spark && twinkle > 0.4) {
          drawSpark(star, px, py, twinkle);
        }

        const size = Math.max(0.7, star.r * 2);
        ctx.fillStyle = color(star, twinkle);
        ctx.fillRect(px - size / 2, py - size / 2, size, size);
      }

      mouse.vx *= 0.86;
      mouse.vy *= 0.86;
      frame += 1;
      raf = requestAnimationFrame(draw);
    }

    function onVisible() {
      if (!document.hidden && raf === 0) raf = requestAnimationFrame(draw);
    }

    resize();
    raf = requestAnimationFrame(draw);

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisible);
    if (fine && !reduce) {
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisible);
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
