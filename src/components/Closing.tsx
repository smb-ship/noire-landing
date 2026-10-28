"use client";

import { type FormEvent, useId, useState } from "react";

type Status = { kind: "idle" } | { kind: "error"; text: string } | { kind: "ok"; text: string };

export default function Closing() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const inputId = useId();
  const msgId = useId();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      setStatus({ kind: "error", text: "Enter a valid email address, for example name@example.com." });
      return;
    }
    // DEMO ONLY: nothing is sent anywhere. Connect a real email service here before launch.
    setEmail("");
    setStatus({ kind: "ok", text: "Thank you. This is a demo, so your address was not sent or stored." });
  };

  return (
    <section className="section closing" aria-labelledby="closing-title">
      <div className="wrap closing__grid">
        <div>
          <h2 id="closing-title" className="h2 closing__title">
            Leave something behind
          </h2>
          <p className="lede">
            Find the one that stays on your skin until morning, then on your coat, your scarf, your pillow.
          </p>
          <a className="btn" href="#collection">
            Explore Collection
          </a>
        </div>

        <div id="newsletter" className="news">
          <h3 className="news__title">Letters from the lab</h3>
          <p className="news__text">New compositions and private releases, sent rarely and never shared.</p>

          <form className="news__form" onSubmit={onSubmit} noValidate>
            <label htmlFor={inputId} className="sr-only">
              Email address
            </label>
            <input
              id={inputId}
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={status.kind === "error"}
              aria-describedby={msgId}
            />
            <button type="submit" className="btn">
              Subscribe
            </button>
          </form>

          <p id={msgId} className={`news__msg news__msg--${status.kind}`} role="status">
            {status.kind === "idle" ? "" : status.text}
          </p>
          <p className="news__demo">
            <span className="toast__tag">Demo</span> This form is not connected to any email service.
          </p>
        </div>
      </div>
    </section>
  );
}
