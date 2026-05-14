import { ScrambleText } from '../components/ScrambleText.jsx';
import { SectionHead } from './SectionHead.jsx';
import { ICONS } from '../icons/index.js';

const LINKS = [
  { num: '// 01', name: 'SPOTIFY',     handle: '@TAIROM',           href: 'https://open.spotify.com/artist/7LdLNXWskTSj6ztUnSzn38', icon: 'spotify' },
  { num: '// 02', name: 'APPLE MUSIC', handle: 'ARTIST/1861613777', href: 'https://music.apple.com/artist/1861613777',              icon: 'applemusic' },
  { num: '// 03', name: 'SOUNDCLOUD',  handle: '@TAIROM808',        href: 'https://soundcloud.com/tairom808',                       icon: 'soundcloud' },
  { num: '// 04', name: 'INSTAGRAM',   handle: '@TAIROM808',        href: 'https://www.instagram.com/tairom808',                    icon: 'instagram' },
  { num: '// 05', name: 'YOUTUBE',     handle: '@TAIROM808',        href: 'https://www.youtube.com/@tairom808',                     icon: 'youtube' },
  { num: '// 06', name: 'LINKTREE',    handle: '/TAIROM',           href: 'https://linktr.ee/tairom',                               icon: 'linktree' },
];

export function Signal() {
  return (
    <section className="section" id="signal">
      <SectionHead title="SIGNAL // CHANNELS" meta="06 OUTPUTS // ACTIVE" />
      <div className="signal-grid">
        {LINKS.map((l, i) => (
          <a key={i} href={l.href} target="_blank" rel="noreferrer noopener" className="signal-cell">
            <div className="num">{l.num}</div>
            <div
              className="ch-icon"
              style={{
                WebkitMaskImage: ICONS[l.icon],
                maskImage: ICONS[l.icon],
              }}
              aria-hidden="true"
            ></div>
            <div className="name"><ScrambleText>{l.name}</ScrambleText></div>
            <div className="handle">{l.handle}</div>
            <div className="arrow">↗</div>
          </a>
        ))}
      </div>
    </section>
  );
}
