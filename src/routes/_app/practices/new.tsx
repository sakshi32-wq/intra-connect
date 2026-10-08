import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { PageContent } from '#/components/page-content'
import { PageHeader } from '#/components/page-header'
import { SectionPlaceholder } from '#/components/section-placeholder'

// Placeholder: built in the UI pass (see docs/SCREEN_MAP.md).
export const Route = createFileRoute('/_app/practices/new')({
  validateSearch: z.object({
    step: z.enum(['details', 'review', 'success']).default('details').catch('details'),
    createdId: z.string().optional().catch(undefined),
  }),
  head: () => ({ meta: [{ title: 'Add New Practice · IntraConnect' }] }),
  component: Page,
})

function Page() {
  return (
    <>
      <PageHeader title="Practices" breadcrumbs={[{ label: 'Practices', to: '/practices' }, { label: 'Add New Practice' }]} />
      <PageContent>
        <SectionPlaceholder section="Add New Practice" />
      </PageContent>
    </>
  )
}
