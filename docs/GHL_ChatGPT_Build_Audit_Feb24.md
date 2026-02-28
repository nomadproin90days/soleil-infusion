# GHL Workflow Build Audit — ChatGPT Agent Mode Session
**Date:** February 24, 2026
**Auditor:** Claude (AI Code Assistant)
**Subject:** Review of ChatGPT Agent Mode GHL workflow build session

---

## Executive Summary

ChatGPT successfully built the two pipelines and started 3 of 7 required workflows. However, the build contains **10 bugs**, **1 incomplete workflow**, and **4 workflows not started**. The system cannot go live as-is. This document catalogs every issue and provides a corrected continuation prompt to finish the build.

---

## What ChatGPT Built

| Item | Status | Issues Found |
|------|--------|-------------|
| B2B Provider Sales Pipeline | ✓ Built | None confirmed |
| Patient Rx Fulfillment Pipeline | ✓ Built | None confirmed |
| Workflow 1 — B2B Lead Nurture | ✓ Draft saved | 2 bugs |
| Workflow 2 — Rx Intake & Pharmacist Alert | ✓ Draft saved | 3 bugs |
| Workflow 3 — Payment & Consent Chase | ⚠ Incomplete | Stopped mid-build — 2 branches missing |
| Workflow 4A — Compounding Started | ✗ Not built | — |
| Workflow 4B — Order Shipped | ✗ Not built | — |
| Workflow 4C — Ready for Pickup | ✗ Not built | — |
| Workflow 5 — Refill Reminder | ✗ Not built | — |
| Workflow 6 — Legacy Fax Exception | ✗ Not built | — |
| Workflow 7 — Provider Portal Onboarding | ✗ Not built | — |
| Session PDF | ✗ Fake | File is 2.6KB — ChatGPT hallucinated a download link |

---

## Bug Report

### BUG 1 — Wrong Payment Link Variable (Critical — affects all 3 built workflows)

**Where:** Workflow 2 Node 3 and Workflow 3 Nodes 2, 3, 7, 11
**What ChatGPT used:** `{{custom_values.payment_link}}`
**What is correct:** `{{custom_values.secure_payment_link}}`

The correct key was specified in the Master Context Block. Using the wrong key means the payment URL will be blank in every SMS and email sent to patients. Patients will receive messages with an empty link and be unable to pay.

**Fix:** Open each workflow, find every occurrence of `{{custom_values.payment_link}}`, and replace with `{{custom_values.secure_payment_link}}`.

---

### BUG 2 — Workflow 2: Pioneer Rx # Field Hardcoded (Critical)

**Where:** Workflow 2, Node 2 (Update Contact Field)
**What ChatGPT did:** Set the `contact.pioneer_rx_` field value to the literal string `"Rx Received"` instead of a dynamic value from the webhook/trigger.
**What should happen:** The field should map to `{{contact.pioneer_rx_}}` (the value coming in from the Pioneer Rx webhook payload).

This means every patient will have `"Rx Received"` written into their Rx number field, destroying the real data and breaking the pharmacist notification in Node 5 which displays `{{contact.pioneer_rx_}}`.

**Fix:** In Node 2, change the field value from the static string "Rx Received" to `{{contact.pioneer_rx_}}` or remove the static update entirely (the webhook handler already sets this field before the pipeline stage is changed).

---

### BUG 3 — Workflow 2: Internal Pharmacist Notification Missing (Critical)

**Where:** Workflow 2 — Node 5 should be an internal email to the pharmacist
**What ChatGPT did:** Node 5 appears to have been skipped or merged. The build went from Node 4 (Add Tag) directly to Node 6 (Wait 2 Hours) with no pharmacist notification in between.
**What should happen:** An internal email should fire immediately when a new Rx is received, alerting the pharmacist with the Pioneer Rx #, Formula ID, and patient contact ID.

This means pharmacists won't be notified of new prescriptions — a critical patient safety gap.

