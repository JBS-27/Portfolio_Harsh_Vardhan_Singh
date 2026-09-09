"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";
import land from "@/data/ne_110m_land.json";
import { useHeroSignal } from "@/components/hero-signal";
import { buildGlobeCloud, type LandCollection } from "@/lib/globe-points";

const landData = land as unknown as LandCollection;

export const GLOBE_RADIUS = 1;
const CAMERA_Z = 4.15;
const CAMERA_FOV = 32;
const SPIN_PERIOD = 48;

const pointVertex = /* glsl */ `
  attribute float aSeed;
  attribute float aKind;
  uniform float uPixelRatio;
  uniform float uReveal;
  uniform float uHover;
  uniform vec3 uLightDir;
  varying float vAlpha;
  varying float vSeed;
  varying float vKind;
  varying float vLit;

  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vec3 worldN = normalize(world.xyz);
    vec3 viewDir = normalize(cameraPosition - world.xyz);
    float facing = dot(worldN, viewDir);

    float depth = smoothstep(-0.06, 0.72, facing);
    float lit = pow(max(dot(worldN, normalize(uLightDir)), 0.0), 12.0);
    vLit = lit * uHover;
    vSeed = aSeed;
    vKind = aKind;
    vAlpha = mix(0.03, 1.0, depth) * (1.0 + uReveal * 0.1);
    if (aKind > 1.5 && aKind < 2.5) vAlpha *= 0.2;

    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;

    float kindSize = aKind > 2.5 ? 1.05 : aKind > 1.5 ? 0.58 : aKind > 0.5 ? 1.12 : 0.88;
    gl_PointSize = kindSize * (0.9 + aSeed * 0.4) * uPixelRatio;
    gl_PointSize = clamp(gl_PointSize, 0.75, 2.35);
  }
`;

const pointFragment = /* glsl */ `
  varying float vAlpha;
  varying float vSeed;
  varying float vKind;
  varying float vLit;

  void main() {
    vec2 p = gl_PointCoord * 2.0 - 1.0;
    float d = dot(p, p);
    if (d > 1.0) discard;
    float glow = exp(-d * 3.4);

    vec3 white = vec3(1.0, 1.0, 1.0);
    vec3 warm = vec3(1.0, 0.992, 0.949);
    vec3 gold = vec3(1.0, 0.945, 0.659);
    float t = fract(vSeed * 6.13);
    vec3 color = mix(white, warm, smoothstep(0.55, 1.0, t) * 0.55);
    if (vKind > 2.5) color = mix(color, gold, 0.42);
    color = mix(color, white, vLit * 0.35);

    float alpha = glow * vAlpha * (0.7 + vSeed * 0.18 + vLit * 0.22);
    gl_FragColor = vec4(color, alpha);
  }
`;

const atmosphereVertex = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vNormal = normalize(mat3(modelMatrix) * normal);
    vView = normalize(cameraPosition - world.xyz);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const atmosphereFragment = /* glsl */ `
  uniform float uReveal;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float fresnel = pow(1.0 - abs(dot(normalize(vNormal), normalize(vView))), 3.1);
    vec3 color = mix(vec3(1.0, 0.992, 0.949), vec3(1.0, 0.945, 0.659), fresnel * 0.35);
    float alpha = fresnel * (0.05 + uReveal * 0.025);
    gl_FragColor = vec4(color, alpha);
  }
`;

function useGlobeCloud() {
  return useMemo(() => {
    if (typeof document === "undefined") {
      return {
        positions: new Float32Array(),
        seeds: new Float32Array(),
        kinds: new Float32Array(),
        count: 0,
      };
    }
    const fine = window.matchMedia("(pointer: fine)").matches;
    const narrow = window.innerWidth < 768;
    const budget = narrow ? 4200 : fine ? 14500 : 7800;
    return buildGlobeCloud(landData, budget, GLOBE_RADIUS);
  }, []);
}

function LandPoints({
  reduce,
  revealRef,
  lightRef,
  hoverRef,
}: {
  reduce: boolean;
  revealRef: MutableRefObject<number>;
  lightRef: MutableRefObject<THREE.Vector3>;
  hoverRef: MutableRefObject<number>;
}) {
  const cloud = useGlobeCloud();
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uPixelRatio: { value: 1 },
          uReveal: { value: 0 },
          uHover: { value: 0 },
          uLightDir: { value: new THREE.Vector3(0.15, 0.2, 1) },
        },
        vertexShader: pointVertex,
        fragmentShader: pointFragment,
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
      }),
    [],
  );

  useEffect(() => () => material.dispose(), [material]);

  useFrame(({ gl: renderer }) => {
    material.uniforms.uPixelRatio.value = Math.min(renderer.getPixelRatio(), 2);
    material.uniforms.uReveal.value = revealRef.current;
    material.uniforms.uHover.value = reduce ? 0 : hoverRef.current;
    material.uniforms.uLightDir.value.copy(lightRef.current);
  });

  const geom = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(cloud.positions, 3));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(cloud.seeds, 1));
    geometry.setAttribute("aKind", new THREE.BufferAttribute(cloud.kinds, 1));
    return geometry;
  }, [cloud]);

  useEffect(() => () => geom.dispose(), [geom]);

  if (cloud.count === 0) return null;
  return <points geometry={geom} material={material} />;
}

