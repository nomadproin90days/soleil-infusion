# GHL Automation Blueprint v2 — Soleil Pharmacy
*Enhanced from Gemini v1. Fixes: missing pipeline stages, broken refill logic, payment/consent spec gaps, SLA escalation, complete custom fields & tags, per-workflow AI prompts.*

---

## 1. Prescription Journey Map (Corrected 8-Stage)

| # | Stage | Owner |
|---|-------|-------|
| 1 | Provider Acquisition & Onboarding | SDR / GHL |
| 2 | Prescription Intake | GHL / Portal |
| **3** | **Pharmacist Review & Data Entry** *(was merged into Stage 2 — incorrect)* | Pharmacist / Pioneer |
| 4 | Patient Payment & Consent | GHL |
| 5 | Fulfillment / Compounding | Pioneer |
| 6 | Dispensing (Shipping or Pickup) | GHL / Staff |
| 7 | Follow-up & Refills | GHL |
| 8 | Legacy Fax Exception Handling *(new)* | SDR / GHL |

---

## 2. Pipelines (Corrected & Complete)

### Pipeline 1: B2B Provider Sales Pipeline
```
Lead → Contacted → Demo Scheduled → Credentialing → Contract Signed → Portal Activated
```
> **v1 gap fixed:** Added `Contract Signed` stage (Soleil now uses contractor agreements).

### Pipeline 2: Patient Rx Fulfillment Pipeline
```
Rx Received → Pharmacist Review → Pending Payment → Compounding → Ready for Pickup / Shipped → Complete
```
> **v1 gap fixed:** Added `Pharmacist Review` stage. v1 skipped Stage 3 (verification) entirely — payments were triggering before pharmacist sign-off.

---

## 3. Complete Custom Fields

### Provider Contact Fields
| Field | Type | Notes |
|-------|------|-------|
| NPI Number | Text | Required for credentialing |
| Clinic Name | Text | |
| Preferred Communication | Dropdown: Email / SMS / Portal | |
| Portal Activation Date | Date | For onboarding SLA tracking |
| Contract Signed Date | Date | Required before Portal Activated stage |

### Patient Contact Fields
| Field | Type | Notes |
|-------|------|-------|
| Pioneer Rx # | Text | Links GHL record to Pioneer |
| Formula ID | Text | Specific compound formula |
| Prescriber Name | Text | |
| Prescriber NPI | Text | **NEW — needed for refill routing** |
| Days Supply | Number | **NEW — critical for refill trigger math** |
| Rx Expiration Date | Date | **NEW — stop refill prompts when expired** |
| Refill Count Remaining | Number | **NEW — prevent prompting when 0 refills left** |
| Compound Type | Dropdown: Sterile / Non-Sterile | **NEW — affects compounding SLA** |
| Consent Signed Date | Date | **NEW — HIPAA audit trail** |
| Payment Date | Date | **NEW — revenue analytics** |
| Tracking Number | Text | |
| Shipment Carrier | Dropdown: UPS / FedEx / USPS / Other | **NEW** |
| Preferred Language | Dropdown: English / Korean / Vietnamese / Other | **NEW — Soleil's patient demographics** |
| Auto-Refill Enrolled | Checkbox | **NEW** |

---

## 4. Complete Tags

### Provider Tags
- `B2B-Lead`
- `Portal-Activated`
- `Contract-Signed`
- `Legacy-Fax-User` — provider still faxing; needs portal training
- `High-Volume-Clinic` — priority account
- `Portal-Training-Pending`

### Patient Tags
- `Rx-Received`
- `Pharmacist-Review-Pending`
- `Payment-Pending`
- `Consent-Signed` — **NEW**
- `Payment-Complete`
- `Compounding`
- `Shipped`
- `Refill-Due`
- `Refill-Auth-Active` — **NEW** provider authorized refills remain
- `New-Rx-Required` — **NEW** refills exhausted, need new script
- `Auto-Refill-Enrolled` — **NEW**
- `Korean-Language` — **NEW** for language-specific templates
- `Rx-Expired` — **NEW** stop all refill prompts

---

## 5. Automation Workflows (Node-by-Node Logic)

