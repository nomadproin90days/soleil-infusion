# WF-02: Rx Intake & Pharmacist Alert

## Workflow Name
Rx Intake & Pharmacist Alert

## What It Does & Why It Exists
When a patient's prescription is received and the tag `rx-received` is applied, this workflow immediately advances the opportunity to the "Rx Received" pipeline stage and sends an internal notification to the pharmacist team. It then waits 2 hours and checks whether the Rx has been processed — if not, it fires an escalation alert to the team manager. This creates a closed-loop accountability system for prescription handling.

## Business Problem It Solves
IV infusion businesses that partner with compounding pharmacies face a critical bottleneck at the Rx processing stage. Delays between prescription receipt and pharmacist review directly delay patient appointments and erode the experience. Without automated alerts, a prescription can sit unnoticed during busy periods, causing patient dissatisfaction and potential clinical risk. This workflow enforces a 2-hour processing SLA.

## Benefits & Outcomes
- Pharmacist is notified within seconds of Rx receipt — no manual handoff required
- Pipeline stage updates automatically for accurate status visibility
- 2-hour SLA is enforced with automated escalation, not manual monitoring
- Manager is alerted only when action is needed — no noise for timely processing
- Creates audit trail of Rx intake timestamps in GHL

## Inputs & Outputs
**Inputs:**
- Tag applied: `rx-received` on patient contact

**Outputs:**
- Pipeline stage updated to "Rx Received" in Patient Rx Fulfillment Pipeline
- Internal SMS/notification to pharmacist: patient name + action required
- After 2 hours — condition check on pipeline stage
- If not advanced: escalation notification to team manager

## Dependencies
- **Pipeline:** Patient Rx Fulfillment Pipeline with "Rx Received" stage
- **Tags:** `rx-received`
- **Integrations:** Internal notification to designated pharmacist user in GHL
- **Team:** Manager notification recipient configured in GHL team settings
- **Compliance:** HIPAA — no medication or compound names in any notifications

## Automation Impact
- **Time saved:** Eliminates manual pharmacist check-in process (~10 min/Rx)
- **SLA enforcement:** 2-hour processing window is monitored automatically
- **Escalation efficiency:** Manager only alerted on exceptions — no daily check-ins required
- **Scalability:** Handles any volume of simultaneous Rx intakes without additional coordination
