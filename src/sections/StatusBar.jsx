import { useClock, formatTime } from '../hooks/useClock.js';

export function StatusBar() {
  const t = useClock();
  return (
    <div className="statusbar">
      <div className="group">
        <span className="dot"></span>
        <span>TAIROM.NET</span>
        <span>// v.1.0.6</span>
        <span style={{ color: 'var(--accent)' }}>SIGNAL LOCKED</span>
      </div>
      <div className="group">
        <span>BPM 140</span>
        <span>SR 96kHz/24</span>
        <span>{formatTime(t)}</span>
      </div>
    </div>
  );
}
