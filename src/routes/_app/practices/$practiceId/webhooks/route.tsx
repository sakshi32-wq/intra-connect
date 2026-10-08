import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/practices/$practiceId/webhooks')({
  staticData: { crumb: 'Webhooks' },
  component: Outlet,
})
