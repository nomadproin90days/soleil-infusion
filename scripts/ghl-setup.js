#!/usr/bin/env node
/**
 * GHL Foundation Setup Script — Soleil Pharmacy
 * Targets V1 API (rest.gohighlevel.com/v1) — confirmed working 2026-02-23.
 *
 * Usage:
 *   node scripts/ghl-setup.js
 *
 * Creates: 20 custom fields + 6 custom values.
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

const PROVIDER_FIELDS = [
  { name: 'NPI Number',               dataType: 'TEXT' },
  { name: 'Clinic Name',              dataType: 'TEXT' },
  { name: 'Preferred Communication',  dataType: 'SINGLE_OPTIONS',
    picklistOptions: ['Email', 'SMS', 'Portal'] },
  { name: 'Portal Activation Date',   dataType: 'DATE' },
  { name: 'Contract Signed Date',     dataType: 'DATE' },
]

const PATIENT_FIELDS = [
  { name: 'Pioneer Rx #',             dataType: 'TEXT' },
  { name: 'Formula ID',               dataType: 'TEXT' },
  { name: 'Prescriber Name',          dataType: 'TEXT' },
  { name: 'Prescriber NPI',           dataType: 'TEXT' },
  { name: 'Days Supply',              dataType: 'NUMERICAL' },
  { name: 'Rx Expiration Date',       dataType: 'DATE' },
  { name: 'Refill Count Remaining',   dataType: 'NUMERICAL' },
  { name: 'Compound Type',            dataType: 'SINGLE_OPTIONS',
    picklistOptions: ['Sterile', 'Non-Sterile'] },
  { name: 'Consent Signed Date',      dataType: 'DATE' },
  { name: 'Payment Date',             dataType: 'DATE' },
  { name: 'Shipped Date',             dataType: 'DATE' },
  { name: 'Tracking Number',          dataType: 'TEXT' },
  { name: 'Shipment Carrier',         dataType: 'SINGLE_OPTIONS',
    picklistOptions: ['UPS', 'FedEx', 'USPS', 'Other'] },
  { name: 'Preferred Language',       dataType: 'SINGLE_OPTIONS',
    picklistOptions: ['English', 'Korean', 'Vietnamese', 'Other'] },
  { name: 'Auto-Refill Enrolled',     dataType: 'CHECKBOX',
    picklistOptions: ['Yes'] },
]

const CUSTOM_VALUES = [
  { name: 'Secure Payment Link',  value: '' },
  { name: 'Pharmacy Address',     value: '' },
  { name: 'Pharmacy Phone',       value: '' },
  { name: 'Pharmacy Hours',       value: '' },
  { name: 'Portal Guide URL',     value: '' },
  { name: 'Calendly Link',        value: '' },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function verifyConnection() {
  console.log('\n🔐  Verifying API connection...')
  const res = await fetch(`${BASE_URL}/locations/`, { headers: HEADERS })
  if (res.status === 200 || res.status === 401) {
    // 401 means we need location-level check — try contacts instead
    const r2 = await fetch(
      `${BASE_URL}/contacts/?locationId=${LOC_ID}&limit=1`,
      { headers: HEADERS }
    )
    if (r2.ok) {
      const d = await r2.json()
      log('✅', `Connected — ${d?.meta?.total ?? '?'} existing contacts found`)
      return true
    }
  }
  if (res.ok) {
    log('✅', `Connected`)
    return true
  }
  log('❌', `Connection failed — status ${res.status}. Check GHL_API_KEY.`)
  return false
}

async function getExistingFieldNames() {
  const res = await fetch(
    `${BASE_URL}/custom-fields/?locationId=${LOC_ID}`,
    { headers: HEADERS }
  )
  const data = await res.json()
  return new Set((data?.customFields ?? []).map((f) => f.name.toLowerCase()))
}

async function getExistingValueNames() {
  const res = await fetch(
    `${BASE_URL}/custom-values/?locationId=${LOC_ID}`,
    { headers: HEADERS }
  )
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
      log('✅', `Created: ${field.name} (key: ${data?.customField?.fieldKey ?? '?'})`)
      created++
    } else {
      log('❌', `Failed: ${field.name} — ${data?.message ?? res.status}`)
      failed++
    }

    await sleep(350) // respect rate limits
  }
  console.log(`   → ${created} created, ${skipped} skipped, ${failed} failed`)
}

async function createCustomValues() {
  console.log('\n🔧  Creating Custom Values...')
  const existing = await getExistingValueNames()
  let created = 0, skipped = 0, failed = 0

  for (const cv of CUSTOM_VALUES) {
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
      log('✅', `Created: ${cv.name} (key: ${data?.fieldKey ?? '?'})`)
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
  console.log('║   GHL Foundation Setup — Soleil Pharmacy     ║')
  console.log('║   API: rest.gohighlevel.com/v1               ║')
  console.log('╚══════════════════════════════════════════════╝')

  const connected = await verifyConnection()
  if (!connected) process.exit(1)

  await createFields(PROVIDER_FIELDS, 'Provider')
  await createFields(PATIENT_FIELDS, 'Patient')
  await createCustomValues()

  console.log('\n╔══════════════════════════════════════════════╗')
  console.log('║   API Setup Complete ✓                       ║')
  console.log('╚══════════════════════════════════════════════╝')
  console.log('\n📋  Still required in GHL UI:')
  console.log('    1. HIPAA Mode + BAA  → Settings → Business Profile')
  console.log('    2. B2B Pipeline      → CRM → Pipelines → + New')
  console.log('       Lead → Contacted → Demo Scheduled → Credentialing → Contract Signed → Portal Activated')
  console.log('    3. Rx Pipeline       → CRM → Pipelines → + New')
  console.log('       Rx Received → Pharmacist Review → Pending Payment → Compounding → Ready for Pickup / Shipped → Complete')
  console.log('    4. Workflow logic    → Automation → Workflows (see Blueprint v2 PDF)')
  console.log('    5. Populate Custom Values with real URLs → Settings → Custom Values')
  console.log('    6. 10DLC SMS         → Settings → Phone Numbers')
  console.log('\n📄  Reference: docs/GHL_Foundation_Setup_Guide.pdf\n')
}

main().catch((err) => {
  console.error('\n💥  Fatal error:', err.message)
  process.exit(1)
})
