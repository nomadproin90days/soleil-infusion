# GHL Calendar Infrastructure — Soleil Infusion
*Day 14 Contract Deliverable | Build Guide — Execute in GHL Dashboard*
**Covers:** Two booking calendars + Confirmation + 24h/2h Reminders + No-Show Rescue

---

## Overview

| Deliverable | Type | Est. Build Time |
|---|---|---|
| Calendar 1: New Infusion Consult | Calendar + Intake Form | 20 min |
| Calendar 2: Return Infusion | Calendar + Intake Form | 15 min |
| Workflow A: Booking Confirmation | Workflow (SMS + Email) | 15 min |
| Workflow B: 24h Reminder | Workflow (SMS + Email) | 10 min |
| Workflow C: 2h Reminder | Workflow (SMS) | 8 min |
| Workflow D: No-Show Rescue | Workflow (SMS + Task) | 12 min |

**Total: ~80 minutes in GHL.**

> **HIPAA Rule for all templates below:** No treatment names, drug names, or medical details in SMS. "Infusion appointment" is the safest generic term. Email templates are sent through GHL's HIPAA-compliant channel (verify HIPAA mode is ON before building — see GHL_Foundation_Setup_Guide.md Step 0).

---

## PRE-BUILD: Add Custom Values

*Settings → Custom Values → + Add*

Add these values if not already present (used in templates below):

| Name | Key | Value |
|---|---|---|
| Infusion Booking Link — New | `booking_link_new` | Your GHL calendar URL for New Infusion Consult |
| Infusion Booking Link — Return | `booking_link_return` | Your GHL calendar URL for Return Infusion |
| Clinic Address | `clinic_address` | 801 Landmark Drive, Glen Burnie, MD 21061 |
| Clinic Phone | `clinic_phone` | [Soleil Infusion phone number] |
| Clinic Hours | `clinic_hours` | [e.g. Mon–Fri 9am–6pm, Sat 10am–4pm] |
| Intake Form URL | `intake_form_url` | URL of patient intake/health history form |

---

## CALENDAR 1: New Infusion Consult

*Calendars → + New Calendar → Event Calendar*

### General Settings

| Setting | Value |
|---|---|
| Calendar Name | `New Infusion Consult` |
| Description | "First-time infusion visit — consultation and treatment in one session." |
| Appointment Duration | **60 minutes** |
| Buffer Before | 10 min |
| Buffer After | 15 min |
| Slots Per Hour | 1 |
| Calendar Color | Blue (`#004a99`) |

### Availability

