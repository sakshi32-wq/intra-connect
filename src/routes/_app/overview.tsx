import { createFileRoute } from '@tanstack/react-router'

import { PageHeader } from '#/components/page-header'
import { SectionPlaceholder } from '#/components/section-placeholder'

// The Overview body (onboarding stepper + diagram) is built in Phase 4.
export const Route = createFileRoute('/_app/overview')({
  head: () => ({ meta: [{ title: 'Overview · IntraConnect' }] }),
  component: OverviewPage,
})

function OverviewPage() {
  return (
    <>
      <PageHeader title="Overview" variant="navy" />
      <SectionPlaceholder section="Overview" />
    </>
  )
}
