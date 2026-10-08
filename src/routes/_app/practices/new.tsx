import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { PageContent } from '#/components/page-content'
import { PageHeader } from '#/components/page-header'
import { SuccessState } from '#/components/success-state'
import { Form } from '#/components/ui/form'
import { PracticeDetailsStep } from '#/features/practices/components/add/practice-details-step'
import {
  emptyPracticeForm,
  practiceFormSchema,
} from '#/features/practices/components/add/practice-form-schema'
import type { PracticeFormValues } from '#/features/practices/components/add/practice-form-schema'
import { PracticeReviewStep } from '#/features/practices/components/add/practice-review-step'
import { samplePractice } from '#/features/practices/sample-data'

export const Route = createFileRoute('/_app/practices/new')({
  validateSearch: z.object({
    step: z
      .enum(['details', 'review', 'success'])
      .default('details')
      .catch('details'),
    createdId: z.string().optional().catch(undefined),
  }),
  head: () => ({ meta: [{ title: 'Add New Practice · IntraConnect' }] }),
  component: AddPracticePage,
})

// Frames "Logs" (details), 41 (review) and 54 (success).
function AddPracticePage() {
  const { step, createdId } = Route.useSearch()
  const navigate = Route.useNavigate()
  const form = useForm<PracticeFormValues>({
    resolver: zodResolver(practiceFormSchema),
    defaultValues: emptyPracticeForm,
  })

  // Values validated on the details step; the review step needs them, so a deep link without them starts over.
  const [reviewed, setReviewed] = useState<PracticeFormValues | null>(null)
  const reviewWithoutValues = step === 'review' && reviewed === null
  useEffect(() => {
    if (reviewWithoutValues)
      void navigate({ search: { step: 'details' }, replace: true })
  }, [reviewWithoutValues, navigate])

  const goToDetails = () => void navigate({ search: { step: 'details' } })

  return (
    <>
      <PageHeader
        title="Add New Practice"
        breadcrumbs={[
          { label: 'Practices', to: '/practices' },
          { label: 'Add New Practice' },
        ]}
      />
      <PageContent
        className={step === 'success' ? 'justify-center pb-[206px]' : undefined}
      >
        {step === 'success' ? (
          <SuccessState
            title="New Practice Added Successfully"
            description={
              <>
                <p>The practice has been added to your organisation.</p>
                <p>
                  You can attach a Connection &amp; Webhooks to this practice
                  now.
                </p>
              </>
            }
            // UI only: nothing is persisted, so the CTA opens the sample practice when no id was created.
            action={{
              label: 'Redirect to Practice Page',
              to: '/practices/$practiceId/profile',
              params: { practiceId: createdId ?? samplePractice.id },
            }}
          />
        ) : (
          <Form {...form}>
            <form
              noValidate
              aria-label="Add New Practice"
              onSubmit={form.handleSubmit((values) => {
                setReviewed(values)
                void navigate({ search: { step: 'review' } })
              })}
            >
              {step === 'review' && reviewed ? (
                <PracticeReviewStep
                  values={reviewed}
                  onEdit={goToDetails}
                  onSave={() => {
                    toast.success(`${reviewed.name} was added`)
                    void navigate({
                      search: { step: 'success', createdId: samplePractice.id },
                      replace: true,
                    })
                  }}
                />
              ) : (
                <PracticeDetailsStep control={form.control} />
              )}
            </form>
          </Form>
        )}
      </PageContent>
    </>
  )
}
