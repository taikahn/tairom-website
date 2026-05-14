/* TAIROM — page sections */

const RELEASES = [
  { idx: '07', title: 'NULL_RITUAL', year: '2026', kind: 'EP', dur: '24:18' },
  { idx: '06', title: 'MIRROR / ASH', year: '2025', kind: 'SINGLE', dur: '06:42' },
  { idx: '05', title: 'TRANSMISSION 174', year: '2025', kind: 'EP', dur: '19:33' },
  { idx: '04', title: 'BLACKBOX SECTOR', year: '2024', kind: 'LP', dur: '42:07' },
  { idx: '03', title: 'GHOST FREQUENCY', year: '2024', kind: 'SINGLE', dur: '04:55' },
  { idx: '02', title: 'WIRE / WOMB', year: '2023', kind: 'EP', dur: '16:21' },
];

const SHOWS = [
  { d: '14', m: 'MAY', y: '2026', venue: 'BASEMENT', city: 'BERLIN, DE', status: 'confirmed', cta: 'TICKETS' },
  { d: '28', m: 'MAY', y: '2026', venue: 'CORSICA STUDIOS', city: 'LONDON, UK', status: 'sold', cta: 'SOLD OUT' },
  { d: '11', m: 'JUN', y: '2026', venue: 'NUITS SONORES', city: 'LYON, FR', status: 'confirmed', cta: 'TICKETS' },
  { d: 'TBA', m: '', y: '2026', venue: 'UNDISCLOSED // WAREHOUSE', city: 'BROOKLYN, US', status: 'tba', cta: 'NOTIFY ME' },
  { d: '03', m: 'OCT', y: '2026', venue: 'ATONAL', city: 'BERLIN, DE', status: 'confirmed', cta: 'TICKETS' },
];

const LINKS = [
  { num: '// 01', name: 'SPOTIFY',     handle: '@TAIROM',           href: 'https://open.spotify.com/artist/7LdLNXWskTSj6ztUnSzn38', icon: 'spotify' },
  { num: '// 02', name: 'APPLE MUSIC', handle: 'ARTIST/1861613777', href: 'https://music.apple.com/artist/1861613777',              icon: 'applemusic' },
  { num: '// 03', name: 'SOUNDCLOUD',  handle: '@TAIROM808',        href: 'https://soundcloud.com/tairom808',                       icon: 'soundcloud' },
  { num: '// 04', name: 'INSTAGRAM',   handle: '@TAIROM808',        href: 'https://www.instagram.com/tairom808',                    icon: 'instagram' },
  { num: '// 05', name: 'YOUTUBE',     handle: '@TAIROM808',        href: 'https://www.youtube.com/@tairom808',                     icon: 'youtube' },
  { num: '// 06', name: 'LINKTREE',    handle: '/TAIROM',           href: 'https://linktr.ee/tairom',                               icon: 'linktree' },
];

