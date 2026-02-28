# Claude Architectural Handoff — Phase 2: System Expansion
**Project:** Soleil Infusion (Next.js / App Router)
**Date:** 2026-02-28
**Purpose:** Strategic handoff to Claude for complex refactoring, UX auditing, and service-layer expansion.

---

## 1) Core Architectural Shifts

### 🧱 Modular Localization Engine
We have shifted from a purely inline `TRANSLATIONS` pattern to a modular approach.
- **New Directory**: `src/lib/translations/` contains page-specific translation modules (Hub, Referral, Session-Report, Intake).
- **Status**: The Home Page (`src/app/page.tsx`) still uses an **inline** `TRANSLATIONS` object. This is a primary candidate for refactoring to match the new modular pattern.
- **Language Switcher**: Now fully wired into the page-level state. Claude should verify the consistency of this implementation across the five active routes.

### 💉 Service-Layer Expansion: The Intake Portal
We have added a high-priority route: `/intake`.
- **Purpose**: A dedicated HIPAA-compliant clinical intake form (ID: `3hXlVkwkuGCoLTkHA6d5`).
- **Design Pattern**: This page follows the boutique medical aesthetic but requires a much higher `min-h` (2115px) to accommodate the comprehensive prescription form.

### 🔗 Standardized GHL Integration
The component `src/components/GHLForm.tsx` has been promoted from a placeholder to a production-safe embed wrapper.
- **Features**: Automatically handles `next/script` injection for GHL's `form_embed.js` logic and provides localized titles/aria-labels.
- **Current Usage**: Used in `/intake`, `/referral`, and the new `#inquiry` section on the home page.

---

## 2) Repository State & Build Health

| Metric | Status | Claude's Focus |
|---|---|---|
| **Build Stability** | PASS (Next 16) | Monitor Turbopack parsing of nested template literals/quotes. |
| **Type Safety** | Clean | Ensure `Locale` type is respected across new translation modules. |
| **SEO State** | Improved | Glen Burnie keywords added. Viewport moved to `Viewport` export. |
| **UX Consistency** | B+ | Localized strings added, but some "Book" sections need final content polish. |

---

## 3) Strategic "Claude Tasks" (Reasoning & Implementation)

### Task A — Home Page Refactor (Architectural Consistency)
- **Goal**: De-clutter `src/app/page.tsx` by moving its massive `TRANSLATIONS` object into `src/lib/translations/home.ts`.
- **Reasoning**: This maintains the project's scalability for future language additions (e.g., Spanish).

### Task B — UX Audit of the Booking & Inquiry Funnel
- **Context**: The home page now has three distinct conversion points:
  1. **New Patient Booking** (Widget: `vi5Ov0XkJLgD8z8jFWS5`)
  2. **Returning Patient Booking** (Widget: `C7UK0IcC9vyLJmxCYWUV`)
  3. **General Inquiry Form** (Widget: `TD6hYijKkRFiwxR39U9B`)
- **Reasoning**: Use Claude's reasoning to assess if these paths are clear and if the transition between "Booking" and "Inquiry" feels intuitive for the user.

### Task C — GHL Web Chat Integration
- **Goal**: Implement the chat widget in `src/app/layout.tsx`.
- **Requirement**: Once the widget ID is provided, implement it using `next/script` while ensuring it doesn't degrade the Lighthouse Performance score of the boutique-style landing page.

---

## 4) GHL Widget Matrix for Claude

| Page | Widget Type | Widget ID | Base URL |
|---|---|---|---|
| `/` (Booking) | Calendar | `vi5Ov0XkJLgD8z8jFWS5` (New) | `api.voshellspharmacy.com` |
| `/` (Booking) | Calendar | `C7UK0IcC9vyLJmxCYWUV` (Return) | `api.voshellspharmacy.com` |
| `/#inquiry` | Form | `TD6hYijKkRFiwxR39U9B` | `api.voshellspharmacy.com` |
| `/intake` | Form | `3hXlVkwkuGCoLTkHA6d5` | `api.voshellspharmacy.com` |
| `/referral` | Form | `vidpgunEF5sDUTl0wVyU` | `api.voshellspharmacy.com` |
| `/referral` | Calendar | `BmauXC3RW6J6IQDl0fEc` (Partner) | `api.voshellspharmacy.com` |

---

## 5) Validation Routine

Claude is encouraged to run:
1. `npm run build` to confirm the Turbopack optimizer handles all localized JSON without error.
2. `npx tsc --noEmit` to verify that the `t` object in all components aligns with the translation types.
