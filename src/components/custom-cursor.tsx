"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const HOVER = "a, button, [data-hover]";

export function CustomCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);

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
      setPos({ x: event.clientX, y: event.clientY });
      setVisible(true);
      const node = event.target;
      setInteractive(node instanceof Element && Boolean(node.closest(HOVER)));
    }

    function onLeave() {
      setVisible(false);
      setInteractive(false);
    }

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      <motion.div
        className="absolute top-0 left-0 size-8 rounded-full border-2 border-dotted bg-transparent shadow-[0_0_18px_rgba(243,241,234,0.28)]"
        animate={{
          x: pos.x,
          y: pos.y,
          scale: interactive ? 1.5 : 1,
          borderColor: interactive ? "rgba(239, 230, 204, 1)" : "rgba(255, 255, 255, 0.5)",
        }}
        transition={{ type: "spring", stiffness: 170, damping: 20, mass: 0.45 }}
        style={{
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      />
      <div
        className="absolute top-0 left-0 size-2 rounded-full bg-[#f3f1ea]"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
          opacity: visible ? 1 : 0,
        }}
      />
    </div>
  );
}
