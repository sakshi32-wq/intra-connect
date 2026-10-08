import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/practices/$practiceId/connection')({
  staticData: { crumb: 'Connection' },
  component: Outlet,
})
