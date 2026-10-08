import { z } from 'zod'

import { WEBHOOK_METHODS } from './types'

/** Step 1 of the webhook wizard (frames 36, 42). */
export const webhookDetailsSchema = z.object({
  name: z.string().trim().min(1, 'Enter the webhook name.').max(100, 'Keep the name under 100 characters.'),
  url: z.url({ protocol: /^https?$/, message: 'Enter a valid URL, e.g. https://hooks.example.com/events.' }),
  method: z.enum(WEBHOOK_METHODS, { message: 'Select a method type.' }),
})
export type WebhookDetailsValues = z.infer<typeof webhookDetailsSchema>

export const WEBHOOK_STEPS = ['details', 'summary', 'verification', 'success'] as const
export type WebhookStep = (typeof WEBHOOK_STEPS)[number]
