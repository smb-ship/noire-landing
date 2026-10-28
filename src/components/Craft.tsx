"use client";

import { motion, useReducedMotion } from "motion/react";
import { craftSteps, ingredients } from "@/lib/data";

export default function Craft() {
  const reduce = useReducedMotion();
  const reveal = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] as const },
      };

  return (
    <section id="craft" className="section craft" aria-labelledby="craft-title">
      <div className="wrap">
        <div className="craft__top">
          <header className="craft__intro">
            <h2 id="craft-title" className="h2">
              Made slowly, on purpose
            </h2>
            <p className="lede">
              We use fewer ingredients than most houses, and we use more of each. Every raw material is chosen for how
              it behaves on skin at midnight, not how it smells on paper.
            </p>
          </header>

          <ul className="ingredients">
            {ingredients.map((ing, i) => (
              <motion.li key={ing.name} className="ingredient" {...reveal} transition={{ ...(reveal as { transition?: object }).transition, delay: i * 0.06 }}>
                <span
                  className="ingredient__orb"
                  aria-hidden="true"
                  style={{ background: `radial-gradient(circle at 32% 28%, ${ing.color[0]}, ${ing.color[1]} 72%)` }}
                />
                <div>
                  <h3 className="ingredient__name">{ing.name}</h3>
                  <p className="ingredient__origin">{ing.origin}</p>
                  <p className="ingredient__note">{ing.note}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="process">
          <h3 className="process__title">From harvest to bottle</h3>
          <ol className="process__steps">
            {craftSteps.map((s, i) => (
              <li key={s.title} className="step">
                <span className="step__n" aria-hidden="true">
                  {i + 1}
                </span>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>

          <p className="process__cap">
            The cap is cast in solid brass, plated in champagne gold, and weighted so it closes with a quiet click.
          </p>
        </div>
      </div>
    </section>
  );
}