function AtmosphereShell({ revealRef }: { revealRef: MutableRefObject<number> }) {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uReveal: { value: 0 } },
        vertexShader: atmosphereVertex,
        fragmentShader: atmosphereFragment,
        transparent: true,
        depthWrite: false,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  useEffect(() => () => mat.dispose(), [mat]);
  useFrame(() => {
    mat.uniforms.uReveal.value = revealRef.current;
  });

  return (
    <mesh scale={1.03} material={mat}>
      <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
    </mesh>
  );
}

function Halo({ revealRef }: { revealRef: MutableRefObject<number> }) {
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(() => {
    if (mat.current) mat.current.opacity = 0.01 + revealRef.current * 0.008;
  });
  return (
    <mesh scale={1.055}>
      <sphereGeometry args={[GLOBE_RADIUS, 48, 48]} />
      <meshBasicMaterial
        ref={mat}
        color="#fffdf2"
        transparent
        opacity={0.018}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function ThinLimb() {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 192; i += 1) {
      const a = (i / 192) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * GLOBE_RADIUS, Math.sin(a) * GLOBE_RADIUS, 0));
    }
    return pts;
  }, []);
  const geom = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  useEffect(() => () => geom.dispose(), [geom]);
  return (
    <lineLoop geometry={geom}>
      <lineBasicMaterial color="#fff8d6" transparent opacity={0.14} />
    </lineLoop>
  );
}

function Craft({ reduce }: { reduce: boolean }) {
  const tex = useLoader(THREE.TextureLoader, "/spacecraft.png");
  const ref = useRef<THREE.Sprite>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = reduce ? 0.8 : clock.elapsedTime * 0.085;
    const x = Math.cos(t) * 1.38;
    const z = Math.sin(t) * 0.42;
    const y = Math.sin(t * 1.15) * 0.34;
    ref.current.position.set(x, y, z);
    const depth = (z + 0.5) * 0.5;
    const s = 0.12 + depth * 0.04;
    ref.current.scale.set(s * 1.7, s, 1);
    ref.current.material.opacity = 0.34 + depth * 0.28;
  });
  return (
    <sprite ref={ref} renderOrder={2}>
      <spriteMaterial map={tex} transparent opacity={0.4} depthWrite={false} />
    </sprite>
  );
}

function LockedCamera() {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.set(0, 0.04, CAMERA_Z);
    if ("fov" in camera) {
      const perspective = camera as THREE.PerspectiveCamera;
      if (perspective.fov !== CAMERA_FOV) {
        perspective.fov = CAMERA_FOV;
        perspective.updateProjectionMatrix();
      }
    }
    camera.lookAt(0, 0, 0);
  });
  return null;
}

type GlobeControl = {
  ndcX: number;
  ndcY: number;
  over: boolean;
  dragging: boolean;
  yaw: number;
  pitch: number;
  angVx: number;
  angVy: number;
};

