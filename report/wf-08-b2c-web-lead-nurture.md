# WF-08: B2C Web Lead Nurture (Korean Community)

## Workflow Name
B2C Web Lead Nurture — Korean Community Focus

## What It Does & Why It Exists
When a consumer submits the website contact form or receives the `b2c-lead` tag, this workflow delivers an immediate welcome SMS and branded email, then nurtures them over 11 days with strategic touch points. At day 1, it checks for a booking — routing converted leads into the pre-visit workflow (WF-04) and sending non-bookers a direct booking link. At day 4, an educational email is sent. By day 11, persistent non-bookers are moved to a nurture pipeline stage with a manual outreach task. A future Korean-language branch is architected for the `lang-korean` tag.

## Business Problem It Solves
Web leads are the coldest type of inquiry — the person submitted a form but has not committed. Without a structured nurture sequence, these leads convert at very low rates. The Korean-American community aged 35-65 is Soleil Infusion's core market, and they respond well to consistent, respectful follow-up communication. This workflow bridges the gap between initial curiosity and first appointment.

## Benefits & Outcomes
- Immediate response (under 60 seconds) outperforms competitors who follow up in hours or days
- 11-day nurture sequence captures leads at different stages of decision-making
- Booking detection prevents double-messaging patients who have already converted
- Educational email builds trust and addresses the primary objection ("What is IV therapy?")
- Korean-language branch architecture future-proofs the workflow for multilingual expansion

## Inputs & Outputs
**Inputs:**
- Trigger: Website form submission OR tag `b2c-lead` applied
- Contact: first name, email, phone, preferred language (if captured)

**Outputs:**
- Immediate welcome SMS
- Immediate branded welcome email with services and booking link
- Opportunity created: B2C Lead Pipeline, stage "New Lead"
- Day 1 booking check: bookers → WF-04; non-bookers → booking link SMS
- Day 4: Educational email (wellness lifestyle, what to expect)
- Day 11 (no booking): Move to "Nurture" stage + manual outreach task
- Tag: `b2c-nurture`

## Dependencies
- **Pipeline:** B2C Lead Pipeline with stages "New Lead", "Contacted", "Nurture", "Booked", "Converted", "Churned"
- **Workflow:** WF-04 (new patient booking — enrolled when lead books)
- **Custom Values:** `calendly_link`
- **Tags:** `b2c-lead`, `b2c-nurture`, `lang-korean` (future)
- **Compliance:** HIPAA — no medical claims in messages; educational content focuses on wellness lifestyle
- **TCPA:** Stop-on-response on all SMS steps

## Automation Impact
- **Time saved:** 20-30 minutes per web lead of manual nurture outreach over 11 days
- **Conversion rate improvement:** Structured multi-touch sequence estimated to improve web lead conversion by 25-40%
- **Korean community penetration:** Language-aware architecture enables market-specific campaigns without separate workflows
- **Scalability:** No limit on concurrent leads being nurtured simultaneously
