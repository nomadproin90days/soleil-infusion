# GHL Foundation Setup Guide — Soleil Pharmacy
*Complete this entire guide BEFORE building any workflows. Workflows depend on every item here existing first.*

---

## STEP 0 — HIPAA Compliance Mode
**Do this first. Nothing else matters if this isn't on.**

1. Go to **Settings → Business Profile**
2. Scroll to **HIPAA Compliance** section
3. Toggle **ON**
4. GHL will prompt you to sign a **Business Associate Agreement (BAA)** — sign it
5. Confirm the account is on the **$297/mo plan or higher** (HIPAA mode requires it)

> Once enabled: GHL will restrict certain features (some email tracking pixels are disabled, conversation logs are handled differently). This is correct behavior.

---

## STEP 1 — Create Custom Values
*Settings → Custom Values → + Add*

These are account-wide variables used in workflow templates.

| Name | Key (auto-generated) | Value to set |
|------|---------------------|--------------|
| Secure Payment Link | `secure_payment_link` | URL of your payment + consent portal page |
| Pharmacy Address | `pharmacy_address` | Full address for pickup instructions |
| Pharmacy Phone | `pharmacy_phone` | Main pharmacy phone number |
| Pharmacy Hours | `pharmacy_hours` | e.g. "Mon–Fri 9am–6pm, Sat 10am–3pm" |
| Portal Guide URL | `portal_guide_url` | URL to the prescriber portal PDF/page |
| Calendly Link | `calendly_link` | Onboarding call booking link |

> In workflows, these are referenced as `{{custom_values.secure_payment_link}}` etc.

---

## STEP 2 — Create Custom Fields (Contact Level)
*Settings → Custom Fields → + Add Field → Contact*

Create two groups: **Provider** and **Patient**

### Group: Provider Fields

| Field Label | Field Key | Type | Options |
|-------------|-----------|------|---------|
| NPI Number | `npi_number` | Text | — |
| Clinic Name | `clinic_name` | Text | — |
| Preferred Communication | `preferred_communication` | Dropdown | Email, SMS, Portal |
| Portal Activation Date | `portal_activation_date` | Date | — |
| Contract Signed Date | `contract_signed_date` | Date | — |

### Group: Patient Fields

| Field Label | Field Key | Type | Options |
|-------------|-----------|------|---------|
| Pioneer Rx # | `pioneer_rx_number` | Text | — |
| Formula ID | `formula_id` | Text | — |
| Prescriber Name | `prescriber_name` | Text | — |
| Prescriber NPI | `prescriber_npi` | Text | — |
| Days Supply | `days_supply` | Number | — |
| Rx Expiration Date | `rx_expiration_date` | Date | — |
| Refill Count Remaining | `refill_count_remaining` | Number | — |
| Compound Type | `compound_type` | Dropdown | Sterile, Non-Sterile |
| Consent Signed Date | `consent_signed_date` | Date | — |
| Payment Date | `payment_date` | Date | — |
| Shipped Date | `shipped_date` | Date | — |
| Tracking Number | `tracking_number` | Text | — |
| Shipment Carrier | `shipment_carrier` | Dropdown | UPS, FedEx, USPS, Other |
| Preferred Language | `preferred_language` | Dropdown | English, Korean, Vietnamese, Other |
| Auto-Refill Enrolled | `auto_refill_enrolled` | Checkbox | — |

---

## STEP 3 — Create Tags
*Contacts → Tags → Manage Tags (or they auto-create when added in workflows)*

Create these tags now so they're searchable and consistent:

### Provider Tags
- `B2B-Lead`
- `Portal-Activated`
- `Contract-Signed`
- `Legacy-Fax-User`
- `Portal-Training-Pending`
- `High-Volume-Clinic`

### Patient Tags
- `Rx-Received`
- `Pharmacist-Review-Pending`
- `Payment-Pending`
- `Payment-Complete`
- `Consent-Signed`
- `Compounding`
- `Shipped`
- `Refill-Due`
- `Refill-Auth-Active`
- `New-Rx-Required`
- `Auto-Refill-Enrolled`
- `Korean-Language`
- `Rx-Expired`
- `Refill-Requested`

> **How to pre-create tags:** Go to any contact → Tags field → type the tag name → save. It now exists account-wide.

---

## STEP 4 — Create Pipeline 1: B2B Provider Sales Pipeline
*CRM → Pipelines → + New Pipeline*

**Pipeline Name:** `B2B Provider Sales Pipeline`

Create stages in this exact order:

| # | Stage Name | Color suggestion |
|---|-----------|-----------------|
| 1 | Lead | Gray |
| 2 | Contacted | Blue |
| 3 | Demo Scheduled | Light Blue |
| 4 | Credentialing | Yellow |
| 5 | Contract Signed | Orange |
| 6 | Portal Activated | Green |

