import { CopyableText } from '#/components/copy-button'
import { DataTable } from '#/components/data-table'
import type { Column } from '#/components/data-table'
import { StatusSwitch } from '#/components/status-switch'
import { Avatar, AvatarFallback } from '#/components/ui/avatar'
import type { ActiveStatus } from '#/features/connections/types'
import type { Gender } from '#/features/practices/types'
import { cn } from '#/lib/utils'

interface Person {
  id: string
  name: string
  gender: Gender
  ehrId: string
  status: ActiveStatus
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

/** Avatar (initials; the photos were not exported) + bold name (25, 26). */
function PersonCell({ name }: { name: string }) {
  return (
    <span className="flex items-center gap-[13px]">
      <Avatar className="size-[38px]">
        <AvatarFallback className="bg-secondary text-sm font-semibold text-primary">{initials(name)}</AvatarFallback>
      </Avatar>
      <span className="font-semibold text-text-strong">{name}</span>
    </span>
  )
}

// column widths measured on 25/26 (first includes the 42px gutter); Status takes the rest
const COLUMN_WIDTHS = ['w-[304px]', 'w-[235px]', 'w-[295px]', 'w-[249px]', 'w-[223px]']

function withWidths<T>(columns: Array<Column<T>>): Array<Column<T>> {
  return columns.map((column, index) => ({
    ...column,
    className: cn('text-text-strong', COLUMN_WIDTHS[index], column.className),
  }))
}

interface PeopleTableProps<T extends Person> {
  /** "Provider" / "Patient": first column header and accessible labels. */
  noun: string
  rows: ReadonlyArray<T>
  /** Columns between Gender and EHR ID … Status. */
  middle: ReadonlyArray<Column<T>>
  /** Columns after EHR ID, before Status. */
  trailing?: ReadonlyArray<Column<T>>
}

/** Providers / Patients table in a full-height card (25, 26). */
export function PeopleTable<T extends Person>({ noun, rows, middle, trailing = [] }: PeopleTableProps<T>) {
  const columns: Array<Column<T>> = withWidths([
    { id: 'name', header: noun, cell: (row) => <PersonCell name={row.name} /> },
    { id: 'gender', header: 'Gender', cell: (row) => (row.gender === 'male' ? 'Male' : 'Female') },
    ...middle,
    {
      id: 'ehrId',
      header: 'EHR ID',
      cell: (row) => <CopyableText value={row.ehrId} label={`EHR ID of ${row.name}`} />,
    },
    ...trailing,
    {
      id: 'status',
      header: 'Status',
      cell: (row) => <StatusSwitch defaultActive={row.status === 'active'} label={`Status of ${row.name}`} />,
    },
  ])

  return (
    <DataTable
      variant="card"
      caption={`${noun}s of this practice`}
      columns={columns}
      rows={rows}
      rowKey={(row) => row.id}
      // design draws a lighter header (#E8F4FF) and spans the card to the page bottom
      className="mt-5 flex-1 [&_thead_tr]:bg-secondary [&_thead_tr]:hover:bg-secondary [&_th]:h-[78px]"
    />
  )
}
