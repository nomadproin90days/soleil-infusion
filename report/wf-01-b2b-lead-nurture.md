# WF-01: B2B Lead Nurture & Onboarding

## Workflow Name
B2B Lead Nurture & Onboarding

## What It Does & Why It Exists
This workflow activates the moment a B2B partner lead enters the system — either via form submission or manual tag application. It delivers an immediate branded welcome via SMS and email, creates a pipeline opportunity in the B2B Partner Pipeline, and assigns a structured sequence of follow-up tasks at 1 day, 3 days, and 7 days. The goal is to ensure no B2B partner lead goes cold due to delayed or inconsistent outreach.

## Business Problem It Solves
Soleil Infusion's B2B channel (clinics, first responder organizations, corporate wellness accounts, Korean community networks) represents its highest-value referral source. Without automation, a busy owner or small team will inevitably miss follow-up windows, lose momentum, and forfeit partnerships that could each generate dozens of patient referrals. This workflow ensures every B2B lead receives a professional, timely response regardless of team bandwidth.

## Benefits & Outcomes
- Every B2B lead receives a response within minutes, not hours or days
- Three structured touch points prevent leads from going cold
- Pipeline opportunity creation gives management visibility into B2B funnel health
- Task assignment creates team accountability without micromanagement
- Professional communication establishes credibility before any human interaction

## Inputs & Outputs
**Inputs:**
- Tag applied: `b2b-lead` OR form submission from B2B lead capture form
- Contact fields: first name, email, phone, company name

**Outputs:**
- Welcome SMS (immediate, TCPA-compliant with STOP opt-out)
- Welcome email (branded, partnership overview, next steps)
- Pipeline opportunity created in B2B Partner Pipeline at stage "New Lead"
- Task 1: Follow up within 1 business day
- Task 2: 3-day check-in
- Task 3: 7-day activation check

## Dependencies
- **Pipeline:** B2B Partner Pipeline (must exist with "New Lead" stage)
- **Tags:** `b2b-lead`
- **Triggers:** GHL tag-based trigger or form webhook
- **Team:** Task assignee defined in GHL team settings

## Automation Impact
- **Time saved:** 15-20 minutes of manual outreach per new B2B lead
- **Response time:** Reduced from hours/days to under 60 seconds
- **Follow-up consistency:** 100% — no leads fall through the cracks
- **Scalability:** Handles unlimited simultaneous B2B leads without additional staff
