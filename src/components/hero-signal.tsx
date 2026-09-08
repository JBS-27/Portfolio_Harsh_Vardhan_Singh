"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type HeroSignalValue = {
  revealed: boolean;
  setRevealed: (value: boolean) => void;
};

const HeroSignalContext = createContext<HeroSignalValue | null>(null);

export function HeroSignalProvider({ children }: { children: ReactNode }) {
  const [revealed, setRevealed] = useState(false);
  const value = useMemo(() => ({ revealed, setRevealed }), [revealed]);
  return (
    <HeroSignalContext.Provider value={value}>{children}</HeroSignalContext.Provider>
  );
}

export function useHeroSignal() {
  const ctx = useContext(HeroSignalContext);
  if (!ctx) {
    return { revealed: false, setRevealed: () => undefined };
  }
  return ctx;
}
