/* TAIROM — app entry */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "scanlines": true,
  "grain": true,
  "vignette": true,
  "boot": true,
  "scanlineIntensity": 0.06,
  "grainIntensity": 0.08,
  "accent": "#caff00"
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [bootDone, setBootDone] = React.useState(!tweaks.boot);

  React.useEffect(() => {
    document.documentElement.style.setProperty('--scanline-opacity', tweaks.scanlines ? tweaks.scanlineIntensity : 0);
    document.documentElement.style.setProperty('--grain-opacity', tweaks.grain ? tweaks.grainIntensity : 0);
    document.documentElement.style.setProperty('--accent', tweaks.accent);
  }, [tweaks]);

  return (
    <>
      {tweaks.boot && !bootDone && <Boot onDone={() => setBootDone(true)} />}
      <StatusBar />
      <Rails />
      {tweaks.scanlines && <div className="fx-scanlines"></div>}
      {tweaks.vignette && <div className="fx-vignette"></div>}
      {tweaks.grain && <div className="fx-grain"></div>}

      <main className="shell">
        <Hero />
        <Signal />
        <Releases />
        <Foot />
      </main>

      <TweaksPanel title="TWEAKS // TAIROM.SYS">
        <TweakSection title="ATMOSPHERE">
          <TweakToggle label="Scanlines" value={tweaks.scanlines}
            onChange={v => setTweak('scanlines', v)} />
          <TweakSlider label="Scanline intensity" value={tweaks.scanlineIntensity}
            min={0} max={0.2} step={0.01}
            onChange={v => setTweak('scanlineIntensity', v)} />
          <TweakToggle label="Film grain" value={tweaks.grain}
            onChange={v => setTweak('grain', v)} />
          <TweakSlider label="Grain intensity" value={tweaks.grainIntensity}
            min={0} max={0.2} step={0.01}
            onChange={v => setTweak('grainIntensity', v)} />
          <TweakToggle label="Vignette" value={tweaks.vignette}
            onChange={v => setTweak('vignette', v)} />
        </TweakSection>
        <TweakSection title="SIGNATURE">
          <TweakColor label="Accent color" value={tweaks.accent}
            onChange={v => setTweak('accent', v)} />
        </TweakSection>
        <TweakSection title="BOOT">
          <TweakToggle label="Boot sequence on load" value={tweaks.boot}
            onChange={v => setTweak('boot', v)} />
          <TweakButton label="Replay boot" onClick={() => setBootDone(false)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
