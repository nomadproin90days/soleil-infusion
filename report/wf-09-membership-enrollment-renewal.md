# WF-09: Membership Enrollment & Renewal

## Workflow Name
Membership Enrollment & Renewal

## What It Does & Why It Exists
This dual-trigger workflow handles both ends of the membership lifecycle. The enrollment branch fires on the `member-new` tag — delivering a welcome SMS, membership email, creating a pipeline opportunity, and tagging the contact as `member-active`. The renewal branch fires 7 days before the `membership_renewal_date` custom field date — sending friendly reminders and escalating through SMS and email to prevent churn. Lapsed members are flagged for personal outreach.

## Business Problem It Solves
Memberships are Soleil Infusion's most valuable recurring revenue stream. A 2-4 visit/month membership at a 10-15% discount on sessions averaging $165-$295 generates $1,500-$3,500+ per member annually. Churn prevention is critical — losing even one member to poor renewal communication represents significant recurring revenue loss. This workflow automates the entire retention sequence without requiring staff to track renewal dates manually.

## Benefits & Outcomes
- New members receive an immediate, professional onboarding experience that sets expectations and drives first booking
- 7-day renewal advance notice gives members time to renew before expiry — reducing friction
- Layered renewal reminders (SMS at day 7, SMS + email at day 3, SMS at day 1) maximize renewal rates
- Lapsed member identification creates a targeted win-back list for the team
- Pipeline tracking provides real-time membership health metrics

## Inputs & Outputs
**Inputs (Enrollment):**
- Trigger: Tag `member-new` applied
- Contact: first name, email, phone

**Inputs (Renewal):**
- Trigger: Date-based on `membership_renewal_date` custom field, 7 days prior

**Outputs (Enrollment):**
- Welcome SMS with first-booking instructions and booking link
- Welcome email (benefits, booking link, concierge contact)
- Opportunity created: Membership Pipeline, stage "Active Member"
- Tag: `member-active`

**Outputs (Renewal):**
- 7-day reminder SMS
- Renewal email with session usage summary
- 3-day condition check:
  - Renewed: Thank-you SMS + `member-renewed` tag
  - Not renewed: 2-day final SMS reminder
    - Still not renewed: `member-lapsed` tag + manual personal outreach task

## Dependencies
- **Pipeline:** Membership Pipeline with stages "Interested", "Trial", "Active Member", "Renewal Due", "Lapsed"
- **Custom Fields:** `membership_renewal_date` (Date type — must be populated for renewal trigger)
- **Tags:** `member-new`, `member-active`, `member-renewed`, `member-lapsed`
- **Custom Values:** `calendly_link`
- **Compliance:** HIPAA — no session details in messages; references "your membership" generically
- **TCPA:** Stop-on-response on all SMS steps

## Automation Impact
- **Churn reduction:** Automated multi-touch renewal sequence estimated to reduce churn by 20-35%
- **Revenue per retained member:** $1,500-$3,500+ annually per member
- **Time saved:** Eliminates manual renewal tracking and outreach — approximately 30 min/member/renewal cycle
- **Member LTV:** Higher renewal rates directly increase lifetime value of the membership base
