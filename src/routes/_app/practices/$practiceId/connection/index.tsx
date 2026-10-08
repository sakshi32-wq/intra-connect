import { createFileRoute } from '@tanstack/react-router'

import {
  PracticeConnectionEmpty,
  PracticeConnectionView,
} from '#/features/practices/components/detail/practice-connection-view'
import { getSamplePractice } from '#/features/practices/components/detail/sample-lookup'
import { hasSampleConnection, samplePracticeConnection } from '#/features/practices/sample-data'

// Frames 27 (no connection attached) and 28 (attached).
export const Route = createFileRoute('/_app/practices/$practiceId/connection/')({
  head: () => ({ meta: [{ title: 'Practice Connection · IntraConnect' }] }),
  component: PracticeConnectionPage,
})

function PracticeConnectionPage() {
  const { practiceId } = Route.useParams()
  const practice = getSamplePractice(practiceId)

  if (!hasSampleConnection(practiceId)) return <PracticeConnectionEmpty practiceId={practiceId} />
  return <PracticeConnectionView practice={practice} connection={{ ...samplePracticeConnection, practiceId }} />
}
