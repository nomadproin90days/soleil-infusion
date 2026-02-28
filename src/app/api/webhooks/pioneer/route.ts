/**
 * Pioneer Rx → GHL Webhook
 *
 * Triggered when a provider submits a new prescription via the prescriber portal
 * or Pioneer Rx fires a status update.
 *
 * Flow (new Rx):
 *   1. Validate the request (secret header)
 *   2. Upsert the patient contact in GHL
 *   3. Set all Rx custom fields
 *   4. Create Opportunity in Patient Rx Fulfillment Pipeline at "Pharmacist Review"
 *   5. Tag: Rx-Received, Pharmacist-Review-Pending
 *
 * Flow (status update):
 *   1. Validate + upsert contact
 *   2. Find existing opportunity by contact + pipeline
 *   3. Move to correct stage
 *   4. Update tags
 *
 * Env required: PIONEER_WEBHOOK_SECRET
 */

import { NextRequest, NextResponse } from 'next/server'
import {
  upsertContact,
  addTags,
  createOpportunity,
  updateOpportunityStage,
  getOpportunityByContact,
  getPipelineStageId,
  addNote,
} from '@/lib/ghl'

interface PioneerPayload {
  patientFirstName: string
  patientLastName: string
  patientEmail?: string
  patientPhone?: string
  pioneerRxNumber: string
  formulaId: string
  prescriberName: string
  prescriberNpi: string
  daysSupply: number
  rxExpirationDate?: string
  refillCountRemaining?: number
  compoundType?: 'Sterile' | 'Non-Sterile'
  status?: 'new' | 'verified' | 'compounding_complete' | 'shipped' | 'ready_for_pickup'
  trackingNumber?: string
  shipmentCarrier?: string
}

const STATUS_TO_STAGE: Record<string, string> = {
  verified:             'Pharmacist Review',
  compounding_complete: 'Compounding',
  shipped:              'Shipped',
  ready_for_pickup:     'Ready for Pickup',
}

const STATUS_TO_TAGS: Record<string, string[]> = {
  verified:             ['Pharmacist-Review-Pending'],
  compounding_complete: ['Compounding'],
  shipped:              ['Shipped'],
  ready_for_pickup:     ['Shipped'],
}

const PIPELINE_NAME = 'Patient Rx Fulfillment Pipeline'

export async function POST(req: NextRequest) {
  if (req.headers.get('x-pioneer-secret') !== process.env.PIONEER_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let payload: PioneerPayload
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const {
    patientFirstName, patientLastName, patientEmail, patientPhone,
    pioneerRxNumber, formulaId, prescriberName, prescriberNpi,
    daysSupply, rxExpirationDate, refillCountRemaining, compoundType,
    status = 'new', trackingNumber, shipmentCarrier,
  } = payload

  try {
    // 1. Upsert contact
    const contact = await upsertContact({
      firstName: patientFirstName,
      lastName: patientLastName,
      email: patientEmail,
      phone: patientPhone,
      customField: {
        pioneer_rx_number:    pioneerRxNumber,
        formula_id:           formulaId,
        prescriber_name:      prescriberName,
        prescriber_npi:       prescriberNpi,
        days_supply:          daysSupply,
        ...(rxExpirationDate        && { rx_expiration_date:     rxExpirationDate }),
        ...(refillCountRemaining !== undefined && { refill_count_remaining: refillCountRemaining }),
        ...(compoundType            && { compound_type:           compoundType }),
        ...(trackingNumber          && { tracking_number:         trackingNumber }),
        ...(shipmentCarrier         && { shipment_carrier:        shipmentCarrier }),
      },
    })

    if (!contact.id) throw new Error('Contact upsert returned no ID')

    if (status === 'new') {
      // 2. New Rx → create opportunity at Pharmacist Review
      const { pipelineId, stageId } = await getPipelineStageId(PIPELINE_NAME, 'Pharmacist Review')

      await createOpportunity({
        title: `Rx — ${patientFirstName} ${patientLastName}`,
        pipelineId,
        stageId,
        contactId: contact.id,
        status: 'open',
      })

      await addTags(contact.id, ['Rx-Received', 'Pharmacist-Review-Pending'])
      await addNote(
        contact.id,
        `New Rx received. Pioneer Rx #: ${pioneerRxNumber} | Formula: ${formulaId} | Days Supply: ${daysSupply} | Compound: ${compoundType ?? 'TBD'}`
      )
    } else {
      // 3. Status update → move existing opportunity
      const targetStage = STATUS_TO_STAGE[status]
      const targetTags  = STATUS_TO_TAGS[status]

      if (targetStage) {
        const { pipelineId, stageId } = await getPipelineStageId(PIPELINE_NAME, targetStage)
        const opp = await getOpportunityByContact(pipelineId, contact.id)

        if (opp?.id) {
          await updateOpportunityStage(
            pipelineId,
            opp.id,
            stageId,
            opp.name ?? `Rx — ${patientFirstName} ${patientLastName}`,
            opp.status ?? 'open'
          )
        }
      }

      if (targetTags?.length) await addTags(contact.id, targetTags)

      if (status === 'shipped' && trackingNumber) {
        await addNote(
          contact.id,
          `Order shipped. Carrier: ${shipmentCarrier ?? 'Unknown'} | Tracking: ${trackingNumber}`
        )
      }
    }

    return NextResponse.json({ success: true, contactId: contact.id })
  } catch (err) {
    console.error('[pioneer webhook]', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
