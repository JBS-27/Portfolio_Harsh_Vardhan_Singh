"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type StatNumProps = {
  value?: number;
  decimals?: number;
  suffix?: string;
  display?: string;
  className?: string;
};

export function StatNum({
  value,
  decimals = 0,
  suffix = "",
  display,
  className,
}: StatNumProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(display ?? (value === undefined ? "" : format(0, decimals, suffix)));
  const played = useRef(false);

  useEffect(() => {
    if (display || value === undefined) {
      setShown(display ?? "");
      return;
    }

    const target = value;

    const node = ref.current;
    if (!node) return;

    function run() {
      if (played.current) return;
      played.current = true;
      if (reduce) {
        setShown(format(target, decimals, suffix));
        return;
      }

      const duration = 1250;
      const start = performance.now();

      function tick(now: number) {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - (1 - t) ** 3;
        setShown(format(target * eased, decimals, suffix));
        if (t < 1) requestAnimationFrame(tick);
        else setShown(format(target, decimals, suffix));
      }

      requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) run();
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [decimals, display, reduce, suffix, value]);

  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  );
}

function format(value: number, decimals: number, suffix: string) {
  return `${value.toFixed(decimals)}${suffix}`;
}
