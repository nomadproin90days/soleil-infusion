# GHL Automation Build Session — Soleil Pharmacy
**Date:** February 23, 2026
**Goal:** Audit Gemini's work, fix errors, and build the automation foundation using agents.

---

## Session Summary

| Deliverable | Status |
|-------------|--------|
| Audit Gemini's Blueprint v1 | Complete — 10 gaps found |
| GHL Automation Blueprint v2 | Built & exported to PDF |
| Audit Gemini's Workflow Setup Session | Complete — 5 bugs + corrupted credentials found |
| Fix `.env.local` credentials | Fixed |
| GHL Foundation Setup Guide | Built & exported to PDF |
| GHL API Client (`src/lib/ghl.ts`) | Built — TypeScript, 0 errors |
| Foundation Setup Script (`scripts/ghl-setup.js`) | Built — run once via Node |
| Pioneer Rx Webhook (`/api/webhooks/pioneer`) | Built |
| Payment Confirmation Webhook (`/api/webhooks/payment`) | Built |

---

## Part 1 — Blueprint Audit (Gemini v1 → v2)

### What Gemini Got Right
- Correct 7-stage prescription journey overview
- HIPAA awareness (BAA requirement, PHI rules)
- Pioneer Rx correctly identified as source of truth
- Phased build order (revenue first)

### 10 Gaps Fixed in v2

**Bug 1 — Missing `Pharmacist Review` pipeline stage**
Gemini's Patient Rx Fulfillment Pipeline jumped directly from `Rx Received → Pending Payment`, skipping pharmacist verification entirely. This means payment requests would fire before a pharmacist reviewed the prescription — a clinical and compliance violation.

**Fix:** Added `Pharmacist Review` as a mandatory stage between `Rx Received` and `Pending Payment`.

**Bug 2 — Refill trigger hardcoded at +21 days**
The refill reminder workflow was hardcoded to fire 21 days after shipping, assuming every patient is on a 30-day supply. Soleil compounds 30, 60, and 90-day supplies.

**Fix:** Made refill trigger dynamic: `(Days Supply - 9)` days after `Shipped Date`, using a new `Days Supply` custom field.

**Bug 3 — No `Rx Expiration Date` field**
Without this field, refill reminders fire indefinitely on expired prescriptions.

**Fix:** Added `Rx Expiration Date` field with a guard check at the start of the refill workflow.

**Bug 4 — No `Refill Count Remaining` field**
No way to distinguish "authorized refills remain" from "needs new Rx." The refill workflow would prompt patients even when their provider hadn't authorized any refills.

**Fix:** Added `Refill Count Remaining` field. When = 0, workflow routes to `New-Rx-Required` flow instead of refill prompt.

**Bug 5 — Missing `Contract Signed` stage in B2B pipeline**
An independent contractor agreement is now in use. No stage existed to track contract execution before portal activation.

**Fix:** Added `Contract Signed` between `Credentialing` and `Portal Activated`.

**Bug 6 — Missing critical custom fields (8 fields)**
Missing: `Prescriber NPI`, `Days Supply`, `Rx Expiration Date`, `Refill Count Remaining`, `Compound Type`, `Consent Signed Date`, `Payment Date`, `Shipped Date`, `Preferred Language`.

**Fix:** All added to complete custom fields spec.

**Bug 7 — Missing critical tags (6 tags)**
Missing: `Consent-Signed`, `Auto-Refill-Enrolled`, `Refill-Auth-Active`, `New-Rx-Required`, `Korean-Language`, `Rx-Expired`.

**Fix:** Full tag taxonomy defined (14 patient tags, 6 provider tags).

**Bug 8 — No SLA escalation logic**
No trigger to alert Thuy or the pharmacist if an Rx sits in `Pharmacist Review` for more than 2 hours.

**Fix:** Added 2-hour SLA escalation node to the Rx Intake workflow.

**Bug 9 — Only 1 of 7 AI prompts was included**
Gemini only provided a prompt for the Payment Chase workflow. The other 6 workflows had no prompts.

**Fix:** 7 copy-paste AI prompts — one per workflow — added to Blueprint v2.

**Bug 10 — No Legacy Fax exception workflow**
During the transition period Thuy referenced, providers will still fax. No workflow existed to handle this and route them toward portal training.

**Fix:** Full Legacy Fax Exception workflow (Workflow 6) added.

---

## Part 2 — Workflow Session Audit (Gemini's GHL Setup Doc)

### Credentials Were Corrupted

Gemini wrote placeholder/corrupted values to `.env.local`:

| Field | Gemini's value (wrong) | Correct value |
|-------|----------------------|---------------|
| `GHL_API_KEY` | Corrupted JWT (multiple char substitutions) | Correct JWT from PDF |
| `GHL_LOCATION_ID` | `OKIhS7OwBMqrlyncP4B1pY` (placeholder) | `OKIhS7IwmBqsinp4BOzV` |
| `GHL_COMPANY_ID` | `HKQGET3ozZsjJm1PHvfas` (placeholder) | `HKCGEOz3ZsjJmOHPhvas` |

**All three corrected in `.env.local`.**

