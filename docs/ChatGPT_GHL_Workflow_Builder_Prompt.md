# ChatGPT Agent Mode — GHL Workflow Builder Prompt
## Soleil Pharmacy Automation

---

## HOW TO USE THIS PROMPT

1. Open ChatGPT → enable **Agent Mode** (or use a GPT with browser/computer use)
2. Make sure you are **logged into GoHighLevel** in the same browser
3. Paste the **MASTER CONTEXT** block first, then paste each **individual workflow prompt** one at a time
4. Wait for ChatGPT to complete each workflow before pasting the next
5. Start with **Step 0 (Pipelines)** — workflows won't work without them

---

## MASTER CONTEXT BLOCK
*(Paste this first before any workflow prompt)*

```
You are a GoHighLevel automation expert helping build a HIPAA-compliant pharmacy workflow system for "Soleil Pharmacy."

ACCOUNT CONTEXT:
- GHL Location: Soleil Pharmacy
- Industry: Compounding pharmacy (BHRT, IV infusions, specialty compounds)
- Goal: Automate the prescription journey from provider intake to patient refills

HIPAA RULES — CRITICAL — NEVER VIOLATE:
1. NEVER include medication names, diagnoses, or clinical conditions in any SMS or email
2. NEVER include PHI in task titles (task bodies are internal-only and acceptable)
3. Use only generic language in patient-facing messages: "your order", "your item", "requires attention"
4. GHL must be in HIPAA Compliance Mode before any workflow goes live

CONFIRMED CUSTOM FIELDS (already created in GHL):
- contact.pioneer_rx_ (Pioneer Rx #)
- contact.formula_id
- contact.prescriber_name
- contact.prescriber_npi
- contact.days_supply
- contact.rx_expiration_date
- contact.refill_count_remaining
- contact.compound_type
- contact.consent_signed_date
- contact.payment_date
- contact.shipped_date
- contact.tracking_number
- contact.shipment_carrier
- contact.autorefill_enrolled
- contact.preferred_language
- contact.npi_number
- contact.clinic_name
- contact.preferred_communication
- contact.portal_activation_date
- contact.contract_signed_date

CONFIRMED CUSTOM VALUES (already created in GHL — use in templates):
- {{custom_values.secure_payment_link}}
- {{custom_values.pharmacy_address}}
- {{custom_values.pharmacy_phone}}
- {{custom_values.pharmacy_hours}}
- {{custom_values.portal_guide_url}}
- {{custom_values.calendly_link}}

REQUIRED PIPELINES (you will create these in Step 0):
1. "B2B Provider Sales Pipeline"
   Stages: Lead → Contacted → Demo Scheduled → Credentialing → Contract Signed → Portal Activated

2. "Patient Rx Fulfillment Pipeline"
   Stages: Rx Received → Pharmacist Review → Pending Payment → Compounding → Ready for Pickup → Shipped → Complete

Acknowledge you have read and understood this context before proceeding.
```

---

## STEP 0 — CREATE PIPELINES
*(Must be done before any workflow. Paste after Master Context.)*

```
Navigate to GoHighLevel.

TASK: Create two pipelines in CRM → Pipelines.

PIPELINE 1 — "B2B Provider Sales Pipeline":
- Click "+ New Pipeline"
- Name: B2B Provider Sales Pipeline
- Add stages in this exact order:
  1. Lead
  2. Contacted
  3. Demo Scheduled
  4. Credentialing
  5. Contract Signed
  6. Portal Activated
- Save

PIPELINE 2 — "Patient Rx Fulfillment Pipeline":
- Click "+ New Pipeline"
- Name: Patient Rx Fulfillment Pipeline
- Add stages in this exact order:
  1. Rx Received
  2. Pharmacist Review
  3. Pending Payment
  4. Compounding
  5. Ready for Pickup
  6. Shipped
  7. Complete
- Save

Confirm both pipelines are saved and visible in CRM → Pipelines.
Take a screenshot of the pipelines list as confirmation.
```

---

## WORKFLOW 1 — B2B Lead Nurture & Onboarding

