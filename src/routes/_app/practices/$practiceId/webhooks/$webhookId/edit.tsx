import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { SectionPlaceholder } from '#/components/section-placeholder'

// Placeholder: built in the UI pass (see docs/SCREEN_MAP.md).
export const Route = createFileRoute('/_app/practices/$practiceId/webhooks/$webhookId/edit')({
  validateSearch: z.object({
    step: z.enum(['details', 'summary', 'verification', 'success']).default('details').catch('details'),
  }),
  staticData: { crumb: 'Edit Webhook' },
  head: () => ({ meta: [{ title: 'Edit Webhook · IntraConnect' }] }),
  component: () => <SectionPlaceholder section="Edit Webhook" />,
})
