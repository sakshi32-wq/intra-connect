import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { DetailSuccess } from '#/features/practices/components/detail/detail-success'
import { PracticeProfileForm } from '#/features/practices/components/detail/practice-profile-form'
import { getSamplePractice } from '#/features/practices/components/detail/sample-lookup'

// Frames 23 (edit form) and 24 (saved).
export const Route = createFileRoute('/_app/practices/$practiceId/profile/edit')({
  validateSearch: z.object({
    step: z.enum(['form', 'success']).default('form').catch('form'),
  }),
  staticData: { crumb: 'Edit' },
  head: () => ({ meta: [{ title: 'Edit Profile · IntraConnect' }] }),
  component: EditProfilePage,
})

function EditProfilePage() {
  const { practiceId } = Route.useParams()
  const { step } = Route.useSearch()
  const navigate = Route.useNavigate()

  if (step === 'success') {
    return (
      <DetailSuccess
        title="Profile Updated Successfully"
        description="Your practice profile has been updated."
        action={{ label: 'Redirect to Profile Details', to: '/practices/$practiceId/profile', params: { practiceId } }}
      />
    )
  }

  return (
    <PracticeProfileForm
      practice={getSamplePractice(practiceId)}
      onSaved={() => navigate({ search: { step: 'success' }, replace: true })}
    />
  )
}
