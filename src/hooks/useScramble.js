import { useEffect, useState } from 'react';

export const SCRAMBLE_CHARS = '!<>-_\\/—=+*^?#________░▒▓█▌▐';

export function useScramble(target, active, speed = 30) {
  const [out, setOut] = useState(target);
  useEffect(() => {
    if (!active) {
      setOut(target);
      return;
    }
    let frame = 0;
    let timer;
    const queue = target.split('').map((c) => ({
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
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          output += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        } else {
          output += from;
        }
      }
      setOut(output);
      if (complete < queue.length) {
        frame++;
        timer = setTimeout(tick, speed);
      }
    };
    tick();
    return () => clearTimeout(timer);
  }, [active, target, speed]);
  return out;
}
