import { createFileRoute } from '@tanstack/react-router'

import { SectionPlaceholder } from '#/components/section-placeholder'

// Placeholder: built in the UI pass (see docs/SCREEN_MAP.md).
export const Route = createFileRoute('/_app/practices/$practiceId/webhooks/$webhookId/')({
  staticData: { crumb: 'Webhook Details' },
  head: () => ({ meta: [{ title: 'Webhook Details · IntraConnect' }] }),
  component: () => <SectionPlaceholder section="Webhook Details" />,
})
