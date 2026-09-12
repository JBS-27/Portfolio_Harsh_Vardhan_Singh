"use client";

import { useEffect, useRef, useState } from "react";
import { getRuntimeQuality } from "@/lib/runtime-quality";

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");

    function sync() {
      const quality = getRuntimeQuality();
      setEnabled(desktop.matches && fine.matches && !reduce.matches && quality.trailDots > 0);
    }

    sync();
    desktop.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    fine.addEventListener("change", sync);
    return () => {
      desktop.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
      fine.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const node = canvasRef.current;
    if (!enabled || !node) {
      document.documentElement.classList.remove("has-custom-cursor");
      return;
    }
    const canvas = node;

    document.documentElement.classList.add("has-custom-cursor");

    const rawCtx = canvas.getContext("2d", { alpha: true, desynchronized: true })
      ?? canvas.getContext("2d", { alpha: true });
    if (!rawCtx) return;
    const ctx = rawCtx;

    const quality = getRuntimeQuality();
    const count = quality.trailDots;
    const dots = Array.from({ length: count }, () => ({ x: -80, y: -80 }));
    const mouse = { x: -80, y: -80, inside: false };
    let raf = 0;
    let width = 0;
    let height = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function onMove(event: MouseEvent) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.inside = true;
    }

    function onLeave() {
      mouse.inside = false;
    }

    function draw() {
      if (document.hidden) {
        raf = 0;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      if (mouse.inside) {
        dots[0].x = mouse.x;
        dots[0].y = mouse.y;
        for (let i = 1; i < dots.length; i += 1) {
          const prev = dots[i - 1];
          const dot = dots[i];
          const follow = 0.38 - i * 0.018;
          dot.x += (prev.x - dot.x) * follow;
          dot.y += (prev.y - dot.y) * follow;
        }

        for (let i = dots.length - 1; i >= 0; i -= 1) {
          const falloff = i / Math.max(1, dots.length - 1);
          const radius = i === 0 ? 4.2 : 9.5 * (1 - falloff * 0.72);
          ctx.globalAlpha = i === 0 ? 1 : 0.92 - falloff * 0.78;
          ctx.fillStyle = "#f3f1ea";
          ctx.beginPath();
          ctx.arc(dots[i].x, dots[i].y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      }

      raf = window.requestAnimationFrame(draw);
    }

    function onVisible() {
      if (!document.hidden && raf === 0) raf = window.requestAnimationFrame(draw);
    }

    resize();
    raf = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisible);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[90] hidden md:block"
    />
  );
}
