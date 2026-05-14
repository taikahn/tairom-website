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

export function Releases() {
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
          <a
            href="https://music.apple.com/artist/1861613777"
            target="_blank"
            rel="noreferrer noopener"
            style={SECONDARY_CTA_STYLE}
          >
            <ScrambleText>APPLE MUSIC ↗</ScrambleText>
          </a>
          <a
            href="https://soundcloud.com/tairom808"
            target="_blank"
            rel="noreferrer noopener"
            style={SECONDARY_CTA_STYLE}
          >
            <ScrambleText>SOUNDCLOUD ↗</ScrambleText>
          </a>
          <a
            href="https://www.youtube.com/@tairom808"
            target="_blank"
            rel="noreferrer noopener"
            style={SECONDARY_CTA_STYLE}
          >
            <ScrambleText>YOUTUBE ↗</ScrambleText>
          </a>
        </div>
      </div>
    </section>
  );
}