function GlobeRig({
  reduce,
  control,
}: {
  reduce: boolean;
  control: MutableRefObject<GlobeControl>;
}) {
  const root = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const sway = useRef<THREE.Group>(null);
  const { revealed } = useHeroSignal();
  const revealRef = useRef(0);
  const lightRef = useRef(new THREE.Vector3(0.18, 0.2, 1).normalize());
  const autoY = useRef(-0.32);
  const leanY = useRef(0);
  const leanX = useRef(0);
  const posX = useRef(0);
  const posY = useRef(0);
  const hoverRef = useRef(0.35);

  useFrame((_, dt) => {
    const step = Math.min(dt, 0.05);
    const c = control.current;
    revealRef.current = THREE.MathUtils.damp(revealRef.current, revealed ? 1 : 0, 3.2, step);
    hoverRef.current = THREE.MathUtils.damp(
      hoverRef.current,
      reduce ? 0.2 : c.over || c.dragging ? 0.7 : 0.32,
      3.4,
      step,
    );

    if (!reduce && !c.dragging && Math.hypot(c.angVx, c.angVy) < 0.18) {
      autoY.current += step * ((Math.PI * 2) / SPIN_PERIOD);
    }

    if (!c.dragging) {
      c.yaw += c.angVx;
      c.pitch = THREE.MathUtils.clamp(c.pitch + c.angVy, -1.25, 1.25);
      c.angVx *= 0.94;
      c.angVy *= 0.94;
      if (Math.abs(c.angVx) < 0.00008) c.angVx = 0;
      if (Math.abs(c.angVy) < 0.00008) c.angVy = 0;
    }

    const targetLeanY = reduce ? 0 : c.over ? c.ndcX * 0.28 : c.ndcX * 0.06;
    const targetLeanX = reduce ? 0 : c.over ? c.ndcY * 0.14 : c.ndcY * 0.03;
    const targetPosX = reduce ? 0 : c.over ? c.ndcX * 0.08 : c.ndcX * 0.02;
    const targetPosY = reduce ? 0 : c.over ? -c.ndcY * 0.05 : -c.ndcY * 0.015;

    leanY.current = THREE.MathUtils.damp(leanY.current, targetLeanY, 2.8, step);
    leanX.current = THREE.MathUtils.damp(leanX.current, targetLeanX, 2.8, step);
    posX.current = THREE.MathUtils.damp(posX.current, targetPosX, 2.6, step);
    posY.current = THREE.MathUtils.damp(posY.current, targetPosY, 2.6, step);

    lightRef.current.set(c.ndcX * 0.85, -c.ndcY * 0.55, 1).normalize();

    if (root.current) root.current.scale.setScalar(1);
    if (spin.current) {
      spin.current.rotation.set(0, autoY.current, 0);
    }
    if (sway.current) {
      sway.current.rotation.set(
        THREE.MathUtils.clamp(c.pitch + leanX.current, -1.3, 1.3),
        c.yaw + leanY.current,
        0,
      );
      sway.current.position.set(posX.current, posY.current, 0);
    }
  });

  return (
    <group ref={root}>
      <group ref={sway}>
        <group rotation={[0.3, 0, 0.18]}>
          <group ref={spin}>
            <mesh>
              <sphereGeometry args={[GLOBE_RADIUS * 0.978, 64, 64]} />
              <meshBasicMaterial color="#000000" />
            </mesh>
            <LandPoints reduce={reduce} revealRef={revealRef} lightRef={lightRef} hoverRef={hoverRef} />
          </group>
        </group>
        <AtmosphereShell revealRef={revealRef} />
        <Halo revealRef={revealRef} />
        <Suspense fallback={null}>
          <Craft reduce={reduce} />
        </Suspense>
        <ThinLimb />
      </group>
    </group>
  );
}

export function InitiatorGlobe({ reduce = false }: { reduce?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hint, setHint] = useState(true);
  const control = useRef<GlobeControl>({
    ndcX: 0,
    ndcY: 0,
    over: false,
    dragging: false,
    yaw: 0,
    pitch: 0,
    angVx: 0,
    angVy: 0,
  });

  useEffect(() => {
    const node = wrapRef.current;
    if (!node || reduce) return;

    const last = { x: 0, y: 0 };

    const setNdc = (event: PointerEvent, local: boolean) => {
      if (local) {
        const rect = node.getBoundingClientRect();
        control.current.ndcX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        control.current.ndcY = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      } else {
        control.current.ndcX = (event.clientX / window.innerWidth - 0.5) * 2;
        control.current.ndcY = (event.clientY / window.innerHeight - 0.5) * 2;
      }
    };

    const onMove = (event: PointerEvent) => {
      const c = control.current;
      const rect = node.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (!c.dragging) c.over = inside;
      setNdc(event, c.over || c.dragging);

      if (!c.dragging) return;
      const dx = event.clientX - last.x;
      const dy = event.clientY - last.y;
      c.yaw += dx * 0.0058;
      c.pitch = THREE.MathUtils.clamp(c.pitch + dy * 0.0044, -1.25, 1.25);
      c.angVx = dx * 0.0058;
      c.angVy = dy * 0.0044;
      last.x = event.clientX;
      last.y = event.clientY;
    }

    const onDown = (event: PointerEvent) => {
      const c = control.current;
      c.dragging = true;
      c.over = true;
      c.angVx = 0;
      c.angVy = 0;
      last.x = event.clientX;
      last.y = event.clientY;
      setNdc(event, true);
      node.setPointerCapture(event.pointerId);
      document.body.style.userSelect = "none";
      setHint(false);
    }

    function onUp() {
      control.current.dragging = false;
      document.body.style.userSelect = "";
    }

    function onLeave() {
      if (!control.current.dragging) control.current.over = false;
    }

    node.addEventListener("pointerdown", onDown);
    node.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      document.body.style.userSelect = "";
      node.removeEventListener("pointerdown", onDown);
      node.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [reduce]);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[min(48vw,540px)] max-lg:max-w-[min(76vw,360px)]">
      <div
        ref={wrapRef}
        className="absolute inset-0 touch-none"
        role="img"
        aria-label="Dotted globe. Drag to rotate."
      >
        <Canvas
          camera={{ position: [0, 0.04, CAMERA_Z], fov: CAMERA_FOV, near: 0.1, far: 20 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
          frameloop="always"
          resize={{ debounce: 120 }}
        >
          <LockedCamera />
          <GlobeRig reduce={reduce} control={control} />
        </Canvas>
      </div>
      <p
        className={`pointer-events-none absolute inset-x-0 -bottom-5 text-center font-mono text-[10px] tracking-[0.24em] text-faint uppercase transition-opacity duration-700 max-lg:hidden ${
          hint ? "opacity-40" : "opacity-0"
        }`}
      >
        Orb / 001
      </p>
    </div>
  );
}
