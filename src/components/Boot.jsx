import { useEffect, useState } from 'react';

const LINES = [
  '> tairom.sys/init...',
  '> loading transmission protocol...',
  '> bpm=140 // mode=BREAK // signal=LOCKED',
  '> establishing uplink to host...',
  '> all systems nominal',
  '> WELCOME',
];

export function Boot({ onDone }) {
  const [i, setI] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (i >= LINES.length) {
      const t = setTimeout(() => {
        setDone(true);
        onDone && onDone();
      }, 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setI(i + 1), 220);
    return () => clearTimeout(t);
  }, [i, onDone]);

  return (
    <div className={`boot ${done ? 'done' : ''}`}>
      {LINES.slice(0, i).map((l, idx) => (
        <span key={idx} className="line">{l}</span>
      ))}
      {i < LINES.length && (
        <span className="line">&gt; <span className="cursor"></span></span>
      )}
    </div>
  );
}
