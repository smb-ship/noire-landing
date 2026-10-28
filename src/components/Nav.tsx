"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/lib/data";
import { useDemoNotice } from "./Demo";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const notify = useDemoNotice();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    firstLink.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 900 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "nav--solid" : ""} ${open ? "nav--open" : ""}`}>
      <div className="nav__bar">
        <a href="#hero" className="nav__logo" aria-label="NOIRÉ, back to top" onClick={() => setOpen(false)}>
          NOIRÉ
        </a>

        <nav className="nav__links" aria-label="Primary">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <button
            type="button"
            className="nav__bag"
            onClick={() => notify("The bag is a placeholder. There is no checkout connected to this page.")}
          >
            Bag <span aria-hidden="true">(0)</span>
            <span className="sr-only">, demo only</span>
          </button>
          <button
            type="button"
            ref={toggle}
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="nav__toggle-lines" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="menu" hidden={!open}>
        <nav aria-label="Mobile">
          <ul>
            {navLinks.map((l, i) => (
              <li key={l.href}>
                <a href={l.href} ref={i === 0 ? firstLink : undefined} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
