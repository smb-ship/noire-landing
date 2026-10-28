"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  MeshReflectorMaterial,
  PerformanceMonitor,
  RoundedBox,
  Sparkles,
} from "@react-three/drei";
import type { StageState } from "@/lib/stageState";

type Quality = "high" | "low";

/* ------------------------------------------------------------------ */
/* Label texture, drawn with the 2D canvas API so no image file is needed */
/* ------------------------------------------------------------------ */
function drawLabel(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;

  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, "#17130f");
  bg.addColorStop(1, "#0a0807");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const gold = ctx.createLinearGradient(0, 0, w, 0);
  gold.addColorStop(0, "#a8844a");
  gold.addColorStop(0.5, "#f1dfb4");
  gold.addColorStop(1, "#b8935a");

  ctx.strokeStyle = gold;
  ctx.lineWidth = 4;
  ctx.strokeRect(26, 26, w - 52, h - 52);
  ctx.lineWidth = 1.5;
  ctx.strokeRect(42, 42, w - 84, h - 84);

  ctx.fillStyle = gold;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const serif = '"Bodoni Moda Variable", "Bodoni Moda", "Didot", Georgia, serif';
  const sans = '"Jost Variable", "Jost", "Helvetica Neue", Arial, sans-serif';

  // wordmark
  ctx.font = `500 168px ${serif}`;
  if ("letterSpacing" in ctx) (ctx as unknown as { letterSpacing: string }).letterSpacing = "12px";
  ctx.fillText("NOIRÉ", w / 2 + 6, h * 0.43);

  // hairline divider
  ctx.fillRect(w / 2 - 70, h * 0.62, 140, 2);

  ctx.font = `400 34px ${sans}`;
  if ("letterSpacing" in ctx) (ctx as unknown as { letterSpacing: string }).letterSpacing = "10px";
  ctx.fillText("EAU DE PARFUM", w / 2 + 5, h * 0.72);

  ctx.font = `300 26px ${sans}`;
  if ("letterSpacing" in ctx) (ctx as unknown as { letterSpacing: string }).letterSpacing = "6px";
  ctx.fillText("50 ML  ·  1.7 FL OZ", w / 2 + 3, h * 0.82);
}

function useLabelTexture() {
  const { gl } = useThree();
  const { canvas, texture } = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 1024;
    c.height = 704;
    drawLabel(c);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return { canvas: c, texture: t };
  }, []);

  useEffect(() => {
    texture.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
    // Redraw once the web fonts are ready so the label uses the real typeface.
    let cancelled = false;
    if (document.fonts?.load) {
      Promise.all([
        document.fonts.load('500 100px "Bodoni Moda Variable"'),
        document.fonts.load('400 30px "Jost Variable"'),
      ])
        .then(() => {
          if (cancelled) return;
          drawLabel(canvas);
          texture.needsUpdate = true;
        })
        .catch(() => undefined);
    }
    return () => {
      cancelled = true;
    };
  }, [canvas, texture, gl]);

  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}

/* ------------------------------------------------------------------ */
/* The bottle, modelled procedurally from rounded boxes and cylinders    */
/* ------------------------------------------------------------------ */
const GOLD = { color: "#cfa95f", metalness: 1, roughness: 0.2, envMapIntensity: 1.6 } as const;

