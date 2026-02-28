# GHL Build Session — Part 2
**Date:** February 23, 2026
**Session Focus:** API key resolution, V1 migration, live foundation setup, ChatGPT workflow builder prompt

---

## Session Summary

| Deliverable | Status |
|-------------|--------|
| Audit Gemini's API troubleshooting doc | Complete — diagnosis correct |
| Live API endpoint testing (V1 vs V2) | Complete — V1 confirmed working |
| Migrate all code to V1 API | Complete |
| Fix dropdown field bug in setup script | Fixed |
| Run setup script against live GHL account | **20 fields + 6 values created ✓** |
| ChatGPT Agent Mode workflow builder prompt | Built — all 7 workflows |
| Session PDF | This document |

---

## Part 1 — Gemini's Diagnosis Was Correct

Gemini identified that the JWT API key was being rejected with `{"statusCode":401,"message":"Invalid JWT"}` by the V2 API endpoint (`services.leadconnectorhq.com`).

**Root cause:** GHL has two API systems:
- **V1** (`rest.gohighlevel.com/v1`) — uses location-level JWT tokens, still fully functional
- **V2** (`services.leadconnectorhq.com`) — requires OAuth2 Private App tokens from Agency Settings

The key in `.env.local` is a valid V1 location token. Gemini correctly identified the issue and recommended either a V2 Private App setup or V1 fallback.

**Decision:** Use V1 now. All endpoints confirmed working. Upgrade to V2 when Thuy creates a Private App in Agency Settings (optional — V1 is not being deprecated in the short term).

---

## Part 2 — Live API Testing Results

All endpoints tested against the live Soleil Pharmacy GHL account:

| Endpoint | V2 Result | V1 Result |
|----------|-----------|-----------|
| `GET /locations/` | 401 Invalid JWT | 200 ✓ |
| `GET /contacts/` | 401 | 200 ✓ (15,880 contacts found) |
| `GET /pipelines/` | 401 | 200 ✓ (3 existing pipelines) |
| `GET /custom-fields/` | 401 | 200 ✓ (30 existing fields) |
| `GET /custom-values/` | 401 | 200 ✓ |
| `POST /custom-fields/` | 401 | 200 ✓ |
| `POST /custom-values/` | 401 | 200 ✓ |
| `POST /contacts/{id}/tags/` | 401 | 200 ✓ |
| `POST /contacts/{id}/workflow/{id}` | 401 | 200 ✓ |
| `POST /pipelines/{id}/opportunities/` | 401 | 200 ✓ |
| `PUT /pipelines/{id}/opportunities/{id}` | 401 | 200 ✓ |

**Existing account data found:**
- 15,880 contacts already in the system
- 3 pipelines (PGx, Pharmacogenomics, TrichoTest — none are our Rx pipelines yet)
- 30 existing custom fields (legacy fields from previous setup)

---

## Part 3 — Bugs Found & Fixed

### Bug 1 — Wrong V2 base URL across all code
All three files (`ghl.ts`, `ghl-setup.js`, webhook routes) were targeting `services.leadconnectorhq.com` with the `Version: 2021-07-28` header.

**Fix:** Changed to `rest.gohighlevel.com/v1`, removed `Version` header.

### Bug 2 — V1 opportunity endpoint is pipeline-scoped
V2 has a flat `/opportunities/` endpoint. V1 scopes opportunities under `/pipelines/{pipelineId}/opportunities/`.

**Fix:** Updated `createOpportunity` to use pipeline-scoped path. Added new `getOpportunityByContact(pipelineId, contactId)` function to find a contact's opportunity within a specific pipeline.

### Bug 3 — V1 opportunity update requires `title` + `status` in body
V2's PUT only needs the fields you're changing. V1's PUT body requires `title` and `status` even when only updating the stage.

**Fix:** Updated `updateOpportunityStage` signature to accept `currentTitle` and `currentStatus`. The webhook routes call `getOpportunityByContact` first to retrieve these values before calling the update.

### Bug 4 — V1 custom field/value creation: no `locationId` in body
V2 required `locationId` in the POST body. V1 scopes the location from the bearer token.

**Fix:** Removed `locationId` from all custom field/value POST bodies.

### Bug 5 — Dropdown fields used wrong property key
V1 custom field API uses `options` for picklist values. The setup script was sending `picklistOptions` (V2 format), causing 422 errors on 5 dropdown fields.

**Fix:** Changed `picklistOptions` → `options` in setup script.

---

## Part 4 — What Was Created in Live GHL

`node scripts/ghl-setup.js` ran successfully against the live Soleil Pharmacy account.

### Custom Fields Created (20 total)

**Provider Fields (5):**
| Field Name | GHL Key |
|-----------|---------|
| NPI Number | `contact.npi_number` |
| Clinic Name | `contact.clinic_name` |
| Preferred Communication | `contact.preferred_communication` |
| Portal Activation Date | `contact.portal_activation_date` |
| Contract Signed Date | `contact.contract_signed_date` |

**Patient Fields (15):**
| Field Name | GHL Key |
|-----------|---------|
| Pioneer Rx # | `contact.pioneer_rx_` |
| Formula ID | `contact.formula_id` |
| Prescriber Name | `contact.prescriber_name` |
| Prescriber NPI | `contact.prescriber_npi` |
| Days Supply | `contact.days_supply` |
| Rx Expiration Date | `contact.rx_expiration_date` |
| Refill Count Remaining | `contact.refill_count_remaining` |
| Compound Type | `contact.compound_type` |
| Consent Signed Date | `contact.consent_signed_date` |
| Payment Date | `contact.payment_date` |
| Shipped Date | `contact.shipped_date` |
| Tracking Number | `contact.tracking_number` |
| Shipment Carrier | `contact.shipment_carrier` |
| Preferred Language | `contact.preferred_language` |
| Auto-Refill Enrolled | `contact.autorefill_enrolled` |

