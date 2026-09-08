"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

type Mode = "default" | "link" | "project" | "orbit" | "initiator" | "identity" | "send";

function readMode(target: EventTarget | null): Mode {
  const el = target instanceof Element ? target : null;
  if (!el) return "default";
  if (el.closest("[data-cursor='project']")) return "project";
  if (el.closest("[data-cursor='identity']")) return "identity";
  if (el.closest("[data-cursor='initiator']")) return "initiator";
  if (el.closest("[data-cursor='send']")) return "send";
  if (el.closest("[data-cursor='orbit']")) return "orbit";
  if (el.closest("a, button, [data-cursor='hover']")) return "link";
  return "default";
}

const labels: Partial<Record<Mode, string>> = {
  project: "VIEW",
  identity: "IDENTITY",
  initiator: "REVEAL",
  send: "SEND",
};

export function CustomCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("default");
  const x = useMotionValue(-80);
  const y = useMotionValue(-80);
  const springX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.35 });
  const trailX = useSpring(x, { stiffness: 150, damping: 30, mass: 0.5 });
  const trailY = useSpring(y, { stiffness: 150, damping: 30, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || reduce) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    function move(event: MouseEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
      setMode(readMode(event.target));
    }

    window.addEventListener("mousemove", move);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  const expanded = mode !== "default";
  const label = labels[mode];

  return (
    <div className="pointer-events-none fixed inset-0 z-[80] hidden md:block">
      <motion.div
        className="absolute top-0 left-0 size-8 rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgb(124 58 237 / 0.16), transparent 70%)",
        }}
      />
      <motion.div
        className="absolute top-0 left-0"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      >
        <div
          className="grid place-items-center rounded-full border transition-all duration-300"
          style={{
            width: expanded ? 58 : 10,
            height: expanded ? 58 : 10,
            borderColor:
              mode === "project" || mode === "send"
                ? "rgb(34 211 238 / 0.65)"
                : "rgb(255 255 255 / 0.5)",
            background: expanded ? "rgb(0 0 0 / 0.4)" : "#f4f4f5",
          }}
        >
          {label ? (
            <span className="font-mono text-[8px] tracking-[0.18em] text-ink">
              {label}
            </span>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}
