# Claude Final Handoff — Soleil Infusion
**Date:** 2026-02-28
**Branch:** `main` (clean, pushed)
**Repo:** https://github.com/nomadproin90days/soleil-infusion
**Stack:** Next.js 16 / Turbopack · TypeScript strict · Tailwind CSS v4 · Framer Motion · GHL

---

## What This Document Is For

The Codex handoff (`docs/CODEX_Handoff_2026-02-28.md`) handles mechanical work: removing unused imports, escaping JSX entities, fixing `any` types. That's pattern-matching work.

This document is for **judgment work** — understanding intent, weighing tradeoffs, catching issues that span multiple files, and making architectural calls that affect the patient experience. Read the full Codebase Architecture section before modifying anything.

---

## Current Build State

| Check | Status |
|---|---|
| `npx tsc --noEmit` | ✅ PASS |
| `npm run build` | ✅ PASS (~11.5s Turbopack) |
| `npx eslint src` | ❌ 20 errors, 13 warnings (Codex task) |
| GHL Web Chat widget | ⏳ Blocked — widget ID pending from owner |

---

## 1. The One Inconsistency Worth Fixing Now

### `referral/page.tsx` — not using the `GHLForm` component

Every form-bearing route wraps GHL iframes in the shared `GHLForm` component. The referral page doesn't — it embeds a raw `<iframe>` directly. Worse, it loads `form_embed.js` **twice**: once after the B2B form, once after the calendar. Next.js deduplicates `<Script>` by `src`, so it's not a runtime bug — but it is a maintenance problem and will confuse future sessions.

**The fix:**

Replace the raw iframe block (around line 240) with:
```tsx
<GHLForm formId="vidpgunEF5sDUTl0wVyU" title="Soleil - B2B Referral Form" height={1400} />
```

Remove the wrapper `div` with `min-h-[800px]` — `GHLForm` provides its own container. Remove **both** `<Script src=".../form_embed.js">` tags from the page — the component handles the script internally. After this, `Script` can be removed from the import line at the top of the file if nothing else uses it.

The calendar iframe around line 276 is intentionally raw — `GHLForm` only handles form widgets, not booking calendars. Leave it alone.

---

## 2. Items That Need Business Input Before They Can Be Fixed

These are missing content, not bugs. Claude cannot invent them — raise with Thuy or Ryan before proceeding.

### 2a. Google Maps link — generic URL, not the actual pin

`src/app/page.tsx` line ~479:
```tsx
<Link href="https://maps.google.com" target="_blank">
```
This opens the Maps homepage. It should be the **Google Maps share link** for 801 Landmark Drive, Glen Burnie, MD 21061. Get this from the Google Business Profile once it's live: Maps → "Share" → "Copy link".

### 2b. Legal footer links — all dead

`src/app/page.tsx` lines ~516–518: Privacy Policy, Terms of Service, and HIPAA Notice all point to `href="#"`.

For a HIPAA-covered entity, the **Notice of Privacy Practices** is legally required to be publicly accessible. Three options:
1. Build pages at `/privacy`, `/terms`, `/hipaa` (correct long-term)
2. Link to hosted PDFs temporarily while pages are built
3. Remove the links entirely until content exists (better than dead links for now)

Option 3 is acceptable pre-launch. Option 1 is required before accepting patient data.

### 2c. `sameAs` in JSON-LD schema — currently empty

`src/app/page.tsx` line 59:
```tsx
sameAs: [],
```
When the Google Business Profile, Instagram, or other directories go live, populate this array. It directly improves local SEO pack ranking:
```tsx
sameAs: [
  "https://www.google.com/maps/place/Soleil+Infusion/...",
  "https://www.instagram.com/soleilinfusion/"
],
```

### 2d. GHL Web Chat widget ID

Implementation is ready — see Codex handoff Task 4. The pattern is written out, just needs the ID.

---

## 3. Technical Debt — Ordered by Patient Impact

None of these are broken. Prioritize based on how close to opening day you are.

### 🔴 Locale flash for Korean/Vietnamese users

**What's happening:** Every page initializes state as `"en"` on the server (SSR), then hydrates to Korean or Vietnamese on the client. For users with `preferred_locale=ko` saved in localStorage, there's a visible full-page text swap from English to Korean after hydration. On a page with 100px headings, this is jarring.

