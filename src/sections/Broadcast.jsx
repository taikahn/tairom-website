import { useRef, useState } from 'react';
import { ScrambleText } from '../components/ScrambleText.jsx';
import { SectionHead } from './SectionHead.jsx';
import { useAutoScramble } from '../hooks/useAutoScramble.js';

const CHANNEL_URL = 'https://www.youtube.com/@tairom808';
const SUBSCRIBE_URL = 'https://www.youtube.com/@tairom808?sub_confirmation=1';

const FEATURED = {
  id: 'pcHFrvgZ1Kg',
  title: 'OP-XY // DAWLESS JAM // TENSE MINIMALIST TECHNO',
};

const RECENT = [
  { num: '// 02', id: 'DSRv_ueSy68', title: 'WEIRD ELECTRO GLITCH // DAWLESS LIVE JAM', dur: '4:41' },
  { num: '// 03', id: 'PPlTSDMscfM', title: 'OP-XY + KAOSS PAD // AMBIENT TECHNO',     dur: '6:31' },
  { num: '// 04', id: 'GGlISzkB7Hk', title: 'AMBIENT BEATS // DAWLESS LIVE SEQUENCE',   dur: '10:31' },
];

function embedSrc(id, autoplay = false) {
  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    color: 'white',
    ...(autoplay ? { autoplay: '1' } : {}),
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

function BroadcastCell({ video }) {
  const ref = useRef(null);
  const [hover, setHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const auto = useAutoScramble(ref);
  const active = hover || auto;

  if (playing) {
    return (
      <iframe
        className="broadcast-video"
        src={embedSrc(video.id, true)}
        title={video.title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <div
      ref={ref}
      className="broadcast-cell"
      onClick={() => setPlaying(true)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ backgroundImage: `url(https://i.ytimg.com/vi/${video.id}/hqdefault.jpg)` }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPlaying(true); } }}
    >
      <div className="b-num">{video.num}</div>
      <div className="b-dur">{video.dur}</div>
      <div className="b-play" aria-hidden="true">▶</div>
      <div className="b-title"><ScrambleText hover={active}>{video.title}</ScrambleText></div>
    </div>
  );
}

function SubscribeCta() {
  const ref = useRef(null);
  const [hover, setHover] = useState(false);
  const auto = useAutoScramble(ref);
  const active = hover || auto;
  return (
    <a
      ref={ref}
      href={SUBSCRIBE_URL}
      target="_blank"
      rel="noreferrer noopener"
      className="broadcast-subscribe"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <ScrambleText hover={active}>SUBSCRIBE // @TAIROM808 ↗</ScrambleText>
    </a>
  );
}

export function Broadcast() {
  return (
    <section className="section" id="broadcast">
      <SectionHead title="BROADCAST // YOUTUBE" meta="LATEST UPLOADS // @TAIROM808" />
      <div className="release-feature broadcast-feature" style={{ maxWidth: '880px', margin: '0 auto' }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'var(--ink-dim)', marginBottom: '8px' }}>
          CHANNEL // TAIROM808
        </div>
        <iframe
          className="broadcast-video"
          src={embedSrc(FEATURED.id)}
          title={FEATURED.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
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
          {RECENT.map((v) => (
            <BroadcastCell key={v.id} video={v} />
          ))}
        </div>
        <SubscribeCta />
      </div>
    </section>
  );
}
