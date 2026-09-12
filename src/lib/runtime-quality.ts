export type QualityTier = "high" | "mid" | "low";

export type RuntimeQuality = {
  tier: QualityTier;
  reduceMotion: boolean;
  finePointer: boolean;
  dpr: number;
  stars: number;
  trailDots: number;
  globePoints: number;
  globeSegments: number;
  globeDpr: [number, number];
  globeAntialias: boolean;
  particleCap: number;
  particleGlow: boolean;
  particleDensity: number;
};

function readConnection() {
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  return {
    saveData: Boolean(connection?.saveData),
    slowNet: connection?.effectiveType === "2g" || connection?.effectiveType === "slow-2g",
  };
}

export function getRuntimeQuality(): RuntimeQuality {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const narrow = window.innerWidth < 768;
  const { saveData, slowNet } = readConnection();
  const cores = navigator.hardwareConcurrency || 8;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;

  let tier: QualityTier = "high";
  if (reduceMotion || saveData || slowNet || narrow || cores <= 4 || memory <= 4) {
    tier = "low";
  } else if (cores <= 8 || memory <= 8) {
    tier = "mid";
  }

  if (tier === "low") {
    return {
      tier,
      reduceMotion,
      finePointer,
      dpr: 1,
      stars: narrow ? 64 : 110,
      trailDots: finePointer && !narrow && !reduceMotion ? 6 : 0,
      globePoints: narrow ? 3200 : 4800,
      globeSegments: 24,
      globeDpr: [1, 1],
      globeAntialias: false,
      particleCap: 850,
      particleGlow: false,
      particleDensity: 6,
    };
  }

  if (tier === "mid") {
    return {
      tier,
      reduceMotion,
      finePointer,
      dpr: 1.25,
      stars: 200,
      trailDots: finePointer && !reduceMotion ? 7 : 0,
      globePoints: 7800,
      globeSegments: 32,
      globeDpr: [1, 1.25],
      globeAntialias: false,
      particleCap: 1700,
      particleGlow: false,
      particleDensity: 4,
    };
  }

  return {
    tier,
    reduceMotion,
    finePointer,
    dpr: 1.5,
    stars: 320,
    trailDots: finePointer && !reduceMotion ? 8 : 0,
    globePoints: 10800,
    globeSegments: 40,
    globeDpr: [1, 1.5],
      globeAntialias: false,
    particleCap: 2300,
    particleGlow: true,
    particleDensity: 3,
  };
}
