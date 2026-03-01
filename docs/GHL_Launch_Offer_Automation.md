# GHL Automation: Launch Offer Claim (Buy 2 Get 1 FREE)

This workflow ensures that every user who clicks "Claim Launch Offer" on your website is captured as a lead and nurtured toward their first appointment.

## 1. Trigger
- **Form Submitted:** `Soleil IV Infusions` (Form ID: `TD6hYijKkRFiwxR39U9B`)

## 2. Actions
1. **Add Contact Tag:** `Claimed-Launch-Offer`
2. **Assign to User:** (Select Thuy or appropriate staff)
3. **Internal Notification:** 
   - **Type:** SMS or Email
   - **Message:** *"New Launch Offer Lead: {{contact.name}}. They claimed the Buy 2 Get 1 FREE promo."*
4. **External SMS (Instant):** 
   - *"Hi {{contact.first_name}}! ☀️ Your 'Buy 2, Get 1 FREE' offer is now locked in. To secure your treatment chair for your first session, you can book here: [Link to New Patient Calendar]"*
5. **Wait:** 24 Hours (If Appointment not booked)
6. **SMS Follow-up:** 
   - *"Hi {{contact.first_name}}, just checking in to see if you had any questions about our IV therapies? We'd love to see you at the clinic! [Link to Calendar]"*

## 3. Website Success Redirect (Optional but Recommended)
In your GHL Form settings (`TD6hYijKkRFiwxR39U9B`), set the **On Submit** action to:
- **Redirect to URL:** `https://soleil-infusion.vercel.app/#book`
- This ensures that after they submit the form, they are immediately prompted to book their actual time slot.
