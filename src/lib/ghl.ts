/**
 * GHL API Client — Soleil Pharmacy
 * Targets V1 API: https://rest.gohighlevel.com/v1
 *
 * Confirmed working via live endpoint tests on 2026-02-23.
 * V2 (services.leadconnectorhq.com) requires an OAuth Private App token —
 * upgrade path: Agency Settings → App Marketplace → Create Private App.
 */

const BASE_URL = 'https://rest.gohighlevel.com/v1'

const headers = () => ({
  Authorization: `Bearer ${process.env.GHL_API_KEY}`,
  'Content-Type': 'application/json',
})

const locationId = () => process.env.GHL_LOCATION_ID!

// ─── Contacts ────────────────────────────────────────────────────────────────

export interface GHLContact {
  id?: string
  firstName: string
  lastName?: string
  email?: string
  phone?: string
  tags?: string[]
  customField?: Record<string, string | number>
}

export async function searchContact(query: string): Promise<GHLContact | null> {
  const res = await fetch(
    `${BASE_URL}/contacts/?locationId=${locationId()}&query=${encodeURIComponent(query)}&limit=1`,
    { headers: headers() }
  )
  const data = await res.json()
  return data?.contacts?.[0] ?? null
}

export async function createContact(contact: GHLContact): Promise<GHLContact> {
  const res = await fetch(`${BASE_URL}/contacts/`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ ...contact, locationId: locationId() }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(`GHL createContact failed: ${JSON.stringify(data)}`)
  return data.contact
}

export async function updateContact(
  contactId: string,
  fields: Partial<GHLContact>
): Promise<GHLContact> {
  const res = await fetch(`${BASE_URL}/contacts/${contactId}`, {
    method: 'PUT',
    headers: headers(),
    body: JSON.stringify(fields),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(`GHL updateContact failed: ${JSON.stringify(data)}`)
  return data.contact
}

export async function upsertContact(contact: GHLContact): Promise<GHLContact> {
  const query = contact.email || contact.phone || ''
  const existing = query ? await searchContact(query) : null
  if (existing?.id) {
    return updateContact(existing.id, contact)
  }
  return createContact(contact)
}

// ─── Tags ─────────────────────────────────────────────────────────────────────

export async function addTags(contactId: string, tags: string[]): Promise<void> {
  const res = await fetch(`${BASE_URL}/contacts/${contactId}/tags/`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ tags }),
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(`GHL addTags failed: ${JSON.stringify(data)}`)
  }
}