```
Navigate to GoHighLevel → Automation → Workflows → + Create Workflow → Start from Scratch.

WORKFLOW NAME: B2B Lead Nurture & Onboarding

SETTINGS:
- Allow Re-entry: OFF
- Stop on Response: ON
- Status: Draft (do not publish until reviewed)

TRIGGER:
- Trigger type: Contact Tag
- Filter: Tag is added = "B2B-Lead"

NODES (build in this exact order):

Node 1 — Send Email
- Action: Send Email
- Template: Select "Welcome to Soleil Prescriber Portal"
  (If template doesn't exist yet, create it with this body:)
  Subject: Welcome to the Soleil Pharmacy Prescriber Portal
  Body: Hello {{contact.first_name}}, welcome to the Soleil Pharmacy Prescriber Portal.
  Your portal guide: {{custom_values.portal_guide_url}}
  Book an onboarding call: {{custom_values.calendly_link}}

Node 2 — Send SMS
- Action: Send SMS
- Message: Hi {{contact.first_name}}, thanks for your interest in Soleil Pharmacy. Check your email for portal access details. Questions? Reply here.

Node 3 — Create/Update Opportunity
- Action: Create or Update Opportunity
- Pipeline: B2B Provider Sales Pipeline
- Stage: Lead
- Opportunity name: {{contact.full_name}} — {{contact.clinic_name}}

Node 4 — Create Task
- Action: Add Task
- Title: Follow up — verify NPI
- Description: New B2B lead. Verify NPI: {{contact.npi_number}}. Clinic: {{contact.clinic_name}}. Follow up within 24 hours.
- Due: 1 day from now
- Assign to: [assign to SDR/owner]

Node 5 — Wait
- Type: Time Delay
- Duration: 2 Days

Node 6 — If/Else
- Condition: Contact Tag contains "Portal-Activated"
- Branch YES → Node 7 (Remove from Workflow / End)
- Branch NO → Node 8

Node 7 (YES branch) — Remove from Workflow / End

Node 8 (NO branch) — Send Email
- Action: Send Email
- Subject: Ready for your Soleil Pharmacy portal demo?
- Body: Hi {{contact.first_name}}, book your 15-minute walkthrough here: {{custom_values.calendly_link}}

Node 9 — Wait
- Duration: 3 Days

Node 10 — If/Else
- Condition: Contact Tag contains "Portal-Activated"
- Branch YES → End
- Branch NO → Node 11

Node 11 (NO branch) — Create Task
- Title: Manual follow-up required
- Description: {{contact.clinic_name}} has not activated portal after 5 days. Manual outreach needed. Contact: {{contact.full_name}}, {{contact.email}}, {{contact.phone}}.
- Due: Today
- Assign to: [SDR/owner]

Save as Draft. Do not publish yet.
```

---

## WORKFLOW 2 — Rx Intake & Pharmacist Alert

```
Navigate to Automation → Workflows → + Create Workflow → Start from Scratch.

WORKFLOW NAME: Rx Intake & Pharmacist Alert

SETTINGS:
- Allow Re-entry: ON (same patient can have multiple Rx)
- Stop on Response: OFF
- Status: Draft

TRIGGER:
- Trigger type: Pipeline Stage Changed
- Pipeline: Patient Rx Fulfillment Pipeline
- Stage: Rx Received

NODES:

Node 1 — Add Tag
- Tags to add: Rx-Received

Node 2 — Update Contact Field
- Field: contact.pioneer_rx_ → use value from trigger/webhook if available

Node 3 — Create/Update Opportunity
- Pipeline: Patient Rx Fulfillment Pipeline
- Stage: Pharmacist Review
(This moves the card forward automatically)

Node 4 — Add Tag
- Tags to add: Pharmacist-Review-Pending

Node 5 — Internal Notification (Send Email to Team)
- Action: Send Email (internal — to pharmacist's email address)
- To: [pharmacist email address — fill in]
- Subject: New Rx Ready for Review
- Body: A new prescription is ready for pharmacist review in GHL.
  Pioneer Rx #: {{contact.pioneer_rx_}}
  Formula: {{contact.formula_id}}
  Patient: {{contact.first_name}} (contact ID: {{contact.id}})
  Please review and move to Pending Payment when verified.

Node 6 — Wait
- Type: Time Delay
- Duration: 2 Hours

Node 7 — If/Else
- Condition: Pipeline Stage = "Pharmacist Review" (still in review after 2 hours)
- Branch YES (still pending) → Node 8
- Branch NO (moved forward) → End

Node 8 (YES) — Internal Notification
- Send Email to pharmacist + Thuy
- Subject: ALERT: Rx pending review >2 hours
- Body: An Rx has been in Pharmacist Review for over 2 hours.
  Pioneer Rx #: {{contact.pioneer_rx_}}
  Please review immediately.

Save as Draft.
```

