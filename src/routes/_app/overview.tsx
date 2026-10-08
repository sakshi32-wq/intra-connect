import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { Button } from '#/components/ui/button'
import { clearSession } from '#/lib/session'

// Placeholder until Phase 4 builds the Overview screen; sign-out moves to the
// sidebar user menu in Phase 3.
export const Route = createFileRoute('/_app/overview')({
  head: () => ({ meta: [{ title: 'Overview · IntraConnect' }] }),
  component: OverviewPage,
})

function OverviewPage() {
  const { session } = Route.useRouteContext()
  const navigate = useNavigate()

  return (
    <main className="grid min-h-svh place-content-center gap-4 text-center">
      <h1 className="text-title font-medium">Overview</h1>
      <p className="text-muted-foreground">Signed in as {session.email}</p>
      <Button
        variant="outline"
        onClick={() => {
          clearSession()
          void navigate({ to: '/login' })
        }}
      >
        Sign out
      </Button>
    </main>
  )
}
