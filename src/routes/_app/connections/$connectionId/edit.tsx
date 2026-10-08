import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { PageContent } from '#/components/page-content'
import { PageHeader } from '#/components/page-header'
import { SectionPlaceholder } from '#/components/section-placeholder'

// Placeholder: built in the UI pass (see docs/SCREEN_MAP.md).
export const Route = createFileRoute('/_app/connections/$connectionId/edit')({
  validateSearch: z.object({
    step: z.enum(['type', 'details', 'summary', 'success']).default('type').catch('type'),
  }),
  head: () => ({ meta: [{ title: 'Edit Connection · IntraConnect' }] }),
  component: Page,
})

function Page() {
  return (
    <>
      <PageHeader title="Connections" breadcrumbs={[{ label: 'Connections', to: '/connections' }, { label: 'Edit Connection' }]} />
      <PageContent>
        <SectionPlaceholder section="Edit Connection" />
      </PageContent>
    </>
  )
}
