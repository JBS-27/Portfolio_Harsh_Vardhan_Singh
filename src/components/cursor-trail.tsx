"use client";

import { useEffect, useRef } from "react";

type Node = { x: number; y: number; vx: number; vy: number };

const LEAD = 26;
const SHADOW = 22;

function seed(count: number, x: number, y: number): Node[] {
  return Array.from({ length: count }, () => ({ x, y, vx: 0, vy: 0 }));
}

function step(nodes: Node[], targetX: number, targetY: number, spring: number, friction: number) {
  let tx = targetX;
  let ty = targetY;
  for (let i = 0; i < nodes.length; i += 1) {
    const node = nodes[i];
    const tension = i === 0 ? spring * 1.15 : spring;
    node.vx += (tx - node.x) * tension;
    node.vy += (ty - node.y) * tension;
    node.vx *= friction;
    node.vy *= friction;
    node.x += node.vx;
    node.y += node.vy;
    tx = node.x;
    ty = node.y;
  }
}

function path(ctx: CanvasRenderingContext2D, nodes: Node[]) {
  if (nodes.length < 2) return;
  ctx.beginPath();
  ctx.moveTo(nodes[0].x, nodes[0].y);
  for (let i = 1; i < nodes.length - 1; i += 1) {
    const next = nodes[i + 1];
    const cx = nodes[i].x;
    const cy = nodes[i].y;
    ctx.quadraticCurveTo(cx, cy, (cx + next.x) / 2, (cy + next.y) / 2);
  }
  const last = nodes[nodes.length - 1];
  ctx.lineTo(last.x, last.y);
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const hover = window.matchMedia("(hover: hover)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hover || reduce) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const mouse = { x: -200, y: -200, live: false };
    const lead = seed(LEAD, -200, -200);
    const shade = seed(SHADOW, -200, -200);
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    function onMove(event: MouseEvent) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.live = true;
    }

    function onLeave() {
      mouse.live = false;
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      if (mouse.live) {
        step(lead, mouse.x, mouse.y, 0.22, 0.64);
        step(shade, mouse.x, mouse.y, 0.11, 0.72);
      } else {
        step(lead, lead[0].x, lead[0].y, 0.08, 0.86);
        step(shade, shade[0].x, shade[0].y, 0.05, 0.9);
      }

      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      ctx.shadowColor = "rgba(255, 246, 220, 0.4)";
      ctx.shadowBlur = 26;
      ctx.strokeStyle = "rgba(255, 246, 220, 0.16)";
      ctx.lineWidth = 12;
      ctx.setLineDash([1.5, 10]);
      path(ctx, shade);
      ctx.stroke();

      ctx.shadowBlur = 12;
      ctx.strokeStyle = "rgba(255, 250, 235, 0.42)";
      ctx.lineWidth = 1.6;
      ctx.setLineDash([1.2, 6.5]);
      path(ctx, lead);
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.setLineDash([]);

      for (let i = 0; i < lead.length; i += 1) {
        const t = 1 - i / (lead.length - 1);
        const radius = 0.55 + t * 1.7;
        const alpha = 0.12 + t * 0.55;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 248, 230, ${alpha})`;
        ctx.arc(lead[i].x, lead[i].y, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      raf = requestAnimationFrame(draw);
    }

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[70] hidden md:block"
    />
  );
}
