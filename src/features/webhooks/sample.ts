// UI-only mode: the webhook screens read the static practice sample data.
// Every connected practice shows the same sample webhooks.
import { sampleWebhooks } from '#/features/practices/sample-data'

export function findSampleWebhook(webhookId: string) {
  return sampleWebhooks.find((webhook) => webhook.id === webhookId)
}
