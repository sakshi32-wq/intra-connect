import { Outlet, createFileRoute } from '@tanstack/react-router'

import { PageContent } from '#/components/page-content'
import { PageHeader } from '#/components/page-header'
import { PillTabs } from '#/components/pill-tabs'
import { useRouteCrumbs } from '#/hooks/use-route-crumbs'

// Layout for 22–51: "Practice Details" header with the five section tabs.
export const Route = createFileRoute('/_app/practices/$practiceId')({
  component: PracticeLayout,
})

function PracticeLayout() {
  const { practiceId } = Route.useParams()
  const crumbs = useRouteCrumbs()
  const params = { practiceId }

  return (
    <>
      <PageHeader
        title="Practice Details"
        breadcrumbs={[
          { label: 'Practices', to: '/practices' },
          { label: 'Practice Details', to: '/practices/$practiceId/profile', params },
          ...crumbs,
        ]}
      >
        <PillTabs
          label="Practice sections"
          tabs={[
            { label: 'Profile', to: '/practices/$practiceId/profile', params },
            { label: 'Connection', to: '/practices/$practiceId/connection', params },
            { label: 'Webhooks', to: '/practices/$practiceId/webhooks', params },
            { label: 'Providers', to: '/practices/$practiceId/providers', params },
            { label: 'Patients', to: '/practices/$practiceId/patients', params },
          ]}
        />
      </PageHeader>
      <PageContent>
        <Outlet />
      </PageContent>
    </>
  )
}
