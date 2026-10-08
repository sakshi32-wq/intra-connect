import { Link, Outlet, createFileRoute, useMatchRoute, useMatches } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

import { PageContent } from '#/components/page-content'
import { PageHeader } from '#/components/page-header'
import type { Crumb } from '#/components/page-header'
import { PillTabs } from '#/components/pill-tabs'
import { Button } from '#/components/ui/button'

// Layout for Setting, 8–20: "Setting" header with the three section tabs.
// The active pill follows the matched route, which fixes the wrong pills drawn on 11 and 20.
export const Route = createFileRoute('/_app/settings')({
  component: SettingsLayout,
})

const TABS = [
  { label: 'Organisation Profile', to: '/settings/organisation' },
  { label: 'Manage User', to: '/settings/users' },
  { label: 'User Details', to: '/settings/user-details' },
] as const

/** Sub-section layouts whose crumb links back to their landing page. */
const CRUMB_LINKS: Partial<Record<string, Crumb['to']>> = {
  '/settings/users': '/settings/users',
  '/settings/user-details': '/settings/user-details',
}

/** Breadcrumbs from the child routes' `staticData.crumb`, with links to the ancestors. */
function useSettingsCrumbs(): Array<Crumb> {
  const matches = useMatches()
  return matches.flatMap((match) =>
    match.staticData.crumb ? [{ label: match.staticData.crumb, to: CRUMB_LINKS[match.fullPath] }] : [],
  )
}

function SettingsLayout() {
  const crumbs = useSettingsCrumbs()
  const matchRoute = useMatchRoute()
  const onUsersList = Boolean(matchRoute({ to: '/settings/users' }))

  return (
    <>
      <PageHeader title="Setting" breadcrumbs={[{ label: 'Setting', to: '/settings/organisation' }, ...crumbs]}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <PillTabs label="Setting sections" tabs={TABS} />
          {onUsersList ? (
            <Button asChild className="px-5 text-base">
              <Link to="/settings/users/invite" search={{ step: 'form' }}>
                <Plus className="size-5" aria-hidden />
                Invite New User
              </Link>
            </Button>
          ) : null}
        </div>
      </PageHeader>
      <PageContent>
        <Outlet />
      </PageContent>
    </>
  )
}
