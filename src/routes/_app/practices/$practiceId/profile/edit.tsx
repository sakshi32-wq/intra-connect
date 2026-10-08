import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { SectionPlaceholder } from '#/components/section-placeholder'

// Placeholder: built in the UI pass (see docs/SCREEN_MAP.md).
export const Route = createFileRoute('/_app/practices/$practiceId/profile/edit')({
  validateSearch: z.object({
    step: z.enum(['form', 'success']).default('form').catch('form'),
  }),
  staticData: { crumb: 'Edit Profile' },
  head: () => ({ meta: [{ title: 'Edit Profile · IntraConnect' }] }),
  component: () => <SectionPlaceholder section="Edit Profile" />,
})
