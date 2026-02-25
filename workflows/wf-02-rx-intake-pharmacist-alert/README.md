# WF-02: Rx Intake & Pharmacist Alert

Fires when the tag `rx-received` is applied to a patient contact, immediately moves the opportunity to the "Rx Received" pipeline stage, sends an internal pharmacist notification, and escalates to a manager if the prescription has not been actioned within 2 hours.
