# Session Compilation Handoff — Gemini + Codex

**Project:** Soleil Infusion  
**Date:** 2026-02-27  
**Prepared for:** Execution continuity across Gemini and Codex

---

## 1) Session Outcome (What Was Actually Built)

### Primary deliverable completed
- `docs/GHL_Calendar_Infrastructure.md` (539 lines)
- Scope included in that file:
1. Calendar 1: `New Infusion Consult` (60 min)
2. Calendar 2: `Return Infusion` (75 min)
3. Workflow A: `Soleil — Booking Confirmation`
4. Workflow B: `Soleil — 24h Reminder`
5. Workflow C: `Soleil — 2h Reminder`
6. Workflow D: `Soleil — No-Show Rescue`
7. SMS + email template copy, tags, custom values, QA checklist

### Related outbound artifact present
- `docs/Apollo_Sequence_Import_Kit.md`
- Contains Apollo sequence settings + 5-step email copy + launch QA + KPI targets.

### Key implementation note from session
- `booking_link_new` and `booking_link_return` cannot be populated until calendars are created in GHL and live booking URLs exist.

---

## 2) Current Status Matrix

### Completed (Documentation)
- [x] End-to-end calendar/workflow build guide authored
- [x] HIPAA-safe SMS constraints included
- [x] Reminder and no-show recovery logic documented
- [x] Apollo sequence copy/import kit documented

### Not completed (Execution)
- [ ] Calendars created in live GHL account
- [ ] Native GHL calendar notifications turned OFF
- [ ] Workflows built and published in GHL
- [ ] Email templates created in GHL UI
- [ ] Custom values populated with live links/data
- [ ] End-to-end QA run with evidence
- [ ] Production go-live decision signed off

---

## 3) Remaining TODO List (Execution Order)

## Phase A — Environment Readiness
- [ ] Verify HIPAA mode is ON
- [ ] Verify 10DLC number is active for SMS
- [ ] Verify sender domain auth (SPF/DKIM/DMARC)
- [ ] Pre-create required tags and custom fields

## Phase B — Calendar Deployment
- [ ] Build `New Infusion Consult`
- [ ] Build `Return Infusion`
- [ ] Disable native calendar reminders on both
- [ ] Copy both live booking URLs
- [ ] Populate custom values:
  - [ ] `booking_link_new`
  - [ ] `booking_link_return`
  - [ ] `clinic_phone`
  - [ ] `clinic_hours`
  - [ ] `clinic_address`

## Phase C — Workflow Deployment
- [ ] Publish `Soleil — Booking Confirmation`
- [ ] Publish `Soleil — 24h Reminder`
- [ ] Publish `Soleil — 2h Reminder`
- [ ] Publish `Soleil — No-Show Rescue`
- [ ] Validate trigger filters and stop-on-response behavior

## Phase D — QA + Evidence
- [ ] Create test booking on each calendar
- [ ] Verify immediate confirmation SMS (<1 min)
- [ ] Verify confirmation email (<5 min)
- [ ] Verify 24h reminder schedule logic
- [ ] Verify 2h reminder schedule logic
- [ ] Mark no-show and verify rescue workflow fires at +30m
- [ ] Capture screenshots and pass/fail report

## Phase E — Go-Live Controls
- [ ] Confirm no duplicate messaging path exists
- [ ] Confirm all variables resolve correctly
- [ ] Confirm all SMS remain HIPAA-safe
- [ ] Issue final Go/No-Go with rationale

---

## 4) Prompt Series To Complete The Build

Use these prompts in order.

### Prompt 1 — Gemini (Implement in GHL)
```text
Implement the GHL calendar infrastructure exactly as documented.

Primary file:
/Users/mac/Documents/projects/soleil-infusion/docs/GHL_Calendar_Infrastructure.md

Task:
1) Build both calendars.
2) Build and publish all 4 workflows.
3) Turn OFF native calendar notifications.
4) Populate custom values after booking links are generated.
5) Run test bookings + no-show test.

Output required:
- Timestamped build log
- Final config table (calendar/workflow/template/custom value)
- QA results (pass/fail)
- Blockers and exact owner of each blocker
```

### Prompt 2 — Gemini (Evidence Pack)
```text
Create an implementation evidence pack for the completed GHL setup.

Include:
- Screenshot checklist for each calendar and workflow
- Trigger and filter validation proof
- Message template proof (SMS/email)
- Custom value resolution proof
- No-show rescue proof

Return a structured report with a final confidence score (0-100).
```

### Prompt 3 — Codex (Line-by-Line Audit)
```text
Audit the implemented GHL configuration line-by-line against:
/Users/mac/Documents/projects/soleil-infusion/docs/GHL_Calendar_Infrastructure.md

Tasks:
- Detect mismatches in triggers, waits, conditions, tags, and templates
- Detect HIPAA-unsafe SMS language
- Detect duplicate notification risks
- Detect broken/empty custom values

Output:
- Findings first, ordered by severity
- Exact remediation steps per finding
- Retest checklist
- Go/No-Go decision
```

### Prompt 4 — Codex (Hardening Pass)
```text
Apply hardening recommendations to the GHL setup report.

Goal:
- Zero critical defects
- Deterministic trigger behavior
- No duplicate reminders
- Full variable resolution

Output:
- Hardened configuration checklist
- Delta from previous state
- Residual risk list
```

### Prompt 5 — Gemini (Apollo Activation)
```text
Using:
/Users/mac/Documents/projects/soleil-infusion/docs/Apollo_Sequence_Import_Kit.md

Prepare Apollo for launch:
1) Configure sequence settings exactly as specified.
2) Validate variable rendering.
3) Create launch-day QA checklist.
4) Produce first-week optimization plan based on reply/meeting KPI targets.

Output:
- Ready-to-import sequence summary
- Launch checklist
- Day 3 and Day 7 optimization triggers
```

### Prompt 6 — Codex (Cross-System Attribution)
```text
Design an attribution map between Apollo outreach and GHL bookings.

Inputs:
- GHL custom values + calendar URLs
- UTM requirements from the GHL docs

Output:
- UTM convention
- Source/medium/campaign matrix
- Reporting schema (bookings, show-rate, no-show-rate, rebook-rate)
- Minimal implementation plan (no overengineering)
```

### Prompt 7 — Gemini + Codex (Final Release Review)
```text
Joint release review for Soleil booking infrastructure.

Acceptance criteria:
- Two calendars live
- Four workflows live
- Templates active
- End-to-end QA passed with evidence
- Attribution tracking defined
- No HIPAA-unsafe SMS content

Return:
- Final readiness brief (1 page)
- Open risks
- Exact next 7-day action plan
```

---

## 5) Definition of Done

This handoff is complete only when all are true:
- [ ] Calendars are live and publicly bookable
- [ ] Workflows are published and verified
- [ ] Templates are active in production
- [ ] Custom values resolve in every message
- [ ] QA evidence exists for each critical path
- [ ] Final Go decision is documented

---

## 6) Source Files
- `/Users/mac/Documents/projects/soleil-infusion/docs/GHL_Calendar_Infrastructure.md`
- `/Users/mac/Documents/projects/soleil-infusion/docs/GHL_Calendar_Handoff_Pack.md`
- `/Users/mac/Documents/projects/soleil-infusion/docs/GHL_Foundation_Setup_Guide.md`
- `/Users/mac/Documents/projects/soleil-infusion/docs/GHL_Automation_Blueprint_v2.md`
- `/Users/mac/Documents/projects/soleil-infusion/docs/Apollo_Sequence_Import_Kit.md`
