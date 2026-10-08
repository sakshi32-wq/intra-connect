import { createFileRoute } from '@tanstack/react-router'

import { SectionPlaceholder } from '#/components/section-placeholder'

// Placeholder: built in the UI pass (see docs/SCREEN_MAP.md).
export const Route = createFileRoute('/_app/settings/users/')({
  head: () => ({ meta: [{ title: 'Manage User · IntraConnect' }] }),
  component: () => <SectionPlaceholder section="Manage User" />,
})
