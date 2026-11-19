"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScroll;
  uniform float uPixel;
  attribute float aSeed;
  varying float vEnergy;
  varying float vSeed;

  void main() {
    vec3 p = position;
    p.x += sin(uTime * 0.15 + aSeed * 6.2831 + p.y * 0.4) * 0.35;
    p.y += cos(uTime * 0.12 + aSeed * 12.566 + p.x * 0.3) * 0.3;
    p.z += sin(uTime * 0.2 + aSeed * 20.0) * 0.4;

    vec2 away = p.xy - uMouse;
    float dist = length(away);
    float push = smoothstep(2.4, 0.0, dist);
    p.xy += normalize(away + 0.0001) * push * 0.9;
    p.z += push * 1.3;
    p.y += uScroll * 2.2 * (0.4 + aSeed);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = (1.6 + aSeed * 2.6 + push * 4.5) * (7.0 / -mv.z) * uPixel;
    vEnergy = push;
    vSeed = aSeed;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uAccent;
  varying float vEnergy;
  varying float vSeed;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float disc = smoothstep(0.5, 0.05, d);
    vec3 color = mix(uBase, uAccent, clamp(vEnergy * 1.4, 0.0, 1.0));
    float alpha = disc * (0.28 + vSeed * 0.3 + vEnergy * 0.7);
    gl_FragColor = vec4(color, alpha);
  }
`;

/** Small deterministic generator, so the field is identical on every load and render stays pure. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Field({ count, animate }: { count: number; animate: boolean }) {
  const pointer = useRef({ x: 0, y: 0, active: false });
  const points = useRef<THREE.Points>(null);
  const viewport = useThree((state) => state.viewport);
  const invalidate = useThree((state) => state.invalidate);
  const dpr = useThree((state) => state.viewport.dpr);

  const { geometry, material } = useMemo(() => {
    const random = mulberry32(7);
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (random() - 0.5) * 17;
      positions[i * 3 + 1] = (random() - 0.5) * 10;
      positions[i * 3 + 2] = (random() - 0.5) * 6 - 1;
      seeds[i] = random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    const m = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(99, 99) },
        uScroll: { value: 0 },
        uPixel: { value: 1 },
        uBase: { value: new THREE.Color("#6f7a8c") },
        uAccent: { value: new THREE.Color("#d4ff4f") },
      },
    });
    return { geometry: g, material: m };
  }, [count]);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
      pointer.current.active = true;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((state) => {
    const live = points.current?.material as THREE.ShaderMaterial | undefined;
    if (!live) return;
    const u = live.uniforms;
    u.uTime.value = animate ? state.clock.elapsedTime : 0;
    u.uPixel.value = dpr;
    u.uScroll.value = Math.min(window.scrollY / window.innerHeight, 1.5);
    const target = pointer.current.active
      ? new THREE.Vector2((pointer.current.x * viewport.width) / 2, (pointer.current.y * viewport.height) / 2)
      : new THREE.Vector2(99, 99);
    (u.uMouse.value as THREE.Vector2).lerp(target, 0.12);
    if (!animate) invalidate();
  });

  return <points ref={points} geometry={geometry} material={material} frustumCulled={false} />;
}

export default function HeroScene({ compact, animate }: { compact: boolean; animate: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const visible = useRef(true);
  const frameloop = animate ? "always" : "demand";

  useEffect(() => {
    const node = host.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={host} className="hero__canvas" aria-hidden="true">
      <Canvas
        frameloop={frameloop}
        dpr={[1, compact ? 1.25 : 1.75]}
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <Field count={compact ? 1100 : 2600} animate={animate} />
      </Canvas>
    </div>
  );
}