**Fix:** Add a Send Email node between Node 4 and the Wait node:
- To: [pharmacist email]
- Subject: New Rx Ready for Review
- Body: Pioneer Rx #: `{{contact.pioneer_rx_}}` | Formula: `{{contact.formula_id}}` | Patient: `{{contact.first_name}}` (ID: `{{contact.id}}`) | Please review and move to Pending Payment.

---

### BUG 4 — Workflow 2: Escalation Email Sent to "ryan C" Instead of Pharmacist

**Where:** Workflow 2, Node 8 (escalation after 2-hour review delay)
**What ChatGPT did:** Set the recipient to "ryan C" (likely the account admin user it found in the system).
**What should happen:** The escalation email goes to the pharmacist AND Thuy (pharmacy director), not the sales/admin contact.

**Fix:** Change the recipient from "ryan C" to the pharmacist's email address + Thuy's email address.

---

### BUG 5 — Workflow 3: "Paid & Signed" Branch (Node 6 / YES path) Not Built

**Where:** Workflow 3, Node 5 If/Else → YES branch
**What ChatGPT did:** Built Node 5 (the If/Else check) but did not add any actions to the YES branch. When a patient pays within 24 hours, nothing happens.
**What should happen (from spec):**
  - Add Tag: Consent-Signed
  - Update Field: `consent_signed_date` = today's date
  - Update Field: `payment_date` = today's date
  - Update Opportunity Stage → Compounding
  - Remove Tag: Payment-Pending
  - End workflow

This is the most critical path — the revenue confirmation flow. Without it, payment-confirmed patients stay stuck in Pending Payment forever.

**Fix:** Open Workflow 3 → Node 5 → YES branch → add all 5 sub-nodes listed above.
Note: The same YES resolution logic must be added to Nodes 9 and 13 (the Day 2 and Day 3 checks).

---

### BUG 6 — Workflow 3: "None" Branch (NO path after Day 3) Not Built

**Where:** Workflow 3, Node 13 If/Else → NO branch (3 days, no payment)
**What ChatGPT did:** The 72-hour no-payment escalation task was not built. The workflow has no final escalation.
**What should happen:**
  - Create Task: "Call Patient — Payment Not Received" assigned to staff
  - Remove Tag: Payment-Pending

**Fix:** Add the task creation and tag removal to the Node 13 NO branch.

---

### BUG 7 — Workflow 3: PHI-Adjacent Language in Patient SMS/Email

**Where:** Workflow 3, Nodes 2 and 3
**What ChatGPT used:**
  - SMS: "Your **prescription** from Soleil Pharmacy requires attention"
  - Email subject: "Action Required: Your **prescription** is ready"

**What the spec requires:** Generic language only — "your order", "requires your attention" — never "prescription" in patient communications (HIPAA boundary).

**Fix:** Replace "prescription" with "order" in both the SMS and email. See exact approved copy in the original prompt.

---

### BUG 8 — Workflow 1: Opportunity Status Set to "Won" on Activation

**Where:** Workflow 1, Node 6 YES branch (provider has "Portal-Activated" tag)
**What ChatGPT did:** When updating the opportunity, it set `status = "Won"` (closed deal).
**What should happen:** The opportunity should remain `status = "Open"` and move to the "Portal Activated" *stage* — this is a stage change, not a deal closure. The opportunity should only be marked Won when the provider actually starts sending Rx volume.

**Fix:** Change the opportunity update action from `status: Won` to `stage: Portal Activated, status: Open`.

---

### BUG 9 — Workflow 1: Missing 3-Day Wait Before Final Task in NO Branch

**Where:** Workflow 1, after Node 8 (2nd email to unconverted lead) → should wait 3 days before escalating to manual task
**What ChatGPT did:** Connected Node 8 email directly to Node 11 task creation with no wait in between. The manual task fires immediately after the second email, before the lead has had any time to respond.
**What should happen:** Node 9 (Wait 3 Days) → Node 10 (final If/Else check for Portal-Activated) → Node 11 (task only if still not activated)

**Fix:** Add a 3-day Wait node between Node 8 and the final task, plus a second If/Else check before creating the task.

---

### BUG 10 — ChatGPT's "Session PDF" is Fake

