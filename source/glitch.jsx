/* TAIROM — utility hooks + glitch helpers */

// Scramble text effect
const SCRAMBLE_CHARS = '!<>-_\\/[]{}—=+*^?#________░▒▓█▌▐';

function useScramble(target, active, speed = 30) {
  const [out, setOut] = React.useState(target);
  React.useEffect(() => {
    if (!active) { setOut(target); return; }
    let frame = 0;
    let raf;
    const queue = target.split('').map((c, i) => ({
      from: c,
      to: c,
      start: Math.floor(Math.random() * 8),
      end: Math.floor(Math.random() * 16) + 8,
    }));
    const tick = () => {
      let output = '';
      let complete = 0;
      for (let i = 0; i < queue.length; i++) {
        const { from, to, start, end } = queue[i];
        if (frame >= end) { complete++; output += to; }
        else if (frame >= start) {
          output += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        } else { output += from; }
      }
      setOut(output);
      if (complete < queue.length) {
        frame++;
        raf = setTimeout(tick, speed);
      }
    };
    tick();
    return () => clearTimeout(raf);
  }, [active, target, speed]);
  return out;
}

function extractText(node) {
  if (node == null || node === false) return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (node.props && node.props.children != null) return extractText(node.props.children);
  return '';
}

function ScrambleText({ children, className = '', tag: Tag = 'span', ...rest }) {
  const target = extractText(children);
  const [hover, setHover] = React.useState(false);
  const text = useScramble(target, hover, 24);
  return (
    <Tag
      className={`scramble ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...rest}
    >
      {text}
    </Tag>
  );
}

// Glitching wordmark — semi-transparent ghost text + RGB-split layers + occasional jitter + letter swaps + dropouts
function GlitchWordmark({ text }) {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setTick(s => s + 1), 180);
    return () => clearInterval(id);
  }, []);
  // leetspeak / mirror-style swaps; weighted so most ticks render the original char
  const swaps = {
    O: ['0', 'Ø', 'O', 'O', 'O', 'O'],
    A: ['4', '/\\', 'A', 'A', 'A', 'A'],
    I: ['1', '|', 'I', 'I', 'I', 'I'],
    R: ['Я', 'R', 'R', 'R', 'R', 'R'],
    T: ['T', 'T', 'T', 'T', 'T', '__UPSIDE_T__'],
  };
  return (
    <h1 className="wordmark wordmark-ghost">
      {text.split('').map((c, i) => {
        const r = ((tick * 31 + i * 17) % 97) / 97;
        const r2 = ((tick * 53 + i * 11) % 89) / 89;
        const r3 = ((tick * 19 + i * 23) % 79) / 79;
        const r4 = ((tick * 41 + i * 13) % 83) / 83;
        const r5 = ((tick * 67 + i * 29) % 71) / 71;  // swap roll
        const r6 = ((tick * 7  + i * 37) % 67) / 67;  // dropout roll
        const heavy = r > 0.92;
        const slip = r2 > 0.94;
        const yellowHit = r3 > 0.88;
        const purpleHit = r4 > 0.86;
        const dx = heavy ? (r - 0.5) * 6 : 0;
        const dy = slip ? (r2 - 0.5) * 3 : 0;
        // letter swap (~12% of ticks for swappable letters)
        const variants = swaps[c.toUpperCase()];
        const swapped = (variants && r5 > 0.88)
          ? variants[Math.floor(r5 * variants.length) % variants.length]
          : c;
        // letter dropout: rare full vanish (~5% of ticks per char) + softer dim flicker
        const dropout = r6 > 0.95;
        const dim = !dropout && r6 > 0.88;
        const charOpacity = dropout ? 0 : (dim ? 0.35 : 1);
        const isUpsideT = swapped === '__UPSIDE_T__';
        const renderChar = isUpsideT
          ? <span style={{ display: 'inline-block', transform: 'rotate(180deg)' }}>†</span>
          : swapped;
        const dataText = isUpsideT ? '†' : swapped;
        return (
          <span
            key={i}
            className="char"
            style={{
              transform: `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px)`,
              transition: 'transform 120ms steps(2), opacity 60ms steps(2)',
              opacity: charOpacity,
            }}
            data-text={dataText}
          >
            <span className="layer base">{renderChar}</span>
            <span className="layer red"  aria-hidden="true">{renderChar}</span>
            <span className="layer cyan" aria-hidden="true">{renderChar}</span>
            <span className="layer yellow" aria-hidden="true"
                  style={{ opacity: yellowHit ? 0.85 : 0,
                           transform: `translate(${yellowHit ? (r3 - 0.5) * 6 : 0}px, ${yellowHit ? -1 : 0}px)` }}>{renderChar}</span>
            <span className="layer purple" aria-hidden="true"
                  style={{ opacity: purpleHit ? 0.85 : 0,
                           transform: `translate(${purpleHit ? (r4 - 0.5) * -6 : 0}px, ${purpleHit ? 1 : 0}px)` }}>{renderChar}</span>
            <span className="layer acc"  aria-hidden="true" style={{ opacity: heavy ? 0.7 : 0 }}>{renderChar}</span>
          </span>
        );
      })}
    </h1>
  );
}

// Live time readout
function useClock() {
  const [t, setT] = React.useState(() => new Date());
  React.useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

function pad(n, w = 2) { return String(n).padStart(w, '0'); }

function formatTime(d) {
  return `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} UTC`;
}

// Sigil — central rotating frame artwork built from SVG
function Sigil() {
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    let raf;
    const tick = () => { setT(p => p + 0.005); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const rot = (t * 60) % 360;
  const pulse = 1 + Math.sin(t * 2) * 0.04;
  // Helper for inverted pentagram path
  const pentagram = (r) => {
    const pts = [];
    for (let i = 0; i < 5; i++) {
      const a = (Math.PI / 2) + i * (2 * Math.PI / 5) * 2;
      pts.push([Math.cos(a) * r, Math.sin(a) * r]);
    }
    return pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(2)},${p[1].toFixed(2)}`).join(' ') + ' Z';
  };
  // Big tick marks around outer ring
  const ticks = Array.from({ length: 60 }, (_, i) => {
    const a = (i / 60) * Math.PI * 2;
    const long = i % 5 === 0;
    const r1 = long ? 110 : 114;
    const r2 = long ? 122 : 118;
    return (
      <line key={i}
        x1={Math.cos(a) * r1} y1={Math.sin(a) * r1}
        x2={Math.cos(a) * r2} y2={Math.sin(a) * r2}
        stroke={long ? 'var(--accent)' : 'rgba(232,230,223,0.3)'}
        strokeWidth={long ? '0.7' : '0.3'}
        opacity={long ? 0.9 : 0.6} />
    );
  });
  // Outer crosshair brackets at 4 cardinal points
  const Bracket = ({ angle }) => (
    <g transform={`rotate(${angle})`}>
      <path d="M -8,-130 L 0,-130 L 0,-122 M 0,-130 L 8,-130 L 8,-122"
            fill="none" stroke="var(--accent)" strokeWidth="0.8" opacity="0.85" />
    </g>
  );
  // Glyph markers at 8 points on the outer ring
  const glyphs = ['◊', '✕', '▲', '◯', '◊', '✕', '▲', '◯'];
  const glyphRing = glyphs.map((g, i) => {
    const a = (i / 8) * 360;
    return (
      <g key={i} transform={`rotate(${a}) translate(0, -98)`}>
        <text fontSize="6.5" fill="var(--ink-dim)" textAnchor="middle"
              fontFamily="var(--mono)" transform={`rotate(${-a - rot * 0.3})`}>{g}</text>
      </g>
    );
  });
  return (
    <svg className="hero-sigil" viewBox="-140 -140 280 280" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="hatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform={`rotate(${rot * 0.2})`}>
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
        <filter id="sigil-flicker">
          <feTurbulence baseFrequency="0.9" numOctaves="2" seed={Math.floor(t * 8) % 100} />
          <feDisplacementMap in="SourceGraphic" scale="0.6" />
        </filter>
      </defs>

      {/* Atmospheric backdrops */}
      <circle cx="0" cy="0" r="135" fill="url(#sigil-glow)" />
      <circle cx="0" cy="0" r="120" fill="url(#sigil-violet)" opacity="0.85" />
      <g style={{ transform: `scale(${pulse})`, transformOrigin: '0 0' }}>
        <circle cx="0" cy="0" r="80" fill="url(#sigil-blood)" opacity="0.45" />
      </g>

      {/* Outer tick ring + crosshair brackets, counter-rotating */}
      <g transform={`rotate(${-rot * 0.15})`}>
        <circle cx="0" cy="0" r="125" fill="none" stroke="rgba(232,230,223,0.18)" strokeWidth="0.4" />
        <circle cx="0" cy="0" r="116" fill="none" stroke="rgba(232,230,223,0.08)" strokeWidth="0.3" />
        {ticks}
        <Bracket angle={0} />
        <Bracket angle={90} />
        <Bracket angle={180} />
        <Bracket angle={270} />
      </g>

      {/* Glyph ring */}
      <g transform={`rotate(${rot * 0.3})`}>
        {glyphRing}
      </g>

      {/* Mid ring with text label — full circular path so all letters render */}
      <defs>
        <path id="sigil-curve-outer" d="M 89,0 A 89,89 0 1 1 -89,0 A 89,89 0 1 1 89,0" />
      </defs>
      <g transform={`rotate(${rot * 0.4})`}>
        <circle cx="0" cy="0" r="92" fill="none" stroke="rgba(180,108,255,0.4)" strokeWidth="0.5" />
        <circle cx="0" cy="0" r="86" fill="none" stroke="rgba(180,108,255,0.18)" strokeWidth="0.3" strokeDasharray="1 3" />
        <text fontSize="4.6" fill="var(--violet)" letterSpacing="2.4" fontFamily="var(--mono)" opacity="0.8">
          <textPath href="#sigil-curve-outer" startOffset="0">
            TAIROM // SIGNAL LOCKED // FREQ 140.0 // CHANNEL 01 // EXPERIMENTAL DIY // INDUSTRIAL // BREAK // IDM // ∞ //&#160;
          </textPath>
        </text>
      </g>

      {/* Hatched core — counter rotation */}
      <g transform={`rotate(${rot * 0.3})`}>
        <circle cx="0" cy="0" r="78" fill="none" stroke="rgba(232,230,223,0.12)" strokeWidth="0.3" strokeDasharray="2 4" />
        <circle cx="0" cy="0" r="60" fill="url(#hatch)" />
        <circle cx="0" cy="0" r="60" fill="none" stroke="var(--accent)" strokeWidth="0.6" opacity="0.5" />
        {[0, 60, 120, 180, 240, 300].map((a, i) => (
          <line key={i} x1="0" y1="0" x2={Math.cos(a * Math.PI / 180) * 92}
                y2={Math.sin(a * Math.PI / 180) * 92}
                stroke="rgba(232,230,223,0.08)" strokeWidth="0.3" />
        ))}
      </g>

      {/* Triangles — opposing */}
      <g transform={`rotate(${-rot * 0.6})`}>
        <polygon points="0,-44 38,22 -38,22" fill="none" stroke="var(--accent)" strokeWidth="0.8" opacity="0.85" />
        <polygon points="0,44 38,-22 -38,-22" fill="none" stroke="var(--violet)" strokeWidth="0.6" opacity="0.85" />
      </g>

      {/* Inverted pentagram — main + chromatic-aberration siblings */}
      <g transform={`rotate(${rot * 0.15})`} style={{ transform: `rotate(${rot * 0.15}deg) scale(${pulse})`, transformOrigin: '0 0' }}>
        <circle cx="0" cy="0" r="52" fill="none" stroke="var(--accent)" strokeWidth="0.6" opacity="0.7" />
        <circle cx="0" cy="0" r="46" fill="none" stroke="rgba(232,230,223,0.18)" strokeWidth="0.3" strokeDasharray="2 2" />
        <path d={pentagram(52)} fill="none" stroke="var(--violet)" strokeWidth="0.7" opacity="0.7" transform="translate(1.6,0)" />
        <path d={pentagram(52)} fill="none" stroke="rgba(60,220,220,0.55)" strokeWidth="0.5" transform="translate(-1.4,0)" />
        <path d={pentagram(52)} fill="none" stroke="var(--accent)" strokeWidth="1.2" strokeLinejoin="miter" />
        <path d={pentagram(34)} fill="none" stroke="var(--violet)" strokeWidth="0.4" opacity="0.6" />
      </g>

      {/* Center reticle */}
      <g>
        <line x1="-10" y1="0" x2="10" y2="0" stroke="var(--accent)" strokeWidth="0.4" opacity="0.7" />
        <line x1="0" y1="-10" x2="0" y2="10" stroke="var(--accent)" strokeWidth="0.4" opacity="0.7" />
        <circle cx="0" cy="0" r="3" fill="var(--accent)" />
        <circle cx="0" cy="0" r="5.5" fill="none" stroke="var(--violet)" strokeWidth="0.4" opacity="0.7" />
      </g>

      {/* Sigil ID labels */}
      <text x="0" y="-110" fontSize="4.5" textAnchor="middle" fill="var(--accent)"
            fontFamily="var(--mono)" letterSpacing="1.5" opacity="0.7">SIGIL.001</text>
      <text x="0" y="115" fontSize="4.5" textAnchor="middle" fill="var(--violet)"
            fontFamily="var(--mono)" letterSpacing="2" opacity="0.8">∞ TRANSMISSION ∞</text>
    </svg>
  );
}

