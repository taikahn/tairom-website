import { useEffect, useRef, useState } from 'react';
import { SCRAMBLE_CHARS } from '../hooks/useScramble.js';

const REVEAL_FRAME_MS = 24;
const REVEAL_START_RANGE = 8;
const REVEAL_END_MIN = 8;
const REVEAL_END_RANGE = 16;
const REVEAL_TOTAL_FRAMES = REVEAL_END_MIN + REVEAL_END_RANGE;

const TICK_MS = 180;
const BURST_MS = 700;
const BURST_MIN_DELAY = 8000;
const BURST_RANGE = 8000;

const YELLOW = '#fff700';
const UPSIDE_T_RATE = 0.33;
const YELLOW_TINT_RATE = 0.3;

function UpsideT() {
  return <span style={{ display: 'inline-block', transform: 'rotate(180deg)' }}>†</span>;
}

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function GlitchWordmark({ text, start = true }) {
  const [tick, setTick] = useState(0);
  const [revealFrame, setRevealFrame] = useState(0);
  const [revealing, setRevealing] = useState(true);
  const [burst, setBurst] = useState(false);

  const queueRef = useRef(null);
  if (queueRef.current === null) {
    queueRef.current = text.split('').map(() => ({
      start: Math.floor(Math.random() * REVEAL_START_RANGE),
      end: REVEAL_END_MIN + Math.floor(Math.random() * REVEAL_END_RANGE),
    }));
  }

  useEffect(() => {
    if (!start) return;
    if (!revealing) return;
    if (prefersReducedMotion()) {
      setRevealing(false);
      return;
    }
    if (revealFrame >= REVEAL_TOTAL_FRAMES) {
      setRevealing(false);
      return;
    }
    const id = setTimeout(() => setRevealFrame((s) => s + 1), REVEAL_FRAME_MS);
    return () => clearTimeout(id);
  }, [start, revealing, revealFrame]);

  useEffect(() => {
    if (revealing) return;
    const id = setInterval(() => setTick((s) => s + 1), TICK_MS);
    return () => clearInterval(id);
  }, [revealing]);

  useEffect(() => {
    if (revealing) return;
    if (prefersReducedMotion()) return;
    let burstTimer;
    let scheduleTimer;
    const schedule = () => {
      const delay = BURST_MIN_DELAY + Math.random() * BURST_RANGE;
      scheduleTimer = setTimeout(() => {
        setBurst(true);
        burstTimer = setTimeout(() => {
          setBurst(false);
          schedule();
        }, BURST_MS);
      }, delay);
    };
    schedule();
    return () => {
      clearTimeout(burstTimer);
      clearTimeout(scheduleTimer);
    };
  }, [revealing]);

  const showLive = !start || !revealing;

  return (
    <h1 className="wordmark wordmark-ghost">
      {text.split('').map((c, i) => {
        if (!showLive) {
          const q = queueRef.current[i];
          let glyph = c;
          let visible = true;
          let isUpsideT = false;
          let yellowTint = false;
          const isT = c.toUpperCase() === 'T';
          if (revealFrame >= q.end) {
            glyph = c;
          } else if (revealFrame >= q.start) {
            if (isT && Math.random() < UPSIDE_T_RATE) {
              isUpsideT = true;
              glyph = '†';
            } else {
              glyph = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
              yellowTint = Math.random() < YELLOW_TINT_RATE;
            }
          } else {
            visible = false;
          }
          const node = isUpsideT ? <UpsideT /> : glyph;
          const baseStyle = yellowTint ? { color: YELLOW } : undefined;
          return (
            <span
              key={i}
              className="char"
              style={{ opacity: visible ? 1 : 0 }}
              data-text={isUpsideT ? '†' : glyph}
            >
              <span className="layer base" style={baseStyle}>{node}</span>
              <span className="layer red" aria-hidden="true" style={{ opacity: 0 }}>{node}</span>
              <span className="layer cyan" aria-hidden="true" style={{ opacity: 0 }}>{node}</span>
              <span className="layer yellow" aria-hidden="true" style={{ opacity: 0 }}>{node}</span>
              <span className="layer purple" aria-hidden="true" style={{ opacity: 0 }}>{node}</span>
              <span className="layer acc" aria-hidden="true" style={{ opacity: 0 }}>{node}</span>
            </span>
          );
        }

        const r = ((tick * 31 + i * 17) % 97) / 97;
        const r2 = ((tick * 53 + i * 11) % 89) / 89;
        const r3 = ((tick * 19 + i * 23) % 79) / 79;
        const r4 = ((tick * 41 + i * 13) % 83) / 83;
        const r5 = ((tick * 67 + i * 29) % 71) / 71;
        const r6 = ((tick * 7 + i * 37) % 67) / 67;

        const heavy = r > 0.94;
        const slip = r2 > 0.96;
        const yellowHit = r3 > 0.92;
        const purpleHit = r4 > 0.92;
        const dx = heavy ? (r - 0.5) * 4 : 0;
        const dy = slip ? (r2 - 0.5) * 2 : 0;

        const r7 = ((tick * 23 + i * 41) % 73) / 73;
        const swapThreshold = burst ? 0.85 : 0.94;
        const swapRoll = r5 > swapThreshold;
        const isT = c.toUpperCase() === 'T';
        let swapped = c;
        let isUpsideT = false;
        let yellowTint = false;
        if (swapRoll) {
          if (isT && r7 < UPSIDE_T_RATE) {
            isUpsideT = true;
            swapped = '†';
          } else {
            swapped = SCRAMBLE_CHARS[(Math.floor(r5 * 137) + i * 7 + tick) % SCRAMBLE_CHARS.length];
            yellowTint = r7 > 1 - YELLOW_TINT_RATE;
          }
        }

        const dropout = r6 > 0.97;
        const dim = !dropout && r6 > 0.93;
        const charOpacity = dropout ? 0 : dim ? 0.4 : 1;
        const node = isUpsideT ? <UpsideT /> : swapped;
        const baseStyle = yellowTint ? { color: YELLOW } : undefined;

        return (
          <span
            key={i}
            className="char"
            style={{
              transform: `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px)`,
              transition: 'transform 120ms steps(2), opacity 60ms steps(2)',
              opacity: charOpacity,
            }}
            data-text={isUpsideT ? '†' : swapped}
          >
            <span className="layer base" style={baseStyle}>{node}</span>
            <span className="layer red" aria-hidden="true">{node}</span>
            <span className="layer cyan" aria-hidden="true">{node}</span>
            <span
              className="layer yellow"
              aria-hidden="true"
              style={{
                opacity: yellowHit ? 0.85 : 0,
                transform: `translate(${yellowHit ? (r3 - 0.5) * 5 : 0}px, ${yellowHit ? -1 : 0}px)`,
              }}
            >
              {node}
            </span>
            <span
              className="layer purple"
              aria-hidden="true"
              style={{
                opacity: purpleHit ? 0.85 : 0,
                transform: `translate(${purpleHit ? (r4 - 0.5) * -5 : 0}px, ${purpleHit ? 1 : 0}px)`,
              }}
            >
              {node}
            </span>
            <span className="layer acc" aria-hidden="true" style={{ opacity: heavy ? 0.7 : 0 }}>
              {node}
            </span>
          </span>
        );
      })}
    </h1>
  );
}
