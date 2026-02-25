# WF-11: Missed Call Text Back

## Workflow Name
Missed Call Text Back

## What It Does & Why It Exists
When any inbound call to the Soleil Infusion phone number goes unanswered, this workflow fires within 60 seconds — sending an SMS to the caller acknowledging the missed call, providing a direct booking link, and creating a 1-hour follow-up task for the team. The contact is tagged as `missed-call` for tracking and downstream reporting.

## Business Problem It Solves
Studies show that 85% of callers who don't reach a business will not call back — they call a competitor. For an IV infusion business with a $165-$295 per session ticket price, every missed call is a high-value lost lead. New businesses in particular can't afford to staff phones 100% of the time, yet phone responsiveness is a major factor in consumer trust. This workflow ensures every missed call receives an instant, professional response.

## Benefits & Outcomes
- Callers receive a response within 60 seconds — faster than any human can manually follow up
- SMS response keeps the conversation open and accessible for the caller
- Direct booking link allows motivated callers to self-schedule without waiting for a callback
- Manual task ensures a human calls back for callers who prefer voice communication
- `missed-call` tag enables retrospective analysis of missed call volume and conversion rates

## Inputs & Outputs
**Inputs:**
- Trigger: Missed incoming call on Soleil Infusion phone number

**Outputs:**
- SMS within 60 seconds: acknowledgment + booking link + STOP opt-out
- Tag: `missed-call`
- Task: "Missed call — follow up within 1 hour" assigned to team

## Dependencies
- **GHL Phone:** Soleil Infusion's GHL phone number must have "missed call" trigger enabled
- **Custom Values:** `calendly_link` for booking link in SMS
- **Tags:** `missed-call`
- **Compliance:** HIPAA — no clinical details; generic wellness business language
- **TCPA:** Stop-on-response on SMS; note: this is an inbound-call-triggered outbound SMS — ensure TCPA consent is tracked for callers without existing opt-in

## Automation Impact
- **Lead recovery rate:** Estimated 40-60% of missed call respondents engage with the SMS
- **Revenue per recovered lead:** At a 15-25% SMS-to-booking conversion, each recovered caller = $165-$295 potential revenue
- **Response time:** 60 seconds vs. industry average of 1-2 hours for manual callback
- **Time saved:** Staff don't need to monitor missed calls — only respond to task notifications for unresponsive callers
- **Competitive advantage:** Faster response than virtually all comparable local wellness businesses
