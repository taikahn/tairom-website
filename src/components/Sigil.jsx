import { useEffect, useState } from 'react';

export function Sigil() {
  const [t, setT] = useState(0);
  useEffect(() => {
    let raf;
    const tick = () => {
      setT((p) => p + 0.005);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const rot = (t * 60) % 360;
  const pulse = 1 + Math.sin(t * 2) * 0.04;

  const pentagram = (r) => {
    const pts = [];
    for (let i = 0; i < 5; i++) {
      const a = Math.PI / 2 + i * (2 * Math.PI / 5) * 2;
      pts.push([Math.cos(a) * r, Math.sin(a) * r]);
    }
    return pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' ') + ' Z';
  };

  const ticks = Array.from({ length: 60 }, (_, i) => {
    const a = (i / 60) * Math.PI * 2;
    const long = i % 5 === 0;
    const r1 = long ? 110 : 114;
    const r2 = long ? 122 : 118;
    return (
      <line
        key={i}
        x1={Math.cos(a) * r1}
        y1={Math.sin(a) * r1}
        x2={Math.cos(a) * r2}
        y2={Math.sin(a) * r2}
        stroke={long ? 'var(--accent)' : 'rgba(232,230,223,0.3)'}
        strokeWidth={long ? '0.7' : '0.3'}
        opacity={long ? 0.9 : 0.6}
      />
    );
  });

  const Bracket = ({ angle }) => (
    <g transform={`rotate(${angle})`}>
      <path
        d="M -8,-130 L 0,-130 L 0,-122 M 0,-130 L 8,-130 L 8,-122"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="0.8"
        opacity="0.85"
      />
    </g>
  );

  const glyphs = ['◊', '✕', '▲', '◯', '◊', '✕', '▲', '◯'];
  const glyphRing = glyphs.map((g, i) => {
    const a = (i / 8) * 360;
    return (
      <g key={i} transform={`rotate(${a}) translate(0, -98)`}>
        <text
          fontSize="6.5"
          fill="var(--ink-dim)"
          textAnchor="middle"
          fontFamily="var(--mono)"
          transform={`rotate(${-a - rot * 0.3})`}
        >
          {g}
        </text>
      </g>
    );
  });

  return (
    <svg className="hero-sigil" viewBox="-140 -140 280 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern
          id="hatch"
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
          patternTransform={`rotate(${rot * 0.2})`}
        >
          <line x1="0" y1="0" x2="0" y2="4" stroke="rgba(232,230,223,0.18)" strokeWidth="0.5" />
        </pattern>
        <radialGradient id="sigil-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.18" />
          <stop offset="55%" stopColor="var(--accent)" stopOpacity="0.04" />
          <stop offset="100%" stopColor="var(--bg)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sigil-blood" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--signal)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--bg)" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sigil-violet" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--violet)" stopOpacity="0.22" />
          <stop offset="60%" stopColor="var(--violet)" stopOpacity="0.05" />
          <stop offset="100%" stopColor="var(--bg)" stopOpacity="0" />
        </radialGradient>
        <path id="sigil-curve-outer" d="M 89,0 A 89,89 0 1 1 -89,0 A 89,89 0 1 1 89,0" />
      </defs>

      <circle cx="0" cy="0" r="135" fill="url(#sigil-glow)" />
      <circle cx="0" cy="0" r="120" fill="url(#sigil-violet)" opacity="0.85" />
      <g style={{ transform: `scale(${pulse})`, transformOrigin: '0 0' }}>
        <circle cx="0" cy="0" r="80" fill="url(#sigil-blood)" opacity="0.45" />
      </g>

      <g transform={`rotate(${-rot * 0.15})`}>
        <circle cx="0" cy="0" r="125" fill="none" stroke="rgba(232,230,223,0.18)" strokeWidth="0.4" />
        <circle cx="0" cy="0" r="116" fill="none" stroke="rgba(232,230,223,0.08)" strokeWidth="0.3" />
        {ticks}
        <Bracket angle={0} />
        <Bracket angle={90} />
        <Bracket angle={180} />
        <Bracket angle={270} />
      </g>

      <g transform={`rotate(${rot * 0.3})`}>{glyphRing}</g>

      <g transform={`rotate(${rot * 0.4})`}>
        <circle cx="0" cy="0" r="92" fill="none" stroke="rgba(180,108,255,0.4)" strokeWidth="0.5" />
        <circle
          cx="0"
          cy="0"
          r="86"
          fill="none"
          stroke="rgba(180,108,255,0.18)"
          strokeWidth="0.3"
          strokeDasharray="1 3"
        />
        <text fontSize="4.6" fill="var(--violet)" letterSpacing="2.4" fontFamily="var(--mono)" opacity="0.8">
          <textPath href="#sigil-curve-outer" startOffset="0">
            {'TAIROM // SIGNAL LOCKED // FREQ 140.0 // CHANNEL 01 // EXPERIMENTAL DIY // INDUSTRIAL // BREAK // IDM // ∞ //  '}
          </textPath>
        </text>
      </g>

      <g transform={`rotate(${rot * 0.3})`}>
        <circle
          cx="0"
          cy="0"
          r="78"
          fill="none"
          stroke="rgba(232,230,223,0.12)"
          strokeWidth="0.3"
          strokeDasharray="2 4"
        />
        <circle cx="0" cy="0" r="60" fill="url(#hatch)" />
        <circle cx="0" cy="0" r="60" fill="none" stroke="var(--accent)" strokeWidth="0.6" opacity="0.5" />
        {[0, 60, 120, 180, 240, 300].map((a, i) => (
          <line
            key={i}
            x1="0"
            y1="0"
            x2={Math.cos((a * Math.PI) / 180) * 92}
            y2={Math.sin((a * Math.PI) / 180) * 92}
            stroke="rgba(232,230,223,0.08)"
            strokeWidth="0.3"
          />
        ))}
      </g>

      <g transform={`rotate(${-rot * 0.6})`}>
        <polygon points="0,-44 38,22 -38,22" fill="none" stroke="var(--accent)" strokeWidth="0.8" opacity="0.85" />
        <polygon points="0,44 38,-22 -38,-22" fill="none" stroke="var(--violet)" strokeWidth="0.6" opacity="0.85" />
      </g>

      <g style={{ transform: `rotate(${rot * 0.15}deg) scale(${pulse})`, transformOrigin: '0 0' }}>
        <circle cx="0" cy="0" r="52" fill="none" stroke="var(--accent)" strokeWidth="0.6" opacity="0.7" />
        <circle
          cx="0"
          cy="0"
          r="46"
          fill="none"
          stroke="rgba(232,230,223,0.18)"
          strokeWidth="0.3"
          strokeDasharray="2 2"
        />
        <path d={pentagram(52)} fill="none" stroke="var(--violet)" strokeWidth="0.7" opacity="0.7" transform="translate(1.6,0)" />
        <path d={pentagram(52)} fill="none" stroke="rgba(60,220,220,0.55)" strokeWidth="0.5" transform="translate(-1.4,0)" />
        <path d={pentagram(52)} fill="none" stroke="var(--accent)" strokeWidth="1.2" strokeLinejoin="miter" />
        <path d={pentagram(34)} fill="none" stroke="var(--violet)" strokeWidth="0.4" opacity="0.6" />
      </g>

      <g>
        <line x1="-10" y1="0" x2="10" y2="0" stroke="var(--accent)" strokeWidth="0.4" opacity="0.7" />
        <line x1="0" y1="-10" x2="0" y2="10" stroke="var(--accent)" strokeWidth="0.4" opacity="0.7" />
        <circle cx="0" cy="0" r="3" fill="var(--accent)" />
        <circle cx="0" cy="0" r="5.5" fill="none" stroke="var(--violet)" strokeWidth="0.4" opacity="0.7" />
      </g>

      <text
        x="0"
        y="-110"
        fontSize="4.5"
        textAnchor="middle"
        fill="var(--accent)"
        fontFamily="var(--mono)"
        letterSpacing="1.5"
        opacity="0.7"
      >
        SIGIL.001
      </text>
      <text
        x="0"
        y="115"
        fontSize="4.5"
        textAnchor="middle"
        fill="var(--violet)"
        fontFamily="var(--mono)"
        letterSpacing="2"
        opacity="0.8"
      >
        ∞ TRANSMISSION ∞
      </text>
    </svg>
  );
}
