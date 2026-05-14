# Handoff: TAIROM — Artist Site

## Overview
Single-page artist site for **TAIROM** — experimental DIY dark electronic / industrial / break / IDM. Functions as a hub: hero with glitching wordmark + sigil, channels grid (Spotify, Apple Music, SoundCloud, Instagram, YouTube, Linktree), discography with a Spotify embed, bio/transmission, live shows, and booking/contact. The visual language is broadcast-terminal: dark bone-on-near-black, monospace metadata, lime + violet accents, blood-red signal accents, subtle film-grain and scanlines. Wordmark glitches with chromatic aberration, letter swaps, and dropout flickers. A user-toggleable Tweaks panel exposes color/effect knobs.

## About the Design Files
The files under `source/` are **design references created in HTML/JSX/CSS** — a working prototype showing intended look, behavior, and motion. They are **not production code to copy directly**.

The task is to **recreate these designs in the target codebase's environment** (Next.js, Astro, plain Vite + React, SvelteKit, etc.) using its established patterns, component libraries, and build pipeline. If no codebase exists yet, **Next.js (App Router) with Tailwind or vanilla CSS modules** is a strong default for a static artist site — but any modern React/JS framework will fit.

The `source/` folder contains a single self-contained HTML page that loads React + Babel from CDNs and JSX files inline. In production you'd:
- Move the JSX components to a real component tree
- Replace the inline `<style>` + `styles.css` with whatever styling solution the target codebase uses (CSS Modules, Tailwind, vanilla-extract, etc.) — but **preserve the design tokens and visual rules** documented below
- Replace the CDN-loaded React/Babel with a real build
- Replace `simple-icons` CDN URLs with locally bundled SVG assets (see Assets section)
- Keep the speaker-notes-free single-page structure; this is not a deck

## Fidelity
**High-fidelity.** The prototype has final colors, typography, spacing, motion timing, copy, and interaction behavior. Recreate pixel-perfectly using the target codebase's tools. Where the codebase has a design system that conflicts (e.g. an existing button), follow these design tokens — TAIROM has its own visual identity that should not be diluted by a generic system.

## Screens / Views
The site is a single long-scroll page with a fixed top status bar, fixed left/right vertical rails (desktop only), and stacked sections separated by 1px dashed rules.

