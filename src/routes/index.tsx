import { createFileRoute, redirect } from '@tanstack/react-router'

// The _app guard sends signed-out visitors on to /login.
export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({ to: '/overview' })
  },
})
