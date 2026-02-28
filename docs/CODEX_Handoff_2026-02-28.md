# Codex Handoff — Soleil Infusion
**Date:** 2026-02-28
**Branch:** `main`
**Stack:** Next.js 16 (Turbopack), TypeScript strict, Tailwind CSS v4, Framer Motion
**Repo:** https://github.com/nomadproin90days/soleil-infusion

---

## How to Use This Document

This handoff is built for **mechanical, zero-ambiguity execution**. Every task includes:
- The exact file path(s) to modify
- The exact error text where applicable
- The exact fix or pattern to follow
- A clear done-state definition

Run this validation routine after each task group:

```bash
npx tsc --noEmit                      # must exit 0
npx eslint src --ext .ts,.tsx         # errors should reach 0
npm run build                         # must complete in <20s
```

---

## Task 1 — Remove Unused Imports (13 warnings → 0)

These are dead imports that have never been used. Delete each named import from its import line.
Do not delete the entire import statement unless it becomes empty after removal.

### Exact removals

| File | Import to delete |
|---|---|
| `src/app/page.tsx` line 11 | `Phone` |
| `src/app/page.tsx` line 17 | `Calendar` |
| `src/app/referral/page.tsx` line 11 | `FileText` |
| `src/app/session-report/page.tsx` line 6 | `BarChart3`, `Laptop` |
| `src/app/intake/page.tsx` line 10 | `CheckCircle2` |
| `src/app/hub/workflow/[id]/page.tsx` line 4 | `ShieldCheck`, `Users`, `Settings`, `Calendar`, `Smartphone`, `Clock` |
| `src/components/GHLForm.tsx` | ~~`useEffect` already removed~~ — also added `height` prop (done) |

For `hub/workflow/[id]/page.tsx`: after removing the listed icons, confirm the remaining
lucide-react imports on line 4 are actually referenced in JSX before saving.

---

## Task 2 — Fix `react/no-unescaped-entities` Errors (20 errors → 0)

**Rule:** Raw `"` and `'` characters inside JSX text nodes (not inside `{}` or attributes) trigger this error.

**Fix pattern — option A (recommended):** Replace with HTML entities:
- `"` → `&ldquo;` (open) and `&rdquo;` (close)
- `'` → `&apos;`

**Fix pattern — option B:** Wrap the whole text segment as a JS string:
```tsx
{"Wrap text with 'quotes' like this"}
```

### Locations

**`src/app/hub/docs/[slug]/page.tsx`**

```
14:104  `'` → &apos;
16:31   `'` → &apos;
16:43   `"` → &ldquo; / &rdquo;
16:53   `"` → &ldquo; / &rdquo;
16:59   `"` → &ldquo; / &rdquo;
16:69   `"` → &ldquo; / &rdquo;
39:71   `"` → &ldquo; / &rdquo;
39:85   `"` → &ldquo; / &rdquo;
64:38   `"` → &ldquo; / &rdquo;
64:43   `"` → &ldquo; / &rdquo;
```

**`src/app/hub/page.tsx`**

```
263:57  `"` → &ldquo; / &rdquo;
263:65  `"` → &ldquo; / &rdquo;
```

**`src/app/session-report/docs/[slug]/page.tsx`**

```
22:16   `"` → &ldquo; / &rdquo;
22:205  `'` → &apos;
22:236  `"` → &ldquo; / &rdquo;
63:95   `"` → &ldquo; / &rdquo;
63:107  `"` → &ldquo; / &rdquo;
97:71   `'` → &apos;
```

---

## Task 3 — Fix `@typescript-eslint/no-explicit-any` (2 errors → 0)

**File:** `src/app/hub/docs/[slug]/page.tsx` lines **115–116**

Read those lines first. Common replacements:
- Catch block `(error: any)` → `(error: unknown)`
- Object map `any` → `Record<string, unknown>` or a specific interface
- React event `any` → the specific event type (`React.MouseEvent<HTMLButtonElement>`, etc.)

Do not suppress with `// eslint-disable` — fix the type properly.

---

## Task 4 — GHL Web Chat Widget (BLOCKED — awaiting widget ID)

**Status:** Do not implement until the widget ID is provided by the clinic owner.

**Target file:** `src/app/layout.tsx`

**Implementation spec** (execute once ID is known):

Step 1 — Add `Script` import at the top of `layout.tsx`:
```tsx
import Script from "next/script";
```

Step 2 — Add two `<Script>` tags inside `<body>`, after `{children}`:
```tsx
<Script
  id="ghl-chat-widget-config"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `window.GHL_CHAT_WIDGET_ID = "REPLACE_WITH_WIDGET_ID";`,
  }}
/>
<Script
  src="https://widgets.leadconnectorhq.com/loader.js"
  data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
  strategy="afterInteractive"
/>
```

