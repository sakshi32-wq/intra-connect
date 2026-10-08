import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { SectionPlaceholder } from '#/components/section-placeholder'

// Placeholder: built in the UI pass (see docs/SCREEN_MAP.md).
export const Route = createFileRoute('/_app/settings/users/invite')({
  validateSearch: z.object({
    step: z.enum(['form', 'success']).default('form').catch('form'),
    createdId: z.string().optional().catch(undefined),
  }),
  staticData: { crumb: 'Invite New User' },
  head: () => ({ meta: [{ title: 'Invite New User · IntraConnect' }] }),
  component: () => <SectionPlaceholder section="Invite New User" />,
})