---

## WORKFLOW 3 — Patient Payment & Consent Chase
*(Most critical — build this first if short on time)*

```
Navigate to Automation → Workflows → + Create Workflow → Start from Scratch.

WORKFLOW NAME: Patient Rx — Payment & Consent Chase

SETTINGS:
- Allow Re-entry: OFF
- Stop on Response: ON  ← CRITICAL for TCPA compliance
- Status: Draft

TRIGGER:
- Trigger type: Pipeline Stage Changed
- Pipeline: Patient Rx Fulfillment Pipeline
- Stage: Pending Payment

NODES:

Node 1 — Add Tag
- Tags to add: Payment-Pending

Node 2 — Send SMS
- Message: Your order from Soleil Pharmacy requires your attention. Please complete your secure form here: {{custom_values.secure_payment_link}}
  Reply STOP to opt out.
- HIPAA CHECK: No medication names. No diagnoses. Generic language only. ✓

Node 3 — Send Email
- Subject: Action Required: Soleil Pharmacy Order
- Body:
  Hello {{contact.first_name}},
  Your order from Soleil Pharmacy requires your attention before we can proceed.
  Please click below to complete your payment and consent forms:
  {{custom_values.secure_payment_link}}
  Questions? Call us: {{custom_values.pharmacy_phone}}
  Thank you, Soleil Pharmacy Team

Node 4 — Wait
- Duration: 24 Hours

Node 5 — If/Else
- Condition: Contact Tag contains "Payment-Complete"
- Branch YES → Node 6
- Branch NO → Node 7

Node 6 (YES — paid within 24hrs):
  Sub-node A — Add Tag: Consent-Signed
  Sub-node B — Update Custom Field: consent_signed_date = {{now | date: "YYYY-MM-DD"}}
  Sub-node C — Update Custom Field: payment_date = {{now | date: "YYYY-MM-DD"}}
  Sub-node D — Update Opportunity Stage → Compounding
  Sub-node E — Remove Tag: Payment-Pending
  → End

Node 7 (NO — not yet paid):
  Sub-node — Send SMS Reminder:
  Reminder from Soleil Pharmacy: your order is still waiting on payment and consent.
  Complete it here: {{custom_values.secure_payment_link}}

Node 8 — Wait
- Duration: 24 Hours

Node 9 — If/Else
- Condition: Contact Tag contains "Payment-Complete"
- Branch YES → Node 10 (same as Node 6 — paid/consent/move to Compounding)
- Branch NO → Node 11

Node 10 (YES):
  Same actions as Node 6 above (add tags, set dates, move pipeline, remove Payment-Pending)
  → End

Node 11 (NO):
  Sub-node — Send Email Reminder #2:
  Subject: Final Reminder: Soleil Pharmacy Order
  Body: Hi {{contact.first_name}}, this is a final reminder to complete your Soleil Pharmacy order.
  {{custom_values.secure_payment_link}}
  If you need help, call us at {{custom_values.pharmacy_phone}}.

Node 12 — Wait
- Duration: 24 Hours

Node 13 — If/Else
- Condition: Contact Tag contains "Payment-Complete"
- Branch YES → Node 14 (same paid resolution)
- Branch NO → Node 15

Node 14 (YES): Same paid resolution actions → End

Node 15 (NO — 3 days, no payment):
  Sub-node A — Create Task:
    Title: Call Patient — Payment Not Received
    Description: Patient {{contact.first_name}} {{contact.last_name}} has not completed
    payment after 3 automated reminders (72 hours). Please call {{contact.phone}} to assist.
    Pioneer Rx #: {{contact.pioneer_rx_}}
    Do NOT leave a voicemail mentioning medications or pharmacy services.
    Due: Today
    Assign to: [staff/owner]
  Sub-node B — Remove Tag: Payment-Pending

Save as Draft.
```

