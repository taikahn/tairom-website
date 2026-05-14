import { useState } from 'react';
import { ScrambleText } from '../components/ScrambleText.jsx';
import { SectionHead } from './SectionHead.jsx';

const SECONDARY_CTA_STYLE = {
  background: 'var(--bg)',
  padding: '18px',
  textAlign: 'center',
  fontSize: '11px',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'var(--ink-dim)',
};

function SecondaryCta({ href, label }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      style={{
        ...SECONDARY_CTA_STYLE,
        color: hover ? 'var(--accent)' : SECONDARY_CTA_STYLE.color,
        transition: 'color 0.1s',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <ScrambleText hover={hover}>{label}</ScrambleText>
    </a>
  );
}

export function Releases() {
  return (
    <section className="section" id="releases">
      <SectionHead title="STREAM" meta="LIVE FEED // SOUNDCLOUD" />
      <div className="release-feature" style={{ maxWidth: '880px', margin: '0 auto' }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'var(--ink-dim)', marginBottom: '8px' }}>
          NOW PLAYING // TAIROM808
        </div>
        <iframe
          className="music-embed"
          src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/tairom808&color=%23caff00&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true"
          height="500"
          frameBorder="0"
          scrolling="no"
          allow="autoplay"
          loading="lazy"
          title="TAIROM on SoundCloud"
        ></iframe>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '1px',
            marginTop: '24px',
            background: 'var(--bg-rule)',
            border: '1px solid var(--bg-rule)',
          }}
        >
          <SecondaryCta href="https://open.spotify.com/artist/7LdLNXWskTSj6ztUnSzn38" label="SPOTIFY ↗" />
          <SecondaryCta href="https://music.apple.com/artist/1861613777" label="APPLE MUSIC ↗" />
          <SecondaryCta href="https://www.youtube.com/@tairom808" label="YOUTUBE ↗" />
        </div>
      </div>
    </section>
  );
}
