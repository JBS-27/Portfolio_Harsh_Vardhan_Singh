"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, type MotionValue } from "framer-motion";

const DOTS = 8;

function TrailDot({
  followX,
  followY,
  index,
  total,
}: {
  followX: MotionValue<number>;
  followY: MotionValue<number>;
  index: number;
  total: number;
}) {
  const stiffness = 360 - index * 34;
  const damping = 18 + index * 2;
  const x = useSpring(followX, { stiffness, damping, mass: 0.38 });
  const y = useSpring(followY, { stiffness, damping, mass: 0.38 });
  const falloff = index / (total - 1);

  return (
    <>
      <motion.div
        className="absolute top-0 left-0 size-1.5 rounded-full bg-[#f3f1ea] will-change-transform"
        style={{
          x,
          y,
          opacity: 1 - falloff * 0.9,
          scale: 1 - falloff * 0.55,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      {index < total - 1 ? (
        <TrailDot followX={x} followY={y} index={index + 1} total={total} />
      ) : null}
    </>
  );
}

export function CursorTrail() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const points = useRef(Array.from({ length: DOTS }, () => ({ x: -80, y: -80 })));
  const leadX = useMotionValue(-80);
  const leadY = useMotionValue(-80);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");

    function sync() {
      setEnabled(desktop.matches && !reduce);
    }

    sync();
    desktop.addEventListener("change", sync);
    return () => desktop.removeEventListener("change", sync);
  }, [reduce]);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("has-custom-cursor");
      return;
    }

    document.documentElement.classList.add("has-custom-cursor");

    function onMove(event: MouseEvent) {
      const next = { x: event.clientX, y: event.clientY };
      points.current[0] = next;
      leadX.set(next.x);
      leadY.set(next.y);
      setVisible((was) => was || true);
    }

    function onLeave() {
      setVisible(false);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled, leadX, leadY]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[90] hidden md:block"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="absolute top-0 left-0 size-1.5 rounded-full bg-[#f3f1ea] will-change-transform"
        style={{
          x: leadX,
          y: leadY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <TrailDot followX={leadX} followY={leadY} index={1} total={DOTS} />
    </div>
  );
}
