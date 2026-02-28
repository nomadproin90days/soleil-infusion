# Gemini Handoff — Phase 2: Functionality & Localization
**Project:** Soleil Infusion (Next.js / App Router)
**Date:** 2026-02-28
**Status:** Build Passing (v16.1.6 Turbopack)

---

## 1) Recent Major Updates

### 🌍 Global Localization (EN/KO/VI)
- **Home Page**: Fully localized with all content in `TRANSLATIONS` constant.
- **Internal Pages**: The **Hub**, **Referral**, **Session Report**, and the new **Intake** page now have external translation modules in `src/lib/translations/`.
- **Language Switcher**: Fully wired across all routes, persisting via `localStorage`, cookies, and URL query params.

### 📋 Prescription Intake & Partner Discovery
- **New Page (`/intake`)**: Dedicated high-height (2115px) HIPAA-compliant prescription intake form (`3hXlVkwkuGCoLTkHA6d5`).
- **Referral Section Update**: Added a **Partnership Discovery Call** section to `/referral` featuring a new GHL calendar (`BmauXC3RW6J6IQDl0fEc`).
- **Inquiry Section**: Added a **General Inquiry** section to the home page (`/#inquiry`) using the Soleil IV Infusions form (`TD6hYijKkRFiwxR39U9B`).

### ⚙️ Infrastructure & Componentry
- **GHLForm Component**: Replaced the placeholder with a production-ready, localized component that dynamically renders GHL iframes and handles the `form_embed.js` script correctly via `next/script`.
- **SEO Metadata**: Optimized `src/app/layout.tsx` with specific Glen Burnie/Maryland keywords and moved viewport settings to the standalone `Viewport` export to satisfy Next.js standards.

---

## 2) Current Architecture

- **Translations**: `src/lib/translations/*.ts` — modularized per page.
- **Routing**: Next.js App Router. Localization is currently query-param based (`?lang=ko`).
- **GHL Integration**: Purely through `<iframe>` embeds and `form_embed.js` for height management.
- **Branding**: Locked Dove Gray (#646464) and Regent St Blue (#A6C7E7) palette.

---

## 3) Outstanding Tasks

| Task | Priority | Context |
|---|---|---|
| **GHL Web Chat** | High | Embed the GHL web chat widget into `src/app/layout.tsx`. (Widget ID currently unknown). |
| **Locale Subpaths** | Low | Migrate from `?lang=` to `/ko/` subpath routing for better SEO. |
| **Build Stability** | Medium | Build is currently stable, but Turbopack/Next 16 can be sensitive to nested quote escaping in translation files. |

---

## 4) Gemini Next Steps

1. **Verify Localization Completeness**: Audit the Korean and Vietnamese strings in `src/lib/translations/` for any missing business-specific nuances.
2. **Implement GHL Web Chat**: Once the widget ID is obtained, add the script to the root layout.
3. **Advanced SEO**: Add JSON-LD schema (FAQPage or LocalBusiness) to `src/app/page.tsx` for Glen Burnie rich results.