### Workflow 1: B2B Lead Nurture & Onboarding
**Trigger:** Form submission OR tag `B2B-Lead` added manually
```
1. WAIT: 0 min
2. ACTION: Send Email — "Welcome to Soleil Prescriber Portal" (template)
3. ACTION: Send SMS — "Hi [name], we received your inquiry. Check email for next steps."
4. ACTION: Create Opportunity in "B2B Provider Sales Pipeline" → Stage: Lead
5. ACTION: Create Task → Assign to SDR: "Follow up within 24hrs — verify NPI [NPI Number]"
6. WAIT: 2 days
7. IF/ELSE: Tag contains "Portal-Activated"?
   → YES: END workflow
   → NO: Continue
8. ACTION: Send Email — "Demo invite: Book your 15-min portal walkthrough"
9. WAIT: 3 days
10. IF/ELSE: Tag contains "Portal-Activated"?
    → YES: END
    → NO: Create Task → SDR: "Manual follow-up required — [Clinic Name]"
```
**Exit condition:** Tag `Portal-Activated` added.

---

### Workflow 2: Rx Intake & Pharmacist Notification
**Trigger:** Webhook from Prescriber Portal / eRx system (payload: patient name, DOB, Formula ID, Prescriber NPI, Days Supply)
```
1. ACTION: Add/Update Contact — map webhook fields to custom fields
   - Set: Pioneer Rx #, Formula ID, Prescriber NPI, Prescriber Name, Days Supply
2. ACTION: Create Opportunity in "Patient Rx Fulfillment Pipeline" → Stage: Rx Received
3. ACTION: Add Tag: Rx-Received
4. ACTION: Send Internal Notification → Pharmacist (email + SMS):
   "New Rx received for [patient first name only — no PHI]. Pioneer Rx #: [Pioneer Rx #]. Formula: [Formula ID]. Review required."
5. ACTION: Move Pipeline Stage → "Pharmacist Review"
6. ACTION: Add Tag: Pharmacist-Review-Pending
7. WAIT: 2 hours
8. IF/ELSE: Pipeline stage still "Pharmacist Review"?
   → YES: Send escalation alert → Thuy + Pharmacist: "Rx pending review >2hrs — [Pioneer Rx #]"
   → NO: END (pharmacist moved it forward)
```
**Exit condition:** Pharmacist moves stage to "Pending Payment" in GHL (or Pioneer webhook fires status: Verified).

---

### Workflow 3: Patient Payment & Consent Chase
**Trigger:** Pipeline stage changes to "Pending Payment"
```
1. ACTION: Add Tag: Payment-Pending
2. ACTION: Send SMS to Patient — "Your order from Soleil Pharmacy is ready for review. Please complete your secure form: [payment+consent link]. Reply STOP to opt out."
3. ACTION: Send Email to Patient — "Action Required: Complete Your Soleil Pharmacy Order" (generic body, link to payment+consent portal)
4. WAIT: 24 hours
5. IF/ELSE: Tag "Payment-Complete" present?
   → YES: END workflow
   → NO: Continue
6. ACTION: Send SMS Reminder — "Reminder: Your Soleil Pharmacy order is awaiting payment. Link: [link]"
7. WAIT: 24 hours
8. IF/ELSE: Tag "Payment-Complete" present?
   → YES: END
   → NO: Continue
9. ACTION: Send Email Reminder #2
10. WAIT: 24 hours
11. IF/ELSE: Tag "Payment-Complete" present?
    → YES: END
    → NO: Continue
12. ACTION: Create Task → Staff: "Manual call required — patient has not completed payment after 3 reminders. Contact: [patient first name], Pioneer Rx #: [Pioneer Rx #]"
13. ACTION: Move Pipeline → Back-flag (add internal note — do NOT expose PHI in task title)
```
**Payment detection:** GHL native payment OR webhook from Stripe on `payment_intent.succeeded` → adds tag `Payment-Complete` + `Consent-Signed`, moves pipeline to "Compounding".

> **Consent tool:** Use GHL native form embedded in the payment page (HIPAA mode enabled). Capture `Consent Signed Date` on submission.

---

### Workflow 4: Compounding → Dispensing Status Updates
**Trigger:** Pipeline stage changes to "Compounding"
```
1. ACTION: Add Tag: Compounding
2. ACTION: Send SMS to Patient — "Good news — Soleil Pharmacy is preparing your order. We'll notify you when it's ready."
3. WAIT: Watch for Pioneer webhook OR manual pipeline update
```
**Trigger (dispensing):** Pipeline stage → "Shipped" OR "Ready for Pickup"
```
FOR "Shipped":
1. ACTION: Add Tag: Shipped
2. ACTION: Send SMS — "Your Soleil Pharmacy order is on the way! Carrier: [Shipment Carrier] | Track: [Tracking Number]"
3. ACTION: Send Email — same, with clickable tracking link
4. ACTION: Set field "Shipped Date" = today (for refill trigger calculation)

FOR "Ready for Pickup":
1. ACTION: Send SMS — "Your Soleil Pharmacy order is ready for pickup. Our address: [address]. Hours: [hours]."
2. ACTION: Send Email — same
```

