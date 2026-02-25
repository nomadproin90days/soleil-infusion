# WF-04: New Patient Booking & Pre-Visit Sequence

## Workflow Name
New Patient Booking & Pre-Visit Sequence

## What It Does & Why It Exists
Every time a patient books an appointment on any Soleil Infusion calendar, this workflow fires immediately — sending a booking confirmation SMS with the clinic address, a full confirmation email with location details and what to expect, and two timed reminders (24 hours before and 1 hour before the appointment). It also tags the contact and creates a staff task to verify intake form completion.

## Business Problem It Solves
No-shows are among the most costly problems for appointment-based medical businesses. At $165-$295 per session, a single no-show wastes a treatment slot and represents significant lost revenue. Industry data shows that multi-touch reminder sequences reduce no-shows by 30-50%. This workflow delivers the full reminder sequence automatically, without requiring any staff action after the booking is made.

## Benefits & Outcomes
- Patients receive immediate confirmation — reducing anxiety and second-guessing about their booking
- Location and parking information reduces late arrivals and cancellations from confusion
- 24-hour reminder significantly reduces same-day no-shows
- 1-hour reminder catches patients who forgot or ran into scheduling conflicts
- Staff task ensures intake form is completed before the visit — improving clinical preparation

## Inputs & Outputs
**Inputs:**
- Trigger: Calendar appointment created (any calendar in the sub-account)
- Appointment data: `appointment.start_time`, contact first name

**Outputs:**
- Immediate confirmation SMS with clinic address
- Immediate confirmation email (address, parking, expectations)
- Tag: `appointment-confirmed`
- Staff task: "Pre-visit intake form sent?"
- 24-hour reminder SMS
- 1-hour reminder SMS

## Dependencies
- **Calendar:** Any GHL calendar in the Soleil Infusion sub-account
- **Custom Values:** `calendly_link` or booking link for any rebooking references
- **Tags:** `appointment-confirmed`
- **Compliance:** HIPAA — messages reference "your appointment" generically, no treatment details
- **TCPA:** Stop-on-response on all SMS steps; time-window enforcement 8am-9pm ET

## Automation Impact
- **Time saved:** 10-15 minutes per booking of manual confirmation outreach
- **No-show reduction:** Estimated 30-50% reduction with full reminder sequence
- **Revenue protection:** At $165-$295/session, even 2-3 fewer no-shows per month = $400-$900 recovered monthly
- **Scalability:** Works identically for 1 or 100 bookings per day
