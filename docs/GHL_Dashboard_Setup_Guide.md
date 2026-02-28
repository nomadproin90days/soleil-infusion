# GHL Dashboard Setup Guide — Soleil Infusion
**Goal:** Configure the initial dashboard to track contractual KPIs (Speed-to-Lead, Booking Rate, Show Rate).

---

## 1. Native Reporting Tabs (Primary Data Source)
GHL provides powerful built-in reporting. You do not need to build custom widgets for many of your KPIs.

### **Appointment Metrics (Show Rate / No-Show %)**
1. Go to **Reporting → Appointment Report**.
2. Filter by: **New Infusion Consult** or **Return Infusion** calendars.
3. **KPIs Found Here:**
   - **Show Rate:** % of appointments marked "Showed".
   - **No-Show Rate:** % of appointments marked "No Show" (Target: <20%).
   - **Booking Volume:** Total appointments booked per week.

### **Attribution Metrics (Referral Performance)**
1. Go to **Reporting → Attribution Report**.
2. Filter by **Source**.
3. **KPIs Found Here:**
   - **Referrals/Week:** Count of contacts where `Source` = Referral Partner Name.
   - **Referral -> Booked %:** Conversion from contact created to appointment booked.

---

## 2. Custom Dashboard Setup (The "Control Tower")
Go to the **Dashboard** tab in your left sidebar. Click **+ Add Widget** to create these high-level views for Thuy.

### **Widget 1: Appointment Snapshot**
- **Type:** Chart (Bar or Pie)
- **Data Source:** Appointments
- **Group By:** Appointment Status
- **Why:** Immediate visual of how many patients are showing vs. missing visits.

### **Widget 2: Referral Pipeline Value**
- **Type:** Pipeline Value
- **Pipeline:** B2B Provider Sales Pipeline
- **Why:** Shows the total potential value of partners currently being credentialed.

### **Widget 3: Lead Source Breakdown**
- **Type:** Chart
- **Data Source:** Contact Source
- **Why:** Quickly see if most leads are coming from the website, Google, or your referral partners.

---

## 3. Advanced Metric: Speed-to-Lead (< 5 Minutes)
GHL does not show a "Stopwatch" metric on the main dashboard by default. To track this accurately for your contract:

1. **The Manual Way:** Go to **Reporting → Google Ads/Facebook Ads** (if running ads) or **Call Reporting** to see first response times.
2. **The Automation Way (Recommended):**
   - We will add a "Timestamp" field to your contacts.
   - **Step A:** Workflow logs `Lead Created Date`.
   - **Step B:** Workflow logs `First Contact Date`.
   - **Step C:** We calculate the difference in a custom "Speed to Lead" field.

---

## 4. Weekly Reporting Workflow
To satisfy the **"Weekly Reporting"** requirement in Section 6 of your agreement:

1. Every **Friday by 5 PM ET**, export the "Appointment Report" from GHL.
2. Record a **3-5 minute Loom video** for Thuy walking through:
   - Total new leads.
   - This week's show rate.
   - Number of new referral partners contacted.
   - "Next Test" for the following week.

---
*Prepared by Gemini CLI | Day 11 Milestone: Dashboard Foundation*
