import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

import { getSession } from '#/lib/session'

export const Route = createFileRoute('/_auth')({
  beforeLoad: () => {
    if (getSession()) throw redirect({ to: '/overview' })
  },
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <main className="grid min-h-svh place-items-center p-4 [background-image:var(--auth-gradient)]">
      <Outlet />
    </main>
  )
}
