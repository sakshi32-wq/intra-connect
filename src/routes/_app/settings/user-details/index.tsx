import { createFileRoute } from '@tanstack/react-router'

import { SectionPlaceholder } from '#/components/section-placeholder'

// Placeholder: built in the UI pass (see docs/SCREEN_MAP.md).
export const Route = createFileRoute('/_app/settings/user-details/')({
  head: () => ({ meta: [{ title: 'User Details · IntraConnect' }] }),
  component: () => <SectionPlaceholder section="User Details" />,
})
