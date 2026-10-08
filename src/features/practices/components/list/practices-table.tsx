import { Link } from '@tanstack/react-router'
import { SquareArrowOutUpRight } from 'lucide-react'

import { CopyButton } from '#/components/copy-button'
import { DataTable } from '#/components/data-table'
import type { Column } from '#/components/data-table'
import { StatusSwitch } from '#/components/status-switch'
import type { Practice } from '../../types'
import { PracticeRowMenu } from './practice-row-menu'

// Column text starts on the Practices frame: 414 · 694 · 905 · 1081 · 1389 · 1576 · 1763 (cells add 8px left padding).
const columns: ReadonlyArray<Column<Practice>> = [
  {
    id: 'name',
    header: 'ID : Name',
    className: 'w-[314px]',
    cell: (practice) => (
      <span className="inline-flex min-w-0 items-center gap-2">
        <CopyButton value={practice.id} label={`ID of ${practice.name}`} />
        <Link
          to="/practices/$practiceId/profile"
          params={{ practiceId: practice.id }}
          className="truncate font-semibold text-text-strong hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-ring"
        >
          {practice.name}
        </Link>
      </span>
    ),
  },
  {
    id: 'contact',
    header: 'Contact',
    className: 'w-[211px]',
    cell: (practice) => practice.contact,
  },
  {
    id: 'location',
    header: 'Location',
    className: 'w-[176px]',
    cell: (practice) => practice.city,
  },
  {
    id: 'email',
    header: 'Email',
    className: 'w-[308px]',
    cell: (practice) => (
      <span className="block truncate" title={practice.email}>
        {practice.email}
      </span>
    ),
  },
  {
    id: 'website',
    header: 'Website',
    className: 'w-[187px]',
    cell: (practice) =>
      practice.website ? (
        <a
          href={practice.website}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open the website of ${practice.name} in a new tab`}
          className="inline-grid size-8 place-items-center rounded-sm text-text-strong hover:text-primary focus-visible:outline-2 focus-visible:outline-ring"
        >
          <SquareArrowOutUpRight
            className="size-[22px] stroke-[1.75]"
            aria-hidden
          />
        </a>
      ) : (
        '-'
      ),
  },
  {
    id: 'status',
    header: 'Status',
    className: 'w-[187px]',
    cell: (practice) => (
      <StatusSwitch
        defaultActive={practice.status === 'active'}
        label={`Status of ${practice.name}`}
      />
    ),
  },
  {
    id: 'action',
    header: 'Action',
    cell: (practice) => (
      <PracticeRowMenu practiceId={practice.id} practiceName={practice.name} />
    ),
  },
]

export function PracticesTable({
  practices,
}: {
  practices: ReadonlyArray<Practice>
}) {
  return (
    <DataTable
      columns={columns}
      rows={practices}
      rowKey={(practice) => practice.id}
      caption="Practices"
      className="[&_table]:min-w-[1180px] [&_table]:table-fixed"
    />
  )
}
