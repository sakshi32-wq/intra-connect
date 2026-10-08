import { useCallback } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { PageContent } from '#/components/page-content'
import { PageHeader } from '#/components/page-header'
import { ConnectionWizard } from '#/features/connections/components/connection-wizard'
import type { WizardStep } from '#/features/connections/components/connection-wizard'
import { NEXT_CONNECTION_ID, redirectUrlFor, sampleConnections } from '#/features/connections/sample-data'

const TAKEN_NAMES = sampleConnections.map((connection) => connection.name)

export const Route = createFileRoute('/_app/connections/new')({
  validateSearch: z.object({
    step: z.enum(['getting-started', 'type', 'details', 'summary', 'success']).default('getting-started').catch('getting-started'),
  }),
  head: () => ({ meta: [{ title: 'Add New Connection · IntraConnect' }] }),
  component: AddConnectionPage,
})

// 58–62. UI-only: "Create Connection" shows the success state; nothing is saved.
function AddConnectionPage() {
  const { step } = Route.useSearch()
  const navigate = Route.useNavigate()
  const goTo = useCallback(
    (next: WizardStep, options?: { replace?: boolean }) => void navigate({ search: { step: next }, replace: options?.replace }),
    [navigate],
  )

  return (
    <>
      <PageHeader title="Connections" breadcrumbs={[{ label: 'Connections', to: '/connections' }, { label: 'Add New Connection' }]} />
      <PageContent>
        <ConnectionWizard
          mode="add"
          step={step}
          onStepChange={goTo}
          takenNames={TAKEN_NAMES}
          redirectUrl={redirectUrlFor(NEXT_CONNECTION_ID)}
          cancel={{ to: '/connections' }}
          success={{
            title: 'Connection Added Successfully',
            description: 'You will receive the connection details on your registered mail ID.',
            action: { label: 'Back to Connections', to: '/connections' },
          }}
        />
      </PageContent>
    </>
  )
}
