# WF-03: Patient Rx — Payment & Consent Chase

Triggers when a patient opportunity enters the "Pending Payment" stage in the Rx Fulfillment Pipeline, sends a payment request via SMS and email, waits 24 hours, then branches based on payment status — advancing confirmed contacts or re-sending the request and escalating to admin for unpaid ones.
