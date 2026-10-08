import { createFileRoute } from '@tanstack/react-router'

import { SectionPlaceholder } from '#/components/section-placeholder'

// Placeholder: built in the UI pass (see docs/SCREEN_MAP.md).
export const Route = createFileRoute('/_app/practices/$practiceId/connection/')({
  head: () => ({ meta: [{ title: 'Practice Connection · IntraConnect' }] }),
  component: () => <SectionPlaceholder section="Practice Connection" />,
})
