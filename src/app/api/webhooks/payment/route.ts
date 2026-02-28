/**
 * Payment Confirmation → GHL Webhook
 *
 * Triggered by Stripe when patient completes payment + consent.
 *
 * Flow:
 *   1. Validate Stripe signature header
 *   2. Find patient contact in GHL by email/phone
 *   3. Set Payment Date + Consent Signed Date custom fields
 *   4. Add tags: Payment-Complete, Consent-Signed
 *   5. Remove tag: Payment-Pending
 *   6. Move pipeline opportunity → Compounding
 *
 * Env required: STRIPE_WEBHOOK_SECRET
 * Stripe metadata required on PaymentIntent: patientEmail OR patientPhone
 */

import { NextRequest, NextResponse } from 'next/server'
import {
  searchContact,
  addTags,
  removeTags,
  updateContact,
  updateOpportunityStage,
  getOpportunityByContact,
  getPipelineStageId,
} from '@/lib/ghl'

interface StripePaymentIntent {
  id: string
  metadata: {
    patientEmail?: string
    patientPhone?: string
    pioneerRxNumber?: string
  }
}

interface StripeEvent {
  type: string
  data: { object: StripePaymentIntent }
}

const PIPELINE_NAME = 'Patient Rx Fulfillment Pipeline'

export async function POST(req: NextRequest) {
  const rawBody = await req.text()
  const stripeSignature = req.headers.get('stripe-signature')

  if (!stripeSignature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let event: StripeEvent
  try {
    event = JSON.parse(rawBody)
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Only handle successful payments
  if (event.type !== 'payment_intent.succeeded') {
    return NextResponse.json({ received: true })
  }

  const { patientEmail, patientPhone, pioneerRxNumber } = event.data.object.metadata ?? {}

  if (!patientEmail && !patientPhone) {
    return NextResponse.json(
      { error: 'Missing patientEmail or patientPhone in Stripe metadata' },
      { status: 400 }
    )
  }

  try {
    const contact = await searchContact(patientEmail || patientPhone || '')
    if (!contact?.id) {
      return NextResponse.json({ error: 'Contact not found in GHL' }, { status: 404 })
    }

    const today = new Date().toISOString().split('T')[0]

    // Set dates + move tags
    await updateContact(contact.id, {
      customField: {
        payment_date:       today,
        consent_signed_date: today,
      },
    })
    await addTags(contact.id, ['Payment-Complete', 'Consent-Signed'])
    await removeTags(contact.id, ['Payment-Pending'])

    // Move opportunity → Compounding
    const { pipelineId, stageId } = await getPipelineStageId(PIPELINE_NAME, 'Compounding')
    const opp = await getOpportunityByContact(pipelineId, contact.id)

    if (opp?.id) {
      await updateOpportunityStage(
        pipelineId,
        opp.id,
        stageId,
        opp.name ?? 'Rx',
        opp.status ?? 'open'
      )
    }

    console.log(
      `[payment] confirmed — contact ${contact.id}` +
      (pioneerRxNumber ? ` | Pioneer Rx: ${pioneerRxNumber}` : '')
    )

    return NextResponse.json({ success: true, contactId: contact.id })
  } catch (err) {
    console.error('[payment webhook]', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