function Hero() {
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
        <GlitchWordmark text="TAIROM" />
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

function SectionHead({ title, meta }) {
  return (
    <div className="section-head no-num">
      <h2 className="section-title">{title}</h2>
      <div className="section-meta">{meta}</div>
    </div>
  );
}

function Releases() {
  return (
    <section className="section" id="releases">
      <SectionHead title="DISCOGRAPHY" meta="LIVE FEED // SPOTIFY" />
      <div className="release-feature" style={{ maxWidth: '880px', margin: '0 auto' }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'var(--ink-dim)', marginBottom: '8px' }}>
          STREAM // ALL RELEASES
        </div>
        <iframe
          className="spotify-embed"
          src="https://open.spotify.com/embed/artist/7LdLNXWskTSj6ztUnSzn38?utm_source=generator&theme=0"
          height="520"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="TAIROM on Spotify"
        ></iframe>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1px', marginTop: '24px', background: 'var(--bg-rule)', border: '1px solid var(--bg-rule)' }}>
          <a href="https://music.apple.com/artist/1861613777" target="_blank" rel="noreferrer noopener"
             style={{ background: 'var(--bg)', padding: '18px', textAlign: 'center', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-dim)' }}>
            <ScrambleText>APPLE MUSIC ↗</ScrambleText>
          </a>
          <a href="https://soundcloud.com/tairom808" target="_blank" rel="noreferrer noopener"
             style={{ background: 'var(--bg)', padding: '18px', textAlign: 'center', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-dim)' }}>
            <ScrambleText>SOUNDCLOUD ↗</ScrambleText>
          </a>
          <a href="https://www.youtube.com/@tairom808" target="_blank" rel="noreferrer noopener"
             style={{ background: 'var(--bg)', padding: '18px', textAlign: 'center', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-dim)' }}>
            <ScrambleText>YOUTUBE ↗</ScrambleText>
          </a>
        </div>
      </div>
    </section>
  );
}

function Transmission() {
  return (
    <section className="section" id="transmission">
      <SectionHead title="TRANSMISSION" meta="ARTIST FILE / READ-ONLY" />
      <div className="transmission">
        <div className="bio-text">
          <p>TAIROM is a transmission, not a performer — fragments of dark electronic
          music assembled in a basement, output to wax and wire and the open net.
          The work sits between industrial breakbeat, ambient drone and IDM:
          machinic rhythm pushed until it cracks, then held there.</p>
          <p>Every track is built from scratch — modular synths, tape decay,
          sampled rooms, broken hardware. No presets, no plugins of convenience.
          Releases land first on Bandcamp and SoundCloud, then propagate to the
          streaming platforms when they're ready.</p>
          <p>Live sets are improvised. The PA is the instrument. Doors at 23:00.</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="spec-card">
            <h4>SPECIMEN // SIGNAL</h4>
            <div className="spec-row"><span className="k">Genre</span><span className="v">Industrial / IDM</span></div>
            <div className="spec-row"><span className="k">Tempo Range</span><span className="v acc">140 — 200 BPM</span></div>
            <div className="spec-row"><span className="k">Tuning</span><span className="v">432 Hz</span></div>
            <div className="spec-row"><span className="k">Format</span><span className="v">DIY / Self-released</span></div>
            <div className="spec-row"><span className="k">Affiliated</span><span className="v">— none —</span></div>
          </div>
          <div className="spec-card">
            <h4>SPECIMEN // GEAR</h4>
            <div className="spec-row"><span className="k">DRUM</span><span className="v">TR-808 / DR-110</span></div>
            <div className="spec-row"><span className="k">SYNTH</span><span className="v">Mother-32 / DFAM</span></div>
            <div className="spec-row"><span className="k">FX</span><span className="v">DD-3 / Tape Echo</span></div>
            <div className="spec-row"><span className="k">DAW</span><span className="v">Ableton + Reaper</span></div>
            <div className="spec-row"><span className="k">RIG</span><span className="v acc">MODULAR LIVE</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Live() {
  return (
    <section className="section" id="live">
      <SectionHead num="// 004" title="TRANSMISSIONS LIVE" meta="UPCOMING DATES // 2026" />
      <div className="live">
        <div className="show-row head">
          <div>DATE</div><div>VENUE</div><div>LOCATION</div><div>STATUS</div><div></div>
        </div>
        {SHOWS.map((s, i) => (
          <div className="show-row" key={i}>
            <div className="show-date">
              {s.d}{s.m && <>&nbsp;{s.m}</>}
              <span className="yr">{s.y}</span>
            </div>
            <div className="show-venue"><ScrambleText>{s.venue}</ScrambleText></div>
            <div className="show-city">{s.city}</div>
            <div className={`show-status ${s.status}`}>
              {s.status === 'sold' ? 'SOLD OUT' : s.status === 'tba' ? 'TBA' : 'CONFIRMED'}
            </div>
            <div className={`show-cta ${s.status === 'sold' ? 'disabled' : ''}`}>
              {s.cta} →
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Signal() {
  return (
    <section className="section" id="signal">
      <SectionHead title="SIGNAL // CHANNELS" meta="06 OUTPUTS // ACTIVE" />
      <div className="signal-grid">
        {LINKS.map((l, i) => (
          <a key={i} href={l.href} target="_blank" rel="noreferrer noopener" className="signal-cell">
            <div className="num">{l.num}</div>
            <div className="ch-icon" style={{ WebkitMaskImage: `url(https://cdn.jsdelivr.net/npm/simple-icons@11/icons/${l.icon}.svg)`, maskImage: `url(https://cdn.jsdelivr.net/npm/simple-icons@11/icons/${l.icon}.svg)` }} aria-hidden="true"></div>
            <div className="name"><ScrambleText>{l.name}</ScrambleText></div>
            <div className="handle">{l.handle}</div>
            <div className="arrow">↗</div>
          </a>
        ))}
      </div>
    </section>
  );
}

function Booking() {
  return (
    <section className="section" id="booking">
      <SectionHead num="// 005" title="BOOKING // CONTACT" meta="OPEN CHANNEL" />
      <div className="booking">
        <div>
          <h3 className="booking-cta">OPEN<br/>FOR <span className="acc">SHOWS</span><br/>+ COLLAB</h3>
          <p className="booking-sub">
            Festivals, warehouses, dark rooms, basements. Hardware-only sets, modular live sets,
            and ambient long-form. EU + UK + US.
          </p>
        </div>
        <div className="contact-list">
          <div className="contact-row">
            <div className="k">BOOKING</div>
            <div className="v link"><ScrambleText>booking@tairom.net</ScrambleText></div>
          </div>
          <div className="contact-row">
            <div className="k">PRESS</div>
            <div className="v link"><ScrambleText>press@tairom.net</ScrambleText></div>
          </div>
          <div className="contact-row">
            <div className="k">REMIX/COLLAB</div>
            <div className="v link"><ScrambleText>signal@tairom.net</ScrambleText></div>
          </div>
          <div className="contact-row">
            <div className="k">PGP</div>
            <div className="v">9F2A · 4D11 · 80BC · E771</div>
          </div>
          <div className="contact-row">
            <div className="k">LOCATED</div>
            <div className="v">UNDISCLOSED // EU</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatusBar() {
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

function Rails() {
  return (
    <>
      <div className="rail left">
        <div className="vt">TAIROM // EXPERIMENTAL DIY ELECTRONIC</div>
        <div className="tick"></div>
        <div className="vt">EST. 2023 // BERLIN</div>
      </div>
      <div className="rail right">
        <div className="vt flip">CHANNEL 01 // OPEN TRANSMISSION</div>
        <div className="tick"></div>
        <div className="vt flip">© TAIROM ALL FREQUENCIES RESERVED</div>
      </div>
    </>
  );
}

function Foot() {
  return (
    <footer className="foot">
      <div>© TAIROM 2026</div>
      <div className="center">— END OF TRANSMISSION —</div>
      <div className="right">SITE BUILT / DIY / NO TRACKERS</div>
    </footer>
  );
}

Object.assign(window, {
  Hero, Releases, Transmission, Live, Signal, Booking, StatusBar, Rails, Foot,
});
