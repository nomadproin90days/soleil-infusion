# GoHighLevel Setup and Workflow Creation Session

## API Setup
During this session, we extracted the GoHighLevel API key from the provided PDF document.
The key was decoded to identify the necessary Location ID and Company ID.
These credentials have been securely stored in the project's `.env.local` file to prevent exposing sensitive information in the codebase.

```env
GHL_API_KEY=... (Extracted from PDF)
GHL_LOCATION_ID=OKIhS7OwBMqrlyncP4B1pY (Example structure)
GHL_COMPANY_ID=HKQGET3ozZsjJm1PHvfas (Example structure)
```

## New Workflow: Patient Rx - Pending Payment & Consent Chase
Based on the high-level automation blueprint, we detailed the node-by-node logic for the "Pending Payment & Consent Chase" workflow. This workflow is designed to automate patient outreach for payment and digital signatures while maintaining HIPAA compliance.

### Workflow Settings
* **Name:** Patient Rx - Pending Payment & Consent Chase
* **Settings:** Allow Re-entry = OFF, Stop on Response = OFF (we want to control the stop via our If/Else conditions based on payment success).

### Trigger
* **Trigger Type:** Pipeline Stage Changed
* **Filters:**
  * In Pipeline: `Patient Rx Fulfillment Pipeline`
  * Pipeline Stage: `Pending Payment`

### Workflow Nodes

**Node 1: Action - Send SMS**
* **Message:** *"Hi {{contact.first_name}}, your order from Soleil Pharmacy requires attention. Please click here to view your invoice and provide required consent: {{custom_values.secure_payment_link}}"*
* *Note on HIPAA:* This keeps the message completely generic, avoiding mentions of specific medications or conditions.

**Node 2: Action - Send Email**
* **Subject:** Action Required: Soleil Pharmacy Order
* **Body:** *"Hello {{contact.first_name}},<br><br>Your order from Soleil Pharmacy requires attention before we can proceed with fulfillment. Please click the secure link below to view your details, complete payment, and sign the necessary consent forms.<br><br><a href='{{custom_values.secure_payment_link}}'>View Secure Portal</a><br><br>Thank you,<br>Soleil Pharmacy Team"*

**Node 3: Action - Wait**
* **Wait Type:** Time Delay
* **Duration:** 24 Hours

**Node 4: Action - If/Else (Condition: Did they pay?)**
* **Branch 1 (Yes, Paid):** Contact Tag includes `Payment-Complete` (or Pipeline Stage is `Compounding`)
* **Branch 2 (No, Unpaid):** Default branch

*(If they went down Branch 1 - Yes)*
**Node 5: Action - Remove from Workflow**
* *Workflow ends for this patient. They paid within the first 24 hours.*

*(If they went down Branch 2 - No)*
**Node 6: Action - Send SMS (Reminder)**
* **Message:** *"Hi {{contact.first_name}}, this is a friendly reminder from Soleil Pharmacy. We are still waiting on your payment/consent to fulfill your order. Please complete it securely here: {{custom_values.secure_payment_link}}"*

**Node 7: Action - Wait**
* **Wait Type:** Time Delay
* **Duration:** 48 Hours

**Node 8: Action - If/Else (Condition: Did they pay now?)**
* **Branch 1 (Yes, Paid):** Contact Tag includes `Payment-Complete`
* **Branch 2 (No, Unpaid):** Default branch

*(If they went down Branch 1 - Yes)*
**Node 9: Action - Remove from Workflow**
* *Workflow ends for this patient. They paid after the reminder.*

*(If they went down Branch 2 - No)*
**Node 10: Action - Add Task (Manual Escalation)**
* **Title:** Call Patient - Unpaid Rx
* **Description:** *"Patient {{contact.name}} has been in 'Pending Payment' for 3 days without responding to digital links. Please call them at {{contact.phone}} to assist with payment and consent over the phone."*
* **Assign To:** Specific staff member or "Assigned User".