### 5 Workflow Bugs Found

**Bug 1 — `Stop on Response = OFF` is a TCPA violation**
Gemini set this to OFF, reasoning that the If/Else payment check handles exits. But the If/Else only checks for a tag — it doesn't respond to inbound patient replies. If a patient texts "STOP", the workflow ignores it and keeps sending. This violates TCPA opt-out requirements.

**Fix:** `Stop on Response = ON`. The payment check If/Else still handles the paid exit correctly.

**Bug 2 — No opening `Payment-Pending` tag action**
The workflow begins immediately with an SMS but never adds the `Payment-Pending` tag. This means the tag-based If/Else conditions at Nodes 4 and 8 have no baseline to check against.

**Fix:** Add `Tag Contact: Payment-Pending` as Node 0 before the first SMS.

**Bug 3 — Payment success nodes (5 & 9) do nothing beyond ending the workflow**
When `Payment-Complete` is detected, the workflow just removes the contact. Missing:
- Add tag `Consent-Signed`
- Set custom field `Consent Signed Date` = today
- Move pipeline stage → `Compounding`

Without this, a paid patient silently falls off the workflow with no pipeline movement.

**Fix:** Added all three actions to both success exit nodes.

**Bug 4 — No email reminder at the 48-hour mark**
Node 6 sends only an SMS reminder. The blueprint specifies both SMS and email at every outreach touch.

**Fix:** Add `Send Email: Payment Reminder` node alongside Node 6.

**Bug 5 — `{{custom_values.secure_payment_link}}` renders blank if not created first**
If the Custom Value doesn't exist in GHL Settings, patients receive an SMS with a blank link. The workflow will activate and send broken messages.

**Fix:** Custom Value setup is Step 1 in the Foundation Setup Guide — must be done before any workflow goes live.

---

## Part 3 — What Agents Can and Can't Do

After checking the GHL API v2 documentation:

### Automatable via API (agents handle this)
| Task | Method |
|------|--------|
| Create custom fields | `POST /locations/{id}/customFields` |
| Create custom values | `POST /locations/{id}/customValues` |
| Create/update contacts | `POST /contacts/` |
| Add/remove tags | `POST /contacts/{id}/tags` |
| Move pipeline stages | `PUT /opportunities/{id}` |
| Create opportunities | `POST /opportunities/` |
| Add contacts to workflows | `POST /contacts/{id}/workflow/{id}` |

### Requires GHL UI (not in API yet)
| Task | Why |
|------|-----|
| Create pipelines + stages | Open feature request — not in API |
| Build workflow node logic | Open feature request — not in API |
| Enable HIPAA mode + sign BAA | UI/legal process only |
| 10DLC SMS registration | UI/carrier process only |

---

## Part 4 — Code Built This Session

### File Structure
```
soleil-infusion/
├── src/
│   ├── lib/
│   │   └── ghl.ts                          ← GHL API client (shared)
│   └── app/
│       └── api/
│           └── webhooks/
│               ├── pioneer/
│               │   └── route.ts            ← Pioneer Rx intake webhook
│               └── payment/
│                   └── route.ts            ← Payment confirmation webhook
├── scripts/
│   └── ghl-setup.js                        ← One-time foundation setup
└── .env.local                              ← Credentials (corrected)
```

---

### `src/lib/ghl.ts` — GHL API Client

Shared TypeScript library used by both webhook routes.

**Exports:**
- `searchContact(query)` — find contact by email or phone
- `createContact(contact)` — create new GHL contact
- `updateContact(id, fields)` — update existing contact
- `upsertContact(contact)` — find-or-create (used by Pioneer webhook)
- `addTags(contactId, tags)` — add tags to contact
- `removeTags(contactId, tags)` — remove tags from contact
- `getPipelines()` — list all pipelines with stages
- `getPipelineStageId(pipeline, stage)` — look up IDs by name (no hardcoded IDs)
- `createOpportunity(opp)` — open new opportunity in a pipeline
- `updateOpportunityStage(oppId, stageId)` — move pipeline card
- `addContactToWorkflow(contactId, workflowId)` — enrol contact in workflow
- `createCustomField(field)` — create a custom field (used by setup script)
- `createCustomValue(name, value)` — create a custom value (used by setup script)
- `addNote(contactId, body)` — add internal note (no PHI in titles)

---

### `scripts/ghl-setup.js` — One-Time Foundation Setup

Run once to bootstrap the GHL account. No dependencies — uses native Node.js `fetch`.

```bash
node scripts/ghl-setup.js
```

**What it creates:**

*5 Provider Custom Fields:*
NPI Number, Clinic Name, Preferred Communication, Portal Activation Date, Contract Signed Date

*15 Patient Custom Fields:*
Pioneer Rx #, Formula ID, Prescriber Name, Prescriber NPI, Days Supply, Rx Expiration Date, Refill Count Remaining, Compound Type, Consent Signed Date, Payment Date, Shipped Date, Tracking Number, Shipment Carrier, Preferred Language, Auto-Refill Enrolled