### Custom Values Created (6 total)

| Name | GHL Template Variable |
|------|----------------------|
| Secure Payment Link | `{{custom_values.secure_payment_link}}` |
| Pharmacy Address | `{{custom_values.pharmacy_address}}` |
| Pharmacy Phone | `{{custom_values.pharmacy_phone}}` |
| Pharmacy Hours | `{{custom_values.pharmacy_hours}}` |
| Portal Guide URL | `{{custom_values.portal_guide_url}}` |
| Calendly Link | `{{custom_values.calendly_link}}` |

> **Action required:** Go to GHL Settings → Custom Values and populate each one with the real URL/content.

---

## Part 5 — Code Files Updated

### `src/lib/ghl.ts`
Complete V1 rewrite. Key changes:
- Base URL: `https://rest.gohighlevel.com/v1`
- Removed `Version` header
- `createOpportunity`: now uses `/pipelines/{id}/opportunities/` path with V1 field names (`stageId` not `pipelineStageId`)
- New function: `getOpportunityByContact(pipelineId, contactId)` — finds opportunity by contact within a pipeline
- `updateOpportunityStage`: new signature `(pipelineId, opportunityId, stageId, currentTitle, currentStatus)`
- `createCustomField`: removed `locationId` + `model` from body, uses `options` for picklist
- `createCustomValue`: removed `locationId` from body
- TypeScript check: 0 errors ✓

### `src/app/api/webhooks/pioneer/route.ts`
Updated to use new `getOpportunityByContact` + new `updateOpportunityStage` signature.

### `src/app/api/webhooks/payment/route.ts`
Updated to use new `getOpportunityByContact` + new `updateOpportunityStage` signature.

### `scripts/ghl-setup.js`
Updated to V1 endpoints. Added pre-flight check against existing fields/values (idempotent). Fixed `picklistOptions` → `options`. Script is fully functional and confirmed working.

---

## Part 6 — ChatGPT Agent Mode Prompt

`docs/ChatGPT_GHL_Workflow_Builder_Prompt.md` + `.pdf`

Contains:
- **Master Context Block** — paste once at the start of the ChatGPT session
- **Step 0** — creates both pipelines
- **Workflow 1** — B2B Lead Nurture & Onboarding (10 nodes)
- **Workflow 2** — Rx Intake & Pharmacist Alert (8 nodes)
- **Workflow 3** — Patient Payment & Consent Chase (15 nodes) ← build first
- **Workflow 4A** — Compounding Started notification
- **Workflow 4B** — Order Shipped notification
- **Workflow 4C** — Ready for Pickup notification
- **Workflow 5** — Refill Reminder Dynamic (9 nodes)
- **Workflow 6** — Legacy Fax Exception (7 nodes)
- **Workflow 7** — Provider Portal Onboarding (9 nodes)
- **Final Verification Checklist**

**How to use:** Open ChatGPT agent mode → logged into GHL → paste Master Context → paste one workflow at a time → verify before next.

---

## Part 7 — Complete Project Status

### Done (via API — live in GHL now)
- [x] 20 custom fields created
- [x] 6 custom values created (need to be populated with real content)
- [x] Webhook receiver: Pioneer Rx → GHL (`/api/webhooks/pioneer`)
- [x] Webhook receiver: Payment confirmation → GHL (`/api/webhooks/payment`)

### In Progress (needs ChatGPT agent or manual GHL UI)
- [ ] Create 2 pipelines (Step 0 in ChatGPT prompt — 10 min)
- [ ] Build 7 workflows in GHL Automation UI

### Still Required in GHL UI
- [ ] HIPAA mode ON + BAA signed
- [ ] Populate 6 Custom Values with real URLs
- [ ] 10DLC SMS registration
- [ ] Set `PIONEER_WEBHOOK_SECRET` in `.env.local`
- [ ] Set `STRIPE_WEBHOOK_SECRET` in `.env.local`

### For V2 Upgrade (Optional — future)
- Go to GHL Agency Settings → App Marketplace → Create Private App
- Scope permissions: contacts, opportunities, customFields, customValues, workflows
- Replace `GHL_API_KEY` in `.env.local` with the new token
- Update `BASE_URL` in `src/lib/ghl.ts` to `https://services.leadconnectorhq.com`
- Add `Version: 2021-07-28` back to headers

---

## Documents in This Project

| File | Description |
|------|-------------|
| `docs/GHL_Automation_Blueprint_v2.pdf` | Full automation blueprint — 7 workflows, AI prompts |
| `docs/GHL_Foundation_Setup_Guide.pdf` | Click-by-click GHL UI setup |
| `docs/GHL_Build_Session_Feb23.pdf` | Session 1 recap |
| `docs/GHL_Build_Session_Feb23_Part2.pdf` | This document |
| `docs/ChatGPT_GHL_Workflow_Builder_Prompt.pdf` | Prompt for ChatGPT agent to build all 7 workflows |

---

## Code Structure

```
soleil-infusion/
├── src/
│   ├── lib/
│   │   └── ghl.ts                    ← GHL V1 API client
│   └── app/
│       └── api/
│           └── webhooks/
│               ├── pioneer/route.ts  ← Pioneer Rx intake
│               └── payment/route.ts  ← Stripe payment confirmation
├── scripts/
│   └── ghl-setup.js                  ← Run once — creates fields/values
└── .env.local                        ← API credentials
```
