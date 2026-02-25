# GHL Foundation Setup Script

## Workflow Name
GHL Foundation Setup — Soleil Infusion

## What It Does & Why It Exists
This Node.js script provisions the foundational data layer in the Soleil Infusion GoHighLevel sub-account via the V1 REST API. It creates 20 custom contact fields (5 provider-type and 15 patient-type) and 6 custom values that are referenced by all 12 automation workflows. Without these fields and values in place, the workflows cannot function correctly. The script is idempotent — it safely skips any items that already exist, making it safe to re-run after any partial setup.

## Business Problem It Solves
Setting up GoHighLevel manually through the UI is error-prone and time-consuming. Field names must match exactly across all workflows, and typos or inconsistencies cause automation failures that are hard to debug. This script guarantees a consistent, repeatable baseline setup that can be verified and re-applied in minutes by any team member with API access.

## Benefits & Outcomes
- Eliminates 30-60 minutes of manual GHL UI configuration
- Guarantees field key naming consistency across all 12 workflows
- Provides immediate terminal feedback on which fields were created vs. already existed
- Reduces onboarding errors for new GHL sub-accounts
- Enables faster duplication of this setup for future Stone Systems clients

## Inputs & Outputs
**Inputs:**
- `GHL_API_KEY` — Location-scoped API key (stored in `.env.local`)
- `GHL_LOCATION_ID` — The GHL sub-account location ID (`OKIhS7IwmBqsinp4BOZV`)

**Outputs:**
- 5 Provider custom fields: NPI Number, Clinic Name, Preferred Communication, Portal Activation Date, Contract Signed Date
- 15 Patient custom fields: Pioneer Rx #, Formula ID, Prescriber Name, Prescriber NPI, Days Supply, Rx Expiration Date, Refill Count Remaining, Compound Type, Consent Signed Date, Payment Date, Shipped Date, Tracking Number, Shipment Carrier, Preferred Language, Auto-Refill Enrolled
- 6 Custom values (empty, to be populated in GHL UI): Secure Payment Link, Pharmacy Address, Pharmacy Phone, Pharmacy Hours, Portal Guide URL, Calendly Link
- Terminal log showing created / skipped / failed counts per category

## Dependencies
- **Runtime:** Node.js (v16+)
- **API:** GoHighLevel REST API V1 (`https://rest.gohighlevel.com/v1`)
- **Auth:** Location-scoped Bearer token in `GHL_API_KEY` environment variable
- **File:** `.env.local` in project root containing `GHL_API_KEY` and `GHL_LOCATION_ID`
- **Network:** Outbound HTTPS to `rest.gohighlevel.com`

## Automation Impact
- **Time saved:** 30-60 minutes of manual UI data entry per sub-account setup
- **Error reduction:** 100% — field keys are deterministic and consistent
- **Scalability:** Run once per new GHL sub-account; re-runnable for verification
- **Team dependency:** None after initial run — junior staff can execute without GHL UI training
