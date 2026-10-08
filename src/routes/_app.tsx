import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { useSuspenseQuery } from '@tanstack/react-query'

import { AppSidebar } from '#/components/app-sidebar'
import { SidebarInset, SidebarProvider } from '#/components/ui/sidebar'
import { meQueryOptions } from '#/features/auth/api'
import { organisationQueryOptions } from '#/features/settings/api'
import { getSession } from '#/lib/session'

export const Route = createFileRoute('/_app')({
  beforeLoad: ({ location }) => {
    const session = getSession()
    if (!session) {
      throw redirect({ to: '/login', search: { redirect: location.href } })
    }
    return { session }
  },
  loader: ({ context: { queryClient, session } }) =>
    Promise.all([
      queryClient.ensureQueryData(meQueryOptions(session.email)),
      queryClient.ensureQueryData(organisationQueryOptions()),
    ]),
  component: AppLayout,
})

function AppLayout() {
  const { session } = Route.useRouteContext()
  const { data: user } = useSuspenseQuery(meQueryOptions(session.email))
  const { data: organisation } = useSuspenseQuery(organisationQueryOptions())

  return (
    // 372px at 1920 wide (19.375vw), never narrower than 260px so content keeps room at 1280.
    <SidebarProvider style={{ '--sidebar-width': 'clamp(260px, 19.375vw, 372px)' } as React.CSSProperties}>
      <AppSidebar user={user} organisation={organisation} />
      <SidebarInset className="min-w-0">
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
