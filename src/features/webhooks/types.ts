import type { ActiveStatus } from '#/features/connections/types'

export const WEBHOOK_METHODS = ['POST', 'GET', 'PUT'] as const
export type WebhookMethod = (typeof WEBHOOK_METHODS)[number]

export interface Webhook {
  id: string
  practiceId: string
  name: string
  url: string
  method: WebhookMethod
  tokenId: string
  verified: boolean
  status: ActiveStatus
  createdAt: string
}