Replace `REPLACE_WITH_WIDGET_ID` with the actual ID. Using `strategy="afterInteractive"` is
mandatory — it prevents SSR hydration mismatches and protects Lighthouse scores.

---

## Task 5 — Validation Checklist

After Tasks 1–3 are complete:

- [ ] `npx tsc --noEmit` exits with 0 errors
- [ ] `npx eslint src --ext .ts,.tsx` reports `0 problems`
- [ ] `npm run build` completes successfully (Turbopack, <20s)
- [ ] No new files created (only existing files modified)

**If build stalls or shows translation file errors:**
```bash
rm -rf .next/cache && npm run build
```
This clears Turbopack's incremental cache which occasionally stalls on Korean/Vietnamese strings.

---

## Codebase Reference

### Route Map

| URL | File |
|---|---|
| `/` | `src/app/page.tsx` |
| `/hub` | `src/app/hub/page.tsx` |
| `/hub/docs/[slug]` | `src/app/hub/docs/[slug]/page.tsx` |
| `/hub/workflow/[id]` | `src/app/hub/workflow/[id]/page.tsx` |
| `/referral` | `src/app/referral/page.tsx` |
| `/session-report` | `src/app/session-report/page.tsx` |
| `/session-report/docs/[slug]` | `src/app/session-report/docs/[slug]/page.tsx` |
| `/intake` | `src/app/intake/page.tsx` |
| `/edge` | `src/app/edge/page.tsx` |

### Shared Components

| Component | File | Key Props |
|---|---|---|
| `BrandLogo` | `src/components/BrandLogo.tsx` | `alt`, `className`, `priority` |
| `LanguageSwitcher` | `src/components/LanguageSwitcher.tsx` | `locale: Locale`, `onChange: (l: Locale) => void` |
| `GHLForm` | `src/components/GHLForm.tsx` | `formId`, `baseUrl`, `className`, `title`, `height` (px, default 1156) |

### Translation Files

All export a `const` with `en`, `ko`, `vi` keys. Pattern: `TRANSLATIONS[lang].keyName`.

| Export | File |
|---|---|
| `HOME_TRANSLATIONS` | `src/lib/translations/home.ts` |
| `HUB_TRANSLATIONS` | `src/lib/translations/hub.ts` |
| `REFERRAL_TRANSLATIONS` | `src/lib/translations/referral.ts` |
| `SESSION_REPORT_TRANSLATIONS` | `src/lib/translations/session-report.ts` |
| `INTAKE_TRANSLATIONS` | `src/lib/translations/intake.ts` |

`Locale` type + `normalizeLocale()` → `src/lib/localization.ts`

### GHL Widget IDs

| Route | Type | Widget ID | Notes |
|---|---|---|---|
| `/` new patient | Calendar | `vi5Ov0XkJLgD8z8jFWS5` | |
| `/` return patient | Calendar | `C7UK0IcC9vyLJmxCYWUV` | |
| `/#inquiry` | Form | `8c7tIeZhpGM0ULERcESp` | "Soleil IV Infusions - Copy", height 1156px |
| `/intake` | Form | `3hXlVkwkuGCoLTkHA6d5` | |
| `/referral` form | Form | `vidpgunEF5sDUTl0wVyU` | |
| `/referral` calendar | Calendar | `BmauXC3RW6J6IQDl0fEc` | |
| Global chat | Chat Widget | **PENDING** | |

All GHL iframes use base URL: `https://api.voshellspharmacy.com`
`GHLForm.tsx` uses: `https://api.voshellspharmacy.com/js/form_embed.js`

### CSS Design Tokens

```
--background: #FAFAFA
--foreground: #646464   (Dove Gray)
--primary:    #004a99   (Medical Blue)
--secondary:  #A6C7E7   (Regent St Blue)
--accent:     #008B8B   (Teal)
```

Logo breakpoints (`.brand-logo-frame` in `globals.css`):
- `<481px` → 60px height
- `481–1024px` → 80px height
- `≥1025px` → 100px height

---

## Hard Constraints — Do Not Violate

1. **Do not modify** `src/app/globals.css` — brand colors and logo sizing are final.
2. **Do not modify** `src/components/BrandLogo.tsx` — logo size is CSS-driven; no inline styles.
3. **Do not modify** any `src/lib/translations/*.ts` file — do not change string values.
4. **Do not create new files** — all tasks in this handoff are modifications to existing files only.
5. **Do not add `// eslint-disable` comments** — fix the underlying issue.
6. **Do not use `any` as a fix** — the `@typescript-eslint/no-explicit-any` tasks require real types.

---

## Commit Convention

```
type(scope): description

types: feat | fix | chore | ux | refactor | security
```

Suggested commit for Tasks 1–3:
```
chore: remove unused imports and fix JSX entity escaping across all routes
```
