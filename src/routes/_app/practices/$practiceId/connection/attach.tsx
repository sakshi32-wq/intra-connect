import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { SectionPlaceholder } from '#/components/section-placeholder'

// Placeholder: built in the UI pass (see docs/SCREEN_MAP.md).
export const Route = createFileRoute('/_app/practices/$practiceId/connection/attach')({
  validateSearch: z.object({
    step: z.enum(['ehr', 'app-types', 'practice-id', 'summary', 'success']).default('ehr').catch('ehr'),
  }),
  staticData: { crumb: 'Attach Connection' },
  head: () => ({ meta: [{ title: 'Attach Connection · IntraConnect' }] }),
  component: () => <SectionPlaceholder section="Attach Connection" />,
})
