import { createFileRoute } from '@tanstack/react-router'

import { PeopleTable } from '#/features/practices/components/detail/people-table'
import { sampleProviders } from '#/features/practices/sample-data'

// Frame 25: providers of the practice.
export const Route = createFileRoute('/_app/practices/$practiceId/providers')({
  staticData: { crumb: 'Providers' },
  head: () => ({ meta: [{ title: 'Providers · IntraConnect' }] }),
  component: ProvidersPage,
})

function ProvidersPage() {
  return (
    <PeopleTable
      noun="Provider"
      rows={sampleProviders}
      middle={[{ id: 'serviceType', header: 'Service type', cell: (row) => row.serviceType }]}
      trailing={[{ id: 'npiId', header: 'NPI ID', cell: (row) => row.npiId }]}
    />
  )
}
