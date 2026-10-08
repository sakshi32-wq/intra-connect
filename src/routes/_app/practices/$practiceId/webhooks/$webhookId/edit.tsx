import { useCallback } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { WEBHOOK_STEPS } from '#/features/webhooks/schemas'
import type { WebhookStep } from '#/features/webhooks/schemas'
import { WebhookNotFound } from '#/features/webhooks/components/webhook-not-found'
import { WebhookWizard } from '#/features/webhooks/components/webhook-wizard'
import { findSampleWebhook } from '#/features/webhooks/sample'

// Frames 36–39: edit webhook wizard.
export const Route = createFileRoute('/_app/practices/$practiceId/webhooks/$webhookId/edit')({
  validateSearch: z.object({
    step: z.enum(WEBHOOK_STEPS).default('details').catch('details'),
  }),
  staticData: { crumb: 'Edit Webhook' },
  head: () => ({ meta: [{ title: 'Edit Webhook · IntraConnect' }] }),
  component: EditWebhookPage,
})

function EditWebhookPage() {
  const { practiceId, webhookId } = Route.useParams()
  const { step } = Route.useSearch()
  const navigate = Route.useNavigate()
  const onStepChange = useCallback(
    (next: WebhookStep, options?: { replace?: boolean }) =>
      void navigate({ search: { step: next }, replace: options?.replace }),
    [navigate],
  )

  const webhook = findSampleWebhook(webhookId)
  if (!webhook) return <WebhookNotFound practiceId={practiceId} />
  return (
    <WebhookWizard
      key={webhook.id}
      mode="edit"
      practiceId={practiceId}
      webhook={webhook}
      step={step}
      onStepChange={onStepChange}
    />
  )
}