---

## WORKFLOW 4A — Compounding Status Notification

```
Navigate to Automation → Workflows → + Create Workflow → Start from Scratch.

WORKFLOW NAME: Order Status — Compounding Started

SETTINGS:
- Allow Re-entry: ON
- Stop on Response: OFF
- Status: Draft

TRIGGER:
- Pipeline Stage Changed
- Pipeline: Patient Rx Fulfillment Pipeline
- Stage: Compounding

NODES:

Node 1 — Add Tag
- Tags to add: Compounding

Node 2 — Send SMS
- Message: Good news — Soleil Pharmacy has started preparing your order.
  We'll notify you as soon as it's ready. Questions? {{custom_values.pharmacy_phone}}

Save as Draft.
```

---

## WORKFLOW 4B — Order Shipped Notification

```
Navigate to Automation → Workflows → + Create Workflow → Start from Scratch.

WORKFLOW NAME: Order Status — Shipped

SETTINGS:
- Allow Re-entry: ON
- Stop on Response: OFF

TRIGGER:
- Pipeline Stage Changed
- Pipeline: Patient Rx Fulfillment Pipeline
- Stage: Shipped

NODES:

Node 1 — Add Tag: Shipped

Node 2 — Update Custom Field
- Field: contact.shipped_date
- Value: {{now | date: "YYYY-MM-DD"}}

Node 3 — Send SMS
- Message: Your Soleil Pharmacy order is on its way!
  Carrier: {{contact.shipment_carrier}}
  Tracking: {{contact.tracking_number}}
  Questions? {{custom_values.pharmacy_phone}}

Node 4 — Send Email
- Subject: Your Soleil Pharmacy Order Has Shipped
- Body:
  Hi {{contact.first_name}},
  Your order is on its way!
  Carrier: {{contact.shipment_carrier}}
  Tracking number: {{contact.tracking_number}}
  Soleil Pharmacy | {{custom_values.pharmacy_phone}}

Save as Draft.
```

---

## WORKFLOW 4C — Ready for Pickup Notification

```
Navigate to Automation → Workflows → + Create Workflow → Start from Scratch.

WORKFLOW NAME: Order Status — Ready for Pickup

SETTINGS:
- Allow Re-entry: ON
- Stop on Response: OFF

TRIGGER:
- Pipeline Stage Changed
- Pipeline: Patient Rx Fulfillment Pipeline
- Stage: Ready for Pickup

NODES:

Node 1 — Send SMS
- Message: Your Soleil Pharmacy order is ready for pickup!
  Address: {{custom_values.pharmacy_address}}
  Hours: {{custom_values.pharmacy_hours}}
  Please bring a valid photo ID.

Node 2 — Send Email
- Subject: Your Soleil Pharmacy Order is Ready for Pickup
- Body:
  Hi {{contact.first_name}},
  Your order is ready and waiting!
  Pickup location: {{custom_values.pharmacy_address}}
  Hours: {{custom_values.pharmacy_hours}}
  Please bring a valid photo ID. See you soon!
  Soleil Pharmacy Team

Save as Draft.
```

---

## WORKFLOW 5 — Refill Reminder (Dynamic)

