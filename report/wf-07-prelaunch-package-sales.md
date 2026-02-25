# WF-07: Pre-Launch Package Sales (Buy 2 Get 1 Free)

## Workflow Name
Pre-Launch Package Sales — Buy 2 Get 1 Free

## What It Does & Why It Exists
This time-critical workflow activates on the `presale-lead` tag or a presale landing page form submission. It immediately sends the Buy 2 Get 1 Free offer via SMS and a full-details email, creates an opportunity in the Pre-Launch Sales Pipeline, and follows up over 5 days with scarcity-driven messages for non-responders. The workflow is designated as CRITICAL priority because it drives pre-launch revenue generation before the grand opening.

## Business Problem It Solves
IV infusion bars are capital-intensive to open. Pre-launch package sales allow the owner to generate revenue before the doors open, validate demand, and build a committed customer base from day one. This workflow automates the entire presale funnel so Thuy Cao can run a presale campaign without a dedicated sales team — every lead gets a complete, professional sales sequence automatically.

## Benefits & Outcomes
- Immediate offer delivery captures leads while interest is highest
- Scarcity messaging at 2 and 5 days applies urgency without being pushy
- Pipeline tracking provides real-time visibility into presale conversion rates
- Launch special (3 sessions for the price of 2) is a high-perceived-value offer that converts at strong rates
- Pre-committed customers become the foundation of the membership program

## Inputs & Outputs
**Inputs:**
- Trigger: Tag `presale-lead` applied OR presale form submission
- Contact: first name, email, phone

**Outputs:**
- Immediate offer SMS (Buy 2 Get 1 Free messaging)
- Immediate full-details email (package value, services, booking instructions)
- Opportunity created: Pre-Launch Sales Pipeline, stage "New Inquiry"
- Day 2 (no reply): Scarcity follow-up SMS ("spots filling up")
- Day 5 (no booking): Final follow-up email with social proof
- Opportunity moved to "Offer Sent" stage
- Tag: `presale-offer-sent`

## Dependencies
- **Pipeline:** Pre-Launch Sales Pipeline with stages "New Inquiry", "Engaged", "Offer Sent", "Payment Pending", "Package Purchased"
- **Tags:** `presale-lead`, `presale-offer-sent`
- **Compliance:** HIPAA — no clinical language; service descriptions are generic wellness
- **TCPA:** Stop-on-response on all SMS steps; time-window enforcement 8am-9pm ET
- **Timing:** Activate immediately at launch announcement

## Automation Impact
- **Revenue generated:** Target 20-50 presale packages at $330-$590 value each = $6,600-$29,500 pre-launch revenue
- **Time saved:** Replaces a full-time presale outreach role — estimated 2-3 hours/day of manual follow-up
- **Conversion funnel:** Structured 5-day sequence with multiple touch points vs. single-touch manual outreach
- **Scalability:** Handles hundreds of simultaneous presale leads without additional staff
