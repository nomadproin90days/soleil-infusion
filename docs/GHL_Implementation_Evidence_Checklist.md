# GHL Implementation Evidence Checklist — Soleil Infusion

**Purpose:** Verify real implementation (not just documentation/design) for calendar infrastructure go-live.  
**Date:** 2026-02-27  
**Primary spec:** `/Users/mac/Documents/projects/soleil-infusion/docs/GHL_Calendar_Infrastructure.md`

---

## How To Use This
- Mark each item `PASS` or `FAIL`.
- Attach evidence for every `PASS` (screenshot, screen recording timestamp, export, or message log).
- If any `Critical` item fails, status is automatically `NO-GO`.

---

## 1) Environment Readiness

| ID | Check | Severity | Evidence Required | Status | Notes |
|---|---|---|---|---|---|
| ENV-01 | HIPAA mode enabled in GHL account | Critical | Settings screenshot showing HIPAA enabled |  |  |
| ENV-02 | 10DLC number active for SMS sending | Critical | Phone numbers screen with active status |  |  |
| ENV-03 | Email sender domain authenticated (SPF/DKIM/DMARC) | Critical | Email service/auth status screenshot |  |  |
| ENV-04 | Required tags created (`Appointment-Scheduled`, `No-Show`, `No-Show-Rescue-Sent`) | High | Tag list screenshot |  |  |

---

## 2) Calendar Build Verification

| ID | Check | Severity | Evidence Required | Status | Notes |
|---|---|---|---|---|---|
| CAL-01 | `New Infusion Consult` exists and is published | Critical | Calendar settings screenshot |  |  |
| CAL-02 | `Return Infusion` exists and is published | Critical | Calendar settings screenshot |  |  |
| CAL-03 | New consult duration = 60 min | High | Calendar duration screenshot |  |  |
| CAL-04 | Return duration = 75 min | High | Calendar duration screenshot |  |  |
| CAL-05 | Availability window matches guide (Mon–Sat, hours, 30-day window, 2h min notice) | Medium | Availability screenshot(s) |  |  |
| CAL-06 | Native confirmation/reminder notifications OFF on both calendars | Critical | Notifications tab screenshot (both calendars) |  |  |
| CAL-07 | Intake form fields match guide for both calendars | High | Form field screenshots for each calendar |  |  |

---

## 3) Custom Values Verification

| ID | Check | Severity | Evidence Required | Status | Notes |
|---|---|---|---|---|---|
| CV-01 | `booking_link_new` populated with live URL | Critical | Custom values screenshot + opened URL proof |  |  |
| CV-02 | `booking_link_return` populated with live URL | Critical | Custom values screenshot + opened URL proof |  |  |
| CV-03 | `clinic_address`, `clinic_phone`, `clinic_hours` populated | High | Custom values screenshot |  |  |
| CV-04 | URLs resolve correctly from test message render | Critical | SMS/email render screenshot showing resolved links |  |  |

---

## 4) Workflow Configuration Verification

| ID | Check | Severity | Evidence Required | Status | Notes |
|---|---|---|---|---|---|
| WF-A1 | `Soleil — Booking Confirmation` exists and published | Critical | Workflow list screenshot |  |  |
| WF-A2 | Trigger = Appointment Created; both calendars selected | Critical | Trigger config screenshot |  |  |
| WF-A3 | Node order correct (Tag → SMS → Wait 2m → Email → Update Contact → Internal Notification) | High | Full workflow canvas screenshot |  |  |
| WF-B1 | `Soleil — 24h Reminder` exists and published | Critical | Workflow list screenshot |  |  |
| WF-B2 | Trigger = Appointment Reminder at 24h; active status condition check present | Critical | Trigger + if/else screenshots |  |  |
| WF-C1 | `Soleil — 2h Reminder` exists and published | Critical | Workflow list screenshot |  |  |
| WF-C2 | 2h workflow sends SMS only (no email node) | High | Workflow canvas screenshot |  |  |
| WF-D1 | `Soleil — No-Show Rescue` exists and published | Critical | Workflow list screenshot |  |  |
| WF-D2 | Trigger = Appointment Status Changed: No Show | Critical | Trigger config screenshot |  |  |
| WF-D3 | Rescue logic correct (Wait 30m → SMS → Task → Wait 2d → If/Else → Final SMS → Tag) | High | Workflow canvas screenshot |  |  |

---

## 5) Message Template Verification

| ID | Check | Severity | Evidence Required | Status | Notes |
|---|---|---|---|---|---|
| MSG-01 | `Infusion Booking Confirmation` email template exists | High | Email template list + content screenshot |  |  |
| MSG-02 | `Infusion 24h Reminder` email template exists | High | Email template list + content screenshot |  |  |
| MSG-03 | SMS templates include opt-out language (`Reply STOP`) | Critical | SMS node screenshots |  |  |
| MSG-04 | SMS content contains no treatment/drug-specific details (HIPAA-safe generic wording) | Critical | SMS content screenshots + reviewer signoff |  |  |

---

## 6) End-to-End QA Execution

| ID | Test | Severity | Evidence Required | Status | Notes |
|---|---|---|---|---|---|
| QA-01 | Test booking created on New Consult calendar | Critical | Booking confirmation screen |  |  |
| QA-02 | Booking confirmation SMS received within 1 minute | Critical | Phone screenshot with timestamp |  |  |
| QA-03 | Booking confirmation email received within 5 minutes | High | Inbox screenshot with timestamp |  |  |
| QA-04 | 24h reminder trigger validated (scheduled or observed) | High | Workflow execution log screenshot |  |  |
| QA-05 | 2h reminder trigger validated (scheduled or observed) | High | Workflow execution log screenshot |  |  |
| QA-06 | Appointment marked `No Show` and rescue SMS fired at +30 min | Critical | Status change + SMS timestamp screenshots |  |  |
| QA-07 | No duplicate messages sent from native reminders | Critical | Message log screenshot proving single path |  |  |

---

## 7) Go/No-Go Gate

### Automatic NO-GO Conditions
- Any `Critical` check = FAIL
- Missing evidence for any `Critical` PASS claim
- Duplicate reminder path detected
- Broken booking links in any live message

### Final Decision
- **Go/No-Go:**  
- **Decision Owner:**  
- **Date/Time:**  
- **Summary:**  

---

## 8) Quick Evidence Bundle (Minimum Required Files)
- Calendar settings screenshots (both calendars)
- Calendar notifications screenshots (both calendars)
- Workflow canvases/screenshots (all 4 workflows)
- Custom values screenshot with booking links
- One booking SMS screenshot with timestamp
- One booking email screenshot with timestamp
- One no-show rescue SMS screenshot with timestamp
- Workflow execution logs screenshot(s)

---

## 9) Optional Scoring (for fast executive readout)
- Critical checks passed: __ / __
- High checks passed: __ / __
- Medium checks passed: __ / __
- Overall confidence score (0–100): __

