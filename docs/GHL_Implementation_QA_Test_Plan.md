# QA Test Plan: GHL Calendar & Workflow Infrastructure
**Project:** Soleil Infusion  
**Date:** February 27, 2026  
**Goal:** Verify end-to-end functionality of the booking system after manual GHL UI setup.

---

## 🧪 Phase 1: Infrastructure Verification
*Before running live tests, confirm the "Bones" of the system are correct.*

### 1.1 Calendar Configuration
- [ ] **Calendar Settings:** Confirm "New Infusion Consult" (60m) and "Return Infusion" (75m) exist.
- [ ] **Notification Lockdown:** Open BOTH calendars → Notifications tab. Verify ALL native checkmarks are **UNCHECKED**.
- [ ] **Intake Form:** Click the "Form" tab on each calendar. Verify the custom fields (Reason for Visit, Allergies, etc.) are present and "Required" where specified.

### 1.2 Custom Value Resolution
- [ ] **Settings → Custom Values:** Confirm `booking_link_new` and `booking_link_return` have been updated with real GHL calendar URLs (e.g., `https://api.leadconnectorhq.com/widget/booking/...`).

### 1.3 Tag Presence
- [ ] **Settings → Tags:** Verify these tags exist exactly: `Appointment-Scheduled`, `No-Show`, `No-Show-Rescue-Sent`.

---

## 🧪 Phase 2: Functional Testing (The "Happy Path")
*Goal: Ensure a patient receives their confirmation and reminders.*

### 2.1 Test Booking Execution
1.  Navigate to the `New Infusion Consult` booking URL.
2.  Book an appointment for **exactly 26 hours from now** (this triggers both confirmation AND the 24h reminder sequence).
3.  Use your own mobile number and a test email address.

### 2.2 Confirmation Check
- [ ] **SMS Receipt:** Within 60 seconds, did you receive the "You're confirmed!" SMS?
- [ ] **Email Receipt:** Within 5 minutes, did you receive the branded "Your Soleil Infusion Appointment is Confirmed" email?
- [ ] **Variable Verification:** Does the message show the correct Date, Time, and Address? (Check for broken `{{variable}}` tags).

---

## 🧪 Phase 3: Workflow Trigger Testing (The "Edge Cases")
*Goal: Ensure the system recovers revenue when things go wrong.*

### 3.1 No-Show Rescue Test
1.  In the GHL **Opportunities** or **Calendar** tab, find your test appointment.
2.  Manually change the status to **"No Show."**
3.  **Wait 31 Minutes** (per the Workflow D delay).
- [ ] **Rescue SMS Receipt:** Did you receive the "Hi {{first_name}}, we missed you..." SMS?
- [ ] **Link Verification:** Click the link in the SMS. Does it take you to the `Return Infusion` booking page?
- [ ] **Internal Task Creation:** Go to **CRM → Tasks**. Is there a new task for "No-Show Follow-Up" assigned to the team?

---

## 🧪 Phase 4: Compliance & Content Audit
*Goal: Final check for HIPAA/TCPA safety.*

- [ ] **HIPAA "No-Drug" Rule:** Scan all 4 workflows. Confirm **ZERO** mentions of "Glutathione," "NAD+," "Cinderella Drip," or "B12" in SMS messages. Only generic terms like "Infusion" or "Appointment" should be used.
- [ ] **TCPA Opt-Out:** Verify every SMS node ends with: `Reply STOP to opt out.`
- [ ] **Brand Consistency:** Verify the colors (`#004a99` and `#A6C7E7`) match the Soleil brand kit in the email templates.

---

## 📝 Final Sign-Off Checklist
| Verification Step | Status (Pass/Fail) | Notes |
| :--- | :--- | :--- |
| **Calendars Live** | | |
| **Native Notifications OFF** | | |
| **Workflows Published** | | |
| **Custom Values Resolved** | | |
| **No-Show Rescue Triggered** | | |

**Confidence Score:** ____ / 100

---
*Prepared by Gemini CLI | Soleil Infusion LLC*
