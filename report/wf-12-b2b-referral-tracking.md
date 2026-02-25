# WF-12: B2B Partner Referral Tracking

## Workflow Name
B2B Partner Referral Tracking

## What It Does & Why It Exists
When a patient contact is tagged `b2b-referral` (and the `referring_partner` custom field is populated), this workflow sends a personalized welcome SMS acknowledging the referral source, creates a pipeline opportunity in the "Referred Lead" stage, adds an internal note identifying the referring partner, and assigns a task to notify the partner of the successful referral. Once the appointment is completed, the contact is automatically enrolled in the post-infusion follow-up workflow (WF-05).

## Business Problem It Solves
B2B partner referrals are Soleil Infusion's highest-quality leads — they arrive pre-warmed with social proof from the referring organization. But tracking which partners send how many patients is difficult without structured automation. Partner relationships need to be nurtured through acknowledgment and feedback loops. Without tracking, high-performing partners go unrecognized and lower-performing partnerships are maintained at the same level — a missed optimization opportunity.

## Benefits & Outcomes
- Referred patients receive a personalized welcome that reinforces their connection to the referring partner — increasing the warmth of their first impression
- Every referral is logged in the pipeline for easy reporting on partner performance
- Internal notes create a permanent audit trail linking patients to referring partners
- Partner notification task closes the loop — partners who receive feedback on their referrals continue sending more
- Automatic enrollment in WF-05 post-visit ensures referred patients receive the same quality follow-up as direct bookings

## Inputs & Outputs
**Inputs:**
- Trigger: Tag `b2b-referral` applied to patient contact
- Prerequisite: Custom field `referring_partner` must be populated on the contact
- Contact: first name, referring partner name

**Outputs:**
- Welcome SMS referencing referring partner by name
- Opportunity created: Patient Rx Fulfillment Pipeline, stage "Referred Lead"
- Internal note: "Referred by {{custom.referring_partner}}"
- Task: "Notify referring partner of successful referral conversion"
- Post-appointment: Enroll in WF-05 (post-infusion follow-up)

## Dependencies
- **Pipeline:** Patient Rx Fulfillment Pipeline with "Referred Lead" stage
- **Custom Fields:** `referring_partner` (Text type — must be populated before tag is applied)
- **Workflow:** WF-05 (post-infusion follow-up — auto-enrolled on appointment completion)
- **Tags:** `b2b-referral`
- **Compliance:** HIPAA — no medical details; referring partner name is operational data, not PHI
- **TCPA:** Stop-on-response on SMS step

## Automation Impact
- **Partner relationship value:** Structured referral tracking enables identifying top-performing B2B partners
- **Referral conversion improvement:** Personalized patient welcome increases first-visit show rate for referred leads
- **Partner retention:** Feedback loop via task notification improves partner satisfaction and continued referral volume
- **Time saved:** Eliminates manual referral logging and partner notification — estimated 10-15 min per referred patient
- **Data value:** Partner performance data enables strategic partnership decisions and resource allocation