---

### Workflow 5: Refill Reminder Sequence (Dynamic — Fixed from v1)
**Trigger:** Tag `Shipped` added AND field `Days Supply` is set

> **v1 was broken:** Hardcoded +21 days. This version uses `Days Supply` to calculate the window.

```
CALCULATE: Refill Wait = (Days Supply - 9) days
→ 30-day supply → trigger at Day 21
→ 60-day supply → trigger at Day 51
→ 90-day supply → trigger at Day 81

1. WAIT: [Refill Wait] days after "Shipped Date"
2. IF/ELSE: Tag "Rx-Expired" present?
   → YES: END — do not prompt
   → NO: Continue
3. IF/ELSE: Field "Refill Count Remaining" = 0?
   → YES: Add Tag: New-Rx-Required → Send SMS: "It's time to check in on your Soleil order. Please contact your provider for a new prescription." → Create Task for SDR to alert the prescriber.
   → NO: Continue
4. ACTION: Send SMS — "Hi, your Soleil Pharmacy order may be running low. Reply YES to start your refill, or call us if you have questions."
5. WAIT: 48 hours
6. IF/ELSE: Patient replied YES (or tag "Refill-Requested" added)?
   → YES: Move Pipeline → Pending Payment (triggers Workflow 3) + notify provider
   → NO: Send one follow-up SMS → create task for staff if no reply in 24 more hours
```

---

### Workflow 6: Legacy Fax Exception Handling (NEW)
**Trigger:** Tag `Legacy-Fax-User` added OR manual intake from fax

```
1. ACTION: Create Task → SDR: "Legacy fax received from [Clinic Name]. Manual data entry required. After entry, schedule portal training call."
2. ACTION: Add Tag: Portal-Training-Pending
3. ACTION: Send Email to Provider — "We received your prescription. To speed up future orders, here's how to submit via our portal: [portal guide link]"
4. ACTION: Move Provider in B2B Pipeline → "Portal Training Pending" (custom stage)
5. WAIT: 3 days
6. IF/ELSE: Tag "Portal-Activated" present?
   → YES: Remove tag Legacy-Fax-User → END
   → NO: Create escalation task → Thuy: "[Clinic Name] still on fax — training call needed."
```

---

### Workflow 7: Provider Portal Onboarding (Post Contract Signed)
**Trigger:** B2B Pipeline stage → "Contract Signed"
```
1. ACTION: Send Email — "Welcome to Soleil Pharmacy — Your Portal Access" with credentials + PDF guide
2. ACTION: Send SMS — "Your Soleil prescriber portal is ready. Check email for login. Questions? Reply here."
3. WAIT: 2 days
4. IF/ELSE: Tag "Portal-Activated" present?
   → YES: Send congratulations + resource email → Move Pipeline → Portal Activated → END
   → NO: Send follow-up + schedule 1-on-1 onboarding call (Calendly link)
5. WAIT: 3 days
6. IF/ELSE: Tag "Portal-Activated"?
   → YES: END
   → NO: Create Task → SDR: "Manual portal onboarding needed — [Clinic Name]"
```

---

## 6. Forms / Surveys

| Form | Fields | Notes |
|------|--------|-------|
| Provider Inquiry Form | Name, NPI, Clinic, Email, Phone, Preferred Communication | Triggers Workflow 1 |
| Patient Payment + Consent Form | Payment method, HIPAA consent checkbox, Digital signature, DOB confirmation | HIPAA mode; no medication names |
| Patient Intake (if no portal) | DOB, Address, Insurance, Allergies | Used for cash-pay patients only |

---

## 7. Email / SMS Templates (Complete List)