| Setting | Value |
|---|---|
| Days | Mon–Sat |
| Hours | 9:00 AM – 5:00 PM (adjust to Thuy's actual hours) |
| Booking Window | Up to 30 days in advance |
| Minimum Notice | 2 hours before appointment |
| Max Appointments/Day | 6 (adjust to chair capacity) |

### Confirmation Settings (inside Calendar → Notifications tab)

**Turn OFF** all built-in calendar notifications here. We will control these through workflows instead (more control, HIPAA-safe).

- [ ] Uncheck "Send confirmation email" (native)
- [ ] Uncheck "Send reminder email" (native)

> Reason: GHL's native calendar emails are plain and unbranded. The workflows below send better-looking templates with your branding. Don't run both.

### Intake Form (New Patient)

*Under the Calendar → Form tab → + Add Fields*

Add these fields in order:

| Field | Type | Required |
|---|---|---|
| First Name | Text | Yes |
| Last Name | Text | Yes |
| Email | Email | Yes |
| Phone | Phone | Yes |
| Date of Birth | Date | Yes |
| What brings you in? | Dropdown | Yes |
| — Options: | "Energy & Immunity", "Hydration & Recovery", "Skin Brightening (White Jade / Glutathione)", "NAD+ / Cellular Repair", "General Wellness", "Not sure — want a consultation" | |
| Do you have any allergies? | Long Text | No |
| Current medications or supplements? | Long Text | No |
| How did you hear about us? | Dropdown | No |
| — Options: | "Google", "Instagram", "Referral from friend", "Referral from doctor", "Walk-in", "Other" | |

**Form Footer Text:**
```
By booking, you confirm you are 18 or older and agree to Soleil Infusion's
cancellation policy (24-hour notice required). A nurse will review your intake
information before your appointment.
```

---

## CALENDAR 2: Return Infusion

*Calendars → + New Calendar → Event Calendar*

### General Settings

| Setting | Value |
|---|---|
| Calendar Name | `Return Infusion` |
| Description | "For existing Soleil patients booking a follow-up infusion." |
| Appointment Duration | **75 minutes** |
| Buffer Before | 5 min |
| Buffer After | 15 min |
| Slots Per Hour | 1 |
| Calendar Color | Teal (`#008B8B`) |

### Availability

Same as Calendar 1 — Mon–Sat, 9 AM – 5 PM, 30-day booking window.

### Confirmation Settings

Same as Calendar 1 — turn OFF native notifications, handle via workflows.

### Intake Form (Return Patient)

| Field | Type | Required |
|---|---|---|
| First Name | Text | Yes |
| Last Name | Text | Yes |
| Email | Email | Yes |
| Phone | Phone | Yes |
| Which infusion are you booking today? | Dropdown | Yes |
| — Options: | "Essential Hydration ($165–$175)", "Energy & Immunity ($195–$215)", "White Jade / Glow ($225–$250)", "Advanced Functional / NAD+ ($275–$295)", "Same as last visit", "I'll decide when I arrive" | |
| Any health changes since your last visit? | Long Text | No |
| Special requests or notes for your nurse | Long Text | No |

**Form Footer Text:**
```
24-hour cancellation notice required. Late cancellations or no-shows may be
subject to a $35 fee. See you soon!
```

---

## WORKFLOW A: Booking Confirmation (SMS + Email)

*Automation → Workflows → + New Workflow → Start from Scratch*

**Workflow Name:** `Soleil — Booking Confirmation`

### Trigger

- **Trigger Type:** Appointment
- **Event:** Appointment Created
- **Calendar Filter:** Select BOTH `New Infusion Consult` AND `Return Infusion`
  *(or clone this workflow and point each to one calendar)*

### Nodes (in order)

---

**Node 1 — Add Tag**
- Action: Add Tag
- Tag: `Appointment-Scheduled`

---

**Node 2 — Send SMS**
- Action: Send SMS
- From: [Your 10DLC number]
- Message body:

```
Hi {{contact.first_name}}, you're confirmed at Soleil Infusion!

📅 {{appointment.start_time | date: "EEEE, MMMM d"}}
🕐 {{appointment.start_time | date: "h:mm a"}}
📍 801 Landmark Drive, Glen Burnie, MD

Plan to arrive 5–10 min early for check-in.

Need to reschedule? Call us at {{custom_values.clinic_phone}} or reply to this message.

Reply STOP to opt out.
```

---

**Node 3 — Wait (Delay)**
- Wait: 2 minutes
*(Ensures SMS and email don't hit at the exact same second)*

---

**Node 4 — Send Email**
- Template: Use "Infusion Booking Confirmation" (build this template first — instructions below)
- From: noreply@soleilinfusion.com (or your GHL connected email)
- Subject: `Your Soleil Infusion Appointment is Confirmed`

---

**Node 5 — Update Contact Field**
- Action: Update Contact
- Field: Set a note or custom field `Last Appointment Date` = today's date (if field exists)

---

**Node 6 — Internal Notification (Optional but recommended)**
- Action: Send Internal Notification (to staff)
- Message: `New booking: {{contact.first_name}} {{contact.last_name}} | {{appointment.start_time}} | {{appointment.calendar_name}}`

---

**Publish workflow → ON**

---

### Email Template: "Infusion Booking Confirmation"

*Marketing → Emails → Templates → + New Template*

**Template Name:** `Infusion Booking Confirmation`
**Subject:** Your Soleil Infusion Appointment is Confirmed

```
Hi {{contact.first_name}},

Your appointment is confirmed. Here's everything you need:

━━━━━━━━━━━━━━━━
APPOINTMENT DETAILS
━━━━━━━━━━━━━━━━

Date:     {{appointment.start_time | date: "EEEE, MMMM d, yyyy"}}
Time:     {{appointment.start_time | date: "h:mm a"}}
Location: 801 Landmark Drive, Glen Burnie, MD 21061

━━━━━━━━━━━━━━━━
WHAT TO BRING
━━━━━━━━━━━━━━━━

• Valid photo ID
• Insurance card (if applicable)
• List of current medications

━━━━━━━━━━━━━━━━
ARRIVAL
━━━━━━━━━━━━━━━━

Please arrive 5–10 minutes before your appointment time.
Free parking is available on-site.

━━━━━━━━━━━━━━━━
CANCELLATION POLICY
━━━━━━━━━━━━━━━━

We require 24-hour notice for cancellations or rescheduling.
To make a change, call us at {{custom_values.clinic_phone}} or
reply to this email.

━━━━━━━━━━━━━━━━

We look forward to seeing you.

— The Soleil Infusion Team
801 Landmark Drive, Glen Burnie, MD 21061
{{custom_values.clinic_phone}}
```

---

## WORKFLOW B: 24-Hour Reminder

*Automation → Workflows → + New Workflow → Start from Scratch*

**Workflow Name:** `Soleil — 24h Reminder`

### Trigger

- **Trigger Type:** Appointment
- **Event:** Appointment Reminder
- **Reminder Time:** 24 hours before appointment
- **Calendar:** Both calendars (or clone × 2)

### Nodes

---

**Node 1 — Check: Is Appointment Still Active?**
- Action: If/Else Condition
- Condition: `Appointment Status` = `Confirmed` or `Booked`
- If YES → continue to Node 2
- If NO (cancelled/rescheduled) → End workflow

---

**Node 2 — Send SMS**
- Action: Send SMS

```
Hi {{contact.first_name}}, just a reminder — you have an appointment at Soleil Infusion tomorrow.

📅 {{appointment.start_time | date: "EEEE, MMMM d"}}
🕐 {{appointment.start_time | date: "h:mm a"}}
📍 801 Landmark Dr, Glen Burnie, MD

Need to change your appointment? Call {{custom_values.clinic_phone}} — we need 24 hours notice.

Reply STOP to opt out.
```

---

**Node 3 — Send Email**
- Template: Use "Infusion 24h Reminder" (build below)

---

### Email Template: "Infusion 24h Reminder"

**Template Name:** `Infusion 24h Reminder`
**Subject:** `Your appointment is tomorrow — Soleil Infusion`

```
Hi {{contact.first_name}},

A quick reminder that your appointment is tomorrow.

Date:     {{appointment.start_time | date: "EEEE, MMMM d, yyyy"}}
Time:     {{appointment.start_time | date: "h:mm a"}}
Location: 801 Landmark Drive, Glen Burnie, MD 21061

PREPARATION TIPS

• Drink 16–32 oz of water before your appointment.
• Eat a light meal 1–2 hours before.
• Dress comfortably — you'll be relaxed in a treatment chair for up to 90 min.

Need to reschedule? Please call {{custom_values.clinic_phone}} as soon as possible.
We require 24 hours notice.

See you tomorrow,
— The Soleil Infusion Team
```

---

## WORKFLOW C: 2-Hour Reminder

*Automation → Workflows → + New Workflow → Start from Scratch*

**Workflow Name:** `Soleil — 2h Reminder`

### Trigger

- **Trigger Type:** Appointment
- **Event:** Appointment Reminder
- **Reminder Time:** 2 hours before appointment
- **Calendar:** Both calendars

### Nodes

---

**Node 1 — Send SMS only** *(no email — 2h out is SMS territory)*

```
Hi {{contact.first_name}}, you're 2 hours away from your Soleil Infusion appointment at {{appointment.start_time | date: "h:mm a"}}.

📍 801 Landmark Dr, Glen Burnie

We're looking forward to seeing you. Reply STOP to opt out.
```

---

**Publish → ON**

*(No email node here — 2h reminder should be SMS only. Don't over-communicate.)*

---

## WORKFLOW D: No-Show Rescue

*Automation → Workflows → + New Workflow → Start from Scratch*

**Workflow Name:** `Soleil — No-Show Rescue`

### Trigger

- **Trigger Type:** Appointment
- **Event:** Appointment Status Changed
- **Status Filter:** `No Show`
- **Calendar:** Both calendars

> **How to mark a no-show:** When a patient doesn't arrive, your staff opens the appointment in GHL and changes status to "No Show." This fires the workflow.

### Nodes

---

**Node 1 — Add Tag**
- Action: Add Tag
- Tag: `No-Show`
- Action: Remove Tag: `Appointment-Scheduled`

---

**Node 2 — Wait**
- Wait: 30 minutes
*(Small buffer before outreach — patient may still be on their way or parking)*

---

**Node 3 — Send SMS**

```
Hi {{contact.first_name}}, we missed you at Soleil Infusion today.

We'd love to get you rescheduled. It only takes a minute:
{{custom_values.booking_link_return}}

Or call us at {{custom_values.clinic_phone}} and we'll find a time that works.

Reply STOP to opt out.
```

---

**Node 4 — Create Internal Task**
- Action: Create Task
- Task Name: `No-Show Follow-Up — {{contact.first_name}} {{contact.last_name}}`
- Due Date: Tomorrow
- Assigned To: [Thuy or front desk staff]
- Notes: `Patient no-showed on {{appointment.start_time | date: "M/d/yyyy"}}. Follow up to reschedule and check if there's a barrier.`

---

**Node 5 — Wait**
- Wait: 2 days

---

**Node 6 — If/Else: Did They Rebook?**
- Condition: Tag `Appointment-Scheduled` is NOT present
- If true (still not rebooked) → Node 7
- If false (they rebooked) → End workflow

---

**Node 7 — Send Final Re-Engagement SMS**

```
Hi {{contact.first_name}}, we still have openings this week at Soleil Infusion.

Ready to rebook? {{custom_values.booking_link_return}}

We're here when you're ready.

Reply STOP to opt out.
```

---

**Node 8 — Add Tag**
- Tag: `No-Show-Rescue-Sent`
*(Prevents repeat outreach if they still don't respond)*

---

**Publish → ON**

---

## Tags to Pre-Create Before Building

*Go to any contact → Tags field → type tag → save to create account-wide*

| Tag | Used In |
|---|---|
| `Appointment-Scheduled` | Confirmation workflow |
| `No-Show` | No-Show Rescue workflow |
| `No-Show-Rescue-Sent` | No-Show Rescue workflow |
| `Infusion-Return-Booked` | (Optional — for analytics segmentation) |
| `Infusion-New-Booked` | (Optional — for analytics segmentation) |

---

## Final Verification Checklist

### Calendars
- [ ] Calendar 1: "New Infusion Consult" created, duration 60 min, intake form attached
- [ ] Calendar 2: "Return Infusion" created, duration 75 min, return intake form attached
- [ ] Native notifications turned OFF on both calendars
- [ ] Both calendars are published and bookable

### Workflows
- [ ] Workflow A (Booking Confirmation) is PUBLISHED
- [ ] Workflow B (24h Reminder) is PUBLISHED
- [ ] Workflow C (2h Reminder) is PUBLISHED
- [ ] Workflow D (No-Show Rescue) is PUBLISHED

### Email Templates
- [ ] "Infusion Booking Confirmation" template saved
- [ ] "Infusion 24h Reminder" template saved

### Custom Values
- [ ] `booking_link_new` populated with actual URL (after calendars are built)
- [ ] `booking_link_return` populated with actual URL
- [ ] `clinic_address`, `clinic_phone`, `clinic_hours` all populated

### Test Run
1. Make a test booking on Calendar 1 using a personal phone/email
2. Verify confirmation SMS arrives within 1 minute
3. Verify confirmation email arrives within 5 minutes
4. In GHL, mark the test appointment as "No Show"
5. Verify no-show SMS fires at T+30 min

---

## What This Unlocks (Contract Context)

This is the **Day 14 deliverable** from the Independent Contractor Agreement (start date: Feb 16, 2026). Completing this satisfies:

> *"GHL calendar(s) + intake + confirmation/reminder/no-show rescue live"*

It also creates the foundation for:
- **UTM tracking links** — append `?utm_source=referral&utm_medium=link` to the booking URLs for the referral partner pipeline
- **Referral kit page** — embed `{{custom_values.booking_link_new}}` on the bilingual landing pages
- **Weekly reporting** — GHL Calendar analytics shows bookings, no-show rate, reschedule rate by calendar

---

*Last updated: 2026-02-27 | File: docs/GHL_Calendar_Infrastructure.md*