```
Navigate to Automation → Workflows → + Create Workflow → Start from Scratch.

WORKFLOW NAME: Refill Reminder — Dynamic

SETTINGS:
- Allow Re-entry: ON (each new shipment restarts the refill clock)
- Stop on Response: ON

TRIGGER:
- Contact Tag Added
- Tag: Shipped

NODES:

Node 1 — Wait (Dynamic — based on Days Supply)
- Wait type: Custom Date/Field-Based
- Calculate: {{contact.shipped_date}} + ({{contact.days_supply}} - 9) days
- If GHL does not support field math natively, set:
  Wait until custom date field = contact.shipped_date
  Then add manual wait of 21 days (for 30-day supply default)
  NOTE: For 60/90-day supplies, staff will need to manually adjust.
  Log this as a limitation to revisit when upgrading to GHL V2 API.

Node 2 — If/Else
- Condition: Contact Tag contains "Rx-Expired"
- Branch YES → End (do not send refill prompts on expired Rx)
- Branch NO → Node 3

Node 3 — If/Else
- Condition: Contact Custom Field "refill_count_remaining" = 0
- Branch YES → Node 4 (new Rx needed)
- Branch NO → Node 5 (refill available)

Node 4 (YES — no refills left):
  Sub-node A — Add Tag: New-Rx-Required
  Sub-node B — Send SMS:
    Hi {{contact.first_name}}, it may be time to reorder from Soleil Pharmacy.
    Please contact your provider for a new prescription, then call us at
    {{custom_values.pharmacy_phone}} to get started.
  Sub-node C — Create Task:
    Title: Alert provider — patient needs new Rx
    Description: Patient {{contact.first_name}} {{contact.last_name}} has 0 refills remaining.
    Prescriber: {{contact.prescriber_name}} | NPI: {{contact.prescriber_npi}}
    Contact patient at {{contact.phone}} after provider reauthorizes.
  → End

Node 5 (NO — refills available):
  Sub-node — Send SMS:
    Hi {{contact.first_name}}, your Soleil Pharmacy order may be running low.
    Reply YES to start your refill, or call us at {{custom_values.pharmacy_phone}}.

Node 6 — Wait
- Duration: 48 Hours

Node 7 — If/Else
- Condition: Contact replied "YES" OR Tag "Refill-Requested" added
- Branch YES → Node 8
- Branch NO → Node 9

Node 8 (YES — wants refill):
  Sub-node A — Update Opportunity Stage → Pending Payment
  (This re-triggers Workflow 3 — Payment & Consent Chase)
  Sub-node B — Send Internal Email to pharmacist:
    Refill requested by {{contact.first_name}}. Prescriber: {{contact.prescriber_name}}.
    Pioneer Rx #: {{contact.pioneer_rx_}}
  → End

Node 9 (NO — no reply after 48hrs):
  Sub-node A — Send one final SMS:
    Just a reminder from Soleil Pharmacy — reply YES to refill or call us at
    {{custom_values.pharmacy_phone}}.
  Sub-node B — Wait 24 Hours
  Sub-node C — Create Task if still no reply:
    Title: Follow up — patient hasn't responded to refill prompt
    Description: {{contact.first_name}} {{contact.last_name}} | {{contact.phone}}
    Pioneer Rx #: {{contact.pioneer_rx_}}

Save as Draft.
```

---

## WORKFLOW 6 — Legacy Fax Exception

```
Navigate to Automation → Workflows → + Create Workflow → Start from Scratch.

WORKFLOW NAME: Legacy Fax — Portal Training

SETTINGS:
- Allow Re-entry: OFF
- Stop on Response: OFF

TRIGGER:
- Contact Tag Added
- Tag: Legacy-Fax-User

NODES:

Node 1 — Create Task
- Title: Manual Rx entry required — fax received
- Description: Legacy fax received from {{contact.clinic_name}}.
  Provider: {{contact.full_name}} | NPI: {{contact.npi_number}}
  Action: Enter Rx into Pioneer manually. Then schedule portal training call.
  Do not process until data entry is complete.
- Due: Today
- Assign to: [SDR/staff]

Node 2 — Add Tag: Portal-Training-Pending

Node 3 — Send Email to Provider
- Subject: We received your prescription — here's a faster way
- Body:
  Hi {{contact.first_name}},
  We received your prescription and are processing it now.
  To save time on future orders, you can submit directly through our prescriber portal:
  {{custom_values.portal_guide_url}}
  To schedule a quick walkthrough: {{custom_values.calendly_link}}
  Thank you, Soleil Pharmacy Team

Node 4 — Wait
- Duration: 3 Days

Node 5 — If/Else
- Condition: Contact Tag contains "Portal-Activated"
- Branch YES → Node 6
- Branch NO → Node 7

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
```