| Template | Channel | Stage |
|----------|---------|-------|
| Welcome to Soleil Prescriber Portal | Email | Stage 1 |
| Demo/Booking Invite | Email | Stage 1 follow-up |
| Portal Training Guide | Email | Legacy Fax transition |
| Contract Signed — Portal Access | Email | B2B Contract Signed |
| Rx Received — Internal Alert | Email + SMS (to pharmacist) | Stage 2 |
| Action Required: Complete Your Order | Email | Stage 4 — Payment |
| Payment Reminder (x2) | SMS + Email | Stage 4 — Chase |
| Your Order is Being Prepared | SMS | Stage 5 — Compounding |
| Your Order Has Shipped | SMS + Email | Stage 6 |
| Your Order is Ready for Pickup | SMS + Email | Stage 6 |
| Refill Reminder | SMS | Stage 7 |
| New Prescription Required | SMS | Stage 7 — 0 refills |
| Provider Adherence Report | Email (to provider) | Stage 7 |

> **PHI rule:** No medication names, diagnoses, or clinical details in any template. Use "your order" / "your item" only.

---

## 8. Internal Notification Routing

| Event | Notify |
|-------|--------|
| New Rx received | Pharmacist on duty (SMS + Email) |
| Rx pending review >2hrs | Pharmacist + Thuy |
| Payment not received after 3 days | Front desk / SDR |
| Compounding stalled >expected SLA | Thuy |
| Patient reports adverse effect (refill reply) | Pharmacist (create task immediately) |
| Legacy fax received | SDR |
| New B2B lead | SDR |
| Provider not activated after 7 days | Thuy |

---

## 9. Compliance Checklist (Before Going Live)

- [ ] GHL account set to HIPAA Compliance Mode ($297/mo+ plan)
- [ ] Business Associate Agreement (BAA) signed with GHL
- [ ] Payment processor BAA signed (if using Stripe — sign separately)
- [ ] All SMS templates reviewed — zero PHI/medication names
- [ ] Patient consent form includes HIPAA notice
- [ ] GHL conversations set to purge after [retention period per state law]
- [ ] Pioneer Rx remains source of truth — GHL never stores clinical data
- [ ] Webhook endpoints for Pioneer → GHL secured (HTTPS + secret token)
- [ ] Two-factor authentication enabled on GHL account

---

## 10. Recommended Build Order (Refined)

### Phase 1 — Revenue & Cash Flow (Build First)
1. Enable HIPAA mode + sign BAA
2. Create Patient Rx Fulfillment Pipeline (with `Pharmacist Review` stage)
3. Build Workflow 3: Payment & Consent Chase
4. Build Workflow 4: Shipping/Pickup Notifications
5. Set up payment integration (GHL native or Stripe webhook)
6. Set up all custom fields and tags

### Phase 2 — Operational Efficiency
7. Build Workflow 2: Rx Intake & Pharmacist Notification
8. Build Workflow 5: Refill Reminders (dynamic Days Supply)
9. Build B2B Provider Sales Pipeline
10. Build Workflow 1: B2B Lead Nurture
11. Build Workflow 7: Provider Portal Onboarding

### Phase 3 — Transition & Advanced
12. Build Workflow 6: Legacy Fax Exception
13. Pioneer Rx ↔ GHL webhook integration (via Make/Zapier)
14. AI/OCR fax processing
15. Provider adherence reporting (automated)

---

## 11. AI Prompts for GHL Workflow Builder (One Per Workflow)

Use these verbatim in GHL's workflow AI assistant or ChatGPT to generate node-by-node steps.

---

**Prompt 1 — B2B Lead Nurture:**
> "Act as a GoHighLevel workflow expert. Build a HIPAA-compliant B2B lead nurture workflow for 'Soleil Pharmacy' (a compounding pharmacy). Trigger: contact is tagged 'B2B-Lead'. Actions: send welcome email 'Welcome to Soleil Prescriber Portal', send SMS confirmation, create an opportunity in the 'B2B Provider Sales Pipeline' at stage 'Lead', and assign a task to the SDR. After 2 days, if the tag 'Portal-Activated' is NOT present, send a demo booking email with a calendar link. After 3 more days, if still not activated, create a manual follow-up task. Exit when tag 'Portal-Activated' is added."

---

**Prompt 2 — Rx Intake & Pharmacist Alert:**
> "Act as a GoHighLevel workflow expert. Build a HIPAA-compliant Rx intake workflow for 'Soleil Pharmacy'. Trigger: inbound webhook from the prescriber portal containing patient info (no PHI in GHL messages). Actions: update the contact record with custom fields (Pioneer Rx #, Formula ID, Days Supply, Prescriber NPI), create an opportunity in the 'Patient Rx Fulfillment Pipeline' at stage 'Rx Received', then move it to 'Pharmacist Review', add tag 'Pharmacist-Review-Pending', and send an internal notification (SMS + email) to the pharmacist with generic info: 'New Rx ready for review — Pioneer Rx # [field]'. After 2 hours, if the pipeline stage is still 'Pharmacist Review', send an escalation alert to the pharmacist and the owner (Thuy)."

