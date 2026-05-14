import { useClock, formatTime } from '../hooks/useClock.js';
import { GlitchWordmark } from '../components/GlitchWordmark.jsx';
import { Sigil } from '../components/Sigil.jsx';

export function Hero({ bootDone = true }) {
  const t = useClock();
  return (
    <section className="hero" id="hero">
      <div className="hero-grid-overlay"></div>
      <Sigil />
      <div className="hero-readout">
        <span className="row">SIGNAL <span className="val">●●● LOCKED</span></span>
        <span className="row">FREQ <span className="val">140.0 BPM</span></span>
        <span className="row">MODE <span className="val">BREAK / IDM</span></span>
        <span className="row">{formatTime(t)}</span>
      </div>
      <div className="wordmark-wrap">
        <GlitchWordmark text="TAIROM" start={bootDone} />
        <div className="tagline-row">
          <div className="tagline">
            <strong>EXPERIMENTAL DIY</strong> &nbsp;//&nbsp; DARK ELECTRONIC INDUSTRIAL BREAKBEATS &nbsp;//&nbsp; AMBIENT &nbsp;//&nbsp; IDM
          </div>
          <div className="bpm">
            <span className="num">140</span>
            <span className="lbl">BPM AVG</span>
          </div>
          <div className="bpm">
            <span className="num">07</span>
            <span className="lbl">RELEASES</span>
          </div>
        </div>
      </div>
    </section>
  );
}
