import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

import { getSession } from '#/lib/session'

export const Route = createFileRoute('/_app')({
  beforeLoad: ({ location }) => {
    const session = getSession()
    if (!session) {
      throw redirect({ to: '/login', search: { redirect: location.href } })
    }
    return { session }
  },
  // The sidebar + header shell arrives in Phase 3.
  component: Outlet,
})
