# WF-03: Patient Rx — Payment & Consent Chase

## Workflow Name
Patient Rx — Payment & Consent Chase

## What It Does & Why It Exists
Triggered when a patient opportunity enters the "Pending Payment" stage in the Patient Rx Fulfillment Pipeline, this workflow sends a payment request via SMS and email with a secure payment link. It waits 24 hours, then checks whether payment has been received. Confirmed payments advance automatically; unpaid accounts receive a second SMS and trigger an internal admin alert for manual follow-up.

## Business Problem It Solves
IV infusion services have a high ticket price ($165-$295 per session), and delayed payment collection directly impacts cash flow. Without automation, staff must manually track which patients have paid and send reminders — a time-intensive process that often gets deprioritized. This workflow ensures no payment falls through the cracks while maintaining a professional, non-pushy patient communication tone.

## Benefits & Outcomes
- Payment requests sent immediately when opportunity enters Pending Payment — no delay
- Dual-channel outreach (SMS + email) increases payment completion rates
- 24-hour conditional branch eliminates the need for staff to manually check payment status
- Second reminder and admin alert provide structured escalation for persistent non-payment
- Reduces accounts receivable aging for a high-volume elective service

## Inputs & Outputs
**Inputs:**
- Trigger: Opportunity stage = "Pending Payment" in Patient Rx Fulfillment Pipeline
- Custom value: `secure_payment_link` (must be populated in GHL Custom Values)

**Outputs:**
- Payment request SMS with secure link (immediate)
- Payment request email with session summary and support contact (immediate)
- 24-hour wait
- Branch A (paid): Tag `payment-confirmed` applied
- Branch B (unpaid): Second SMS reminder + internal admin notification

## Dependencies
- **Pipeline:** Patient Rx Fulfillment Pipeline with "Pending Payment" stage
- **Custom Values:** `secure_payment_link` must be populated before workflow activation
- **Tags:** `payment-confirmed`
- **Compliance:** HIPAA — no medication names, diagnoses, or PHI in any messages
- **TCPA:** Stop-on-response active on both SMS steps

## Automation Impact
- **Time saved:** 15-20 minutes per patient of manual payment tracking and follow-up
- **Cash flow improvement:** Faster payment collection cycle reduces aging receivables
- **Staff focus:** Admin only engages on exceptions (24-hour non-payment) — not routine follow-ups
- **Scalability:** Handles unlimited concurrent payment-pending patients simultaneously