function Bottle({ quality }: { quality: Quality }) {
  const label = useLabelTexture();

  return (
    <group>
      {/* smoky glass body */}
      <RoundedBox args={[1.3, 1.75, 0.84]} radius={0.12} smoothness={6} position={[0, 0, 0]}>
        {quality === "high" ? (
          <meshPhysicalMaterial
            color="#2a221b"
            transmission={1}
            thickness={0.9}
            ior={1.45}
            roughness={0.05}
            attenuationColor="#9a6a32"
            attenuationDistance={2.2}
            clearcoat={1}
            clearcoatRoughness={0.04}
            envMapIntensity={1.4}
            specularIntensity={1}
          />
        ) : (
          <meshPhysicalMaterial
            color="#120d09"
            transparent
            opacity={0.8}
            depthWrite={false}
            roughness={0.06}
            clearcoat={1}
            clearcoatRoughness={0.05}
            envMapIntensity={1.6}
          />
        )}
      </RoundedBox>

      {/* the liquid, seen through the glass */}
      <RoundedBox args={[1.12, 1.28, 0.64]} radius={0.08} smoothness={4} position={[0, -0.12, 0]}>
        <meshStandardMaterial color="#b8741f" emissive="#8a4a0c" emissiveIntensity={0.9} roughness={0.25} />
      </RoundedBox>

      {/* heavy glass base */}
      <RoundedBox args={[1.34, 0.14, 0.88]} radius={0.05} smoothness={4} position={[0, -0.93, 0]}>
        <meshStandardMaterial color="#c9a45c" metalness={1} roughness={0.28} envMapIntensity={1.4} />
      </RoundedBox>

      {/* neck collar */}
      <mesh position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.26, 0.3, 0.18, 48]} />
        <meshStandardMaterial {...GOLD} roughness={0.28} />
      </mesh>
      <mesh position={[0, 1.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.31, 0.022, 16, 64]} />
        <meshStandardMaterial {...GOLD} />
      </mesh>

      {/* gold cap */}
      <RoundedBox args={[0.82, 0.74, 0.54]} radius={0.07} smoothness={6} position={[0, 1.46, 0]}>
        <meshStandardMaterial {...GOLD} />
      </RoundedBox>
      <RoundedBox args={[0.7, 0.05, 0.42]} radius={0.02} smoothness={3} position={[0, 1.84, 0]}>
        <meshStandardMaterial color="#e6cf9c" metalness={1} roughness={0.12} envMapIntensity={1.8} />
      </RoundedBox>
      {/* black enamel band between cap and neck */}
      <mesh position={[0, 1.08, 0]}>
        <boxGeometry args={[0.7, 0.03, 0.46]} />
        <meshStandardMaterial color="#0a0807" roughness={0.35} metalness={0.2} />
      </mesh>

      {/* label, sits just in front of the glass */}
      <mesh position={[0, -0.08, 0.425]}>
        <planeGeometry args={[0.9, 0.62]} />
        <meshStandardMaterial map={label} metalness={0.35} roughness={0.42} envMapIntensity={0.9} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Soft circular fade so the reflective floor melts into the page       */
/* ------------------------------------------------------------------ */
function useRadialAlpha() {
  const tex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
    g.addColorStop(0, "#ffffff");
    g.addColorStop(0.45, "#9a9a9a");
    g.addColorStop(1, "#000000");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 256);
    const t = new THREE.CanvasTexture(c);
    return t;
  }, []);
  useEffect(() => () => tex.dispose(), [tex]);
  return tex;
}

function Floor({ quality }: { quality: Quality }) {
  const alpha = useRadialAlpha();
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -1.02, 0]}>
      <circleGeometry args={[3.4, 72]} />
      <MeshReflectorMaterial
        color="#0c0a08"
        resolution={quality === "high" ? 768 : 320}
        blur={quality === "high" ? [380, 120] : [220, 80]}
        mixBlur={1.1}
        mixStrength={quality === "high" ? 2.4 : 1.8}
        mirror={0.75}
        roughness={0.9}
        metalness={0.15}
        depthScale={1}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        transparent
        alphaMap={alpha}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* Lighting rig: all light comes from procedural softboxes (no HDR file) */
