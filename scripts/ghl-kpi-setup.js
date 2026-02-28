#!/usr/bin/env node
/**
 * GHL KPI Field Setup Script — Soleil Infusion
 * Targets V1 API (rest.gohighlevel.com/v1).
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

const KPI_FIELDS = [
  { name: 'Lead Created Timestamp', dataType: 'DATE' },
  { name: 'First Contact Timestamp', dataType: 'DATE' },
  { name: 'Speed to Lead (Minutes)', dataType: 'NUMERICAL' },
]

async function getExistingFieldNames() {
  const res = await fetch(`${BASE_URL}/custom-fields/?locationId=${LOC_ID}`, { headers: HEADERS })
  const data = await res.json()
  return new Set((data?.customFields ?? []).map((f) => f.name.toLowerCase()))
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

async function main() {
  console.log('\n╔══════════════════════════════════════════════╗')
  console.log('║   GHL KPI Field Setup                        ║')
  console.log('╚══════════════════════════════════════════════╝')

  await createFields(KPI_FIELDS, 'KPI Tracking')

  console.log('\n✅  KPI Fields Ready.')
}

main().catch(err => {
  console.error('\n💥  Fatal error:', err.message)
  process.exit(1)
})
