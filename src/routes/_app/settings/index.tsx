import { createFileRoute } from '@tanstack/react-router'

import { PageHeader } from '#/components/page-header'
import { SectionPlaceholder } from '#/components/section-placeholder'

// Placeholder until this section's phase builds it (see docs/PROGRESS.md).
export const Route = createFileRoute('/_app/settings/')({
  head: () => ({ meta: [{ title: 'Setting · IntraConnect' }] }),
  component: Page,
})

function Page() {
  return (
    <>
      <PageHeader title="Setting" breadcrumbs={[{ label: 'Setting' }]} />
      <SectionPlaceholder section="Setting" />
    </>
  )
}
