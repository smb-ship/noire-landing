"use client";

import { type PointerEvent, useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import { perfumes, type Perfume } from "@/lib/data";
import { useDemoNotice } from "./Demo";

function CardBottle({ p }: { p: Perfume }) {
  const id = useId();
  return (
    <svg viewBox="0 0 120 190" className="card__bottle" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-g`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={p.tint[0]} />
          <stop offset="0.5" stopColor={p.tint[1]} />
          <stop offset="1" stopColor={p.tint[2]} />
        </linearGradient>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8f6c35" />
          <stop offset="0.4" stopColor="#f1dfb4" />
          <stop offset="1" stopColor="#a8844a" />
        </linearGradient>
        <linearGradient id={`${id}-l`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.liquid} stopOpacity="0.9" />
          <stop offset="1" stopColor={p.liquid} stopOpacity="0.45" />
        </linearGradient>
      </defs>
      <rect x="40" y="6" width="40" height="34" rx="4" fill={`url(#${id}-gold)`} />
      <rect x="46" y="38" width="28" height="10" rx="2" fill={`url(#${id}-gold)`} />
      <rect x="18" y="48" width="84" height="132" rx="12" fill={`url(#${id}-g)`} stroke="#d9bd88" strokeOpacity="0.3" />
      <rect x="26" y="62" width="68" height="108" rx="7" fill={`url(#${id}-l)`} />
      <rect x="30" y="100" width="60" height="40" rx="2" fill="#0c0907" stroke="#cdaa68" strokeWidth="0.8" />
      <text x="60" y="124" textAnchor="middle" fontFamily="Bodoni Moda Variable, Georgia, serif" fontSize="10" fill="#e3cc98" letterSpacing="1.5">
        NOIRÉ
      </text>
      <rect x="26" y="54" width="4" height="118" rx="2" fill="#fff" opacity="0.12" />
    </svg>
  );
}

function Card({ p, index }: { p: Perfume; index: number }) {
  const reduce = useReducedMotion();
  const notify = useDemoNotice();

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.article
      className={`card card--${index + 1}`}
      onPointerMove={onMove}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="card__art">
        <CardBottle p={p} />
      </div>
      <div className="card__body">
        <h3 className="card__name">{p.name}</h3>
        <p className="card__tagline">{p.tagline}</p>

        <dl className="card__notes">
          <div>
            <dt>Top</dt>
            <dd>{p.top}</dd>
          </div>
          <div>
            <dt>Heart</dt>
            <dd>{p.heart}</dd>
          </div>
          <div>
            <dt>Base</dt>
            <dd>{p.base}</dd>
          </div>
        </dl>

        <div className="card__foot">
          <p className="card__price">
            <span>${p.price}</span>
            <small>{p.size}</small>
          </p>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => notify(`Checkout isn't connected, so ${p.name} was not reserved.`)}
          >
            Reserve<span className="sr-only"> {p.name} (demo)</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function Collection() {
  return (
    <section id="collection" className="section collection" aria-labelledby="collection-title">
      <div className="wrap">
        <header className="section__head">
          <h2 id="collection-title" className="h2">
            The signature collection
          </h2>
          <p className="lede">
            Three compositions, each built on one dark idea and finished in gold. Prices shown are placeholders for
            this demo.
          </p>
        </header>

        <div className="cards">
          {perfumes.map((p, i) => (
            <Card key={p.id} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
