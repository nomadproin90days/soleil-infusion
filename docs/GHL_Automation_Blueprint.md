# High-Level Automation Blueprint for Soleil Pharmacy

Based on Thuy's mandate to eliminate legacy channels (fax/phone) and drive everything through the portal/eRx, the journey is:

## 1. Prescription Journey Map (High-Level)
* **Stage 1: Provider Acquisition & Onboarding** (B2B Outreach → Portal Sign-up)
* **Stage 2: Prescription Intake** (Provider submits Formula-ID via Portal or eRx)
* **Stage 3: Data Entry & Verification** (Pioneer Rx sync/entry + Pharmacist Review)
* **Stage 4: Patient Payment & Consent** (Patient receives invoice and signs HIPAA/consent)
* **Stage 5: Fulfillment / Compounding** (Sterile vs. Non-Sterile prep in Pioneer)
* **Stage 6: Dispensing** (Shipping or local pickup)
* **Stage 7: Follow-up & Refills** (Patient adherence check and automatic refill prompts)

## 2. Automation Opportunities by Stage

**Stage 1: Provider Acquisition & Onboarding**
* **Automate in GHL:** Welcome sequence, delivery of the "Portal Setup Guide," and sequence to schedule a 1-on-1 onboarding call.
* **Manual:** SDR calls, verification of NPI/Credentials.
* **Trigger:** Form submission (Provider Interest) or manual tag `B2B-Lead`.
* **Action:** Send Welcome Email + SMS; Create Opportunity in "Provider Pipeline"; Assign task to SDR.
* **Exit Condition:** Tag added `Portal-Activated`.

**Stage 2: Prescription Intake**
* **Automate in GHL:** Internal alert to pharmacy staff; create/update Patient Opportunity in "Rx Pipeline." Send "Rx Received" confirmation to the provider.
* **Manual:** Very few, assuming the provider uses the portal. Exception handling (AI/OCR extraction) if fax is used as a temporary bridge.
* **Trigger:** Webhook from Prescriber Portal / eRx system.
* **Action:** Add/Update Contact; Move Pipeline Stage to "Rx Received"; Notify Internal Staff.
* **Exit Condition:** Rx verified by pharmacist.

**Stage 3 & 4: Patient Payment & Consent**
* **Automate in GHL:** Reach out to the patient to collect payment and digital signatures (HIPAA/Consent). Chase sequences for unpaid invoices (24hr, 48hr reminders).
* **Manual:** Calling patients who fail to respond to digital payment links after 3 days.
* **Trigger:** Pipeline stage changes to "Pending Payment".
* **Action:** Send secure SMS/Email with payment/consent link. Wait 24 hrs -> If unpaid, send reminder.
* **Exit Condition:** Payment complete (moves pipeline to "Ready to Fill" / "Compounding").

**Stage 5: Fulfillment / Compounding**
* **Automate in GHL:** Minimal. Keep GHL out of the clinical compounding workflow. Thuy's model uses Pioneer as the operational source of truth here.
* **Manual:** All sterile/non-sterile compounding SOPs, pharmacist checks.
* **Trigger:** Webhook from Pioneer (Status: Verified) OR manual GHL pipeline update.
* **Action:** Move opportunity to "Compounding".
* **Exit Condition:** Medication is finished and ready.

**Stage 6: Dispensing (Shipping/Pickup)**
* **Automate in GHL:** Notify patient that their medication is ready or has shipped. Provide tracking numbers.
* **Manual:** Handing medication to patient or packing boxes.
* **Trigger:** Pipeline stage updated to "Shipped" or "Ready for Pickup".
* **Action:** Send SMS/Email with tracking link or pickup instructions.
* **Exit Condition:** Medication received by patient.

**Stage 7: Follow-up & Refills**
* **Automate in GHL:** 30/60/90-day check-ins. Refill reminders to patients and adherence reports back to the provider.
* **Manual:** Pharmacist consultation if patient reports adverse effects.
* **Trigger:** "Shipped" date + 21 days (for a 30-day supply).
* **Action:** Send SMS "Do you need a refill?" If yes, route back to Stage 4 or alert Provider.
* **Exit Condition:** Refill Rx generated.

## 3. Required GoHighLevel Assets

**Pipelines / Stages:**
1. **B2B Provider Sales Pipeline:** Lead → Contacted → Demo Scheduled → Credentialing → Portal Activated.
2. **Patient Rx Fulfillment Pipeline:** Rx Received → Pending Payment → Compounding → Ready for Pickup/Shipped → Complete.

**Tags:**
* `B2B-Lead`, `Portal-Activated`, `Legacy-Fax-User` (for providers needing portal training)
* `Rx-Received`, `Payment-Pending`, `Shipped`, `Refill-Due`

**Custom Fields:**
* Provider: `NPI Number`, `Clinic Name`, `Preferred Communication`
* Patient: `Pioneer Rx #`, `Formula ID`, `Tracking Number`, `Prescriber Name`

**Forms / Surveys:**
* Provider Inquiry Form
* Patient Digital Intake & Consent Form (Secure)

**Workflows:**
* B2B Lead Nurture & Onboarding
* Patient Payment Collection & Chase Sequence
* Order Status Updates (Processing, Shipped, Pickup)
* Refill Reminder Sequence (21-day, 45-day, etc.)

**Email / SMS Templates:**
* "Welcome to Soleil Prescriber Portal" (Email)
* "Invoice & Consent Required" (SMS/Email - generic messaging for privacy)
* "Your order has shipped" (SMS)

## 4. Compliance / Risk Considerations
* **HIPAA Compliance Mode:** GHL must be set to HIPAA compliance mode (requires the $297+ plan and signed BAA).
* **PHI in Communications:** SMS and Email templates must *never* contain the medication name, clinical conditions, or sensitive PHI. Use generic messaging: *"Your order from Soleil Pharmacy requires attention. Please click here to view."*
* **Source of Truth:** GHL is strictly for CRM, communication, and commercial metrics. Pioneer remains the undisputed operational source of truth for auditable clinical workflows.

## 5. Recommended Build Order

* **Phase 1 (Must-Have): Patient Revenue & Communication Engine**
  * Setup HIPAA compliance in GHL.
  * Patient Rx Fulfillment Pipeline.
  * Automated Payment & Consent SMS/Email sequences (crucial for cash flow).
  * Basic Order Status notifications (Shipped/Pickup).
* **Phase 2 (Optimization): Provider Onboarding & B2B Engine**
  * B2B Provider Sales Pipeline.
  * Automated portal onboarding sequence to reduce Thuy's manual training load.
  * Refill reminder workflows.
* **Phase 3 (Advanced Automation): AI Integration & Full Sync**
  * AI/OCR webhook integration to catch and process any legacy faxes, automatically queuing SDR tasks to train that clinic on the portal.
  * Deep integration (via Zapier/Make) between the Prescriber Portal, Pioneer Rx, and GHL to completely automate pipeline stage movement.

---
## AI Assistant Prompt (Short Version)
*You can use this prompt in an AI tool to generate specific GoHighLevel workflow steps:*

"Act as a GoHighLevel workflow expert. I am building a HIPAA-compliant pharmacy automation for 'Soleil Pharmacy'. Generate the node-by-node logic for a workflow that triggers when a patient enters the 'Pending Payment' stage in the 'Patient Rx Fulfillment' pipeline. The workflow needs to send a secure, generic SMS/email link for payment and digital consent, then wait 24 hours. If no payment is received, send a reminder. If still no payment after another 48 hours, create a manual task for staff to call the patient."