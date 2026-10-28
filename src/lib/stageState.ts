// Shared, non-React state that the page scroll writes and the 3D scene reads every frame.
// Keeping it in a plain object (not React state) means scrolling never triggers re-renders.

export type StageMode = "hero" | "story";

export type StageState = {
  /** 0 → 1 while the hero scrolls out of view */
  hero: number;
  /** 0 → 1 while the pinned story section plays */
  story: number;
  /** 0 → 1 how visible the bottle layer should be */
  visible: number;
  /** which pose the bottle should take */
  mode: StageMode;
  /** pointer position, -1 → 1 on each axis */
  px: number;
  py: number;
};

export const createStageState = (): StageState => ({
  hero: 0,
  story: 0,
  visible: 1,
  mode: "hero",
  px: 0,
  py: 0,
});

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

/** Smoothstep that also works when edge0 > edge1 (a reversed ramp). */
export const smooth = (edge0: number, edge1: number, x: number) => {
  const t = clamp((x - edge0) / (edge1 - edge0 || 1));
  return t * t * (3 - 2 * t);
};

export function hasWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    return Boolean(gl);
  } catch {
    return false;
  }
}