export async function removeTags(contactId: string, tags: string[]): Promise<void> {
  const res = await fetch(`${BASE_URL}/contacts/${contactId}/tags/`, {
    method: 'DELETE',
    headers: headers(),
    body: JSON.stringify({ tags }),
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(`GHL removeTags failed: ${JSON.stringify(data)}`)
  }
}

// ─── Pipelines ────────────────────────────────────────────────────────────────

interface GHLPipeline {
  id: string
  name: string
  stages: Array<{ id: string; name: string }>
}

export async function getPipelines(): Promise<GHLPipeline[]> {
  const res = await fetch(
    `${BASE_URL}/pipelines/?locationId=${locationId()}`,
    { headers: headers() }
  )
  const data = await res.json()
  if (!res.ok) throw new Error(`GHL getPipelines failed: ${JSON.stringify(data)}`)
  return data.pipelines ?? []
}

export async function getPipelineStageId(
  pipelineName: string,
  stageName: string
): Promise<{ pipelineId: string; stageId: string }> {
  const pipelines = await getPipelines()
  const pipeline = pipelines.find((p) => p.name === pipelineName)
  if (!pipeline) throw new Error(`Pipeline not found: "${pipelineName}"`)
  const stage = pipeline.stages.find((s) => s.name === stageName)
  if (!stage) throw new Error(`Stage not found: "${stageName}" in "${pipelineName}"`)
  return { pipelineId: pipeline.id, stageId: stage.id }
}

// ─── Opportunities ────────────────────────────────────────────────────────────
// V1 note: opportunities are scoped to a pipeline.
// Endpoint: /pipelines/{pipelineId}/opportunities/
// V1 uses "stageId" (not "pipelineStageId") and "name" (not "title") in responses,
// but PUT body requires "title" + "status" + "stageId".

export interface GHLOpportunity {
  id?: string
  name?: string        // response field
  title?: string       // PUT body field (same as name)
  pipelineId: string
  stageId?: string     // V1 field
  contactId: string
  status?: 'open' | 'won' | 'lost' | 'abandoned'
  monetaryValue?: number
}

export async function createOpportunity(opp: GHLOpportunity): Promise<GHLOpportunity> {
  const res = await fetch(`${BASE_URL}/pipelines/${opp.pipelineId}/opportunities/`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      title: opp.title || opp.name,
      status: opp.status ?? 'open',
      stageId: opp.stageId,
      contactId: opp.contactId,
      monetaryValue: opp.monetaryValue,
    }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(`GHL createOpportunity failed: ${JSON.stringify(data)}`)
  return { ...data, pipelineId: opp.pipelineId }
}

export async function getOpportunityByContact(
  pipelineId: string,
  contactId: string
): Promise<(GHLOpportunity & { id: string }) | null> {
  const res = await fetch(
    `${BASE_URL}/pipelines/${pipelineId}/opportunities/?locationId=${locationId()}&contactId=${contactId}&limit=1`,
    { headers: headers() }
  )
  const data = await res.json()
  if (!res.ok) return null
  const opp = data?.opportunities?.[0]
  if (!opp) return null
  return { ...opp, pipelineId }
}

export async function updateOpportunityStage(
  pipelineId: string,
  opportunityId: string,
  stageId: string,
  currentTitle: string,
  currentStatus: string = 'open'
): Promise<void> {
  const res = await fetch(
    `${BASE_URL}/pipelines/${pipelineId}/opportunities/${opportunityId}`,
    {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify({
        title: currentTitle,
        status: currentStatus,
        stageId,
      }),
    }
  )
  if (!res.ok) {
    const data = await res.json()
    throw new Error(`GHL updateOpportunityStage failed: ${JSON.stringify(data)}`)
  }
}

// ─── Workflows ────────────────────────────────────────────────────────────────

export async function addContactToWorkflow(
  contactId: string,
  workflowId: string
): Promise<void> {
  const res = await fetch(`${BASE_URL}/contacts/${contactId}/workflow/${workflowId}`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ eventStartTime: new Date().toISOString() }),
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(`GHL addContactToWorkflow failed: ${JSON.stringify(data)}`)
  }
}

// ─── Custom Fields ────────────────────────────────────────────────────────────
// V1 note: no locationId in body — it's scoped by the bearer token.

export async function createCustomField(field: {
  name: string
  dataType: 'TEXT' | 'LARGE_TEXT' | 'NUMERICAL' | 'PHONE' | 'CHECKBOX' | 'SINGLE_OPTIONS' | 'MULTIPLE_OPTIONS' | 'DATE'
  placeholder?: string
  options?: string[]
}): Promise<{ id: string; fieldKey: string }> {
  const body: Record<string, unknown> = {
    name: field.name,
    dataType: field.dataType,
    placeholder: field.placeholder ?? '',
  }
  if (field.options?.length) {
    body.picklistOptions = field.options
  }

  const res = await fetch(`${BASE_URL}/custom-fields/`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(`GHL createCustomField failed: ${JSON.stringify(data)}`)
  return data.customField
}

// ─── Custom Values ────────────────────────────────────────────────────────────
// V1 note: no locationId in body — scoped by bearer token.

export async function createCustomValue(name: string, value: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/custom-values/`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ name, value }),
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(`GHL createCustomValue failed: ${JSON.stringify(data)}`)
  }
}

// ─── Notes ────────────────────────────────────────────────────────────────────

export async function addNote(contactId: string, body: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/contacts/${contactId}/notes/`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ body, userId: '' }),
  })
  if (!res.ok) {
    const data = await res.json()
    throw new Error(`GHL addNote failed: ${JSON.stringify(data)}`)
  }
}
