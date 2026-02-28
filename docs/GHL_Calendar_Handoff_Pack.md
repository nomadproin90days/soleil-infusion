# GHL Calendar Handoff Pack — Soleil Infusion

**Prepared for:** Gemini + Codex continuation work  
**Date:** February 27, 2026  
**Primary source artifact:** `/Users/mac/Documents/projects/soleil-infusion/docs/GHL_Calendar_Infrastructure.md`

---

## 1) Executive Summary
The calendar infrastructure guide has already been authored and is implementation-ready.

Built artifact:
- `/Users/mac/Documents/projects/soleil-infusion/docs/GHL_Calendar_Infrastructure.md`

Scope covered in that guide:
1. Calendar 1: `New Infusion Consult` (60 min)
2. Calendar 2: `Return Infusion` (75 min)
3. Workflow A: Booking Confirmation (SMS + Email)
4. Workflow B: 24h Reminder (SMS + Email)
5. Workflow C: 2h Reminder (SMS only)
6. Workflow D: No-Show Rescue (SMS + Internal Task + follow-up logic)
7. Template copy, tags, custom values, and test checklist

Important implementation note:
- `booking_link_new` and `booking_link_return` can only be populated after calendars are created and URLs are generated in GHL.

---

## 2) Current State
### Completed (Documentation)
- [x] Full build guide with node-by-node workflow instructions
- [x] HIPAA-safe messaging direction (no treatment details in SMS)
- [x] Calendar settings and intake form field definitions
- [x] Testing checklist and rollout logic

### Not Yet Completed (Execution in GHL)
- [ ] Build both calendars in production GHL sub-account
- [ ] Disable native calendar notifications (to prevent duplicate reminders)
- [ ] Create/publish all 4 calendar workflows
- [ ] Create/save both email templates in GHL
- [ ] Populate all custom values with live data
- [ ] Run full end-to-end QA tests (booking + reminder + no-show path)

---

## 3) Remaining TODO List (Ordered)

## Phase A — Foundation Validation (15–20 min)
- [ ] Confirm HIPAA mode is ON in GHL account settings.
- [ ] Confirm 10DLC/SMS sending number is active and approved.
- [ ] Confirm connected sender email domain is authenticated (SPF/DKIM).
- [ ] Confirm required custom fields/tags exist (or create them).

## Phase B — Calendar Build (35–45 min)
- [ ] Create `New Infusion Consult` calendar with intake form fields.
- [ ] Create `Return Infusion` calendar with return-patient form fields.
- [ ] Turn OFF native reminder/confirmation notifications for both calendars.
- [ ] Copy generated booking URLs.
- [ ] Set custom values:
  - [ ] `booking_link_new`
  - [ ] `booking_link_return`
  - [ ] `clinic_phone`
  - [ ] `clinic_hours`
  - [ ] `clinic_address`

## Phase C — Workflow Build + Publish (45–60 min)
- [ ] Build/publish `Soleil — Booking Confirmation`.
- [ ] Build/publish `Soleil — 24h Reminder`.
- [ ] Build/publish `Soleil — 2h Reminder`.
- [ ] Build/publish `Soleil — No-Show Rescue`.
- [ ] Confirm Stop-on-Response behavior where applicable.

## Phase D — QA + Go-Live (30–40 min)
- [ ] Book one test appointment per calendar.
- [ ] Verify immediate confirmation SMS and email.
- [ ] Verify reminder trigger scheduling (24h + 2h).
- [ ] Mark test appointment as `No Show` and verify rescue flow.
- [ ] Validate all links/variables resolve correctly.
- [ ] Capture evidence screenshots and final pass/fail report.

---

## 4) Risks / Failure Modes to Watch
1. Duplicate messaging:
- Cause: native calendar reminders left ON while workflows also send reminders.

2. Broken links in SMS:
- Cause: custom values not populated after calendar creation.

3. Deliverability failures:
- Cause: SMS number not provisioned or sender email not authenticated.

4. HIPAA messaging drift:
- Cause: accidental inclusion of treatment-specific PHI/clinical detail in SMS copy.

5. Workflow not firing:
- Cause: incorrect trigger filters or unpublished workflow state.

---

## 5) Definition of Done (DoD)
Project is "done" when all are true:
- [ ] Two calendars are live and bookable.
- [ ] All 4 workflows are published and tested.
- [ ] Both email templates are saved and in use.
- [ ] End-to-end test evidence confirms trigger behavior and message delivery.
- [ ] No duplicate notification paths remain active.
- [ ] Handoff report includes screenshots + final status matrix.

---

## 6) Prompt Pack — Gemini (Execution + QA)

Use this exact prompt with Gemini:

```text
You are executing GHL implementation for Soleil Infusion.

Primary reference file:
/Users/mac/Documents/projects/soleil-infusion/docs/GHL_Calendar_Infrastructure.md

Task:
Implement the guide in GHL exactly as written and return a build report.

Hard requirements:
1) Build both calendars: New Infusion Consult + Return Infusion.
2) Build and publish all 4 workflows:
   - Soleil — Booking Confirmation
   - Soleil — 24h Reminder
   - Soleil — 2h Reminder
   - Soleil — No-Show Rescue
3) Turn OFF native calendar notifications.
4) Populate all custom values after generating booking URLs.
5) Run end-to-end QA test bookings and no-show test.

Output format required:
A) Build log (timestamped) for every major action
B) Config table (what was set, where)
C) QA evidence checklist with pass/fail per test
D) Issues found + exact remediation performed
E) Remaining blockers (if any), with exact dependency owner

Constraints:
- Keep SMS HIPAA-safe (no treatment names or medical details).
- Do not skip trigger filter checks.
- Do not mark complete unless evidence exists.
```

---

## 7) Prompt Pack — Codex (Audit + Hardening)

Use this exact prompt with Codex:

```text
Audit and harden the completed GHL calendar infrastructure implementation for Soleil Infusion.

Reference file:
/Users/mac/Documents/projects/soleil-infusion/docs/GHL_Calendar_Infrastructure.md

Inputs:
- Gemini build report
- Current GHL configuration screenshots/export notes

Tasks:
1) Verify implementation parity against the guide line-by-line.
2) Identify any trigger, branch, variable, or template mismatches.
3) Validate no duplicate notification pathways exist.
4) Verify custom values resolve correctly in every SMS/email template.
5) Verify no HIPAA-unsafe language exists in SMS templates.
6) Produce final production-readiness report.

Output format required:
A) Findings-first audit list (severity ordered)
B) Exact fix instructions for each finding
C) Retest checklist and expected result per test
D) Go/No-Go recommendation with rationale

Definition of success:
- Zero critical defects in triggers/links/notifications
- All workflows tested and proven with evidence
- Explicit Go recommendation for production
```

---

## 8) Suggested Next Sequence After Calendar Go-Live
1. Launch UTM-tagged referral links for partner channels.
2. Build referral kit page that embeds `booking_link_new`.
3. Add weekly KPI reporting (bookings, no-show rate, reschedules, show rate).
4. Connect outbound Apollo campaign to booking attribution tracking.

---

## 9) Source References
- `/Users/mac/Documents/projects/soleil-infusion/docs/GHL_Calendar_Infrastructure.md`
- `/Users/mac/Documents/projects/soleil-infusion/docs/GHL_Foundation_Setup_Guide.md`
- `/Users/mac/Documents/projects/soleil-infusion/docs/GHL_Automation_Blueprint_v2.md`
- `/Users/mac/Documents/projects/soleil-infusion/docs/GHL_ChatGPT_Build_Audit_Feb24.md`