**Who it hurts:** The Korean and Vietnamese communities are Soleil's primary differentiator. This is a first-impression problem for exactly those patients.

**Options:**
1. **Next.js middleware** at `src/middleware.ts` — reads the `preferred_locale` cookie and rewrites `/?lang=ko` before the page renders. Gives true SSR in the correct language, no flash. This is the architecturally correct fix.
2. **Visual suppression** — add `opacity-0` to the root div and transition to `opacity-100` after hydration. Hides the flash but doesn't fix the SEO or screen-reader issue.
3. **Accept it pre-launch** — the site isn't open yet. Ship it and fix it in week one.

Option 1 is the right answer. Option 3 is the pragmatic pre-launch call.

### 🟡 External images served from Pexels and Unsplash

Two places load images as CSS `background-image` from third-party CDNs:
- `src/app/page.tsx` line ~326 — Pexels lab photo in the 99.9% sterility card
- `src/app/page.tsx` line ~477 — Unsplash hospital exterior in the location section

**Why this matters:**
1. **Unsplash free-tier ToS requires a visible attribution credit** near the image. There's currently none.
2. **External CDN dependency** — if Pexels or Unsplash is slow, those backgrounds are blank.
3. **`next/image` optimization is bypassed** — CSS backgrounds skip WebP conversion, lazy loading, and blur placeholders.

**Fix:** Download both images into `/public/`, rename them (`/lab-bg.jpg`, `/location-bg.jpg`), replace the URLs. Optionally switch from CSS background to `<Image fill className="object-cover" />` for full Next.js optimization.

### 🟡 Three hardcoded English fallbacks in `#inquiry` section

`src/app/page.tsx` lines ~436–438:
```tsx
{t.inquiryLabel || 'General Inquiry'}
{t.inquiryHeadline || 'Still have questions?'}
{t.inquirySub || 'Send us a message...'}
```
All three keys exist in `HOME_TRANSLATIONS` for all three locales. The `||` fallbacks are dead code that make the translation system look fragile when it isn't. Clean to:
```tsx
{t.inquiryLabel}
{t.inquiryHeadline}
{t.inquirySub}
```

### 🟡 `referral/page.tsx` — inline translations bypass the module system

Lines ~158–178 hardcode Korean and Vietnamese strings as JSX conditionals (`lang === 'ko' ? [...] : lang === 'vi' ? [...] : [...]`) instead of using `REFERRAL_TRANSLATIONS`. This works but creates a second source of truth. Future translation updates to `referral.ts` won't affect these strings. Move them into `src/lib/translations/referral.ts` under a new `caseStudyItems` array key.

### 🟢 `<html lang="en">` hardcoded in `layout.tsx`

`src/app/layout.tsx` line 61 always renders `lang="en"`. Screen readers and search engines use this attribute. Fixing it properly requires server-side locale detection (middleware + headers). Low urgency but worth tracking.

### 🟢 `RESOURCES` array in `hub/page.tsx` is hardcoded in the component

18 hub resources are defined as a hardcoded array inside `hub/page.tsx` (lines 26–153). As the hub grows this becomes unwieldy. Extract to `src/lib/hub-resources.ts` when there are 25+ entries — same pattern used for translations.

---

## 4. Architecture Reference

### How locale detection works (end-to-end)

```
User visits page
  → useState() initializer runs client-side only
  → Checks: ?lang= param → localStorage.preferred_locale → navigator.language
  → normalizeLocale() maps any input to "en" | "ko" | "vi"
  → useEffect() syncs choice to localStorage + cookie + URL param
  → t = TRANSLATIONS[lang] gives the typed translation object
  → <LanguageSwitcher> is the UI control, lifts onChange to page state
```

**Server always renders English.** There is no server-side locale detection. This is the root cause of the locale flash issue above.

### GHL integration — the correct pattern

```tsx
// Forms: use GHLForm component
<GHLForm
  formId="WIDGET_ID"      // from GHL embed code
  title="Form Name"       // from data-form-name attribute
  height={1156}           // from data-height attribute
/>

// Booking calendars: raw iframe (intentional, GHLForm doesn't support these)
<iframe
  src="https://api.voshellspharmacy.com/widget/booking/WIDGET_ID"
  style={{ width: '100%', height: '850px', border: 'none', overflow: 'hidden' }}
  scrolling="no"
/>
```

