# Claude Handoff — Logo + Language Toggle Implementation

**Project:** Soleil Infusion (Next.js)  
**Date:** 2026-02-28  
**Prepared by:** Codex  
**Purpose:** Continue analysis and hardening of logo scaling + EN/KO/VI language behavior.

---

## 1) What Was Implemented

### A. Responsive Logo System
A reusable logo component was introduced and applied to key pages.

**New files**
- `/Users/mac/Documents/projects/soleil-infusion/src/components/BrandLogo.tsx`

**Global style updates**
- `/Users/mac/Documents/projects/soleil-infusion/src/app/globals.css`

**Spec applied in CSS**
- Mobile (<=480px): `36px` logo height target
- Tablet (481–1024px): `48px` logo height target
- Desktop (>=1025px): `60px` logo height target
- Clear space around logo: `0.5x` logo height via container padding

### B. Language Toggle + Persistence (Home page)
Language control updated to EN/KO/VI and persisted.

**New utility file**
- `/Users/mac/Documents/projects/soleil-infusion/src/lib/localization.ts`

**Home page behavior updated**
- `/Users/mac/Documents/projects/soleil-infusion/src/app/page.tsx`

Implemented behavior:
1. Supported languages: `en`, `ko`, `vi`
2. Initial resolution order:
   - `?lang=` URL param
   - `localStorage.preferred_locale`
   - browser language (`navigator.language`) mapped to supported locales
   - fallback `en`
3. Persistence:
   - `localStorage` (`preferred_locale`)
   - cookie (`preferred_locale`, 1 year)
4. URL sync:
   - non-English language writes `?lang=ko|vi`
   - English removes `lang` query

### C. Logo Applied to Additional Surfaces
Replaced direct image usage with `BrandLogo` in:
- `/Users/mac/Documents/projects/soleil-infusion/src/app/referral/page.tsx`
- `/Users/mac/Documents/projects/soleil-infusion/src/app/hub/page.tsx`
- `/Users/mac/Documents/projects/soleil-infusion/src/app/session-report/page.tsx`
- `/Users/mac/Documents/projects/soleil-infusion/src/app/page.tsx` (header/footer)

---

## 2) Current Repo Delta

Changed files:
- `/Users/mac/Documents/projects/soleil-infusion/src/app/globals.css`
- `/Users/mac/Documents/projects/soleil-infusion/src/app/hub/page.tsx`
- `/Users/mac/Documents/projects/soleil-infusion/src/app/page.tsx`
- `/Users/mac/Documents/projects/soleil-infusion/src/app/referral/page.tsx`
- `/Users/mac/Documents/projects/soleil-infusion/src/app/session-report/page.tsx`
- `/Users/mac/Documents/projects/soleil-infusion/src/components/BrandLogo.tsx`
- `/Users/mac/Documents/projects/soleil-infusion/src/lib/localization.ts`

Also present (currently unused in this pass):
- `/Users/mac/Documents/projects/soleil-infusion/src/components/LanguageSwitcher.tsx`

---

## 3) Validation Performed

### Passed
- `npx tsc --noEmit` passed successfully.

### Not fully verified
- `npm run build` repeatedly stalled at:
  - `Creating an optimized production build ...`
- Process was terminated and lock cleared to avoid stuck build state.

### Known unrelated lint debt (pre-existing)
- Repo has many lint errors in scripts/docs pages unrelated to this task (e.g., unescaped entities, require-style imports).
- These were not remediated in this implementation pass.

---

## 4) Open Issues / Gaps For Claude

1. **Language across pages is partial**
- Home page has active EN/KO/VI behavior.
- `referral`, `hub`, and `session-report` now share logo treatment but do not yet implement synchronized language toggle UX.

2. **URL structure requirement not fully met**
- Current language routing uses query param `?lang=`.
- Recommended SEO structure in requirement was `/en/...`, `/ko/...`, `/vi/...`.

3. **Build hang root cause unknown**
- Need diagnosis for Next build stalling in this environment.

4. **Naming mismatch from original ask**
- User asked “Atlases” logo; repo branding is Soleil only.
- Confirm whether Atlases assets/system should be introduced or Soleil is intended target.

---

## 5) Suggested Claude Analysis Tasks (Ordered)

### Task 1 — Hard verification of acceptance criteria
- Confirm responsive logo readability and dominance at mobile/tablet/desktop breakpoints.
- Confirm clear space is visually enforced and consistent.
- Confirm HiDPI sharpness with existing raster asset and recommend SVG migration if needed.

### Task 2 — Implement full language architecture
- Extend EN/KO/VI toggle to `referral`, `hub`, `session-report`.
- Choose one canonical approach:
  - A) query-param based (current), or
  - B) locale subpath routing (`/en`, `/ko`, `/vi`) with same-page mapping.
- Apply consistent persistence and fallback logic globally.

### Task 3 — Build pipeline diagnosis
- Investigate why `next build` hangs at optimized build stage.
- Provide reproducible root cause and fix.

### Task 4 — Cleanup and consolidation
- Remove or wire `LanguageSwitcher.tsx` consistently.
- Ensure no duplicated locale logic in page components.
- Move translation dictionaries toward shared module if expanding multilingual pages.

---

## 6) Prompt You Can Paste Into Claude

```text
Audit and finish the multilingual + logo-scaling implementation in this Next.js project.

Project root:
/Users/mac/Documents/projects/soleil-infusion

Start by reading:
- /Users/mac/Documents/projects/soleil-infusion/docs/CLAUDE_Handoff_Logo_Language_2026-02-28.md

Files changed in current pass:
- /Users/mac/Documents/projects/soleil-infusion/src/app/globals.css
- /Users/mac/Documents/projects/soleil-infusion/src/app/page.tsx
- /Users/mac/Documents/projects/soleil-infusion/src/app/referral/page.tsx
- /Users/mac/Documents/projects/soleil-infusion/src/app/hub/page.tsx
- /Users/mac/Documents/projects/soleil-infusion/src/app/session-report/page.tsx
- /Users/mac/Documents/projects/soleil-infusion/src/components/BrandLogo.tsx
- /Users/mac/Documents/projects/soleil-infusion/src/lib/localization.ts
- /Users/mac/Documents/projects/soleil-infusion/src/components/LanguageSwitcher.tsx

Goals:
1) Verify and finalize responsive logo behavior (mobile/tablet/desktop) and sharpness.
2) Implement robust EN/KO/VI switching across relevant pages with persistence.
3) Decide and implement canonical locale URL strategy (prefer /en /ko /vi if feasible).
4) Diagnose and fix the next build stall.
5) Return findings first, then exact code changes and validation output.

Constraints:
- Do not revert unrelated files.
- Keep changes minimal and production-safe.
- Include a final acceptance checklist mapping each requirement to PASS/FAIL with evidence.
```

---

## 7) Direct Answers User Requested (Current Repo State)

1. Logo location currently in this project: **header + footer on home page**, plus **header on referral/hub/session-report pages**.  
2. Platform: **custom Next.js app (App Router), not Webflow/WordPress/Shopify**.

