import { useCallback } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import {
  PRACTICE_CONNECTION_STEPS,
  PracticeConnectionWizard,
} from '#/features/practices/components/detail/practice-connection-wizard'
import type { PracticeConnectionStep } from '#/features/practices/components/detail/practice-connection-wizard'
import { getSamplePractice } from '#/features/practices/components/detail/sample-lookup'

// Frames 29–33: edit the practice's connection (pre-filled, so any step can be deep-linked).
export const Route = createFileRoute('/_app/practices/$practiceId/connection/edit')({
  validateSearch: z.object({
    step: z.enum(PRACTICE_CONNECTION_STEPS).default('ehr').catch('ehr'),
  }),
  staticData: { crumb: 'Edit' },
  head: () => ({ meta: [{ title: 'Edit Connection · IntraConnect' }] }),
  component: EditConnectionPage,
})

function EditConnectionPage() {
  const { practiceId } = Route.useParams()
  const { step } = Route.useSearch()
  const navigate = Route.useNavigate()
  const goTo = useCallback(
    (next: PracticeConnectionStep, options?: { replace?: boolean }) =>
      void navigate({ search: { step: next }, replace: options?.replace }),
    [navigate],
  )

  return <PracticeConnectionWizard mode="edit" practice={getSamplePractice(practiceId)} step={step} onStepChange={goTo} />
}
