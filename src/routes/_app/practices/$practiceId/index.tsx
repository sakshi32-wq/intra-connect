import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/practices/$practiceId/')({
  beforeLoad: ({ params }) => {
    throw redirect({ to: '/practices/$practiceId/profile', params })
  },
})
