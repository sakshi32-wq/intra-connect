import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { SuccessState } from '#/components/success-state'
import { OrganisationProfileForm, organisationSchema } from '#/features/settings/components/organisation-profile-form'
import type { OrganisationValues } from '#/features/settings/components/organisation-profile-form'
import { SAMPLE_ORGANISATION } from '#/features/settings/sample-data'

// Frames Setting (form) and 8 (saved).
export const Route = createFileRoute('/_app/settings/organisation')({
  validateSearch: z.object({
    step: z.enum(['form', 'success']).default('form').catch('form'),
  }),
  staticData: { crumb: 'Organisation Profile' },
  head: () => ({ meta: [{ title: 'Organisation Profile · IntraConnect' }] }),
  component: OrganisationPage,
})

function OrganisationPage() {
  const { step } = Route.useSearch()
  const navigate = Route.useNavigate()
  const { name, overview, alertEmail, salesEmail, contact, website, twitter, category, envType } = SAMPLE_ORGANISATION
  const form = useForm<OrganisationValues>({
    resolver: zodResolver(organisationSchema),
    defaultValues: {
      name,
      overview,
      alertEmail,
      salesEmail,
      contact: contact ?? '',
      website: website ?? '',
      twitter: twitter ?? '',
      category: category ?? '',
      envType: envType ?? '',
    },
  })

  if (step === 'success') {
    return (
      <SuccessState
        tone="neutral"
        title="Organisation profile saved successfully"
        description="Your organisation profile has been updated."
        action={{ label: 'Redirect to Profile Details', to: '/settings/organisation', search: { step: 'form' } }}
        className="pt-[267px] [&>a]:mt-8 [&>a]:min-w-[349px] [&>div]:-mt-2 [&>div]:text-base [&>h2]:mt-[76px] [&>h2]:text-display"
      />
    )
  }

  return (
    <OrganisationProfileForm
      form={form}
      onSubmit={() => void navigate({ search: { step: 'success' }, replace: true })}
    />
  )
}
