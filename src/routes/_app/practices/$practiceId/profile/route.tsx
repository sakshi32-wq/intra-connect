import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/practices/$practiceId/profile')({
  staticData: { crumb: 'Profile' },
  component: Outlet,
})
