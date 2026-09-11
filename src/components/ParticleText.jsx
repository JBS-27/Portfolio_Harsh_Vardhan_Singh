"use client";

import { useEffect, useRef } from "react";
import "./ParticleText.css";

const hexToRgb = (hex) => {
  const clean = hex.replace("#", "").trim();
  if (!/^[0-9a-fA-F]{6}$/.test(clean)) return null;
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
};

const mixRgb = (from, to, amount) => ({
  r: Math.round(from.r + (to.r - from.r) * amount),
  g: Math.round(from.g + (to.g - from.g) * amount),
  b: Math.round(from.b + (to.b - from.b) * amount),
});

const rgbToCss = (rgb) => `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeInCubic = (t) => t * t * t;
const lerp = (a, b, t) => a + (b - a) * t;

const HOLD_IN = 0.05;
const BLAST_PEAK = 0.42;
const GATHER_DONE = 0.88;

const readProgress = (value) => {
  if (value == null) return null;
  if (typeof value === "number") return clamp(value, 0, 1);
  if (typeof value.get === "function") return clamp(value.get(), 0, 1);
  return null;
};

const resolveFontFamily = (fontFamily, container) => {
  if (!fontFamily || fontFamily === "inherit") {
    return window.getComputedStyle(container).fontFamily || "sans-serif";
  }

  if (!fontFamily.includes("var(")) return fontFamily;

  const probe = document.createElement("span");
  probe.style.fontFamily = fontFamily;
  container.appendChild(probe);
  const resolved = window.getComputedStyle(probe).fontFamily;
  probe.remove();
  return resolved || "serif";
};

const resolveFontSize = (value, container, fontWeight, fontFamily) => {
  if (typeof value === "number") return value;

  const probe = document.createElement("span");
  probe.textContent = "M";
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  probe.style.pointerEvents = "none";
  probe.style.fontSize = value;
  probe.style.fontWeight = String(fontWeight);
  probe.style.fontFamily = fontFamily;
  container.appendChild(probe);
  const size = parseFloat(window.getComputedStyle(probe).fontSize) || 96;
  probe.remove();
  return size;
};

const waitForFonts = async (font) => {
  if (!("fonts" in document)) return;

  try {
    await document.fonts.load(font);
  } catch {
    /* ignore unavailable faces */
  }

  await document.fonts.ready;
};

const wrapLines = (ctx, text, maxWidth) => {
  const explicit = String(text || " ")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  if (explicit.length > 1) return explicit;

  const source = explicit[0] || " ";
  const words = source.split(/\s+/);
  if (words.length === 1 || ctx.measureText(source).width <= maxWidth) {
    return [source];
  }

  const lines = [];
  let current = words[0];
  for (let i = 1; i < words.length; i += 1) {
    const next = `${current} ${words[i]}`;
    if (ctx.measureText(next).width <= maxWidth) {
      current = next;
    } else {
      lines.push(current);
      current = words[i];
    }
  }
  lines.push(current);
  return lines;
};

const sampleGlyphs = async ({
  container,
  width,
  height,
  content,
  fontSize,
  fontWeight,
  fontFamily,
  density,
}) => {
  const resolvedFamily = resolveFontFamily(fontFamily, container);
  let resolvedSize = resolveFontSize(fontSize, container, fontWeight, resolvedFamily);
  let font = `${fontWeight} ${resolvedSize}px ${resolvedFamily}`;

  await waitForFonts(font);

  const offscreen = document.createElement("canvas");
  const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
  if (!offCtx) return [];

  const maxTextWidth = width * 0.9;
  const maxTextHeight = height * 0.72;
  offCtx.font = font;

  let lines = wrapLines(offCtx, content, maxTextWidth);
  const measureBlock = () => {
    const widest = Math.max(...lines.map((line) => offCtx.measureText(line).width), 1);
    const lineHeight = resolvedSize * 0.92;
    return { widest, lineHeight, blockHeight: lineHeight * lines.length };
  };

  let block = measureBlock();
  const widthScale = block.widest > maxTextWidth ? maxTextWidth / block.widest : 1;
  const heightScale = block.blockHeight > maxTextHeight ? maxTextHeight / block.blockHeight : 1;
  const scale = Math.min(widthScale, heightScale);

  if (scale < 0.999) {
    resolvedSize = Math.max(18, resolvedSize * scale);
    font = `${fontWeight} ${resolvedSize}px ${resolvedFamily}`;
    await waitForFonts(font);
    offCtx.font = font;
    lines = wrapLines(offCtx, content, maxTextWidth);
    block = measureBlock();
  }

  const fittedLineHeight = block.lineHeight;
  let minLeft = Infinity;
  let maxRight = -Infinity;
  let maxAscent = 0;
  let maxDescent = 0;

  lines.forEach((line) => {
    const metrics = offCtx.measureText(line);
    minLeft = Math.min(minLeft, metrics.actualBoundingBoxLeft || 0);
    maxRight = Math.max(maxRight, metrics.actualBoundingBoxRight || metrics.width);
    maxAscent = Math.max(maxAscent, metrics.actualBoundingBoxAscent || resolvedSize * 0.78);
    maxDescent = Math.max(maxDescent, metrics.actualBoundingBoxDescent || resolvedSize * 0.22);
  });

  if (!Number.isFinite(minLeft) || !lines.length) return [];

  const padding = Math.max(12, Math.ceil(resolvedSize * 0.08));
  const textWidth = Math.max(1, Math.ceil(minLeft + maxRight));
  const textHeight = Math.max(1, Math.ceil(fittedLineHeight * (lines.length - 1) + maxAscent + maxDescent));

  offscreen.width = textWidth + padding * 2;
  offscreen.height = textHeight + padding * 2;
  offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
  offCtx.font = font;
  offCtx.textAlign = "center";
  offCtx.textBaseline = "alphabetic";
  offCtx.fillStyle = "#ffffff";

  const originX = padding + textWidth / 2;
  const firstBaseline = padding + maxAscent;
  lines.forEach((line, index) => {
    offCtx.fillText(line, originX, firstBaseline + index * fittedLineHeight);
  });

  const imageData = offCtx.getImageData(0, 0, offscreen.width, offscreen.height);
  const targets = [];
  const step = Math.max(2, Math.floor(density));

  for (let y = 0; y < offscreen.height; y += step) {
    for (let x = 0; x < offscreen.width; x += step) {
      const alpha = imageData.data[(y * offscreen.width + x) * 4 + 3];
      if (alpha > 40) {
        targets.push({
          x: width / 2 - offscreen.width / 2 + x,
          y: height / 2 - offscreen.height / 2 + y,
          alpha: alpha / 255,
        });
      }
    }
  }

  return targets;
};

const pickTarget = (targets, index, total) => {
  if (!targets.length) return { x: 0, y: 0, alpha: 1 };
  const mapped = Math.min(targets.length - 1, Math.floor((index * targets.length) / Math.max(1, total)));
  return targets[mapped];
};

const ParticleText = ({
  text = "React Bits",
  fromText,
  toText,
  progress,
  particleSize = 2,
  density = 4,
  color = "#ffffff",
  highlightColor = "#8b5cf6",
  scatter = 180,
  gatherDuration = 1600,
  stagger = 420,
  pointerRepel = 40,
  repelRadius = 120,
  idleDrift = 0.7,
  trigger = "mount",
  fontSize = "clamp(3rem, 12vw, 8rem)",
  fontWeight = 800,
  fontFamily = "inherit",
  fromFontSize,
  toFontSize,
  fromFontWeight,
  toFontWeight,
  fromFontFamily,
  toFontFamily,
  glow = true,
  className = "",
  style = undefined,
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  const sourceText = fromText ?? text;
  const destText = toText;
  const label = destText ? `${sourceText} / ${destText}` : sourceText;

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    let particles = [];
    let animationFrame = null;
    let resizeFrame = null;
    let buildId = 0;
    let gathering = false;
    let gatherStart = 0;
    let reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    let width = 0;
    let height = 0;
    let dpr = 1;
    const scrollDriven = destText != null && destText !== "";

    const pointer = {
      active: false,
      x: 0,
      y: 0,
      smoothX: 0,
      smoothY: 0,
    };

    const startGather = (fromScatter = true) => {
      if (!particles.length) return;

      const now = performance.now();
      const spread = reducedMotion ? 0 : scatter;

      particles.forEach((particle) => {
        if (fromScatter) {
          const angle = particle.seed * Math.PI * 2;
          const distance = spread * (0.35 + particle.depth * 0.75);
          particle.x = particle.fromX + Math.cos(angle) * distance + (particle.depth - 0.5) * spread * 0.55;
          particle.y = particle.fromY + Math.sin(angle) * distance + (particle.seed - 0.5) * spread * 0.55;
        }

        particle.startX = particle.x;
        particle.startY = particle.y;
        particle.delay = reducedMotion ? 0 : particle.seed * stagger;
      });

      gatherStart = now;
      gathering = true;
    };

    const drawParticle = (particle) => {
      const size = particle.size;
      ctx.fillStyle = particle.color;

      if (size <= 2.1) {
        ctx.fillRect(particle.x - size / 2, particle.y - size / 2, size, size);
        return;
      }

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, size / 2, 0, Math.PI * 2);
      ctx.fill();
    };

    const morphAt = (particle, p) => {
      if (reducedMotion) {
        const settled = p >= 0.5;
        return {
          x: settled ? particle.toX : particle.fromX,
          y: settled ? particle.toY : particle.fromY,
          mix: settled ? 1 : 0,
          formed: 1,
        };
      }

      if (p <= HOLD_IN) {
        return { x: particle.fromX, y: particle.fromY, mix: 0, formed: 1 };
      }

      if (p <= BLAST_PEAK) {
        const t = easeInCubic((p - HOLD_IN) / (BLAST_PEAK - HOLD_IN));
        return {
          x: lerp(particle.fromX, particle.blastX, t),
          y: lerp(particle.fromY, particle.blastY, t),
          mix: t * 0.35,
          formed: 1 - t,
        };
      }

      if (p <= GATHER_DONE) {
        const t = easeOutCubic((p - BLAST_PEAK) / (GATHER_DONE - BLAST_PEAK));
        return {
          x: lerp(particle.blastX, particle.toX, t),
          y: lerp(particle.blastY, particle.toY, t),
          mix: 0.35 + t * 0.65,
          formed: t,
        };
      }

      return { x: particle.toX, y: particle.toY, mix: 1, formed: 1 };
    };

    const render = (now) => {
      ctx.clearRect(0, 0, width, height);

      if (glow && !reducedMotion) {
        ctx.shadowBlur = particleSize * 3;
        ctx.shadowColor = highlightColor;
      } else {
        ctx.shadowBlur = 0;
      }

      pointer.smoothX += (pointer.x - pointer.smoothX) * 0.18;
      pointer.smoothY += (pointer.y - pointer.smoothY) * 0.18;

      const scrollP = scrollDriven ? readProgress(progressRef.current) : null;
      const scrollActive = scrollP != null && scrollP > HOLD_IN;
      if (scrollActive) gathering = false;

      let complete = true;

      particles.forEach((particle) => {
        let baseX = particle.fromX;
        let baseY = particle.fromY;
        let phase = 1;
        let mix = 0;

        if (scrollActive) {
          const morph = morphAt(particle, scrollP);
          baseX = morph.x;
          baseY = morph.y;
          phase = morph.formed;
          mix = morph.mix;
        } else if (gathering) {
          const local = (now - gatherStart - particle.delay) / Math.max(1, reducedMotion ? 1 : gatherDuration);
          phase = clamp(local, 0, 1);
          const eased = easeOutCubic(phase);
          baseX = particle.startX + (particle.fromX - particle.startX) * eased;
          baseY = particle.startY + (particle.fromY - particle.startY) * eased;
          if (phase < 1) complete = false;
        }

        if (
          !gathering &&
          !reducedMotion &&
          idleDrift > 0 &&
          (scrollP == null || scrollP <= HOLD_IN || scrollP >= GATHER_DONE)
        ) {
          const driftTime = now * 0.001;
          baseX += Math.sin(driftTime * 0.9 + particle.seed * 10) * idleDrift * particle.depth;
          baseY += Math.cos(driftTime * 0.75 + particle.depth * 10) * idleDrift * particle.depth;
        }

        if (pointer.active && !reducedMotion && pointerRepel > 0 && repelRadius > 0) {
          const dx = baseX - pointer.smoothX;
          const dy = baseY - pointer.smoothY;
          const distance = Math.hypot(dx, dy);
          if (distance > 0 && distance < repelRadius) {
            const force = Math.pow(1 - distance / repelRadius, 2) * pointerRepel;
            baseX += (dx / distance) * force;
            baseY += (dy / distance) * force;
          }
        }

        const follow = reducedMotion ? 1 : scrollActive ? 0.58 : 0.22;
        particle.x += (baseX - particle.x) * follow;
        particle.y += (baseY - particle.y) * follow;

        if (particle.fromRgb && particle.toRgb) {
          particle.color = rgbToCss(mixRgb(particle.fromRgb, particle.toRgb, mix));
        }

        ctx.globalAlpha = clamp(0.42 + phase * 0.58, 0, 1);
        drawParticle(particle);
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      if (gathering && complete) {
        gathering = false;
      }

      animationFrame = window.requestAnimationFrame(render);
    };

    const ensureRenderLoop = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const sampleText = async () => {
      const currentBuild = ++buildId;
      const rect = container.getBoundingClientRect();
      width = Math.floor(rect.width);
      height = Math.floor(rect.height);

      if (width <= 0 || height <= 0) return;

      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const fromTargets = await sampleGlyphs({
        container,
        width,
        height,
        content: sourceText,
        fontSize: fromFontSize ?? fontSize,
        fontWeight: fromFontWeight ?? fontWeight,
        fontFamily: fromFontFamily ?? fontFamily,
        density,
      });
      if (currentBuild !== buildId) return;

      const toTargets = scrollDriven
        ? await sampleGlyphs({
            container,
            width,
            height,
            content: destText,
            fontSize: toFontSize ?? fontSize,
            fontWeight: toFontWeight ?? fontWeight,
            fontFamily: toFontFamily ?? fontFamily,
            density,
          })
        : fromTargets;
      if (currentBuild !== buildId) return;

      const rawCount = Math.max(fromTargets.length, toTargets.length, 1);
      const maxParticles = Math.max(900, Math.min(5600, Math.floor((width * height) / 80)));
      const stride = Math.max(1, Math.ceil(rawCount / maxParticles));
      const count = Math.ceil(rawCount / stride);
      const baseRgb = hexToRgb(color);
      const highlightRgb = hexToRgb(highlightColor);
      const centerX = width / 2;
      const centerY = height / 2;
      const spread = reducedMotion ? 0 : scatter;

      particles = Array.from({ length: count }, (_, index) => {
        const sourceIndex = index * stride;
        const from = pickTarget(fromTargets, sourceIndex, rawCount);
        const to = pickTarget(toTargets, sourceIndex, rawCount);
        const seed = ((index * 9301 + 49297) % 233280) / 233280;
        const depth = 0.45 + (((index * 233 + 97) % 1000) / 1000) * 0.9;
        const blend = baseRgb && highlightRgb ? clamp(from.x / Math.max(1, width) + (seed - 0.5) * 0.35, 0, 1) : 0;
        const fromRgb = baseRgb && highlightRgb ? mixRgb(baseRgb, highlightRgb, blend) : baseRgb;
        const toBlend = baseRgb && highlightRgb ? clamp(to.x / Math.max(1, width) + (seed - 0.5) * 0.28, 0, 1) : 0;
        const toRgb = baseRgb && highlightRgb ? mixRgb(baseRgb, highlightRgb, toBlend) : baseRgb;
        const angle = seed * Math.PI * 2;
        const radialX = from.x - centerX;
        const radialY = from.y - centerY;
        const radial = Math.hypot(radialX, radialY) || 1;
        const explode = spread * (0.42 + depth * 0.7);
        const blastX = clamp(
          from.x + (radialX / radial) * explode + Math.cos(angle) * spread * 0.38,
          18,
          width - 18,
        );
        const blastY = clamp(
          from.y + (radialY / radial) * explode + Math.sin(angle) * spread * 0.38,
          18,
          height - 18,
        );
        const startX = from.x + Math.cos(angle) * spread * (0.35 + depth * 0.75);
        const startY = from.y + Math.sin(angle) * spread * (0.35 + depth * 0.75);

        return {
          x: reducedMotion ? from.x : startX,
          y: reducedMotion ? from.y : startY,
          startX,
          startY,
          fromX: from.x,
          fromY: from.y,
          toX: to.x,
          toY: to.y,
          blastX,
          blastY,
          size: Math.max(0.6, particleSize * (0.75 + from.alpha * 0.45)),
          color: fromRgb ? rgbToCss(fromRgb) : color,
          fromRgb,
          toRgb,
          seed,
          depth,
          delay: seed * stagger,
        };
      });

      pointer.x = width / 2;
      pointer.y = height / 2;
      pointer.smoothX = pointer.x;
      pointer.smoothY = pointer.y;

      if (scrollDriven) {
        const morphP = readProgress(progressRef.current) ?? 0;
        if (reducedMotion || morphP > HOLD_IN) {
          gathering = false;
          particles.forEach((particle) => {
            const morph = morphAt(particle, morphP);
            particle.x = morph.x;
            particle.y = morph.y;
          });
        } else {
          startGather(false);
        }
      } else if (reducedMotion) {
        particles.forEach((particle) => {
          particle.x = particle.fromX;
          particle.y = particle.fromY;
          particle.startX = particle.fromX;
          particle.startY = particle.fromY;
          particle.delay = 0;
        });
        gathering = false;
      } else {
        startGather(false);
      }

      ensureRenderLoop();
    };

    const queueSample = () => {
      if (resizeFrame) window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(sampleText);
    };

    const handlePointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    const handlePointerEnter = (event) => {
      handlePointerMove(event);
      if (!scrollDriven && trigger === "hover") startGather(true);
    };

    const handleClick = () => {
      if (!scrollDriven && trigger === "click") startGather(true);
    };

    const reduceMotionQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const handleReduceMotionChange = (event) => {
      reducedMotion = event.matches;
      sampleText();
    };

    reduceMotionQuery?.addEventListener("change", handleReduceMotionChange);
    canvas.addEventListener("pointerenter", handlePointerEnter);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerleave", handlePointerLeave);
    canvas.addEventListener("click", handleClick);

    const resizeObserver = new ResizeObserver(queueSample);
    resizeObserver.observe(container);
    sampleText();

    return () => {
      buildId += 1;
      resizeObserver.disconnect();
      reduceMotionQuery?.removeEventListener("change", handleReduceMotionChange);
      canvas.removeEventListener("pointerenter", handlePointerEnter);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
      canvas.removeEventListener("click", handleClick);

      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
      if (resizeFrame !== null) window.cancelAnimationFrame(resizeFrame);
    };
  }, [
    sourceText,
    destText,
    particleSize,
    density,
    color,
    highlightColor,
    scatter,
    gatherDuration,
    stagger,
    pointerRepel,
    repelRadius,
    idleDrift,
    trigger,
    fontSize,
    fontWeight,
    fontFamily,
    fromFontSize,
    toFontSize,
    fromFontWeight,
    toFontWeight,
    fromFontFamily,
    toFontFamily,
    glow,
  ]);

  return (
    <div ref={containerRef} className={`particle-text ${className}`} style={style} aria-label={label}>
      <canvas ref={canvasRef} className="particle-text__canvas" aria-hidden="true" />
      <span className="particle-text__sr">{label}</span>
    </div>
  );
};

export default ParticleText;
