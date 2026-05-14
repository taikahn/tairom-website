import { useEffect, useState } from 'react';

const SWAPS = {
  O: ['0', 'Ø', 'O', 'O', 'O', 'O'],
  A: ['4', '/\\', 'A', 'A', 'A', 'A'],
  I: ['1', '|', 'I', 'I', 'I', 'I'],
  R: ['Я', 'R', 'R', 'R', 'R', 'R'],
  T: ['T', 'T', 'T', 'T', 'T', '__UPSIDE_T__'],
};

export function GlitchWordmark({ text }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((s) => s + 1), 180);
    return () => clearInterval(id);
  }, []);

  return (
    <h1 className="wordmark wordmark-ghost">
      {text.split('').map((c, i) => {
        const r = ((tick * 31 + i * 17) % 97) / 97;
        const r2 = ((tick * 53 + i * 11) % 89) / 89;
        const r3 = ((tick * 19 + i * 23) % 79) / 79;
        const r4 = ((tick * 41 + i * 13) % 83) / 83;
        const r5 = ((tick * 67 + i * 29) % 71) / 71;
        const r6 = ((tick * 7 + i * 37) % 67) / 67;
        const heavy = r > 0.92;
        const slip = r2 > 0.94;
        const yellowHit = r3 > 0.88;
        const purpleHit = r4 > 0.86;
        const dx = heavy ? (r - 0.5) * 6 : 0;
        const dy = slip ? (r2 - 0.5) * 3 : 0;
        const variants = SWAPS[c.toUpperCase()];
        const swapped = variants && r5 > 0.88
          ? variants[Math.floor(r5 * variants.length) % variants.length]
          : c;
        const dropout = r6 > 0.95;
        const dim = !dropout && r6 > 0.88;
        const charOpacity = dropout ? 0 : dim ? 0.35 : 1;
        const isUpsideT = swapped === '__UPSIDE_T__';
        const renderChar = isUpsideT ? (
          <span style={{ display: 'inline-block', transform: 'rotate(180deg)' }}>†</span>
        ) : (
          swapped
        );
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
            <span className="layer red" aria-hidden="true">{renderChar}</span>
            <span className="layer cyan" aria-hidden="true">{renderChar}</span>
            <span
              className="layer yellow"
              aria-hidden="true"
              style={{
                opacity: yellowHit ? 0.85 : 0,
                transform: `translate(${yellowHit ? (r3 - 0.5) * 6 : 0}px, ${yellowHit ? -1 : 0}px)`,
              }}
            >
              {renderChar}
            </span>
            <span
              className="layer purple"
              aria-hidden="true"
              style={{
                opacity: purpleHit ? 0.85 : 0,
                transform: `translate(${purpleHit ? (r4 - 0.5) * -6 : 0}px, ${purpleHit ? 1 : 0}px)`,
              }}
            >
              {renderChar}
            </span>
            <span className="layer acc" aria-hidden="true" style={{ opacity: heavy ? 0.7 : 0 }}>
              {renderChar}
            </span>
          </span>
        );
      })}
    </h1>
  );
}
