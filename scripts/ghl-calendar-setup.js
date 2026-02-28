#!/usr/bin/env node
/**
 * GHL Calendar Infrastructure Setup Script — Soleil Infusion
 * Targets V1 API (rest.gohighlevel.com/v1).
 *
 * Usage:
 *   node scripts/ghl-calendar-setup.js
 *
 * Creates: 6 custom values + 6 patient intake fields for the new calendars.
 * Safe to re-run — skips anything that already exists.
 */

const fs = require('fs')
const path = require('path')

// Load .env.local
const envPath = path.join(__dirname, '..', '.env.local')
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const [key, ...rest] = line.split('=')
    if (key && rest.length) process.env[key.trim()] = rest.join('=').trim()
  }
}

const BASE_URL = 'https://rest.gohighlevel.com/v1'
const API_KEY   = process.env.GHL_API_KEY
const LOC_ID    = process.env.GHL_LOCATION_ID

if (!API_KEY || !LOC_ID) {
  console.error('❌  Missing GHL_API_KEY or GHL_LOCATION_ID in .env.local')
  process.exit(1)
}

const HEADERS = {
  Authorization: `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const log   = (e, m) => console.log(`${e}  ${m}`)

// ─── Definitions ─────────────────────────────────────────────────────────────

const CALENDAR_VALUES = [
  { name: 'Infusion Booking Link — New',    value: 'TBD' },
  { name: 'Infusion Booking Link — Return', value: 'TBD' },
  { name: 'Clinic Address',                 value: '801 Landmark Drive, Glen Burnie, MD 21061' },
  { name: 'Clinic Phone',                   value: 'TBD' },
  { name: 'Clinic Hours',                   value: 'Mon–Fri 9am–6pm, Sat 10am–4pm' },
  { name: 'Intake Form URL',                value: 'TBD' },
]

const PATIENT_INTAKE_FIELDS = [
  { name: 'Reason for Visit',         dataType: 'SINGLE_OPTIONS',
    picklistOptions: ['Energy & Immunity', 'Hydration & Recovery', 'Skin Brightening (White Jade / Glutathione)', 'NAD+ / Cellular Repair', 'General Wellness', 'Not sure — want a consultation'] },
  { name: 'Known Allergies',          dataType: 'LARGE_TEXT' },
  { name: 'Current Medications',      dataType: 'LARGE_TEXT' },
  { name: 'How You Heard About Us',   dataType: 'SINGLE_OPTIONS',
    picklistOptions: ['Google', 'Instagram', 'Referral from friend', 'Referral from doctor', 'Walk-in', 'Other'] },
  { name: 'Return Infusion Type',     dataType: 'SINGLE_OPTIONS',
    picklistOptions: ['Essential Hydration ($165–$175)', 'Energy & Immunity ($195–$215)', 'White Jade / Glow ($225–$250)', 'Advanced Functional / NAD+ ($275–$295)', 'Same as last visit', "I'll decide when I arrive"] },
  { name: 'Health Changes Since Last Visit', dataType: 'LARGE_TEXT' },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function verifyConnection() {
  console.log('\n🔐  Verifying API connection...')
  const r = await fetch(`${BASE_URL}/contacts/?locationId=${LOC_ID}&limit=1`, { headers: HEADERS })
  if (r.ok) {
    const d = await r.json()
    log('✅', `Connected — ${d?.meta?.total ?? '?'} existing contacts found`)
    return true
  }
  log('❌', `Connection failed — status ${r.status}. Check GHL_API_KEY and GHL_LOCATION_ID.`)
  return false
}

async function getExistingFieldNames() {
  const res = await fetch(`${BASE_URL}/custom-fields/?locationId=${LOC_ID}`, { headers: HEADERS })
  const data = await res.json()
  return new Set((data?.customFields ?? []).map((f) => f.name.toLowerCase()))
}

async function getExistingValueNames() {
  const res = await fetch(`${BASE_URL}/custom-values/?locationId=${LOC_ID}`, { headers: HEADERS })
  const data = await res.json()
  return new Set((data?.customValues ?? []).map((v) => v.name.toLowerCase()))
}

async function createFields(fields, groupLabel) {
  console.log(`\n📋  Creating ${groupLabel} custom fields...`)
  const existing = await getExistingFieldNames()
  let created = 0, skipped = 0, failed = 0

  for (const field of fields) {
    if (existing.has(field.name.toLowerCase())) {
      log('⏭️ ', `Already exists: ${field.name}`)
      skipped++
      continue
    }

    const body = {
      name:     field.name,
      dataType: field.dataType,
      placeholder: '',
      ...(field.picklistOptions && { options: field.picklistOptions }),
    }

    const res = await fetch(`${BASE_URL}/custom-fields/`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(body),
    })
    const data = await res.json()

    if (res.ok) {
      log('✅', `Created: ${field.name}`)
      created++
    } else {
      log('❌', `Failed: ${field.name} — ${data?.message ?? res.status}`)
      failed++
    }
    await sleep(350)
  }
  console.log(`   → ${created} created, ${skipped} skipped, ${failed} failed`)
}

async function createCustomValues(values) {
  console.log('\n🔧  Creating Custom Values...')
  const existing = await getExistingValueNames()
  let created = 0, skipped = 0, failed = 0

  for (const cv of values) {
    if (existing.has(cv.name.toLowerCase())) {
      log('⏭️ ', `Already exists: ${cv.name}`)
      skipped++
      continue
    }

    const res = await fetch(`${BASE_URL}/custom-values/`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({ name: cv.name, value: cv.value }),
    })
    const data = await res.json()

    if (res.ok) {
      log('✅', `Created: ${cv.name}`)
      created++
    } else {
      log('❌', `Failed: ${cv.name} — ${data?.message ?? res.status}`)
      failed++
    }
    await sleep(350)
  }
  console.log(`   → ${created} created, ${skipped} skipped, ${failed} failed`)
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('╔══════════════════════════════════════════════╗')
  console.log('║   GHL Calendar Infrastructure Setup          ║')
  console.log('╚══════════════════════════════════════════════╝')

  if (!(await verifyConnection())) process.exit(1)

  await createFields(PATIENT_INTAKE_FIELDS, 'Patient Intake')
  await createCustomValues(CALENDAR_VALUES)

  console.log('\n✅  Foundation for Calendar Infrastructure Created.')
  console.log('\n📋  Next Steps (Manual in GHL UI):')
  console.log('    1. Build "New Infusion Consult" Calendar (60m)')
  console.log('    2. Build "Return Infusion" Calendar (75m)')
  console.log('    3. Disable native notifications on both calendars')
  console.log('    4. Build/Publish all 4 Workflows (Confirmation, 24h, 2h, No-Show)')
  console.log('    5. Populate Custom Values with live URLs')
}

main().catch(err => {
  console.error('\n💥  Fatal error:', err.message)
  process.exit(1)
})