### 1. Status Bar (fixed, top, all viewports)
- **Position**: `position: fixed; top: 0; left: 0; right: 0; height: 26px` (30px on phone)
- **Layout**: `display: flex; justify-content: space-between; align-items: center; padding: 0 16px`
- **Background**: `var(--bg)` (#0a0a08) with a 1px bottom border `var(--bg-rule)`
- **Typography**: monospace, 10px, uppercase, `letter-spacing: 0.18em`, color `var(--ink-dim)`
- **Left group**: `● TAIROM // BROADCAST` — the dot is `var(--accent)` (#caff00), 6px circle, slow pulse animation
- **Center group**: `SIGNAL LOCKED // 96kHz/24` (hidden on small screens via `.hide-sm`)
- **Right group**: live clock in `HH:MM:SS` (system time), `BPM 140`, `SR 96kHz/24`
- **z-index**: 100

### 2. Side Rails (fixed, desktop only — hidden ≤900px)
- **Position**: `position: fixed; top: 26px; bottom: 0; width: 38px`
- **Left rail**: vertical text reading bottom-to-top: `TAIROM // EXPERIMENTAL DIY ELECTRONIC // CHANNEL 01` plus a small tick mark
- **Right rail**: vertical text top-to-bottom: `CHANNEL 01 // OPEN TRANSMISSION` and `© TAIROM ALL FREQUENCIES RESERVED`
- **Style**: 1px side border to bg-rule, 9px monospace, `letter-spacing: 0.25em`, color `var(--ink-dim)`
- **Mode**: `writing-mode: vertical-rl` for the text

### 3. Hero (`<Hero/>`)
Full viewport height (`min-height: calc(100vh - 26px)`), holds the glitching wordmark, tagline, sigil, and a small readout panel.

- **Wordmark** ("TAIROM"):
  - Font: Anton (display), 700, `font-size: clamp(80px, 18vw, 280px)`, `line-height: 0.85`, `letter-spacing: -0.05em`
  - Color: solid white (`var(--ink)`, #e8e6df) — clean and brutal at rest
  - **Glitch composition**: each character is a `<span class="char">` containing 6 stacked layers (`base`, `red`, `cyan`, `yellow`, `purple`, `acc`) with `mix-blend-mode: screen` on the chromatic ones
  - **Chromatic aberration**: `red` layer translated -2.5px x with color `rgba(255,58,58,0.55)`; `cyan` layer +2.5px x with `rgba(60,220,220,0.5)`. Both drift on a 3.7s loop (±1px lateral).
  - **Yellow flash layer** (`#f5e84a`): per-char per-tick random opacity 0→0.85 with ±3px lateral kick — fires ~12% of ticks
  - **Purple flash layer** (`var(--violet)` #b46cff): same as yellow but mirror-shifted — fires ~14% of ticks
  - **Letter swaps**: O→`0`/`Ø`, A→`4`/`/\`, I→`1`/`|`, R→`Я`, T→inverted dagger (lowercase `†` rotated 180°). Each char rolls independently every 180ms; ~12% of rolls produce a swap so usually 0–1 letters are swapped at once. **Never swap M.**
  - **Dropouts**: per-char per-tick, ~5% full-vanish (opacity 0), ~7% dim-flicker (opacity 0.35) — letter recovers next tick
  - **Per-char wiggle**: occasional ±3px x and ±1.5px y jitter on heavy/slip rolls (steps(2) transition)
  - Tick rate: 180ms `setInterval`
  - **Wordmark flicker** (CSS `@keyframes wordmark-flicker`): 4.5s loop, brief opacity dips and ±1–2px translate jolts at 88%–93% of cycle, applied to the whole wordmark via `.wordmark-ghost` class

- **Tagline**: under the wordmark, `display: grid` two-up. Left column: `EXPERIMENTAL DIY // DARK ELECTRONIC INDUSTRIAL BREAKBEATS // AMBIENT // IDM` (10px monospace, `letter-spacing: 0.18em`, uppercase, ink-dim, `EXPERIMENTAL DIY` in `<strong>` accent). Right column: two `.bpm` stat tiles — `140 / BPM AVG` and `07 / RELEASES`. Tiles: 28px Anton number, 9px monospace label below. **Hidden on ≤640px.**

- **Hero readout** (top-right corner, hidden on ≤900px): small monospace block with rows: `SIGNAL ●●● LOCKED`, `FREQ 140.0 BPM`, `MODE BREAK / IDM`, live clock. Values use `var(--accent)`.

- **Hero sigil** (`<Sigil/>`): centered SVG, 720px max width on desktop, layered concentric rings. See **Sigil** subsection below.

- **Hero grid overlay**: subtle 160px × 160px grid (1px lines at `var(--grid-strong)`) masked with a radial fade so it dims toward the edges.

#### Sigil (SVG, viewBox -140 -140 280 280)
A continuously-rotating broadcast-talisman composite. All sub-rings rotate at different rates against each other; pulse scale 1±0.04 on a 2s sin cycle.
- Atmospheric: radial gradient halo (`accent` lime), violet halo, pulsing blood-red inner aura
- Outer tick ring: 60 ticks, 12 long ticks at 5° intervals colored accent
- Crosshair brackets at 0/90/180/270°
- Glyph ring: 8 markers (◊ ✕ ▲ ◯ repeated) on the outer ring
- Mid ring with curved text on a single closed circular path: `TAIROM // SIGNAL LOCKED // FREQ 140.0 // CHANNEL 01 // EXPERIMENTAL DIY // INDUSTRIAL // BREAK // IDM // ∞ //`. Color: violet, 4.6px font, letter-spacing 2.4. **Important**: must use one full closed-circle path, not two half-arcs, otherwise letters get cut at the seam.
- Hatched core: `<pattern>` of vertical lines at `rgba(232,230,223,0.18)`, masked to a circle, with rotating spokes
- Opposing triangles: accent up-pointing, violet down-pointing
- Inverted pentagram with chromatic aberration: violet ghost +1.6px x, cyan ghost -1.4px x, accent main on top, smaller violet inner pentagram
- Center reticle: accent crosshair (-10 → 10 each axis), 3px accent dot, 5.5px violet ring
- Labels: `SIGIL.001` at top (accent, 4.5px), `∞ TRANSMISSION ∞` at bottom (violet, 4.5px)

### 4. Channels Grid (`<Signal/>`, id="signal")
Sits **directly under the hero**, before the discography section.
- **Section head**: `// 002` numbered prefix in violet, title `SIGNAL // CHANNELS`, meta `06 OUTPUTS // ACTIVE` (right-aligned, hidden on mobile)
- **Background wash**: violet radial blob from top-left (10% opacity), faint violet echo from bottom-right (6%), top-down violet linear at 3.5%
- **Grid**: `display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--bg-rule); border: 1px solid var(--bg-rule)` — the gap+border trick produces hairline rules between cells without per-cell borders
- **Cells** (6 total, in this order): SPOTIFY, APPLE MUSIC, SOUNDCLOUD, INSTAGRAM, YOUTUBE, LINKTREE
- **Cell internals**:
  - `padding: 32px 28px; min-height: 200px; position: relative; background: var(--bg)`
  - `// NN` number tag (9px monospace, ink-dim, top)
  - **Channel icon**: 44px square. Implementation: a `<div class="ch-icon">` with `mask-image: url(https://cdn.jsdelivr.net/npm/simple-icons@11/icons/{slug}.svg)` and `background-color: var(--ink)`. This renders the official simple-icons SVG as solid white. On hover, `background-color` swaps to `var(--violet)`. **In production, replace the CDN URL with locally bundled SVG assets** so the site doesn't depend on simple-icons CDN being up. Slugs used: `spotify`, `applemusic`, `soundcloud`, `instagram`, `youtube`, `linktree`.
  - Channel name (Anton, 26px, `letter-spacing: 0.04em`)
  - Handle (10px monospace, ink-dim) — e.g. `@TAIROM808`
  - `↗` arrow absolute-positioned top-right (24px each), 18px Anton — turns accent on hover
- **Hover**: cell bg shifts to `var(--bg-elev)`, name turns violet, icon turns violet, arrow turns accent. Smooth 200ms transition on icon color.
- **Tap state on touch**: same transformations under `:active` — no hover on touch devices

### 5. Discography (`<Releases/>`, id="releases")
- **Section head**: `// 003`, `DISCOGRAPHY`, meta `LIVE FEED // SPOTIFY`
- **Background wash**: lime accent radial blob from top-right (7%), cyan echo bottom-left (5%), accent linear in middle (2.5%)
- **Layout**: centered max-width 880px wrapper. Above the embed, a small `// LIVE FEED — TAIROM` label.
- **Spotify embed**: `<iframe src="https://open.spotify.com/embed/artist/7LdLNXWskTSj6ztUnSzn38?utm_source=generator&theme=0" height="520" loading="lazy">`. Border 1px `var(--bg-rule)` on the iframe wrapper. On phone clamps to `height: 380px`.
- **Below embed**: 3-up grid of secondary CTAs (BANDCAMP, SOUNDCLOUD, YOUTUBE), each a hairline-bordered cell with the `↗` glyph and ScrambleText hover effect

### 6. Transmission / Bio (`<Transmission/>`, id="transmission")
2-up grid (1.5fr / 1fr) on desktop, stacked on mobile.
- **Left column**: bio prose, 56ch max-width, 14px body, line-height 1.7, paragraph spacing 1em
- **Right column**: `SPECIMEN // SIGNAL` spec sheet — Genre / Tempo Range (140 — 200 BPM, accent color) / Tuning (432 Hz) / Format (DIY / Self-released). Each row: `display: flex; justify-content: space-between` with a 1px dashed rule below.

### 7. Live Shows (`<Shows/>`, id="shows")
- Section head `// 004`, `LIVE TRANSMISSIONS`
- Table of upcoming shows: `display: grid; grid-template-columns: 100px 1fr 200px 100px 80px` columns = date / venue+title / city / status / cta
- Header row dimmed, body rows have hover state. On phone collapses to date / title / cta only.

### 8. Booking / Contact (`<Booking/>`, id="booking")
- **Section head**: `// 005`, `BOOKING // CONTACT`, meta `OPEN CHANNEL`
- **Background wash**: heavy blood-red radial from bottom (18%), red echo top-left (8%) — this section reads more industrial/aggressive than the others
- **Layout**: 2-up grid
- **Left**: huge CTA `OPEN / FOR SHOWS / + COLLAB` (Anton, 56px desktop / 30px phone), with `SHOWS` styled in `<span class="acc">` (accent color). Subtitle copy below.
- **Right**: contact lines — booking email, management email, mailing list signup field

### 9. Footer (`<Foot/>`)
Bottom strip mirroring the statusbar: copyright, BPM, sample rate, live clock. Same monospace 9px style.

## Section Backgrounds
Each section gets a near-invisible atmospheric wash via `::before` plus a film-grain layer via `::after`. Detail in the **Design Tokens** section.

## Interactions & Behavior

### Wordmark glitch
- **Tick interval**: 180ms via `setInterval`
- **Per-char rolls**: 6 independent pseudo-random values per char per tick, derived from `(tick * primeA + i * primeB) % primeC / primeC`. Pseudo-random, not actual `Math.random()`, so it's deterministic per (tick, char-index) which avoids React reconciliation churn.
- **Thresholds**:
  - heavy wiggle: r > 0.92 → ±3px x kick
  - slip wiggle: r2 > 0.94 → ±1.5px y kick
  - yellow hit: r3 > 0.88 → yellow layer flashes
  - purple hit: r4 > 0.86 → purple layer flashes
  - swap: r5 > 0.88 → letter rolls a variant from its swap table
  - dropout: r6 > 0.95 → opacity 0 (full vanish); 0.88 < r6 ≤ 0.95 → opacity 0.35 (dim flicker)
- **Transition**: `transform 120ms steps(2), opacity 60ms steps(2)` — `steps()` is what makes it feel digital/snapped vs eased

### ScrambleText
- Used on link labels and CTAs that should "boot up" when scrolled into view or hovered.
- On mount/hover, the text iterates through random characters (matrix-rain style) for ~30 frames before settling on the real string.
- Implemented in `glitch.jsx` as `useScramble` hook + `<ScrambleText>` wrapper.

### Boot sequence (`<Boot/>`)
Plays once on first page load, fullscreen black overlay with monospace lines printing one at a time:
```
> tairom.sys/init...
> loading transmission protocol...
> bpm=140 // mode=BREAK // signal=LOCKED
> establishing uplink to host...
> all systems nominal
> WELCOME
```
Each line appears every 220ms. After last line, 400ms hold then a fade-out (`.boot.done` class) and the actual page is revealed.

### Sigil rotation
- `requestAnimationFrame` loop incrementing `t` by 0.005 per frame
- `rot = (t * 60) % 360` — base rotation angle in degrees
- Different sub-groups apply rot at different multipliers: tick ring at -0.15× (counter), glyph ring +0.3×, mid ring +0.4×, hatched core +0.3×, triangles -0.6×, pentagram +0.15×. This creates the "everything rotating against everything" feel.

### Cursor reactivity
The hero responds subtly to mouse position — sigil shifts a few px toward the cursor (parallax). Implementation in `glitch.jsx` / `sections.jsx` `Hero` component using a mousemove listener with throttling. Skip on touch.

### Tweaks panel
A floating panel in the bottom-right (built on `tweaks-panel.jsx` starter) lets users tweak: darkness level, primary accent, glitch intensity, scanline opacity. Implements the host protocol — listens for `__activate_edit_mode` postMessage, surfaces controls, persists state via `__edit_mode_set_keys`. **In production this is optional**: it's primarily for the design-review iframe. If shipping the live site, you can remove the Tweaks integration entirely or repurpose the panel as an Easter-egg debug surface.

### Reduced motion
Under `@media (prefers-reduced-motion: reduce)`, the grain layer animation, statusbar pulse, and all keyframe animations stop. Glitch ticks should also be paused — recommend adding `if (prefersReducedMotion) clearInterval(id)` to wordmark and scramble loops. The static sigil rotation should also stop.

## State Management
Minimal. Most components are presentational with internal `setInterval`/`requestAnimationFrame` state for animation ticks. Notable hooks:
- `useScramble(target, steps)` — returns the currently-rendered string while it scrambles toward `target`
- `useClock()` — returns current `Date`, used by the statusbar/footer/hero readout. 1s setInterval.
- Sigil's local `t` state for rotation
- Wordmark's local `tick` state
- Tweaks' state via `useTweaks` hook from the starter

No external data fetching except the Spotify embed iframe.

## Responsive behavior

### ≤900px (tablet/large phone)
- Side rails hidden
- Section padding 48px 8px
- Section meta hidden
- All multi-column grids collapse to 1 column
- Show table collapses (city + cta hidden)
- Hero readout hidden
- Sigil shrinks to `min(70vw, 420px)`

### ≤640px (phone)
- Statusbar bumps to 30px height with more padding so wordmark doesn't crowd it
- Shell padding 26px top, 14px sides
- Hero gets explicit `padding: 56px 14px 96px` and 56px gap between wordmark cluster and sigil
- Wordmark clamps `64–200px` at 26vw
- Sigil becomes a static block element (not absolute) under the tagline, 82vw width / 380px max
- Channels grid → 1 column
- BPM / RELEASES tiles hidden in tagline row (don't flow well at narrow widths)
- Spotify embed capped at 380px
- `:active` states added (no hover on touch)
- Grain opacity dropped from 0.04 → 0.025

### ≤380px (small phone)
- Wordmark goes to 24vw to fit
- Booking CTA shrinks to 26px
- Hero padding tightens

## Design Tokens

### Colors
```css
--bg:           #0a0a08;     /* page background, near-black with green tint */
--bg-elev:      #131310;     /* hover/elevated surface */
--bg-rule:      #1a1a16;     /* hairline rules and borders */
--ink:          #e8e6df;     /* primary text, bone white */
--ink-dim:      #898680;     /* secondary text */
--accent:       #caff00;     /* primary lime accent */
--accent-dim:   #6e8a00;
--violet:       #b46cff;     /* tertiary contrast — channels hover, curved sigil text, etc. */
--violet-dim:   #6a2fb0;
--blood:        #8b1a1a;     /* signal accent for booking section + warnings */
--signal:       #b22020;     /* alias of blood, used for chromatic aberration */
--grid-strong:  rgba(232,230,223,0.04);  /* hero grid overlay */
```

Yellow flash glitch color: `#f5e84a` (only used as a wordmark layer, not a main token).

### Typography
- **Display**: `'Anton', 'Bebas Neue', 'Impact', sans-serif` — used for wordmark, section titles, channel names, BPM tiles, booking CTA
- **Mono**: `'JetBrains Mono', 'IBM Plex Mono', ui-monospace, monospace` — used for everything chrome-like: statusbar, side rails, section numbers, metadata rows, ticker text
- **Body**: `'Inter Tight', 'Inter', system-ui, sans-serif` — bio prose

Avoid Inter for prominent type — it's too generic and conflicts with the brand. Anton is non-negotiable for the wordmark; the chromatic glitch composition relies on Anton's tight x-height and uniform character widths.

Type scale (representative, not exhaustive):
| Use | Size | Weight | Letter-spacing |
|---|---|---|---|
| Wordmark (desktop) | clamp(80px, 18vw, 280px) | 700 | -0.05em |
| Wordmark (phone) | clamp(72px, 26vw, 200px) | 700 | -0.04em |
| Section title | 32px | 700 | 0 |
| Section title (phone) | 19px | 700 | 0.02em |
| Section number | 28px | 700 | -0.02em |
| Channel name | 26px | 700 | 0.04em |
| Booking CTA | 56px desktop / 30px phone | 700 | -0.02em |
| BPM stat number | 28px | 700 | 0 |
| Body | 14px | 400 | 0 |
| Tagline | 11px | 400 | 0.18em |
| Statusbar / rail | 9–10px | 500 | 0.18–0.25em |
| Section meta | 10px | 400 | 0.2em |

### Spacing
- Section padding: 64px desktop / 56px phone (top+bottom), 32px desktop / 4–14px phone (sides)
- Section-head gap: 24px desktop / 12px phone
- Section-head bottom margin: 48px desktop / 28px phone
- Grid gaps: 1px hairline (channels grid), 32px (transmission grid), 24px (releases grid)
- Cell padding (channels): 32px 28px desktop / 24px 22px phone

### Borders & rules
- Section dividers: `border-top: 1px solid var(--bg-rule)`
- Section-head bottom: `1px dashed var(--bg-rule)`
- Cell borders: 1px solid `var(--bg-rule)`
- Spec rows: 1px dashed `var(--bg-rule)` bottom
- No `border-radius` anywhere — sharp corners are part of the brand

### Section background washes (the gradient layer per section)
Apply these via `section::before` (`position: absolute; inset: 0; z-index: -1`):
```css
#signal::before {
  background:
    radial-gradient(900px 520px at 12% -10%, rgba(180,108,255,0.10), transparent 60%),
    radial-gradient(640px 400px at 100% 110%, rgba(180,108,255,0.06), transparent 65%),
    linear-gradient(180deg, rgba(180,108,255,0.035) 0%, transparent 40%, transparent 100%);
}
#releases::before {
  background:
    radial-gradient(900px 520px at 95% 0%, rgba(202,255,0,0.07), transparent 60%),
    radial-gradient(560px 360px at 8% 100%, rgba(60,220,220,0.05), transparent 65%),
    linear-gradient(180deg, transparent 0%, rgba(202,255,0,0.025) 50%, transparent 100%);
}
#booking::before {
  background:
    radial-gradient(900px 520px at 50% 110%, rgba(139,26,26,0.18), transparent 65%),
    radial-gradient(500px 300px at 0% 0%, rgba(139,26,26,0.08), transparent 60%);
}
#shows::before, #transmission::before {
  background:
    radial-gradient(800px 480px at 88% 100%, rgba(232,230,223,0.04), transparent 60%),
    radial-gradient(560px 360px at 0% 0%, rgba(180,108,255,0.05), transparent 65%);
}
```

### Film-grain overlay
Every section has an `::after` layer running an inline-SVG fractal-noise pattern at `opacity: 0.04` (0.025 on phone) with `mix-blend-mode: overlay`. The SVG noise is `<feTurbulence baseFrequency="0.9" numOctaves="2" stitchTiles="stitch">` over a 180×180 tile. Inline-SVG is preferred over animated CSS noise for performance.

### Animations / motion
| Effect | Duration | Easing |
|---|---|---|
| Wordmark flicker keyframe | 4.5s | steps(24) infinite |
| Wordmark RGB drift (red/cyan layers) | 3.7s | ease-in-out infinite |
| Wordmark per-char transform | 120ms | steps(2) |
| Wordmark per-char opacity | 60ms | steps(2) |
| Sigil rotation | 0.005 rad/frame ≈ smooth continuous | linear (rAF) |
| Sigil pulse | 2s sin | continuous |
| Statusbar dot pulse | 1.6s | ease-in-out alternate |
| Channel cell hover | 200ms | ease |
| Boot line interval | 220ms | — |
| Section-wash and grain | static | — |
| Scramble per-char | ~30 frames @ 60fps | snap to final |

## Assets

### Channel icons (simple-icons via CDN)
The prototype loads white-monochrome official brand marks via CSS mask:
- `https://cdn.jsdelivr.net/npm/simple-icons@11/icons/spotify.svg`
- `https://cdn.jsdelivr.net/npm/simple-icons@11/icons/applemusic.svg`
- `https://cdn.jsdelivr.net/npm/simple-icons@11/icons/soundcloud.svg`
- `https://cdn.jsdelivr.net/npm/simple-icons@11/icons/instagram.svg`
- `https://cdn.jsdelivr.net/npm/simple-icons@11/icons/youtube.svg`
- `https://cdn.jsdelivr.net/npm/simple-icons@11/icons/linktree.svg`

**For production**: install `simple-icons` as an npm dependency and import the SVGs locally, OR download these six SVGs into your assets folder and reference them directly. Don't depend on a CDN at runtime.

**Brand-compliance caveat**: simple-icons normalizes all marks to a single weight. If you need strict brand compliance with each platform's official guidelines (Spotify clear-space, Apple Music's "Listen on Apple Music" lockup requirements, etc.), pull the press-kit assets directly from each company.

### Fonts
Loaded via Google Fonts in `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=JetBrains+Mono:wght@400;500;700&family=Inter+Tight:wght@400;500;600&display=swap" rel="stylesheet">
```
For production, self-host these or use the framework's font system (e.g. `next/font/google`).

### Spotify embed
Uses TAIROM's actual artist ID: `7LdLNXWskTSj6ztUnSzn38`. The embed URL is the standard Spotify oEmbed format. No auth needed.

### Other
- No raster images, no logo files, no photography in the current prototype
- The sigil is pure inline SVG — no asset file needed
- Boot sequence is pure text/CSS — no asset

## Files in `source/`
- **TAIROM.html** — entry HTML, loads React + Babel CDNs, font CSS, then the four JSX files in order. Contains the speaker-notes-free single-page structure with the boot overlay.
- **app.jsx** — top-level `<App>` that renders Statusbar, Rails, Hero, Signal, Releases, Transmission, Shows, Booking, Foot. Wires up the Tweaks panel.
- **glitch.jsx** — `useScramble`, `<ScrambleText>`, `<GlitchWordmark>`, `useClock`, `formatTime`, `pad`, `<Sigil>`, `<Boot>`. Exports to `window` so other Babel-script files can access them.
- **sections.jsx** — `<Hero>`, `<Releases>`, `<Transmission>`, `<Shows>`, `<Signal>` (channels grid), `<Booking>`, `<Foot>`, `<SectionHead>`. Also defines the `LINKS` constant with the 6 channels.
- **styles.css** — all visual rules. Organized: tokens → reset → statusbar → rails → shell → hero → wordmark → readout → sigil → releases → transmission → shows → signal → booking → foot → fx (grain, scanlines) → responsive (900/640/380 breakpoints) → reduced motion.
- **tweaks-panel.jsx** — the design-review tweaks panel starter. Optional in production.

## Recommended implementation path
1. Pick a framework (Next.js App Router suggested for static deploy + SEO).
2. Set up the design tokens as CSS variables in `globals.css`.
3. Self-host the three Google Fonts.
4. Build the components in this order, verifying each visually before moving on:
   1. Status bar + side rails + section shell
   2. Sigil (the most complex SVG — get it right standalone first)
   3. Wordmark glitch (port the timing constants exactly)
   4. Hero composition
   5. Channels grid (download the 6 simple-icons SVGs locally)
   6. Discography with embed
   7. Bio + spec sheet
   8. Live shows table
   9. Booking
   10. Footer + boot overlay
5. Run a full reduced-motion test — every animation needs a kill switch.
6. Test on iOS Safari and Android Chrome at 360px, 414px, 768px, 1024px, 1440px+.
7. Lighthouse pass — the grain SVG and font weights are the main perf risks; everything else is light.
