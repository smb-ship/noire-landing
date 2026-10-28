"use client";

import { useRef } from "react";
import { motion, type MotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { chapters } from "@/lib/data";

function Chapter({
  i,
  progress,
  reduce,
  title,
  kicker,
  body,
}: {
  i: number;
  progress: MotionValue<number>;
  reduce: boolean;
  title: string;
  kicker: string;
  body: string;
}) {
  const n = chapters.length;
  const a = i / n;
  const b = (i + 1) / n;
  const first = i === 0;
  const last = i === n - 1;
  const fade = 0.05;

  // Plain function transforms (not keyframe arrays) so values are computed in JavaScript
  // on every scroll update and stay exact at any scroll position.
  const fadeIn = (p: number) => (first ? 1 : Math.min(1, Math.max(0, (p - (a - fade)) / (2 * fade))));
  const fadeOut = (p: number) => (last ? 1 : 1 - Math.min(1, Math.max(0, (p - (b - fade)) / (2 * fade))));

  const opacity = useTransform(progress, (p) => Math.min(fadeIn(p), fadeOut(p)));
  const y = useTransform(progress, (p) => (1 - fadeIn(p)) * 28 - (1 - fadeOut(p)) * 28);

  return (
    <motion.div className="chapter" style={reduce ? { opacity } : { opacity, y }}>
      <p className="chapter__kicker">{kicker}</p>
      <h3 className="chapter__title">{title}</h3>
      <p className="chapter__body">{body}</p>
    </motion.div>
  );
}

export default function Story() {
  const ref = useRef<HTMLElement>(null);
  const reduce = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const rail = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="story" ref={ref} className="story" aria-labelledby="story-title">
      <div className="story__pin">
        <div className="wrap story__grid">
          <div className="story__copy">
            <h2 id="story-title" className="h2 story__heading">
              A fragrance in three acts
            </h2>

            <div className="story__chapters">
              <div className="story__rail" aria-hidden="true">
                <motion.i style={{ scaleY: rail }} />
              </div>
              <div className="story__stack">
                {chapters.map((c, i) => (
                  <Chapter key={c.title} i={i} progress={scrollYProgress} reduce={reduce} {...c} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
