# /tifa — Changelog

Scrollytelling talk page for the **TIFA event (Thailand IATSS Forum Alumni), 19 Jul 2026**.
Speaker: Muhamad Muslih (Chairman of Trustees, Yayasan JASUTIM). 10-min talk, ~40 high-school
students, English. Route is **unlisted + noindex** (presentation aid, not site content).

> This file is not a route — Next.js App Router ignores non-page files. Co-located with the page
> for version history. Newest entries on top.

---

## v1 — 2026-06-23 (commit `42dba54`)
Initial build. Live at https://www.jasutim.org/tifa.

**Added**
- Standalone English-only route `src/app/tifa/` (`page.tsx` + `TifaStory.tsx` client component
  + scoped `tifa.css`), outside the `[locale]` i18n system.
- `/tifa` excluded from the next-intl middleware matcher (`src/middleware.ts`).
- `noindex, nofollow`; not linked from site nav (unlisted).
- 8 scrollytelling scenes: Hello → Problem (Bantar Gebang) → Waste Bank idea → Meet JASUTIM
  (count-up stats ≈40t / 5 / 200+) → Circular economy now (plastic + cooking-oil→candle 33×) →
  Next project (organic BSF→eggs, custom CSS loop diagram, framed "in design") → Lesson →
  What-you-can-do + Closing.
- Presenter-notes overlay (press **N**, ←/→ to page, Esc to close); scroll-progress bar; fixed logo.
- Assets in `public/images/tifa/`: real JASUTIM photos + Bantar Gebang landfill from Wikimedia
  Commons (CC BY-SA 3.0, credited "22Kartika / Wikimedia"); optimized (max ~1600px, q80).

**Verified**
- `next build` passes; site routes (`/`, `/about`, `/id`) intact.
- Desktop + mobile (390px) responsive; no horizontal overflow; all assets HTTP 200.
- Scene-2 facts WebSearch-verified (Bantar Gebang = SE Asia's largest landfill, ~200 football
  fields, 50+ m high, in Kota Bekasi) — kept as worded.

---

<!-- next entries (post-feedback iterations) go here, newest on top -->

## v1.1 — 2026-06-23 (commit `77fa480`)
Revision round after Muslih's live review. **Biggest change: scroll → slide-deck.**

**Changed**
- **#3 — Slide-deck navigation.** Rebuilt as 9 discrete full-screen slides (`100dvh`), one
  visible at a time; long-scroll killed and body scroll locked. Advance: **Space / Enter / → / ↓
  / click-tap** (left ~22% of screen = back). Back: **← / ↑ / Backspace**. Mobile **swipe
  left/right**. Cinematic fade + slide/scale transition between slides (framer-motion
  `AnimatePresence`); on each slide enter, its content reveals fresh (stat count-up, step rises,
  Scene-6 loop). Notes overlay (**N**) now shows the **current** slide's notes. Scroll-progress
  bar replaced by a **dot + "n / 9" slide indicator** (dots are clickable). Fixed logo kept;
  added subtle prev/next edge buttons (desktop) and a hero tap-cue.
- **#1 — Hero treatment.** `team-with-muslih.jpg` is only 960×1280 (no upscale); stronger
  layered gradient (`.scrim-hero`) + `object-fit:cover` with a higher focal point
  (`.focus-center`) so softness reads less. `weighing.jpg` (also 960px) uses the same deep scrim.
  Image `src` is a one-line swap if a hi-res replacement arrives.
- **#2 / #6 — Type scaled up for a projected room.** Headlines, lead/body text, stat numbers
  (now `clamp(4rem … 8rem)`), stat labels, the 3 action items, and the Scene-6 legend all
  bumped via `clamp()` with vw units.
- **#4 — Scene 6 motion.** Loop diagram animates on enter: nodes pop/scale in sequence
  (Food scraps → BSF larvae → Chicken feed → Eggs), arcs draw in after each node
  (`pathLength`), and a token continuously travels around the loop (CSS `offset-path`, infinite).
- **#5 — Scene 6 spacing.** Fixed the cramped legend bug (label ran into description with no
  space) — label/description are now separate block elements in a `.legend-text` column with
  vertical gap; larger diagram↔legend gap, line-height, and padding.
- **#7 — Thai closing.** Replaced "Terima kasih · Thank you" with **ขอบคุณครับ** (big),
  romanization "khòp khun kráp" beneath, then smaller "Thank you, Thailand!". Loaded
  **Noto Sans Thai** via `next/font` (self-hosted subset) so glyphs render regardless of the
  presenter machine's fonts; font stack falls back to `'Noto Sans Thai', system-ui`.

**Verified**
- `next build` passes; site routes (`/`, `/about`, `/id`) intact; `/tifa` still 200 + noindex.
- Thai glyphs `ขอบคุณครับ` + romanization present in the built bundle; Noto Sans Thai subset
  woff2 emitted by `next/font`; `.thanks-thai` carries the Thai font stack.
- Reduced-motion respected (count-up, loop, slide transitions degrade gracefully).
- Note: visual confirmation of glyph rendering on the projector is best double-checked in a real
  browser (no headless browser available in this build env) — the font subset and stack are wired
  correctly, so it should render.
