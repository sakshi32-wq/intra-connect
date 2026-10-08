import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { SectionPlaceholder } from '#/components/section-placeholder'

// Placeholder: built in the UI pass (see docs/SCREEN_MAP.md).
export const Route = createFileRoute('/_app/practices/$practiceId/webhooks/new')({
  validateSearch: z.object({
    step: z.enum(['details', 'summary', 'verification', 'success']).default('details').catch('details'),
    createdId: z.string().optional().catch(undefined),
  }),
  staticData: { crumb: 'Add Webhook' },
  head: () => ({ meta: [{ title: 'Add Webhook · IntraConnect' }] }),
  component: () => <SectionPlaceholder section="Add Webhook" />,
})