/* ------------------------------------------------------------------ */
function Lights() {
  return (
    <>
      <Environment resolution={256} frames={1}>
        <color attach="background" args={["#030201"]} />
        {/* key softbox, left */}
        <Lightformer form="rect" intensity={5} color="#fff0d2" position={[-5, 1, 2]} rotation-y={Math.PI / 2} scale={[3, 9, 1]} />
        {/* champagne strip, right */}
        <Lightformer form="rect" intensity={3.2} color="#e8c887" position={[5.5, 0.5, 1]} rotation-y={-Math.PI / 2} scale={[2, 9, 1]} />
        {/* overhead */}
        <Lightformer form="rect" intensity={2.2} color="#ffffff" position={[0, 6, 0]} rotation-x={Math.PI / 2} scale={[8, 4, 1]} />
        {/* back rim */}
        <Lightformer form="ring" intensity={2.5} color="#ffd9a0" position={[0, 1.5, -6]} scale={5} />
        {/* faint front fill so the label reads */}
        <Lightformer form="rect" intensity={0.7} color="#fff4e0" position={[0, 0.5, 7]} rotation-y={Math.PI} scale={[6, 3, 1]} />
      </Environment>
      <spotLight position={[3.5, 5.5, 5]} angle={0.35} penumbra={1} intensity={90} color="#ffe3b3" />
      <pointLight position={[-4, 2, -3]} intensity={24} color="#d9b46c" />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Rig: moves, scales and spins the bottle based on scroll + pointer     */
/* ------------------------------------------------------------------ */
function Rig({ stage, reduced, quality }: { stage: React.RefObject<StageState>; reduced: boolean; quality: Quality }) {
  const pose = useRef<THREE.Group>(null);
  const spin = useRef<THREE.Group>(null);
  const { viewport, size } = useThree();

  useFrame((state, delta) => {
    const g = pose.current;
    const s = spin.current;
    const st = stage.current;
    if (!g || !s || !st) return;

    const narrow = size.width < 820;
    const fitScale = Math.min(1, viewport.width / 3.4, viewport.height / 3.6);

    let tx = 0;
    let ty = 0;
    let ts = fitScale;
    let rotY = 0;

    if (st.mode === "hero") {
      tx = 0;
      ty = (narrow ? 0.0 : -0.5) + st.hero * 1.3;
      ts = fitScale * (narrow ? 0.9 : 0.8) * (1 - st.hero * 0.12);
      rotY = (reduced ? 0.35 : 0.5) + st.hero * (reduced ? 0.6 : Math.PI * 1.1);
    } else {
      tx = narrow ? 0 : viewport.width * 0.2;
      ty = narrow ? viewport.height * 0.12 : -0.5;
      ts = fitScale * (narrow ? 0.6 : 0.82);
      rotY = -0.4 + st.story * (reduced ? 1.2 : Math.PI * 2.6);
    }

    const t = state.clock.elapsedTime;
    const float = reduced ? 0 : Math.sin(t * 0.9) * 0.06;
    const px = reduced ? 0 : st.px;
    const py = reduced ? 0 : st.py;

    const k = reduced ? 8 : 3.2;
    g.position.x = THREE.MathUtils.damp(g.position.x, tx + px * 0.18, k, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, ty + float, k, delta);
    const sc = THREE.MathUtils.damp(g.scale.x, ts, k, delta);
    g.scale.setScalar(sc);

    s.rotation.y = THREE.MathUtils.damp(s.rotation.y, rotY + px * 0.45, k, delta);
    s.rotation.x = THREE.MathUtils.damp(s.rotation.x, -py * 0.1, k, delta);
    s.rotation.z = reduced ? 0 : Math.sin(t * 0.6) * 0.012;
  });

  return (
    <group ref={pose}>
      <group ref={spin}>
        <Bottle quality={quality} />
      </group>
      <Floor quality={quality} />
      {!reduced && quality === "high" && (
        <Sparkles count={36} scale={[4.2, 3.6, 2.4]} size={2.2} speed={0.25} opacity={0.55} color="#f0d9a4" />
      )}
    </group>
  );
}

/* ------------------------------------------------------------------ */

export default function BottleScene({
  stage,
  active,
  reduced,
  onLost,
}: {
  stage: React.RefObject<StageState>;
  active: boolean;
  reduced: boolean;
  onLost: () => void;
}) {
  const [quality, setQuality] = useState<Quality>(() =>
    typeof window !== "undefined" && (window.innerWidth < 820 || window.matchMedia("(pointer: coarse)").matches)
      ? "low"
      : "high",
  );

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={quality === "high" ? [1, 1.75] : [1, 1.4]}
      camera={{ position: [0, 0.35, 9], fov: 27, near: 0.1, far: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        gl.domElement.addEventListener("webglcontextlost", (e) => {
          e.preventDefault();
          onLost();
        });
      }}
    >
      <PerformanceMonitor onDecline={() => setQuality("low")} />
      <fog attach="fog" args={["#050403", 9, 16]} />
      <Lights />
      <Rig stage={stage} reduced={reduced} quality={quality} />
    </Canvas>
  );
}
