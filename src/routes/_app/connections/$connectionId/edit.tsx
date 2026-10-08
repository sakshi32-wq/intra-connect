import { useCallback, useMemo } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { PageContent } from '#/components/page-content'
import { PageHeader } from '#/components/page-header'
import { ConnectionNotFound } from '#/features/connections/components/connection-not-found'
import { ConnectionWizard } from '#/features/connections/components/connection-wizard'
import type { WizardStep } from '#/features/connections/components/connection-wizard'
import { findSampleConnection, sampleConnections } from '#/features/connections/sample-data'
import { connectionFormValues } from '#/features/connections/schemas'

export const Route = createFileRoute('/_app/connections/$connectionId/edit')({
  validateSearch: z.object({
    step: z.enum(['type', 'details', 'summary', 'success']).default('type').catch('type'),
  }),
  head: () => ({ meta: [{ title: 'Edit Connection · IntraConnect' }] }),
  component: EditConnectionPage,
})

// 64–67. UI-only: "Update Connection" shows the success state; nothing is saved.
function EditConnectionPage() {
  const { connectionId } = Route.useParams()
  const { step } = Route.useSearch()
  const navigate = Route.useNavigate()
  const goTo = useCallback(
    (next: WizardStep, options?: { replace?: boolean }) =>
      void navigate({ search: { step: next === 'getting-started' ? 'type' : next }, replace: options?.replace }),
    [navigate],
  )
  const connection = findSampleConnection(connectionId)
  const takenNames = useMemo(
    () => sampleConnections.filter((other) => other.id !== connectionId).map((other) => other.name),
    [connectionId],
  )

  if (!connection) return <ConnectionNotFound />

  const params = { connectionId }
  return (
    <>
      <PageHeader
        title="Edit Connection Details"
        breadcrumbs={[
          { label: 'Connections', to: '/connections' },
          { label: connection.name, to: '/connections/$connectionId', params },
          { label: 'Edit' },
        ]}
      />
      <PageContent>
        <ConnectionWizard
          // a fresh form per connection
          key={connection.id}
          mode="edit"
          step={step}
          onStepChange={goTo}
          initialValues={connectionFormValues(connection)}
          takenNames={takenNames}
          redirectUrl={connection.redirectUrl}
          cancel={{ to: '/connections/$connectionId', params }}
          success={{
            title: 'Connection Updated Successfully',
            description: 'You will receive the connection details on your registered mail ID.',
            action: { label: 'Back to Connection', to: '/connections/$connectionId', params },
          }}
        />
      </PageContent>
    </>
  )
}
