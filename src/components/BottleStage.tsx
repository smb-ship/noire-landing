"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { clamp, createStageState, hasWebGL, smooth } from "@/lib/stageState";
import BottleFallback from "./BottleFallback";

// The 3D scene is loaded only in the browser so the page's first paint stays fast.
const BottleScene = dynamic(() => import("./BottleScene"), { ssr: false });

class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.warn("The 3D scene could not start, showing the illustrated bottle instead.", error);
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/**
 * A fixed, full-screen layer that holds the bottle. The bottle is only visible
 * during the hero and the story section; in between it fades away and the
 * renderer is paused so it costs nothing.
 */
export default function BottleStage() {
  const reduced = Boolean(useReducedMotion());
  const stage = useRef(createStageState());
  const wrap = useRef<HTMLDivElement>(null);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [active, setActive] = useState(true);
  const activeRef = useRef(true);

  useEffect(() => {
    setWebgl(hasWebGL());
  }, []);

  const compute = useCallback(() => {
    const hero = document.getElementById("hero");
    const story = document.getElementById("story");
    const el = wrap.current;
    if (!hero || !story || !el) return;

    const vh = window.innerHeight;
    const vw = window.innerWidth;
    const hr = hero.getBoundingClientRect();
    const sr = story.getBoundingClientRect();
    const st = stage.current;

    st.hero = clamp(-hr.top / Math.max(hr.height, 1));
    st.story = clamp(-sr.top / Math.max(sr.height - vh, 1));

    const heroVis = hr.bottom > 0 ? 1 - smooth(0.45, 0.9, st.hero) : 0;
    const enter = smooth(vh * 0.9, vh * 0.15, sr.top);
    const leave = smooth(0, vh * 0.7, sr.bottom);
    const storyVis = enter * leave;

    st.mode = sr.top < vh * 0.95 ? "story" : "hero";
    st.visible = Math.max(heroVis, storyVis);

    el.style.opacity = String(st.visible);
    el.style.visibility = st.visible < 0.01 ? "hidden" : "visible";

    // Variables used by the SVG fallback
    const narrow = vw < 820;
    const inStory = st.mode === "story";
    const fx = inStory && !narrow ? vw * 0.2 : 0;
    const fy = inStory ? (narrow ? -vh * 0.2 : 0) : -st.hero * 140;
    const fs = inStory ? (narrow ? 0.7 : 1) : 1 - st.hero * 0.1;
    const fr = inStory ? Math.sin(st.story * Math.PI * 2) * 28 : st.hero * 40;
    el.style.setProperty("--fx", `${fx}px`);
    el.style.setProperty("--fy", `${fy}px`);
    el.style.setProperty("--fs", String(fs));
    el.style.setProperty("--fr", `${reduced ? 0 : fr}deg`);

    const nowActive = st.visible > 0.01;
    if (nowActive !== activeRef.current) {
      activeRef.current = nowActive;
      setActive(nowActive);
    }
  }, [reduced]);

  useEffect(() => {
    let frame = 0;
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(compute);
    };
    const onPointer = (e: PointerEvent) => {
      stage.current.px = (e.clientX / window.innerWidth) * 2 - 1;
      stage.current.py = (e.clientY / window.innerHeight) * 2 - 1;
    };

    compute();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("pointermove", onPointer, { passive: true });
    // Fonts and images can change page height after first paint.
    const late = window.setTimeout(compute, 600);
    if (document.fonts?.ready) document.fonts.ready.then(schedule).catch(() => undefined);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(late);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [compute]);

  const fallback = <BottleFallback />;

  return (
    <div
      ref={wrap}
      className="stage"
      role="img"
      aria-label="A black glass NOIRÉ perfume bottle with a champagne-gold cap, slowly turning"
    >
      {webgl === false && fallback}
      {webgl && (
        <SceneBoundary fallback={fallback}>
          <BottleScene stage={stage} active={active} reduced={reduced} onLost={() => setWebgl(false)} />
        </SceneBoundary>
      )}
    </div>
  );
}
