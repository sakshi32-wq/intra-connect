import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { PageContent } from '#/components/page-content'
import { PageHeader } from '#/components/page-header'
import { SectionPlaceholder } from '#/components/section-placeholder'

// Placeholder: built in the UI pass (see docs/SCREEN_MAP.md).
export const Route = createFileRoute('/_app/connections/new')({
  validateSearch: z.object({
    step: z.enum(['getting-started', 'type', 'details', 'summary', 'success']).default('getting-started').catch('getting-started'),
    createdId: z.string().optional().catch(undefined),
  }),
  head: () => ({ meta: [{ title: 'Add New Connection · IntraConnect' }] }),
  component: Page,
})

function Page() {
  return (
    <>
      <PageHeader title="Connections" breadcrumbs={[{ label: 'Connections', to: '/connections' }, { label: 'Add New Connection' }]} />
      <PageContent>
        <SectionPlaceholder section="Add New Connection" />
      </PageContent>
    </>
  )
}
