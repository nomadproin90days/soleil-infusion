# WF-06: No-Show Recovery

## Workflow Name
No-Show Recovery

## What It Does & Why It Exists
When an appointment is marked "No Show" in GHL, this workflow tags the contact, waits 30 minutes, and sends a warm rescheduling SMS with a booking link. Two days later, it sends a reschedule offer email. It then checks whether the patient has rebooked — if yes, it swaps tags from `no-show` to `rescheduled`; if no, it creates a manual call task for the team. This creates a structured recovery process for missed revenue.

## Business Problem It Solves
No-shows represent lost revenue that is partially recoverable if engaged quickly. Research shows that a significant percentage of no-shows (30-40%) will reschedule when contacted the same day. Without automation, busy clinic staff often fail to follow up on no-shows until it's too late, and the revenue is permanently lost. This workflow recovers a material percentage of no-shows automatically.

## Benefits & Outcomes
- Patients are reached within 30 minutes — while the missed appointment is still top of mind
- Warm, non-judgmental tone maintains the relationship without alienating the patient
- 2-day email follow-up catches patients who missed or ignored the initial SMS
- Rescheduled patients re-enter the pre-visit workflow (WF-04) automatically via booking trigger
- Manual call task ensures persistent no-shows still receive human outreach

## Inputs & Outputs
**Inputs:**
- Trigger: Appointment status changed to "No Show"
- Contact: first name

**Outputs:**
- Tag: `no-show` (immediate)
- 30-minute wait
- Reschedule SMS with booking link
- 2-day wait
- Reschedule offer email
- Branch A (rebooked): Remove `no-show`, add `rescheduled`
- Branch B (no rebook): Manual call task assigned to team

## Dependencies
- **Custom Values:** `calendly_link` for reschedule booking link
- **Tags:** `no-show`, `rescheduled`
- **Workflow:** WF-04 (re-triggers automatically when patient books a new appointment)
- **Compliance:** HIPAA — no clinical details; references "your appointment" generically
- **TCPA:** Stop-on-response on SMS step

## Automation Impact
- **Time saved:** 15-20 minutes per no-show of manual recovery outreach
- **Revenue recovery:** If 30% of no-shows reschedule, each rebooked session = $165-$295 recovered
- **Speed advantage:** 30-minute response window vs. typical same-day manual follow-up
- **Scalability:** Handles all no-shows simultaneously without staff prioritization
