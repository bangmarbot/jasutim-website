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
