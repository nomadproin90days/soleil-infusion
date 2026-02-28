# Gemini Handoff — Functionality Audit & Fixes
**Project:** Soleil Infusion (Next.js / App Router)
**Date:** 2026-02-28
**Prepared by:** Claude Sonnet 4.6
**Purpose:** Hand off current repo state to Gemini for continued analysis and development.

---

## 1) What Was Fixed This Session

### Bug 1 — `referral/page.tsx`: Logo now uses `BrandLogo`
Previously: raw `<Image>` wrapped in a hardcoded `w-[52px] h-[52px]` div.
Fixed: replaced with `<BrandLogo alt="Soleil Logo" priority className="..." />`.
This makes the referral nav logo responsive (36/48/60px breakpoints) consistent with home and hub.

### Bug 2 — `hub/page.tsx`: Logo now uses `BrandLogo`
Previously: raw `<Image src="/soleil-logo.png" width={60} height={60}>`.
Fixed: replaced with `<BrandLogo alt="Soleil Logo" priority />`.

### Bug 3 — `session-report/page.tsx`: Logo now uses `BrandLogo`
Previously: raw `<Image src="/soleil-logo.png" width={60} height={60}>`.
Fixed: replaced with `<BrandLogo alt="Soleil Logo" priority />`.

### Bug 4 — `referral/page.tsx`: Dead `<script>` tag replaced with `next/script`
Previously: `<script src="...form_embed.js" async></script>` inside JSX.
React does not execute `<script>` tags rendered through its Virtual DOM.
Fixed: replaced with `<Script src="..." strategy="afterInteractive" />` (imported from `next/script`).
This means `form_embed.js` (GHL form iframe auto-resize) now actually executes.

### Feature — `LanguageSwitcher` wired to hub, referral, session-report
Previously: `LanguageSwitcher.tsx` was built but never imported anywhere.
Fixed: All three pages now have:
- `useState<Locale>` initialized from `?lang=` param → `localStorage` → `navigator.language` → `"en"`
- `useEffect` that persists to `localStorage`, cookie, and URL query param
- `<LanguageSwitcher locale={lang} onChange={setLang} />` rendered in the header/nav

---

## 2) Current Repo File State

| File | Status |
|---|---|
| `src/app/page.tsx` | Unchanged — home page, EN/KO/VI toggle fully working |
| `src/app/hub/page.tsx` | Fixed — BrandLogo + LanguageSwitcher |
| `src/app/referral/page.tsx` | Fixed — BrandLogo + LanguageSwitcher + next/script |
| `src/app/session-report/page.tsx` | Fixed — BrandLogo + LanguageSwitcher |
| `src/components/BrandLogo.tsx` | No change — responsive 36/48/60px logo component |
| `src/components/LanguageSwitcher.tsx` | No change — EN/KO/VI pill toggle, now fully wired |
| `src/lib/localization.ts` | No change — `normalizeLocale`, `Locale` type, `SUPPORTED_LOCALES` |
| `src/app/globals.css` | No change — `brand-logo-frame` CSS vars + breakpoints |

---

## 3) Validation

