# WF-10: Google Review Request

## Workflow Name
Google Review Request

## What It Does & Why It Exists
Triggered by the `review-request` tag (applied automatically by WF-05 when a satisfied patient responds positively to the post-visit SMS), this workflow waits 1 hour then sends a personalized Google review request SMS with a direct link. If no review is detected within 3 days, it sends a gentle follow-up email with the same link. The workflow tags all contacts as `review-requested` for tracking.

## Business Problem It Solves
Google reviews are the single most important factor in local search ranking for health and wellness businesses. The primary challenge is asking for reviews at the right moment — immediately after a positive experience — and making it as easy as possible (one tap = review form). Without automation, this ask is inconsistent or forgotten entirely. This workflow systematically captures review intent at peak satisfaction.

## Benefits & Outcomes
- Review requests are sent at the optimal moment — within hours of a great experience
- Direct link minimizes friction (one tap to Google review form)
- Two-channel approach (SMS + email) doubles the chance of review completion
- Only patients who expressed satisfaction (replied positively to WF-05) are enrolled — protecting the practice from prompting reviews from neutral or negative patients
- Google reviews drive organic local search ranking, reducing paid advertising dependency

## Inputs & Outputs
**Inputs:**
- Trigger: Tag `review-request` applied by WF-05
- Contact: first name

**Outputs:**
- 1-hour wait
- Google review request SMS with direct link
- 3-day wait
- Condition: Review logged? (via manual tag or integration)
  - No: Gentle follow-up email with link
- Tag: `review-requested`

## Dependencies
- **Workflow:** WF-05 (applies the `review-request` tag based on patient response)
- **Custom Values:** `google_review_link` — must be populated once Google Business Profile is configured
- **Tags:** `review-request`, `review-requested`
- **Compliance:** HIPAA — no medical details; messages focus on experience quality
- **TCPA:** Stop-on-response on SMS step
- **Prerequisite:** Google Business Profile must be verified and the review link extracted and stored as a custom value

## Automation Impact
- **Review volume:** Estimated 3-5x increase in monthly Google reviews vs. manual ask
- **Local SEO impact:** Higher review count + rating improves map pack ranking → more organic leads
- **Time saved:** Eliminates manual review outreach — estimated 5-10 min per post-visit patient
- **ROI compound effect:** Each Google review generates organic visibility that reduces CAC over time
