import { useState } from 'react';
import { Boot } from './components/Boot.jsx';
import { StatusBar } from './sections/StatusBar.jsx';
import { Rails } from './sections/Rails.jsx';
import { Hero } from './sections/Hero.jsx';
import { Signal } from './sections/Signal.jsx';
import { Releases } from './sections/Releases.jsx';
import { Foot } from './sections/Foot.jsx';

export default function App() {
  const [bootDone, setBootDone] = useState(false);

  return (
    <>
      {!bootDone && <Boot onDone={() => setBootDone(true)} />}
      <StatusBar />
      <Rails />
      <div className="fx-scanlines"></div>
      <div className="fx-vignette"></div>
      <div className="fx-grain"></div>

      <main className="shell">
        <Hero bootDone={bootDone} />
        <Signal />
        <Releases />
        <Foot />
      </main>
    </>
  );
}