- `npx tsc --noEmit` → **PASS, zero errors**
- `npm run build` has a pre-existing hang (root cause unknown, see open issue #3 from prior handoff)

---

## 4) Architecture Notes for Gemini

### Logo System
- `BrandLogo` renders a `div.brand-logo-frame` containing `<Image>` with `className="brand-logo"`
- Heights controlled entirely by CSS custom property `--brand-logo-height` (36px/48px/60px)
- Clear-space padding = `calc(var(--brand-logo-height) * 0.5)` per brand spec
- **Note:** On desktop (60px), padding is 30px all sides → frame is 120px tall. In tight navbars this may push height beyond `min-h-24` (96px). Not currently a visible issue but worth monitoring at real viewport sizes.

### Language System
- **Locale types/logic** live in `src/lib/localization.ts`
- **Supported languages:** `en`, `ko`, `vi`
- **Persistence:** `localStorage.preferred_locale` + cookie `preferred_locale` (1 year)
- **URL sync:** `?lang=ko` or `?lang=vi`; `en` removes the param
- **Home page** (`page.tsx`) has all three translations inline in a `TRANSLATIONS` object
- **Hub, Referral, Session-report** have locale state and persistence wired, but page content is English-only (no translation dictionaries yet). The switcher sets the global preference so the home page reflects it on next visit.

### GHL Form Embeds
- **Referral page** (`/referral`): B2B referral form via GHL iframe + `form_embed.js` (now fixed with `next/script`)
  - Form ID: `vidpgunEF5sDUTl0wVyU`
  - Script: `https://api.voshellspharmacy.com/js/form_embed.js`
- **Home page booking** (`/#book`): New patient calendar iframe
  - Widget ID: `vi5Ov0XkJLgD8z8jFWS5`
  - Returning patient slot shows "Coming Soon" placeholder

---

## 5) Open Issues (Inherited, Not Fixed This Session)

| # | Issue | Notes |
|---|---|---|
| 1 | Translation dictionaries missing for hub/referral/session-report | LanguageSwitcher is wired, content stays EN. Pages need KO/VI translations added. |
| 2 | URL routing strategy | Currently `?lang=` query param. SEO-ideal would be `/ko/...` locale subpaths (Next.js i18n routing). |
| 3 | `npm run build` hangs | Hangs at "Creating an optimized production build…" — root cause undiagnosed. TypeScript passes cleanly. Possible: large page bundle, framer-motion tree-shaking issue, or environment-specific issue. |
| 4 | Returning patient booking | Home page shows "Coming Soon" placeholder. Widget ID is `C7UK0IcC9vyLJmxCYWUV` (from Feb 27 handoff). Just wire the same iframe pattern used for the new patient calendar. |
| 5 | `BookOpen` unused import in hub | `import { ..., BookOpen, ... }` is in hub/page.tsx but never used in JSX. Pre-existing lint debt. |

---

## 6) Suggested Next Tasks for Gemini

### Task A — Add KO/VI translations to referral, hub, session-report
- Define translation dictionaries per page (or a shared module in `src/lib/translations/`)
- Wire `t = TRANSLATIONS[lang]` pattern already used on home page
- Minimum viable: hero/header strings; body content can stay EN for now

### Task B — Diagnose and fix `npm run build` hang
- Try: `next build --debug` or `NEXT_TELEMETRY_DISABLED=1 next build`
- Check for circular imports, large component bundles, or missing `Suspense` boundaries
- Check if `framer-motion` or `motion/react` is causing SSR/serialization issues

### Task C — Wire returning patient booking calendar
- Obtain the GHL widget ID for the returning patient calendar from Thuy/GHL account
- Replace the "coming soon" placeholder in `page.tsx` booking section with the real iframe

### Task C-2 — Wire returning patient calendar (widget ID known)
- Replace the "Coming Soon" placeholder in `page.tsx` booking section
- Widget ID: `C7UK0IcC9vyLJmxCYWUV` (GHL, same host as new patient widget)
- Use the same `<iframe>` pattern as the new patient booking block

### Task D — GHL Web Chat widget
- Embed GHL web chat into `src/app/layout.tsx` for real-time patient inquiries
- Widget code available from GHL account dashboard

### Task E — SEO Metadata
- Optimize `src/app/page.tsx` metadata for Glen Burnie / Ellicott City "IV Therapy" search terms
- Add `<title>`, `description`, Open Graph tags via Next.js `metadata` export

### Task F — Locale subpath routing (optional, SEO improvement)
- Migrate from `?lang=` query param to Next.js `i18n` routing (`/ko/`, `/vi/`)
- Requires `next.config` update and route restructuring

---

## 7) Quick-Start Prompt for Gemini

```text
Continue development on the Soleil Infusion Next.js project.

Read this handoff first:
/Users/mac/Documents/projects/soleil-infusion/docs/GEMINI_Handoff_Functionality_2026-02-28.md

Key files:
- src/app/page.tsx                  (home, EN/KO/VI fully working)
- src/app/hub/page.tsx              (hub, locale wired, content EN-only)
- src/app/referral/page.tsx         (referral, locale wired, content EN-only)
- src/app/session-report/page.tsx   (session report, locale wired, content EN-only)
- src/components/BrandLogo.tsx      (responsive logo component)
- src/components/LanguageSwitcher.tsx (EN/KO/VI pill toggle)
- src/lib/localization.ts           (locale utilities)

Constraints:
- Do NOT change branding, colors, or fonts — these are approved and locked
- Keep changes minimal and production-safe
- TypeScript must pass: npx tsc --noEmit
- Do not auto-commit changes
```