*6 Custom Values (account-level variables):*
Secure Payment Link, Pharmacy Address, Pharmacy Phone, Pharmacy Hours, Portal Guide URL, Calendly Link

**Safe to re-run** — skips anything that already exists.

**Output after running:**
```
╔════════════════════════════════════════════╗
║   GHL Foundation Setup — Soleil Pharmacy   ║
╚════════════════════════════════════════════╝
🔐  Verifying API connection...
✅  Connected to location: Soleil Pharmacy

📋  Creating Provider custom fields...
✅  Created: NPI Number
✅  Created: Clinic Name
...

╔════════════════════════════════════════════╗
║   Setup Complete                           ║
╚════════════════════════════════════════════╝

⚠️   Still required in GHL UI:
    1. Enable HIPAA mode + sign BAA
    2. Create pipelines
    3. Build workflow logic
    4. Register 10DLC phone number
    5. Populate Custom Values with real URLs
```

---

### `src/app/api/webhooks/pioneer/route.ts` — Pioneer Rx Webhook

**Endpoint:** `POST /api/webhooks/pioneer`

**Authentication:** `x-pioneer-secret` header (shared secret)

**Handles two scenarios:**

*New Rx (`status: "new"`):*
1. Upserts patient contact with all Rx custom fields
2. Creates opportunity in Patient Rx Fulfillment Pipeline at `Pharmacist Review`
3. Tags: `Rx-Received`, `Pharmacist-Review-Pending`
4. Adds internal note with Rx details

*Status update (`status: "verified" | "compounding_complete" | "shipped" | "ready_for_pickup"`):*
1. Updates contact custom fields
2. Moves pipeline stage to match Pioneer status
3. Updates tags accordingly
4. Adds shipping note if tracking number present

**Pioneer status → GHL stage mapping:**
| Pioneer status | GHL Pipeline Stage |
|---------------|-------------------|
| `verified` | Pharmacist Review |
| `compounding_complete` | Compounding |
| `shipped` | Shipped |
| `ready_for_pickup` | Ready for Pickup |

---

### `src/app/api/webhooks/payment/route.ts` — Payment Confirmation Webhook

**Endpoint:** `POST /api/webhooks/payment`

**Authentication:** Stripe `stripe-signature` header

**Trigger:** Stripe `payment_intent.succeeded` event

**Required Stripe metadata** (set when creating payment intent):
- `patientEmail` or `patientPhone` — used to find GHL contact
- `pioneerRxNumber` — for logging

**What it does on successful payment:**
1. Finds patient contact by email/phone
2. Sets `payment_date` and `consent_signed_date` = today
3. Adds tags: `Payment-Complete`, `Consent-Signed`
4. Removes tag: `Payment-Pending`
5. Moves pipeline opportunity → `Compounding`

---

## Part 5 — Environment Variables

`.env.local` (complete, corrected):
```
GHL_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.[payload].[signature]
GHL_LOCATION_ID=OKIhS7IwmBqsinp4BOzV
GHL_COMPANY_ID=HKCGEOz3ZsjJmOHPhvas

# Set these before going live:
PIONEER_WEBHOOK_SECRET=replace_with_shared_secret_from_pioneer
STRIPE_WEBHOOK_SECRET=replace_with_stripe_signing_secret
```

> Note: Full API key stored in `.env.local` only. Never commit this file.

---

## Part 6 — What To Do Next (In Order)

### Immediate (Before Any Workflows Go Live)

- [ ] **Run the setup script:** `node scripts/ghl-setup.js`
- [ ] **GHL UI — HIPAA Mode:** Settings → Business Profile → Enable HIPAA → Sign BAA
- [ ] **GHL UI — Create B2B Pipeline:**
  `Lead → Contacted → Demo Scheduled → Credentialing → Contract Signed → Portal Activated`
- [ ] **GHL UI — Create Patient Rx Pipeline:**
  `Rx Received → Pharmacist Review → Pending Payment → Compounding → Ready for Pickup / Shipped → Complete`
- [ ] **GHL UI — Populate Custom Values** with real payment link, address, phone, hours, etc.
- [ ] **GHL UI — Build Workflow 3** (Payment Chase) using corrected node logic from Blueprint v2
- [ ] **Set `PIONEER_WEBHOOK_SECRET`** — agree on shared secret with Pioneer team
- [ ] **Set `STRIPE_WEBHOOK_SECRET`** — from Stripe Dashboard → Webhooks

### After Go-Live
- [ ] Register 10DLC SMS number (Settings → Phone Numbers)
- [ ] Build remaining 6 workflows in GHL UI (see Blueprint v2 for prompts)
- [ ] Configure Pioneer Rx to POST to `/api/webhooks/pioneer`
- [ ] Configure Stripe to POST to `/api/webhooks/payment`

---

## Documents Produced This Session

| File | Description |
|------|-------------|
| `docs/GHL_Automation_Blueprint_v2.pdf` | Full corrected automation blueprint with 7 workflows + AI prompts |
| `docs/GHL_Foundation_Setup_Guide.pdf` | Click-by-click GHL UI setup guide (8 steps + checklist) |
| `docs/GHL_Build_Session_Feb23.pdf` | This document |
