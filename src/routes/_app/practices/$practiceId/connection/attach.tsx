import { useCallback } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import {
  PRACTICE_CONNECTION_STEPS,
  PracticeConnectionWizard,
} from '#/features/practices/components/detail/practice-connection-wizard'
import type { PracticeConnectionStep } from '#/features/practices/components/detail/practice-connection-wizard'
import { getSamplePractice } from '#/features/practices/components/detail/sample-lookup'

// Frames 47–51: attach a connection to the practice.
export const Route = createFileRoute('/_app/practices/$practiceId/connection/attach')({
  validateSearch: z.object({
    step: z.enum(PRACTICE_CONNECTION_STEPS).default('ehr').catch('ehr'),
  }),
  staticData: { crumb: 'Attach Connection' },
  head: () => ({ meta: [{ title: 'Attach Connection · IntraConnect' }] }),
  component: AttachConnectionPage,
})

function AttachConnectionPage() {
  const { practiceId } = Route.useParams()
  const { step } = Route.useSearch()
  const navigate = Route.useNavigate()
  const goTo = useCallback(
    (next: PracticeConnectionStep, options?: { replace?: boolean }) =>
      void navigate({ search: { step: next }, replace: options?.replace }),
    [navigate],
  )

  return <PracticeConnectionWizard mode="attach" practice={getSamplePractice(practiceId)} step={step} onStepChange={goTo} />
}
