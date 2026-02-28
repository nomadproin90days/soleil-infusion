# Soleil Infusion — Lovable Build Brief

Paste everything below this line into Lovable to start the project.

---

Build a modern, medical-lifestyle landing page for **Soleil Infusion**, an IV infusion clinic in Glen Burnie, Maryland. The brand sits in the "middle market" between hospital-grade medical care and generic IV drip bars — think clinical credibility with spa-level comfort.

---

## Brand

**Name:** Soleil Infusion
**Tagline:** Medical Integrity. Lifestyle Wellness.
**Address:** 801 Landmark Drive, Glen Burnie, MD
**Note:** Located 15 mins from BWI Airport and Ellicott City

**Colors:**
- Primary Blue (buttons, headings): `#5b8bb0`
- Light Blue (accents, borders): `#A6C7E7`
- Background light blue (section backgrounds): `#f0f7ff`
- Text gray: `#646464`
- White: `#ffffff`

**Typography:** Clean, modern sans-serif. Use a strong bold weight for headings, regular for body. Medical but approachable — not cold.

**Tone:** Confident, clinical, warm. Not a med-spa. Not a hospital. Something better than both.

---

## Page Sections (in order)

### 1. Navigation (fixed, top)
- Logo: "**Soleil** Infusion" (Soleil in primary blue, Infusion in dark)
- Links: Treatments | Our Difference | Book Appointment (Book Appointment = outlined pill button)

### 2. Hero
- Badge (small, uppercase pill): "Opening Soon in Glen Burnie"
- Headline (large, bold, two lines):
  ```
  Medical Integrity.
  Lifestyle Wellness.
  ```
  ("Lifestyle Wellness." in primary blue)
- Subheading: "Experience clinically expert IV infusion therapy tailored to your unique biology. Bridging the gap between medical necessity and daily vitality."
- Launch offer badge (subtle box):
  ```
  🔥 Exclusive Launch Offer
  Buy a package of 2 infusions, get 1 FREE.
  ```
- Two CTA buttons: "Claim Offer" (filled, primary blue) | "View Menu" (outlined, white)
- Right side: Large image placeholder card (portrait aspect ratio, rounded corners, soft shadow). Inside the card add a floating trust signal badge (top right): "✓ Sterile Compounding — Powered by Voshell's Pharmacy infrastructure for hospital-grade safety."

### 3. Services (section id: "services")
- Section heading: "Outcome-Driven Therapies"
- Subheading: "Customized formulations designed for specific health goals, from rapid recovery to cellular repair."
- 4 cards in a row (2x2 on mobile):

**Card 1 — Essential Hydration** (blue icon)
- Description: "Rapid rehydration for general wellness and recovery."
- Price: $165 – $175

**Card 2 — Energy & Immunity** (amber/yellow icon)
- Description: "Formulations to boost vitality and support immune defense."
- Price: $195 – $215

**Card 3 — White Jade & Glow** (pink icon) ← PRIORITY SERVICE
- Description: "The famous 'Cinderella' drip (Glutathione) for skin brightening and detox."
- Price: $225 – $250

**Card 4 — Advanced Functional** (purple icon)
- Description: "Specialized drips (NAD+, Liver Support) for cellular repair."
- Price: $275 – $295

Cards should have hover effect: border highlight + subtle shadow lift.

### 4. Why Choose Soleil? (section id: "about")
- Light blue background section (`#f0f7ff`)
- Left column: 3 numbered points

**1. Vertical Integration**
"Partnered with Voshell's Pharmacy for direct sourcing of sterile preparations, ensuring the highest quality control."

**2. Sterile Compounding**
"Utilizing a USP <797>-compliant ISO 5 laminar flow hood for hospital-grade sterility that typical med-spas cannot match."

**3. Culturally Inclusive Care**
"Serving the Korean-American community with culturally resonant therapies including White Jade (백옥주사) and Garlic (마늘주사) drips."

- Right column: White card with "Visit Us" info:
  - Address: 801 Landmark Drive, Glen Burnie, MD
  - Italic note: "Located just 15 mins from BWI & Ellicott City"

### 5. Contact / Booking (section id: "contact")
- Centered, white background
- Heading: "Start Your Wellness Journey"
- Subheading: "Complete the form below to connect with our care team. We are currently accepting new patients."
- Embed a **GoHighLevel (GHL) form** using an iframe or embed script. Leave a clearly labeled placeholder: `[GHL FORM EMBED — insert GoHighLevel embed code here]`

### 6. Footer
- Logo: "Soleil Infusion" (bold)
- Links: Privacy Policy | Terms of Service
- Copyright: "© 2026 Soleil Infusion. All rights reserved."

---

## Key Requirements

- Fully responsive (mobile-first)
- Smooth scroll between sections
- No dark mode
- No animations that feel gimmicky — subtle transitions only
- The GHL form section should be easy to swap in the actual embed code later
- Do NOT add a Korean language toggle yet — that comes in a later phase

---

## What This Business Is (context for design decisions)

Soleil Infusion is backed by Voshell's Pharmacy, giving it pharmaceutical-grade supply chain and a sterile compounding lab (IV hood) that no med-spa competitor can match. The primary target market is Korean-American professionals aged 35–65 in the Ellicott City/Baltimore area, for whom IV therapy is a familiar wellness practice. Secondary markets: first responders, healthcare workers, BWI travelers, and executives. The site needs to signal "we are more credible than a drip bar" while feeling welcoming and accessible — not intimidating like a hospital.
