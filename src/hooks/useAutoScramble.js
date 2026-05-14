import { useEffect, useState } from 'react';

const PULSE_MS = 700;
const REVEAL_THRESHOLD = 0.3;
const IDLE_MIN_MS = 8000;
const IDLE_RANGE_MS = 8000;

export function useAutoScramble(ref) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let pulseTimer;
    let idleTimer;
    let alive = true;

    const pulse = () => {
      if (!alive) return;
      setActive(true);
      pulseTimer = setTimeout(() => {
        if (alive) setActive(false);
      }, PULSE_MS);
    };

    const scheduleIdle = () => {
      const delay = IDLE_MIN_MS + Math.random() * IDLE_RANGE_MS;
      idleTimer = setTimeout(() => {
        if (!alive) return;
        pulse();
        scheduleIdle();
      }, delay);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        pulse();
        scheduleIdle();
      },
      { threshold: REVEAL_THRESHOLD }
    );
    observer.observe(node);

    return () => {
      alive = false;
      observer.disconnect();
      clearTimeout(pulseTimer);
      clearTimeout(idleTimer);
    };
  }, [ref]);

  return active;
}
