import { createFileRoute } from '@tanstack/react-router'

import { PageContent } from '#/components/page-content'
import { PageHeader } from '#/components/page-header'
import { SectionPlaceholder } from '#/components/section-placeholder'

// Placeholder: built in the UI pass (see docs/SCREEN_MAP.md).
export const Route = createFileRoute('/_app/connections/$connectionId/')({
  head: () => ({ meta: [{ title: 'Connection Details · IntraConnect' }] }),
  component: Page,
})

function Page() {
  return (
    <>
      <PageHeader title="Connection Details" breadcrumbs={[{ label: 'Connections', to: '/connections' }, { label: 'Connection Details' }]} />
      <PageContent>
        <SectionPlaceholder section="Connection Details" />
      </PageContent>
    </>
  )
}
