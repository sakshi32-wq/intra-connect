import { createFileRoute } from '@tanstack/react-router'

import { PeopleTable } from '#/features/practices/components/detail/people-table'
import { samplePatients } from '#/features/practices/sample-data'

// Frame 26: patients of the practice.
export const Route = createFileRoute('/_app/practices/$practiceId/patients')({
  staticData: { crumb: 'Patients' },
  head: () => ({ meta: [{ title: 'Patients · IntraConnect' }] }),
  component: PatientsPage,
})

/** ISO date (yyyy-mm-dd) → MM/DD/YYYY as drawn in 26. */
function formatDob(iso: string) {
  const [year, month, day] = iso.split('-')
  return `${month}/${day}/${year}`
}

function PatientsPage() {
  return (
    <PeopleTable
      noun="Patient"
      rows={samplePatients}
      middle={[
        {
          id: 'dob',
          header: 'DOB',
          cell: (row) => <time dateTime={row.dob}>{formatDob(row.dob)}</time>,
        },
        { id: 'serviceUse', header: 'Service Use', cell: (row) => row.serviceUse },
      ]}
    />
  )
}
