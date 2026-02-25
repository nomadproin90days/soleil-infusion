# WF-05: Post-Infusion Follow-up & Rebooking

## Workflow Name
Post-Infusion Follow-up & Rebooking

## What It Does & Why It Exists
Two hours after a visit is marked complete, this workflow sends a thank-you SMS asking about the patient's experience. If they reply (indicating engagement), they are automatically routed to the Google Review workflow (WF-10). If they don't reply after 24 hours, a softer follow-up email is sent. Five days post-visit, all patients receive a rebooking SMS with a direct booking link. The workflow closes by applying the `post-visit-follow-up-sent` tag.

## Business Problem It Solves
The period immediately after a positive patient experience is the highest-value window for rebooking, referral, and review generation. Without automation, most practices miss this window entirely — patients who had a great experience receive no follow-up, drift away, and book elsewhere. This workflow systematically captures value from every completed appointment.

## Benefits & Outcomes
- Thank-you outreach strengthens the patient-practice relationship
- Positive responders are automatically funneled into review generation (compounding local SEO value)
- Non-responders receive an alternative pathway via email to maintain engagement
- 5-day rebooking SMS creates a systematic rebooking pipeline
- Tags enable downstream segmentation and reporting on post-visit engagement rates

## Inputs & Outputs
**Inputs:**
- Trigger: Appointment status changed to "Completed" OR tag `visit-complete` applied
- Contact: first name, appointment end time

**Outputs:**
- 2-hour post-visit thank-you SMS
- Conditional routing: reply → WF-10 (review), no reply → follow-up email
- 5-day rebooking SMS with booking link
- Tag: `post-visit-follow-up-sent`

## Dependencies
- **Workflow:** WF-10 (Google Review Request) — enrolled via tag application
- **Custom Values:** `calendly_link` for rebooking link
- **Tags:** `review-request`, `post-visit-follow-up-sent`, `visit-complete`
- **Compliance:** HIPAA — no treatment details in messages; references "your visit" generically
- **TCPA:** Stop-on-response on all SMS steps

## Automation Impact
- **Time saved:** 20-30 minutes per patient of manual post-visit outreach
- **Rebooking rate improvement:** Estimated 20-35% increase with structured follow-up
- **Review generation:** Routes satisfied patients to review request — zero additional staff effort
- **LTV (lifetime value):** Each rebooked patient generates $165-$295 per additional visit