**Settings:**
- Currency: USD
- Opportunity Value: leave blank (not a revenue pipeline, it's operational)

---

## STEP 5 — Create Pipeline 2: Patient Rx Fulfillment Pipeline
*CRM → Pipelines → + New Pipeline*

**Pipeline Name:** `Patient Rx Fulfillment Pipeline`

Create stages in this exact order:

| # | Stage Name | Color suggestion | Notes |
|---|-----------|-----------------|-------|
| 1 | Rx Received | Gray | Webhook drops patients here |
| 2 | Pharmacist Review | Yellow | SLA: 2hr max |
| 3 | Pending Payment | Orange | Triggers payment chase workflow |
| 4 | Compounding | Purple | Pioneer operational stage |
| 5 | Ready for Pickup | Light Green | |
| 6 | Shipped | Blue | Triggers shipping notification |
| 7 | Complete | Green | Final stage |

**Settings:**
- Currency: USD
- Opportunity value: set to invoice amount when known

---

## STEP 6 — Create Email Templates
*Marketing → Emails → Templates → + New Template*

Create these 5 templates now (copy/paste body below):

---

### Template 1: Welcome to Soleil Prescriber Portal
**Subject:** Welcome to the Soleil Pharmacy Prescriber Portal

```
Hello {{contact.first_name}},

Welcome to the Soleil Pharmacy Prescriber Portal. We're excited to have you on board.

Your portal gives you direct access to:
- Submit prescriptions instantly via Formula ID
- Track order status in real time
- Manage your patient roster

To get started, please review the setup guide here:
{{custom_values.portal_guide_url}}

If you'd like a walkthrough, you can book a 15-minute onboarding call here:
{{custom_values.calendly_link}}

We're here to make the prescription process seamless for you and your patients.

Warm regards,
The Soleil Pharmacy Team
```

---

### Template 2: Action Required — Complete Your Soleil Pharmacy Order
**Subject:** Action Required: Soleil Pharmacy Order

```
Hello {{contact.first_name}},

Your order from Soleil Pharmacy requires your attention before we can proceed with fulfillment.

Please click the secure link below to complete your payment and sign the necessary consent forms:

{{custom_values.secure_payment_link}}

This step is required to process your order. If you have any questions, please reply to this email or call us at {{custom_values.pharmacy_phone}}.

Thank you,
Soleil Pharmacy Team
```

---

### Template 3: Payment Reminder
**Subject:** Reminder: Action Required — Soleil Pharmacy Order

```
Hello {{contact.first_name}},

This is a friendly reminder that your Soleil Pharmacy order is still waiting on your payment and consent forms.

Complete your order securely here:
{{custom_values.secure_payment_link}}

If you need assistance, we're happy to help. Call us at {{custom_values.pharmacy_phone}} or reply to this email.

Thank you,
Soleil Pharmacy Team
```

---

### Template 4: Your Order Has Shipped
**Subject:** Your Soleil Pharmacy Order Has Shipped

```
Hello {{contact.first_name}},

Great news — your Soleil Pharmacy order is on its way!

Carrier: {{contact.shipment_carrier}}
Tracking: {{contact.tracking_number}}

If you have any questions about your delivery, please call us at {{custom_values.pharmacy_phone}} or visit us at {{custom_values.pharmacy_address}}.

Thank you for choosing Soleil Pharmacy.

Soleil Pharmacy Team
```

---

### Template 5: Your Order is Ready for Pickup
**Subject:** Your Soleil Pharmacy Order is Ready

```
Hello {{contact.first_name}},

Your Soleil Pharmacy order is ready and waiting for you!

Pickup Location: {{custom_values.pharmacy_address}}
Hours: {{custom_values.pharmacy_hours}}

Please bring a valid photo ID when you come in.

See you soon,
Soleil Pharmacy Team
```

---

## STEP 7 — Verify API Connection
*Settings → Integrations → API*

Confirm your credentials match exactly:

```
GHL_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6Ik9LSWhTN0l3bUJxc2lucDRCT1pWIiwiY29tcGFueV9pZCI6IkhLQ0dFT3ozWnNqSm1PSFBodmFzIiwidmVyc2lvbiI6MSwiaWF0IjoxNzAxODk1MDQ3NjIwLCJzdWIiOiJ1c2VyX2lkIn0.YZG85_WKYvrghV7LZ36ymObarjqYnWXVJzhUvyDIQlg
GHL_LOCATION_ID=OKIhS7IwmBqsinp4BOzV
GHL_COMPANY_ID=HKCGEOz3ZsjJmOHPhvas
```

> Note: The Location ID and Company ID in `.env.local` were corrupted by Gemini — already fixed.

---

## STEP 8 — SMS Compliance Setup
*Settings → Phone Numbers → Compliance*

Before any SMS workflow goes live:

1. **Register your 10DLC number** (required for business SMS in the US)
   - Business name: Soleil Pharmacy
   - Use case: Healthcare / Transactional
   - Message samples: use the generic templates above
2. **Confirm opt-out language** — GHL automatically appends "Reply STOP to opt out" to first SMS. Verify this is ON.
3. **HIPAA note:** Do not send PHI via SMS. Templates above are already compliant.

---

## Foundation Checklist — Sign Off Before Building Workflows

- [ ] HIPAA mode ON + BAA signed
- [ ] All 6 Custom Values created + values populated
- [ ] All 15 Patient custom fields created
- [ ] All 5 Provider custom fields created
- [ ] All 14 tags created
- [ ] B2B Provider Sales Pipeline created (6 stages)
- [ ] Patient Rx Fulfillment Pipeline created (7 stages)
- [ ] All 5 email templates created
- [ ] 10DLC SMS registration submitted
- [ ] API credentials verified in `.env.local`

**Once all boxes are checked → proceed to Workflow builds.**

---

## Workflow Build Order (After Foundation Complete)

| Priority | Workflow | Trigger | Estimated build time |
|----------|----------|---------|---------------------|
| 1 | Patient Payment & Consent Chase | Pipeline → Pending Payment | 20 min |
| 2 | Rx Intake & Pharmacist Alert | Inbound Webhook | 15 min |
| 3 | Order Status Notifications (Shipped + Pickup) | Pipeline stage change | 10 min |
| 4 | Refill Reminder Sequence | Tag: Shipped + date math | 20 min |
| 5 | B2B Lead Nurture & Onboarding | Tag: B2B-Lead | 15 min |
| 6 | Provider Portal Onboarding | Pipeline → Contract Signed | 15 min |
| 7 | Legacy Fax Exception | Tag: Legacy-Fax-User | 10 min |
