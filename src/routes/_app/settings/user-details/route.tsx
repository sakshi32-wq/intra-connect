import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/settings/user-details')({
  staticData: { crumb: 'User Details' },
  component: Outlet,
})
