// Static SVG bottle used when WebGL is unavailable (or the 3D scene fails to start).
// It is moved and tilted with CSS variables written by BottleStage.
export default function BottleFallback() {
  return (
    <div className="fallback" aria-hidden="true">
      <svg viewBox="0 0 240 360" className="fallback__svg" focusable="false">
        <defs>
          <linearGradient id="fb-glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3a302a" />
            <stop offset="0.45" stopColor="#120d0a" />
            <stop offset="1" stopColor="#2a2119" />
          </linearGradient>
          <linearGradient id="fb-gold" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#8f6c35" />
            <stop offset="0.35" stopColor="#f1dfb4" />
            <stop offset="0.7" stopColor="#c9a45c" />
            <stop offset="1" stopColor="#7c5a2a" />
          </linearGradient>
          <linearGradient id="fb-liquid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c98a2e" stopOpacity="0.85" />
            <stop offset="1" stopColor="#6b3a0a" stopOpacity="0.9" />
          </linearGradient>
          <radialGradient id="fb-floor" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#d9bd88" stopOpacity="0.28" />
            <stop offset="1" stopColor="#d9bd88" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="120" cy="338" rx="108" ry="14" fill="url(#fb-floor)" />
        <rect x="88" y="20" width="64" height="58" rx="6" fill="url(#fb-gold)" />
        <rect x="96" y="76" width="48" height="16" rx="3" fill="url(#fb-gold)" />
        <rect x="40" y="92" width="160" height="236" rx="18" fill="url(#fb-glass)" stroke="#d9bd88" strokeOpacity="0.25" />
        <rect x="56" y="118" width="128" height="190" rx="10" fill="url(#fb-liquid)" />
        <rect x="64" y="190" width="112" height="76" rx="3" fill="#0d0a08" stroke="#cdaa68" strokeWidth="1.2" />
        <text x="120" y="226" textAnchor="middle" fontFamily="Bodoni Moda Variable, Georgia, serif" fontSize="20" fill="#e3cc98" letterSpacing="3">
          NOIRÉ
        </text>
        <rect x="104" y="238" width="32" height="1" fill="#cdaa68" />
        <rect x="52" y="104" width="7" height="210" rx="3.5" fill="#fff" opacity="0.1" />
      </svg>
    </div>
  );
}