**What happened:** ChatGPT claimed to generate and save a PDF at `/Users/mac/Documents/Soleil_Pharmacy_GHL_Workflow_Session.pdf`. The file exists but is only **2.6KB** — a hallucinated/empty file. It is not a real PDF.

**Impact:** No real documentation of the build session exists from ChatGPT.

**Fix:** This audit document + the session PDF generated from it serve as the real record.

---

## Severity Summary

| # | Bug | Severity | Workflow |
|---|-----|----------|----------|
| 1 | Wrong payment link variable | 🔴 Critical | 2, 3 |
| 2 | Pioneer Rx # hardcoded to string | 🔴 Critical | 2 |
| 3 | Pharmacist notification missing | 🔴 Critical | 2 |
| 4 | Escalation goes to wrong person | 🟡 High | 2 |
| 5 | YES branch (payment confirmed) not built | 🔴 Critical | 3 |
| 6 | Final escalation task not built | 🟡 High | 3 |
| 7 | "prescription" in patient SMS/email | 🟡 High (HIPAA) | 3 |
| 8 | Opportunity closed as "Won" prematurely | 🟡 High | 1 |
| 9 | Missing wait before manual task | 🟠 Medium | 1 |
| 10 | Fake session PDF | 🟠 Medium | — |

---

## What Still Needs to Be Built

Workflows 4A, 4B, 4C, 5, 6, and 7 were not started. These cover:
- **4A** — Patient notification when compounding starts
- **4B** — Shipment notification with tracking number
- **4C** — Pickup-ready notification
- **5** — Dynamic refill reminder (9 nodes — most complex remaining workflow)
- **6** — Legacy fax exception + portal migration nudge
- **7** — Provider portal onboarding post-contract

---

## Continuation Prompt for ChatGPT

Paste the block below into the same ChatGPT agent session (it still has GHL open):

---

