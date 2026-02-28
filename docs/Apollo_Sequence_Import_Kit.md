# Apollo Sequence Import Kit

**Client:** Thuy Cao — Voshell's Pharmacy / Soleil Infusion  
**Campaign:** B12 Provider Outreach  
**Last Updated:** 2026-02-27

---

## 1) Apollo Sequence Settings

- **Sequence name:** `B12 Provider Outreach — v2`
- **Audience segment:** Genetics / Metabolism clinics
- **Enrollment cap:** 30–50/day (warm up if mailbox is new)
- **Business hours send window:** Tue–Thu, 8:30 AM–3:30 PM recipient local time
- **Stop on reply:** ON
- **Stop on meeting booked:** ON
- **Exclude list:** existing partners, open opps, bounced contacts

---

## 2) Required Variables

Use these Apollo variables in each email:

- `{{first_name}}`
- `{{company}}`

Optional personalization line (recommended):
- 1 sentence specific to clinic focus (if available from enrichment/research)

---

## 3) Sequence Steps (Copy/Paste)

### Step 1 — Email (Day 1)
**Subject options (A/B/C):**
- `B12 home-use workflow at {{company}}`
- `Reducing B12 coordination burden for {{company}}`
- `Question on caregiver B12 adherence`

**Body:**
```
Hi {{first_name}},

Quick question for your team at {{company}}:

Are you still seeing friction around home B12 administration (prep consistency, caregiver confusion, or refill coordination)?

We support genetics/metabolism practices by standardizing this workflow with:
- pre-loaded syringes or single-dose options (lower prep variability)
- bilingual caregiver instructions
- direct coordination with care teams so staff are not chasing logistics

If helpful, I can send a 1-page workflow summary and how teams in PA/DE are operationalizing this.

Would Tuesday 11:30am ET or Wednesday 2:00pm ET work for a 10-minute intro?

Best,
Thuy Cao
Voshell's Pharmacy
```

---

### Step 2 — Email (Day 4)
**Subject:**
- `Re: B12 home-use workflow at {{company}}`

**Body:**
```
Hi {{first_name}},

Following up in case this is relevant.

What teams usually ask first is: "How much staff time does implementation take?"

Our onboarding is lightweight:
1) align on patient criteria and preferred format
2) provide caregiver instruction set
3) set one communication pathway for refill/coordination

The goal is to remove back-and-forth, not add another vendor burden.

Open to a short call this week?
- Tue 11:30am ET
- Wed 2:00pm ET

Best,
Thuy
```

---

### Step 3 — Email (Day 8)
**Subject:**
- `How similar teams reduced B12 coordination back-and-forth`

**Body:**
```
Hi {{first_name}},

For practices with high coordination load, the biggest win has been workflow standardization:
- fewer clarification calls
- cleaner caregiver instructions
- faster refill/continuity handoff

If you want, I can share the exact implementation checklist we use with new clinics.

Would a quick 10-minute review be useful?

Best,
Thuy
```

---

### Step 4 — Email (Day 12)
**Subject:**
- `Can I send the 1-page B12 workflow guide?`

**Body:**
```
Hi {{first_name}},

Happy to send our 1-page B12 caregiver workflow guide (the same one we use in onboarding).

If this is not in your scope, who on your team owns outpatient/caregiver medication coordination?

Thanks,
Thuy
```

---

### Step 5 — Email (Day 18)
**Subject:**
- `Close the loop?`

**Body:**
```
Hi {{first_name}},

I have not heard back, so I will close this out for now.

If B12 home-use coordination becomes a priority, reply with "guide" and I will send the workflow doc.

Best,
Thuy
```

---

## 4) Optional Step Types

If you want a mixed-channel sequence in Apollo:

- **Add Manual Task (Day 6):** LinkedIn profile visit + connection request
- **Add Manual Task (Day 14):** Phone attempt (if direct line exists)

Use only if contact data quality is high.

---

## 5) Quality Checks Before Launch

- [ ] Test variables render (`{{first_name}}`, `{{company}}`)
- [ ] Proofread links/signature
- [ ] SPF/DKIM/DMARC healthy
- [ ] From-domain warmup status acceptable
- [ ] Sequence throttled for first 3 days (lower volume)

---

## 6) Performance Targets (First 200 Sends)

- Reply rate: `>= 4%`
- Positive reply rate: `>= 1.5%`
- Meeting booked rate: `>= 0.8%`

If below target:
1. tighten list quality
2. shorten first email by ~20%
3. improve first-line personalization
4. test new CTA slots by timezone