---

## WORKFLOW 7 — Provider Portal Onboarding (Post Contract)

```
Navigate to Automation → Workflows → + Create Workflow → Start from Scratch.

WORKFLOW NAME: Provider Portal Onboarding

SETTINGS:
- Allow Re-entry: OFF
- Stop on Response: OFF

TRIGGER:
- Pipeline Stage Changed
- Pipeline: B2B Provider Sales Pipeline
- Stage: Contract Signed

NODES:

Node 1 — Send Email
- Subject: Welcome to Soleil Pharmacy — Your Portal Access
- Body:
  Hi {{contact.first_name}},
  Your Soleil Pharmacy prescriber portal is ready.
  Get started: {{custom_values.portal_guide_url}}
  Book a walkthrough: {{custom_values.calendly_link}}
  We're here to make prescribing seamless for you and your patients.
  Soleil Pharmacy Team

Node 2 — Send SMS
- Message: Hi {{contact.first_name}}, your Soleil Pharmacy portal access is ready.
  Check your email for login details. Questions? Reply here.

Node 3 — Wait
- Duration: 2 Days

Node 4 — If/Else
- Condition: Contact Tag contains "Portal-Activated"
- Branch YES → Node 5
- Branch NO → Node 6

Node 5 (YES — activated):
  Sub-node A — Send Email:
    Subject: You're all set — Soleil Pharmacy Portal
    Body: Hi {{contact.first_name}}, great news — your portal is active and ready.
    Submit your first prescription anytime: {{custom_values.portal_guide_url}}
  Sub-node B — Update Opportunity Stage → Portal Activated
  → End

Node 6 (NO — not yet activated):
  Sub-node — Send Email:
    Subject: Need help getting started? Book a 1-on-1 with Soleil Pharmacy
    Body: Hi {{contact.first_name}}, we noticed you haven't logged in yet.
    Book a 15-minute walkthrough and we'll get you set up:
    {{custom_values.calendly_link}}

Node 7 — Wait
- Duration: 3 Days

Node 8 — If/Else
- Condition: Tag "Portal-Activated" present
- Branch YES → End
- Branch NO → Node 9

Node 9 (NO — 5 days, still not activated):
  Sub-node — Create Task:
    Title: Manual onboarding needed
    Description: {{contact.clinic_name}} has not activated portal after 5 days.
    Call: {{contact.phone}} | Email: {{contact.email}}
    NPI: {{contact.npi_number}}
    Assign to: [SDR]

Save as Draft.
```

---

## FINAL VERIFICATION CHECKLIST

```
Once all workflows are built, verify the following before publishing any:

□ Both pipelines created with correct stage names (exact spelling matters)
□ All 7 workflows saved as Draft
□ Workflow 3 (Payment Chase): Stop on Response = ON
□ All patient-facing SMS/emails reviewed — zero medication names or PHI
□ Custom Values populated with real URLs (Settings → Custom Values):
  - secure_payment_link → payment portal URL
  - pharmacy_address → full address
  - pharmacy_phone → phone number
  - pharmacy_hours → hours string
  - portal_guide_url → prescriber guide URL
  - calendly_link → booking URL
□ HIPAA mode enabled (Settings → Business Profile)
□ BAA signed with GHL
□ 10DLC SMS registered (Settings → Phone Numbers)

PUBLISH ORDER:
1. Workflow 3 (Payment Chase) — first, it's the revenue engine
2. Workflow 4A/4B/4C (Status Updates)
3. Workflow 2 (Rx Intake)
4. Workflow 5 (Refill Reminder)
5. Workflow 1 (B2B Lead Nurture)
6. Workflow 7 (Provider Onboarding)
7. Workflow 6 (Legacy Fax) — last, it's edge-case handling
```
