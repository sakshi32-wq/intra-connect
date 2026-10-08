import { createFileRoute } from '@tanstack/react-router'

import { PracticeProfileView } from '#/features/practices/components/detail/practice-profile-view'
import { getSamplePractice } from '#/features/practices/components/detail/sample-lookup'

// Frame 22: practice profile, read-only.
export const Route = createFileRoute('/_app/practices/$practiceId/profile/')({
  head: () => ({ meta: [{ title: 'Practice Profile · IntraConnect' }] }),
  component: PracticeProfilePage,
})

function PracticeProfilePage() {
  const { practiceId } = Route.useParams()
  return <PracticeProfileView practice={getSamplePractice(practiceId)} />
}