Never embed a form widget outside `GHLForm`. Never duplicate `<Script src=".../form_embed.js">`.

### Component hierarchy

```
src/app/layout.tsx          → Server Component, metadata, fonts
└── page.tsx                → "use client", home page
└── hub/page.tsx            → "use client", resource hub
└── referral/page.tsx       → "use client", B2B partnerships
└── session-report/page.tsx → "use client", session reports
└── intake/page.tsx         → "use client", Rx intake form

Shared components (all "use client"):
  BrandLogo.tsx        → CSS-driven sizing, always wraps next/image
  LanguageSwitcher.tsx → locale pill toggle, no internal state
  GHLForm.tsx          → GHL form embed wrapper, height prop
```

### Translation file map

| Module | File | Used by |
|---|---|---|
| `HOME_TRANSLATIONS` | `src/lib/translations/home.ts` | `page.tsx` |
| `HUB_TRANSLATIONS` | `src/lib/translations/hub.ts` | `hub/page.tsx` |
| `REFERRAL_TRANSLATIONS` | `src/lib/translations/referral.ts` | `referral/page.tsx` |
| `SESSION_REPORT_TRANSLATIONS` | `src/lib/translations/session-report.ts` | `session-report/page.tsx` |
| `INTAKE_TRANSLATIONS` | `src/lib/translations/intake.ts` | `intake/page.tsx` |

Pattern: `TRANSLATIONS[lang].keyName`. All are `as const` typed, `en | ko | vi`.

---

## 5. GHL Widget Inventory

| Route | Section | Widget ID | Type | Height |
|---|---|---|---|---|
| `/` | New Patient calendar | `vi5Ov0XkJLgD8z8jFWS5` | Calendar | 850px |
| `/` | Return Patient calendar | `C7UK0IcC9vyLJmxCYWUV` | Calendar | 850px |
| `/#inquiry` | General inquiry | `8c7tIeZhpGM0ULERcESp` | Form | 1156px |
| `/intake` | Rx prescription form | `3hXlVkwkuGCoLTkHA6d5` | Form | 2115px |
| `/referral` | B2B partnership form | `vidpgunEF5sDUTl0wVyU` | Form | 1400px |
| `/referral` | Discovery call calendar | `BmauXC3RW6J6IQDl0fEc` | Calendar | 850px |
| Global | Web chat | **PENDING** | Chat | n/a |

Base URL for all widgets: `https://api.voshellspharmacy.com`

---

## 6. What's Stable — Do Not Revisit

These are tested, committed, pushed, and working:

- ✅ BrandLogo responsive (60/80/100px), clickable home link on all pages
- ✅ LanguageSwitcher wired across all 5 routes, locale persists in localStorage + cookie
- ✅ GHLForm component with `height` prop, single script injection
- ✅ Booking section — both calendars live (new patient + return patient)
- ✅ Sterility card — contrast fixed (`#A6C7E7/60`), icon reduced, float animation calmed
- ✅ Mobile nav — Book Now visible at all breakpoints
- ✅ `#inquiry` nudge — "General Inquiry ↓" anchor below the calendar dismissal bar
- ✅ Navigation escape — hub and session-report have "← Main Site" + "Book Now"
- ✅ GHL API key PDF removed from git history
- ✅ `drive-download-*` excluded from git and TypeScript
- ✅ TypeScript — zero errors

---

## 7. Who This Codebase Serves

**Thuy Cao** — pharmacy owner. Her mandate: eliminate fax and phone intake entirely. Every booking, prescription, and referral flows through GHL. The site is the patient-facing surface of that system.

**Primary patients:** Korean and Vietnamese communities in the Glen Burnie / Ellicott City corridor. The multilingual UX is not a nice-to-have — it's the core differentiator against every other IV lounge in Maryland.

**Ryan** — contractor/strategist. Manages the GHL automation layer. The `/hub` is his operational dashboard.

**The filter for every feature decision:** Does this make it easier for a Korean-speaking patient to book, or for Thuy to operate without a phone?
