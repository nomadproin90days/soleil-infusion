# Codex Engineering Handoff — Soleil Infusion (Next.js 16/Turbopack)
**Project:** Soleil Infusion LLC
**Date:** 2026-02-28
**Purpose:** Direct implementation and execution on the Next.js App Router codebase.

---

## 1) Execution Focus (Codex Strengths)

### 🛠️ Production Ready Features
The project is in a stable, build-passing state. Any new feature should include:
- **Full Localization**: EN/KO/VI translations added to `src/lib/translations/*.ts`.
- **Responsive Layouts**: Consistent with existing mobile-first `BrandLogo` and `GHLForm` patterns.
- **TypeScript Safety**: Zero `any` types; all `t` objects must have complete keys to avoid build failures.

### 🧪 Debugging & Build Stability
- **Current Next.js Version**: `16.1.6 (Turbopack)`.
- **Known Pitfalls**: Turbopack currently breaks on nested double quotes in JSON/JS objects (e.g., `""Quote""` within a string). Always use escaped quotes `"` or single quotes.
- **Viewport Warning**: Next.js 14/15/16 requires a standalone `export const viewport: Viewport = {...}`. Do not include `viewport` in the `metadata` object.

---

## 2) Repository Map & Critical Routes

| Path | Purpose | Key Components |
|---|---|---|
| `src/app/page.tsx` | Main Website | Booking section, Home Page translations |
| `src/app/intake/page.tsx` | Prescription Form | ID: `3hXlVkwkuGCoLTkHA6d5` (Height 2115px) |
| `src/app/referral/page.tsx` | B2B Partner Portal | Discovery Call section (Widget ID: `BmauXC3RW6J6IQDl0fEc`) |
| `src/app/hub/page.tsx` | Admin Docs / Resource Hub | Lists all internal documentation |
| `src/lib/translations/` | **Translation Modules** | Separate files for Hub, Referral, Session-Report, and Intake |

---

## 3) Immediate Engineering Backlog

### Task 1 — GHL Web Chat Widget
- **Goal**: Add GHL web chat to `src/app/layout.tsx`.
- **Requirement**: Use `next/script` with `strategy="afterInteractive"`.
- **GHL Context**: The widget ID is currently unavailable. **Wait for user to provide widget ID** before implementing.

### Task 2 — SEO JSON-LD Integration
- **Goal**: Implement `LocalBusiness` schema for the Glen Burnie location.
- **Requirement**: Add `generateMetadata` or static JSON-LD script to `src/app/page.tsx`.

### Task 3 — Audit & Refactor `TRANSLATIONS` in `page.tsx`
- **Goal**: The home page currently has its translations inline.
- **Requirement**: Move the `TRANSLATIONS` object from `src/app/page.tsx` into a dedicated file: `src/lib/translations/home.ts` for architectural consistency.

---

## 4) Validation Commands

Codex should run these after every significant change to confirm stability:
1. `npx tsc --noEmit` — Confirm type safety.
2. `npm run build` — Confirm Turbopack build passes without quote-parsing errors.
3. `next lint` — Check for unused imports (e.g., `lucide-react` debt).
