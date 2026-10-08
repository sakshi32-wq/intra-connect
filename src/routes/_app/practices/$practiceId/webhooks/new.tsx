import { useCallback } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { WEBHOOK_STEPS } from '#/features/webhooks/schemas'
import type { WebhookStep } from '#/features/webhooks/schemas'
import { WebhookWizard } from '#/features/webhooks/components/webhook-wizard'

// Frames 42–45: add webhook wizard.
export const Route = createFileRoute('/_app/practices/$practiceId/webhooks/new')({
  validateSearch: z.object({
    step: z.enum(WEBHOOK_STEPS).default('details').catch('details'),
    createdId: z.string().optional().catch(undefined),
  }),
  staticData: { crumb: 'Add Webhook' },
  head: () => ({ meta: [{ title: 'Add Webhook · IntraConnect' }] }),
  component: AddWebhookPage,
})

function AddWebhookPage() {
  const { practiceId } = Route.useParams()
  const { step } = Route.useSearch()
  const navigate = Route.useNavigate()
  const onStepChange = useCallback(
    (next: WebhookStep, options?: { replace?: boolean }) =>
      void navigate({ search: { step: next }, replace: options?.replace }),
    [navigate],
  )

  return <WebhookWizard mode="add" practiceId={practiceId} step={step} onStepChange={onStepChange} />
}
