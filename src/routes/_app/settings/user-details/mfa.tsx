import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { SectionPlaceholder } from '#/components/section-placeholder'

// Placeholder: built in the UI pass (see docs/SCREEN_MAP.md).
export const Route = createFileRoute('/_app/settings/user-details/mfa')({
  validateSearch: z.object({
    step: z.enum(['register', 'setup', 'success']).default('register').catch('register'),
    method: z.enum(['app', 'key']).optional().catch(undefined),
    deviceId: z.string().optional().catch(undefined),
  }),
  staticData: { crumb: 'Multi-factor Authentication' },
  head: () => ({ meta: [{ title: 'Multi-factor Authentication · IntraConnect' }] }),
  component: () => <SectionPlaceholder section="Multi-factor Authentication" />,
})
