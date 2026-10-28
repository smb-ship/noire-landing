import { navLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div className="footer__brand">
          <a href="#hero" className="footer__logo" aria-label="NOIRÉ, back to top">
            NOIRÉ
          </a>
          <p>Dark glass, gold, and a scent that stays.</p>
        </div>

        <nav aria-label="Footer" className="footer__nav">
          <h2 className="footer__h">Explore</h2>
          <ul>
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__note">
          <h2 className="footer__h">About this page</h2>
          <p>
            NOIRÉ is a fictional brand created for a design and development demo. No products are sold, no orders are
            taken, and no data is collected.
          </p>
        </div>
      </div>

      <div className="wrap footer__base">
        <p>© 2026 NOIRÉ. Demo project.</p>
        <a href="#hero">Back to top</a>
      </div>
    </footer>
  );
}
