"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.2, 0.8, 0.2, 1] as const;

function Line({ words, start }: { words: string[]; start: number }) {
  const reduce = useReducedMotion();
  let n = start;
  return (
    <>
      {words.map((word) => (
        <span className="hero__word" key={word} aria-hidden="true">
          {word.split("").map((ch) => {
            const delay = 0.35 + n++ * 0.05;
            return (
              <span className="hero__mask" key={n}>
                <motion.span
                  className="hero__char"
                  initial={reduce ? false : { y: "115%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, delay, ease: EASE }}
                >
                  {ch}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1, delay, ease: EASE },
        };

  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__inner">
        <h1 id="hero-title" className="hero__title" aria-label="A scent that stays.">
          <span className="hero__line hero__line--a">
            <Line words={["A", "SCENT"]} start={0} />
          </span>
          <span className="hero__line hero__line--b">
            <Line words={["THAT", "STAYS."]} start={7} />
          </span>
        </h1>

        <motion.p className="hero__copy" {...fade(1.5)}>
          Three eaux de parfum, composed in the dark and finished in gold. Made in small batches, one bottle at a
          time.
        </motion.p>

        <motion.div className="hero__cta" {...fade(1.7)}>
          <a className="btn" href="#collection">
            Explore Collection
          </a>
        </motion.div>

        <motion.a className="hero__scroll" href="#collection" aria-label="Scroll to the collection" {...fade(2)}>
          <span>Scroll</span>
          <i aria-hidden="true" />
        </motion.a>
      </div>
    </section>
  );
}
