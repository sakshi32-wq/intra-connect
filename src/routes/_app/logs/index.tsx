import { createFileRoute } from '@tanstack/react-router'

import { PageHeader } from '#/components/page-header'
import { SectionPlaceholder } from '#/components/section-placeholder'

// Placeholder until this section's phase builds it (see docs/PROGRESS.md).
export const Route = createFileRoute('/_app/logs/')({
  head: () => ({ meta: [{ title: 'Logs · IntraConnect' }] }),
  component: Page,
})

function Page() {
  return (
    <>
      <PageHeader title="Logs" breadcrumbs={[{ label: 'Logs' }]} variant="navy" />
      <SectionPlaceholder section="Logs" />
    </>
  )
}