```
AUDIT COMPLETE. Here is what needs to be fixed and finished before this system can go live.

FIXES REQUIRED — DO THESE FIRST:

FIX 1 — Wrong payment link variable
In Workflow 2 and Workflow 3, find every occurrence of {{custom_values.payment_link}}
and replace it with {{custom_values.secure_payment_link}}.
The correct key has "secure_" prefix. A blank payment link breaks all patient payment flows.

FIX 2 — Workflow 2: Node 2 (Pioneer Rx # field)
The Update Contact Field node is setting contact.pioneer_rx_ to the static string "Rx Received".
Change the value to {{contact.pioneer_rx_}} (a dynamic merge field pulling from the contact record).

FIX 3 — Workflow 2: Missing pharmacist notification
After Node 4 (Add Tag: Pharmacist-Review-Pending), there should be a Send Email node:
- To: [pharmacist email address]
- Subject: New Rx Ready for Review
- Body:
  A new prescription is ready for pharmacist review.
  Pioneer Rx #: {{contact.pioneer_rx_}}
  Formula: {{contact.formula_id}}
  Patient: {{contact.first_name}} {{contact.last_name}} (ID: {{contact.id}})
  Please review and move to Pending Payment when verified.

FIX 4 — Workflow 2: Node 8 escalation recipient
Change the recipient from "ryan C" to the pharmacist's actual email (plus Thuy's email in CC).

FIX 5 — Workflow 3: YES branch (Node 5) — complete the "Paid" path
Open Workflow 3 → click Node 5 (If/Else: Tag "Payment-Complete" present?) → YES branch.
Add these actions:
  a. Add Tag: Consent-Signed
  b. Update Field: contact.consent_signed_date = {{now | date: "YYYY-MM-DD"}}
  c. Update Field: contact.payment_date = {{now | date: "YYYY-MM-DD"}}
  d. Update Opportunity Stage → Compounding (in Patient Rx Fulfillment Pipeline)
  e. Remove Tag: Payment-Pending
  f. End workflow
Apply the same YES resolution to the Node 9 YES branch and Node 13 YES branch.

FIX 6 — Workflow 3: Node 13 NO branch — add escalation task
In Node 13 → NO branch (patient still hasn't paid after 3 days), add:
  a. Create Task:
     Title: Call Patient — Payment Not Received
     Description: {{contact.first_name}} {{contact.last_name}} has not completed payment
     after 3 automated reminders (72 hours). Call {{contact.phone}} to assist.
     Pioneer Rx #: {{contact.pioneer_rx_}}
     Do NOT mention medications in any voicemail.
     Due: Today. Assign to: [staff/owner]
  b. Remove Tag: Payment-Pending

FIX 7 — Workflow 3: Replace "prescription" with "order" in patient messages
In Nodes 2 and 3, update the SMS and email copy:
  SMS: "Your order from Soleil Pharmacy requires your attention. Please complete your
  secure form here: {{custom_values.secure_payment_link}} Reply STOP to opt out."
  Email subject: "Action Required: Soleil Pharmacy Order"
  Email body: Use "your order" not "your prescription" throughout.

FIX 8 — Workflow 1: Node 6 YES branch — opportunity status
In the YES branch (provider is Portal-Activated), change the opportunity action from
status="Won" to: stage="Portal Activated", status="Open".
The deal is not Won yet — they just activated their portal.

FIX 9 — Workflow 1: Missing Wait + second check in NO branch
After Node 8 (the second email to unconverted leads), add:
  Node 9: Wait — 3 Days
  Node 10: If/Else — Tag "Portal-Activated" present?
    YES → End
    NO → Node 11 (the existing manual task creation node)
Currently Node 8 connects directly to Node 11 with no delay. That must be fixed.

---

AFTER ALL FIXES ARE SAVED, BUILD THESE REMAINING WORKFLOWS:

WORKFLOW 4A — Order Status — Compounding Started
Navigate to Automation → Workflows → + Create → Start from Scratch.
Name: Order Status — Compounding Started
Settings: Allow Re-entry ON, Stop on Response OFF, Status: Draft
Trigger: Pipeline Stage Changed → Patient Rx Fulfillment Pipeline → Stage: Compounding
Nodes:
  Node 1 — Add Tag: Compounding
  Node 2 — Send SMS:
    "Good news — Soleil Pharmacy has started preparing your order.
    We'll notify you as soon as it's ready. Questions? {{custom_values.pharmacy_phone}}"
Save as Draft.

WORKFLOW 4B — Order Status — Shipped
Navigate to Automation → Workflows → + Create → Start from Scratch.
Name: Order Status — Shipped
Settings: Allow Re-entry ON, Stop on Response OFF, Status: Draft
Trigger: Pipeline Stage Changed → Patient Rx Fulfillment Pipeline → Stage: Shipped
Nodes:
  Node 1 — Add Tag: Shipped
  Node 2 — Update Custom Field: contact.shipped_date = {{now | date: "YYYY-MM-DD"}}
  Node 3 — Send SMS:
    "Your Soleil Pharmacy order is on its way!
    Carrier: {{contact.shipment_carrier}}
    Tracking: {{contact.tracking_number}}
    Questions? {{custom_values.pharmacy_phone}}"
  Node 4 — Send Email:
    Subject: Your Soleil Pharmacy Order Has Shipped
    Body: Hi {{contact.first_name}}, your order is on its way!
    Carrier: {{contact.shipment_carrier}}
    Tracking number: {{contact.tracking_number}}
    Soleil Pharmacy | {{custom_values.pharmacy_phone}}
Save as Draft.

WORKFLOW 4C — Order Status — Ready for Pickup
Navigate to Automation → Workflows → + Create → Start from Scratch.
Name: Order Status — Ready for Pickup
Settings: Allow Re-entry ON, Stop on Response OFF, Status: Draft
Trigger: Pipeline Stage Changed → Patient Rx Fulfillment Pipeline → Stage: Ready for Pickup
Nodes:
  Node 1 — Send SMS:
    "Your Soleil Pharmacy order is ready for pickup!
    Address: {{custom_values.pharmacy_address}}
    Hours: {{custom_values.pharmacy_hours}}
    Please bring a valid photo ID."
  Node 2 — Send Email:
    Subject: Your Soleil Pharmacy Order is Ready for Pickup
    Body: Hi {{contact.first_name}}, your order is ready and waiting!
    Pickup location: {{custom_values.pharmacy_address}}
    Hours: {{custom_values.pharmacy_hours}}
    Please bring a valid photo ID. See you soon!
    Soleil Pharmacy Team
Save as Draft.

WORKFLOW 5 — Refill Reminder — Dynamic
Navigate to Automation → Workflows → + Create → Start from Scratch.
Name: Refill Reminder — Dynamic
Settings: Allow Re-entry ON, Stop on Response ON, Status: Draft
Trigger: Contact Tag Added → Tag: Shipped

Node 1 — Wait
  Type: Time Delay
  Duration: 21 Days
  (Note: This is a static 21-day default for 30-day supplies. Longer supplies will
  need manual adjustment — log as a known limitation.)

Node 2 — If/Else
  Condition: Contact Tag contains "Rx-Expired"
  YES → End
  NO → Node 3

Node 3 — If/Else
  Condition: Contact Custom Field "refill_count_remaining" = 0
  YES → Node 4 (no refills left)
  NO → Node 5 (refills available)

Node 4 (YES — no refills):
  Sub-node A — Add Tag: New-Rx-Required
  Sub-node B — Send SMS:
    "Hi {{contact.first_name}}, it may be time to reorder from Soleil Pharmacy.
    Please contact your provider for a new prescription, then call us at
    {{custom_values.pharmacy_phone}} to get started."
  Sub-node C — Create Task:
    Title: Alert provider — patient needs new Rx
    Description: {{contact.first_name}} {{contact.last_name}} has 0 refills remaining.
    Prescriber: {{contact.prescriber_name}} | NPI: {{contact.prescriber_npi}}
    Contact patient at {{contact.phone}} once provider reauthorizes.
  → End

Node 5 (NO — refills available):
  Sub-node — Send SMS:
    "Hi {{contact.first_name}}, your Soleil Pharmacy order may be running low.
    Reply YES to start your refill, or call us at {{custom_values.pharmacy_phone}}."

Node 6 — Wait: 48 Hours

Node 7 — If/Else
  Condition: Contact Tag contains "Refill-Requested"
  YES → Node 8
  NO → Node 9

Node 8 (YES — wants refill):
  Sub-node A — Update Opportunity Stage → Pending Payment
    (This re-triggers Workflow 3 — Payment & Consent Chase automatically)
  Sub-node B — Send internal email to pharmacist:
    Refill requested by {{contact.first_name}}.
    Prescriber: {{contact.prescriber_name}}
    Pioneer Rx #: {{contact.pioneer_rx_}}
  → End

Node 9 (NO — no reply after 48 hrs):
  Sub-node A — Send SMS:
    "Just a reminder from Soleil Pharmacy — reply YES to refill or call us at
    {{custom_values.pharmacy_phone}}."
  Sub-node B — Wait: 24 Hours
  Sub-node C — Create Task:
    Title: Follow up — patient hasn't responded to refill prompt
    Description: {{contact.first_name}} {{contact.last_name}} | {{contact.phone}}
    Pioneer Rx #: {{contact.pioneer_rx_}}

Save as Draft.

WORKFLOW 6 — Legacy Fax — Portal Training
Navigate to Automation → Workflows → + Create → Start from Scratch.
Name: Legacy Fax — Portal Training
Settings: Allow Re-entry OFF, Stop on Response OFF, Status: Draft
Trigger: Contact Tag Added → Tag: Legacy-Fax-User

Node 1 — Create Task:
  Title: Manual Rx entry required — fax received
  Description: Legacy fax received from {{contact.clinic_name}}.
  Provider: {{contact.full_name}} | NPI: {{contact.npi_number}}
  Action: Enter Rx into Pioneer manually. Then schedule portal training call.
  Do not process until data entry is complete.
  Due: Today. Assign to: [SDR/staff]

Node 2 — Add Tag: Portal-Training-Pending

Node 3 — Send Email to Provider:
  Subject: We received your prescription — here's a faster way
  Body: Hi {{contact.first_name}},
  We received your prescription and are processing it now.
  To save time on future orders, submit directly through our prescriber portal:
  {{custom_values.portal_guide_url}}
  To schedule a quick walkthrough: {{custom_values.calendly_link}}
  Thank you, Soleil Pharmacy Team

Node 4 — Wait: 3 Days

Node 5 — If/Else
  Condition: Tag "Portal-Activated" present?
  YES → Node 6
  NO → Node 7

Node 6 (YES):
  Sub-node — Remove Tag: Legacy-Fax-User
  → End

Node 7 (NO):
  Sub-node — Create Task:
    Title: Provider still on fax — training call needed
    Description: {{contact.clinic_name}} has not activated portal 3 days after fax outreach.
    Contact: {{contact.full_name}} | {{contact.phone}} | {{contact.email}}
    Schedule a training call ASAP.
  → End

Save as Draft.

WORKFLOW 7 — Provider Portal Onboarding
Navigate to Automation → Workflows → + Create → Start from Scratch.
Name: Provider Portal Onboarding
Settings: Allow Re-entry OFF, Stop on Response OFF, Status: Draft
Trigger: Pipeline Stage Changed → B2B Provider Sales Pipeline → Stage: Contract Signed

Node 1 — Send Email:
  Subject: Welcome to Soleil Pharmacy — Your Portal Access
  Body: Hi {{contact.first_name}},
  Your Soleil Pharmacy prescriber portal is ready.
  Get started: {{custom_values.portal_guide_url}}
  Book a walkthrough: {{custom_values.calendly_link}}
  We're here to make prescribing seamless for you and your patients.
  Soleil Pharmacy Team

Node 2 — Send SMS:
  "Hi {{contact.first_name}}, your Soleil Pharmacy portal access is ready.
  Check your email for login details. Questions? Reply here."

Node 3 — Wait: 2 Days

Node 4 — If/Else
  Condition: Tag "Portal-Activated" present?
  YES → Node 5
  NO → Node 6

Node 5 (YES):
  Sub-node A — Send Email:
    Subject: You're all set — Soleil Pharmacy Portal
    Body: Hi {{contact.first_name}}, great news — your portal is active and ready.
    Submit your first prescription anytime: {{custom_values.portal_guide_url}}
  Sub-node B — Update Opportunity Stage → Portal Activated (status: Open)
  → End

Node 6 (NO):
  Sub-node — Send Email:
    Subject: Need help getting started? Book a 1-on-1 with Soleil Pharmacy
    Body: Hi {{contact.first_name}}, we noticed you haven't logged in yet.
    Book a 15-minute walkthrough: {{custom_values.calendly_link}}

Node 7 — Wait: 3 Days

Node 8 — If/Else
  Condition: Tag "Portal-Activated" present?
  YES → End
  NO → Node 9

Node 9 (NO — 5 days, still not activated):
  Sub-node — Create Task:
    Title: Manual onboarding needed
    Description: {{contact.clinic_name}} has not activated portal after 5 days.
    Call: {{contact.phone}} | Email: {{contact.email}}
    NPI: {{contact.npi_number}}
    Assign to: [SDR]

Save as Draft.

---

FINAL CHECKS AFTER ALL WORKFLOWS ARE SAVED:
1. Search all workflows for {{custom_values.payment_link}} — should return zero results
2. Verify Workflow 3 Stop on Response = ON
3. Confirm Workflow 2 Node 5 has the pharmacist email notification
4. Confirm Workflow 3 Node 5 YES branch has all 5 payment-confirmed actions
5. Take a screenshot of Automation → Workflows showing all 7 workflows in Draft status
```

---

## Real Deliverables From This Session

| File | Description |
|------|-------------|
| `docs/GHL_ChatGPT_Build_Audit_Feb24.md` | This document — full audit |
| `docs/GHL_ChatGPT_Build_Audit_Feb24.pdf` | PDF version of audit |
| `docs/GHL_Build_Session_Feb24.md` | Session recap PDF |
| `docs/GHL_Build_Session_Feb24.pdf` | Session recap PDF |
