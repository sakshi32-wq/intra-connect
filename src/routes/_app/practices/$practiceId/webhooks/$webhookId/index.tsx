import { createFileRoute } from '@tanstack/react-router'

import { WebhookDetailCard } from '#/features/webhooks/components/webhook-detail-card'
import { WebhookNotFound } from '#/features/webhooks/components/webhook-not-found'
import { findSampleWebhook } from '#/features/webhooks/sample'

// Frame 35: webhook detail.
export const Route = createFileRoute('/_app/practices/$practiceId/webhooks/$webhookId/')({
  staticData: { crumb: 'Webhook Details' },
  head: () => ({ meta: [{ title: 'Webhook Details · IntraConnect' }] }),
  component: WebhookDetailPage,
})

function WebhookDetailPage() {
  const { practiceId, webhookId } = Route.useParams()
  const webhook = findSampleWebhook(webhookId)
  if (!webhook) return <WebhookNotFound practiceId={practiceId} />
  return <WebhookDetailCard practiceId={practiceId} webhook={webhook} />
}
