import { Outlet, createFileRoute } from '@tanstack/react-router'

import { PageContent } from '#/components/page-content'
import { PageHeader } from '#/components/page-header'
import { PillTabs } from '#/components/pill-tabs'
import { useRouteCrumbs } from '#/hooks/use-route-crumbs'

// Layout for Setting, 8–20: "Setting" header with the three section tabs.
export const Route = createFileRoute('/_app/settings')({
  component: SettingsLayout,
})

function SettingsLayout() {
  const crumbs = useRouteCrumbs()
  return (
    <>
      <PageHeader title="Setting" breadcrumbs={[{ label: 'Setting', to: '/settings/organisation' }, ...crumbs]}>
        <PillTabs
          label="Setting sections"
          tabs={[
            { label: 'Organisation Profile', to: '/settings/organisation' },
            { label: 'Manage User', to: '/settings/users' },
            { label: 'User Details', to: '/settings/user-details' },
          ]}
        />
      </PageHeader>
      <PageContent>
        <Outlet />
      </PageContent>
    </>
  )
}