// Studio-headphones — technical orthographic line art, fits inside ~±20 unit box
function Headphones({ stroke, sw }) {
  return (
    <g fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="butt" strokeLinejoin="miter" shapeRendering="geometricPrecision">
      {/* headband — concentric arcs */}
      <path d="M -14,-3 A 14,14 0 0 1 14,-3" />
      <path d="M -12.5,-3 A 12.5,12.5 0 0 1 12.5,-3" opacity="0.55" />
      {/* adjustment notches on top of band */}
      <line x1="-9" y1="-13.6" x2="-9" y2="-12.2" opacity="0.6" />
      <line x1="-4.5" y1="-13.95" x2="-4.5" y2="-12.55" opacity="0.6" />
      <line x1="0" y1="-14" x2="0" y2="-12.6" opacity="0.6" />
      <line x1="4.5" y1="-13.95" x2="4.5" y2="-12.55" opacity="0.6" />
      <line x1="9" y1="-13.6" x2="9" y2="-12.2" opacity="0.6" />
      {/* construction line — center axis */}
      <line x1="0" y1="-15" x2="0" y2="14" opacity="0.25" strokeDasharray="0.6 0.8" />

      {/* LEFT yoke */}
      <line x1="-14" y1="-3" x2="-14" y2="-1" />
      <line x1="-15.4" y1="-1" x2="-12.6" y2="-1" />
      <line x1="-15.4" y1="-1" x2="-15.4" y2="2" />
      <line x1="-12.6" y1="-1" x2="-12.6" y2="2" />
      {/* LEFT earcup — outer rect, inner driver, axis crosshair */}
      <rect x="-18" y="2" width="8" height="11" />
      <rect x="-16.5" y="3.5" width="5" height="8" opacity="0.7" />
      <circle cx="-14" cy="7.5" r="1.6" opacity="0.85" />
      <circle cx="-14" cy="7.5" r="0.5" />
      <line x1="-14" y1="3.5" x2="-14" y2="11.5" opacity="0.3" strokeDasharray="0.6 0.8" />
      <line x1="-16.5" y1="7.5" x2="-11.5" y2="7.5" opacity="0.3" strokeDasharray="0.6 0.8" />
      {/* dimension tick under left cup */}
      <line x1="-18" y1="14" x2="-10" y2="14" opacity="0.5" />
      <line x1="-18" y1="13.6" x2="-18" y2="14.4" opacity="0.5" />
      <line x1="-10" y1="13.6" x2="-10" y2="14.4" opacity="0.5" />

      {/* RIGHT yoke */}
      <line x1="14" y1="-3" x2="14" y2="-1" />
      <line x1="12.6" y1="-1" x2="15.4" y2="-1" />
      <line x1="12.6" y1="-1" x2="12.6" y2="2" />
      <line x1="15.4" y1="-1" x2="15.4" y2="2" />
      {/* RIGHT earcup */}
      <rect x="10" y="2" width="8" height="11" />
      <rect x="11.5" y="3.5" width="5" height="8" opacity="0.7" />
      <circle cx="14" cy="7.5" r="1.6" opacity="0.85" />
      <circle cx="14" cy="7.5" r="0.5" />
      <line x1="14" y1="3.5" x2="14" y2="11.5" opacity="0.3" strokeDasharray="0.6 0.8" />
      <line x1="11.5" y1="7.5" x2="16.5" y2="7.5" opacity="0.3" strokeDasharray="0.6 0.8" />

      {/* cable — short straight drop with strain relief */}
      <line x1="-14" y1="13" x2="-14" y2="16.5" opacity="0.7" />
      <line x1="-14.6" y1="16.5" x2="-13.4" y2="16.5" opacity="0.7" />

      {/* L / R tags + part number */}
      <text x="-19.4" y="3" fontSize="1.6" fill={stroke} stroke="none"
            fontFamily="var(--mono)" letterSpacing="0.3" opacity="0.7" textAnchor="end">L</text>
      <text x="19.4" y="3" fontSize="1.6" fill={stroke} stroke="none"
            fontFamily="var(--mono)" letterSpacing="0.3" opacity="0.7">R</text>
      <text x="0" y="-15.6" fontSize="1.5" fill={stroke} stroke="none"
            fontFamily="var(--mono)" letterSpacing="0.4" opacity="0.55" textAnchor="middle">MDR-01</text>
    </g>
  );
}

Object.assign(window, { Headphones });
function Boot({ onDone }) {
  const lines = [
    '> tairom.sys/init...',
    '> loading transmission protocol...',
    '> bpm=140 // mode=BREAK // signal=LOCKED',
    '> establishing uplink to host...',
    '> all systems nominal',
    '> WELCOME',
  ];
  const [i, setI] = React.useState(0);
  const [done, setDone] = React.useState(false);
  React.useEffect(() => {
    if (i >= lines.length) {
      const t = setTimeout(() => { setDone(true); onDone && onDone(); }, 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setI(i + 1), 220);
    return () => clearTimeout(t);
  }, [i]);
  return (
    <div className={`boot ${done ? 'done' : ''}`}>
      {lines.slice(0, i).map((l, idx) => (
        <span key={idx} className="line">{l}</span>
      ))}
      {i < lines.length && <span className="line">&gt; <span className="cursor"></span></span>}
    </div>
  );
}

Object.assign(window, {
  useScramble, ScrambleText, GlitchWordmark, useClock, formatTime, pad, Sigil, Boot,
});
