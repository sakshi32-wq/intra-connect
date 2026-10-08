import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/settings/users')({
  staticData: { crumb: 'Manage User' },
  component: Outlet,
})