---

**Prompt 3 — Payment & Consent Chase (from v1, enhanced):**
> "Act as a GoHighLevel workflow expert. Build a HIPAA-compliant payment collection workflow for 'Soleil Pharmacy'. Trigger: pipeline stage changes to 'Pending Payment' in the 'Patient Rx Fulfillment Pipeline'. Step 1: add tag 'Payment-Pending'. Send a generic SMS: 'Your order from Soleil Pharmacy requires your attention. Please complete your secure form here: [link]' — do not include medication names or PHI. Also send an email version. Wait 24 hours. If tag 'Payment-Complete' is NOT present, send SMS reminder. Wait 24 hours. If still not paid, send email reminder #2. Wait 24 hours. If still not paid, create a manual task for staff: 'Call patient — 3 reminders sent, no response.' When tag 'Payment-Complete' IS added: add tag 'Consent-Signed', set custom field 'Consent Signed Date' to today, move pipeline to 'Compounding', and end the workflow."

---

**Prompt 4 — Order Status Notifications:**
> "Act as a GoHighLevel workflow expert. Build two short status update workflows for 'Soleil Pharmacy'. Workflow A: trigger when pipeline stage moves to 'Shipped'. Actions: add tag 'Shipped', send SMS: 'Your Soleil Pharmacy order is on the way! Track it here: [Tracking Number] via [Shipment Carrier].' Also send email. Set a custom field 'Shipped Date' to today's date. Workflow B: trigger when pipeline stage moves to 'Ready for Pickup'. Actions: send SMS: 'Your Soleil Pharmacy order is ready for pickup.' Send email version. Note: never include medication names or diagnoses in any message."

---

**Prompt 5 — Dynamic Refill Reminder:**
> "Act as a GoHighLevel workflow expert. Build a HIPAA-compliant refill reminder workflow for 'Soleil Pharmacy'. Trigger: tag 'Shipped' is added to a contact. The workflow must use the custom field 'Days Supply' to calculate when to send the reminder: wait (Days Supply minus 9) days after the 'Shipped Date' custom field. Before sending, check: (1) If tag 'Rx-Expired' is present, end the workflow. (2) If custom field 'Refill Count Remaining' equals 0, add tag 'New-Rx-Required' and send SMS: 'It may be time to connect with your provider for a new prescription for your Soleil Pharmacy order.' Otherwise, send SMS: 'Hi, your Soleil Pharmacy order may be running low. Reply YES to start your refill.' Wait 48 hours. If contact replies YES (or tag 'Refill-Requested' is added), move pipeline back to 'Pending Payment' and notify the provider via email. If no reply after 24 more hours, create a staff task."

---

**Prompt 6 — Legacy Fax Exception:**
> "Act as a GoHighLevel workflow expert. Build a workflow for 'Soleil Pharmacy' to handle legacy fax prescriptions during the transition to a digital portal. Trigger: tag 'Legacy-Fax-User' is added to a provider contact. Actions: create a task for the SDR: 'Manual Rx received via fax from [Clinic Name]. Enter into Pioneer, then schedule portal training.' Add tag 'Portal-Training-Pending'. Send an email to the provider: 'We received your prescription. To save time on future orders, here's how to submit through our portal: [link to guide].' Wait 3 days. If tag 'Portal-Activated' is NOT present, create escalation task for Thuy: '[Clinic Name] has not activated portal — training call needed.' If tag 'Portal-Activated' IS added, remove tag 'Legacy-Fax-User' and end the workflow."

---

**Prompt 7 — Provider Portal Onboarding (Post-Contract):**
> "Act as a GoHighLevel workflow expert. Build a provider onboarding workflow for 'Soleil Pharmacy'. Trigger: opportunity stage changes to 'Contract Signed' in the 'B2B Provider Sales Pipeline'. Actions: send a welcome email with portal login instructions and a PDF setup guide. Send a follow-up SMS: 'Your Soleil prescriber portal access is ready — check your email.' Wait 2 days. If tag 'Portal-Activated' is present: send a congratulations email, move pipeline to 'Portal Activated', and end. If not activated: send a follow-up email with a 1-on-1 onboarding call booking link (Calendly). Wait 3 more days. If still not activated: create a task for the SDR: 'Manual onboarding needed — [Clinic Name]. Call to walk through portal setup.'"
