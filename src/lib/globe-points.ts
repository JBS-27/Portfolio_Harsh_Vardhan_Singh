type LonLat = [number, number];
type Ring = LonLat[];
type Polygon = Ring[];
type MultiPolygon = Polygon[];

export type LandFeature = {
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: Polygon | MultiPolygon;
  };
};

export type LandCollection = {
  features: LandFeature[];
};

export type GlobeCloud = {
  positions: Float32Array;
  seeds: Float32Array;
  kinds: Float32Array;
  count: number;
};

const DEG = Math.PI / 180;

function lonLatToUnit(lon: number, lat: number, radius: number) {
  const la = lat * DEG;
  const lo = lon * DEG;
  const c = Math.cos(la);
  return {
    x: c * Math.cos(lo) * radius,
    y: Math.sin(la) * radius,
    z: c * Math.sin(lo) * radius,
  };
}

function hash2(x: number, y: number) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return n - Math.floor(n);
}

function eachPolygon(land: LandCollection, visit: (rings: Polygon) => void) {
  for (const feature of land.features) {
    const { type, coordinates } = feature.geometry;
    if (type === "Polygon") visit(coordinates as Polygon);
    else for (const polygon of coordinates as MultiPolygon) visit(polygon);
  }
}

function drawLand(ctx: CanvasRenderingContext2D, land: LandCollection, w: number, h: number) {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#fff";
  eachPolygon(land, (rings) => {
    ctx.beginPath();
    rings.forEach((ring, ringIndex) => {
      ring.forEach(([lon, lat], i) => {
        const x = ((lon + 180) / 360) * w;
        const y = ((90 - lat) / 180) * h;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      if (ringIndex === 0) ctx.closePath();
    });
    ctx.fill("evenodd");
  });
}

function pushPoint(
  positions: number[],
  seeds: number[],
  kinds: number[],
  lon: number,
  lat: number,
  kind: number,
  radius: number,
  jitter = 0,
) {
  const jx = (hash2(lon + 2.1, lat + kind) - 0.5) * jitter;
  const jy = (hash2(lat + 4.7, lon + kind) - 0.5) * jitter;
  const p = lonLatToUnit(lon + jx, Math.max(-89.4, Math.min(89.4, lat + jy)), radius);
  positions.push(p.x, p.y, p.z);
  seeds.push(hash2(lon * 1.37, lat * 0.91 + kind));
  kinds.push(kind);
}

function sampleRaster(
  land: LandCollection,
  budget: number,
  radius: number,
  positions: number[],
  seeds: number[],
  kinds: number[],
) {
  const w = 1600;
  const h = 800;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return;

  drawLand(ctx, land, w, h);
  const pixels = ctx.getImageData(0, 0, w, h).data;
  const stride = budget > 12000 ? 3 : budget > 7000 ? 4 : 5;

  for (let y = 0; y < h; y += stride) {
    const rowShift = (y / stride) % 2 === 0 ? 0 : Math.floor(stride * 0.5);
    for (let x = rowShift; x < w; x += stride) {
      if (pixels[(y * w + x) * 4] < 140) continue;
      const lon = (x / w) * 360 - 180;
      const lat = 90 - (y / h) * 180;
      if (Math.abs(lat) > 86) continue;
      const area = Math.cos(lat * DEG);
      if (hash2(x + 0.3, y + 1.1) > area * 0.97) continue;
      const warm = hash2(x + 8.2, y + 3.4) > 0.92 ? 3 : 0;
      pushPoint(positions, seeds, kinds, lon, lat, warm, radius, 0.55);
    }
  }
}

function sampleCoasts(
  land: LandCollection,
  radius: number,
  positions: number[],
  seeds: number[],
  kinds: number[],
  step = 0.38,
) {
  eachPolygon(land, (rings) => {
    const outline = rings[0];
    if (!outline || outline.length < 2) return;
    for (let i = 0; i < outline.length - 1; i += 1) {
      const [lon0, lat0] = outline[i];
      const [lon1, lat1] = outline[i + 1];
      const dlon = lon1 - lon0;
      const dlat = lat1 - lat0;
      const dist = Math.hypot(dlon * Math.cos(((lat0 + lat1) * 0.5) * DEG), dlat);
      const n = Math.max(1, Math.ceil(dist / step));
      for (let k = 0; k < n; k += 1) {
        const t = k / n;
        pushPoint(positions, seeds, kinds, lon0 + dlon * t, lat0 + dlat * t, 1, radius, 0.05);
      }
    }
  });
}

function sampleGraticule(
  radius: number,
  positions: number[],
  seeds: number[],
  kinds: number[],
) {
  const lats = [-60, -30, 0, 30, 60];
  for (const lat of lats) {
    for (let lon = -180; lon < 180; lon += 1.15) {
      pushPoint(positions, seeds, kinds, lon, lat, 2, radius, 0);
    }
  }
  for (let lon = -180; lon < 180; lon += 30) {
    for (let lat = -78; lat <= 78; lat += 1.15) {
      pushPoint(positions, seeds, kinds, lon, lat, 2, radius, 0);
    }
  }
}

export function buildGlobeCloud(
  land: LandCollection,
  budget: number,
  radius: number,
): GlobeCloud {
  const positions: number[] = [];
  const seeds: number[] = [];
  const kinds: number[] = [];

  sampleRaster(land, budget, radius, positions, seeds, kinds);
  sampleCoasts(land, radius, positions, seeds, kinds, budget > 10000 ? 0.32 : 0.48);
  sampleGraticule(radius, positions, seeds, kinds);

  if (positions.length / 3 > budget * 1.35) {
    const keep = Math.floor(budget * 1.15);
    const stride = Math.ceil(positions.length / 3 / keep);
    const p: number[] = [];
    const s: number[] = [];
    const k: number[] = [];
    const total = positions.length / 3;
    for (let i = 0; i < total; i += 1) {
      const kind = kinds[i];
      if (kind !== 1 && kind !== 2 && i % stride !== 0) continue;
      p.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      s.push(seeds[i]);
      k.push(kind);
    }
    return {
      positions: new Float32Array(p),
      seeds: new Float32Array(s),
      kinds: new Float32Array(k),
      count: s.length,
    };
  }

  return {
    positions: new Float32Array(positions),
    seeds: new Float32Array(seeds),
    kinds: new Float32Array(kinds),
    count: seeds.length,
  };
}
