import { useRef, useState } from 'react';
import { ScrambleText } from '../components/ScrambleText.jsx';
import { SectionHead } from './SectionHead.jsx';
import { ICONS } from '../icons/index.js';
import { useAutoScramble } from '../hooks/useAutoScramble.js';

const LINKS = [
  { num: '// 01', name: 'SPOTIFY',     handle: '@TAIROM',           href: 'https://open.spotify.com/artist/7LdLNXWskTSj6ztUnSzn38', icon: 'spotify' },
  { num: '// 02', name: 'APPLE MUSIC', handle: 'ARTIST/1861613777', href: 'https://music.apple.com/artist/1861613777',              icon: 'applemusic' },
  { num: '// 03', name: 'SOUNDCLOUD',  handle: '@TAIROM808',        href: 'https://soundcloud.com/tairom808',                       icon: 'soundcloud' },
  { num: '// 04', name: 'INSTAGRAM',   handle: '@TAIROM808',        href: 'https://www.instagram.com/tairom808',                    icon: 'instagram' },
  { num: '// 05', name: 'YOUTUBE',     handle: '@TAIROM808',        href: 'https://www.youtube.com/@tairom808',                     icon: 'youtube' },
  { num: '// 06', name: 'LINKTREE',    handle: '/TAIROM',           href: 'https://linktr.ee/tairom',                               icon: 'linktree' },
];

function SignalCell({ link }) {
  const ref = useRef(null);
  const [hover, setHover] = useState(false);
  const auto = useAutoScramble(ref);
  const active = hover || auto;
  return (
    <a
      ref={ref}
      href={link.href}
      target="_blank"
      rel="noreferrer noopener"
      className="signal-cell"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="num">{link.num}</div>
      <div
        className="ch-icon"
        style={{
          WebkitMaskImage: ICONS[link.icon],
          maskImage: ICONS[link.icon],
        }}
        aria-hidden="true"
      ></div>
      <div className="name"><ScrambleText hover={active}>{link.name}</ScrambleText></div>
      <div className="handle">{link.handle}</div>
      <div className="arrow">↗</div>
    </a>
  );
}

export function Signal() {
  return (
    <section className="section" id="signal">
      <SectionHead title="SIGNAL // CHANNELS" meta="06 OUTPUTS // ACTIVE" />
      <div className="signal-grid">
        {LINKS.map((l, i) => (
          <SignalCell key={i} link={l} />
        ))}
      </div>
    </section>
  );
}
