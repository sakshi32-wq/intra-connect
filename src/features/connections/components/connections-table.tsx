import { Link } from '@tanstack/react-router'
import { Eye, EllipsisVertical, SquarePen } from 'lucide-react'

import { CopyButton, CopyableText } from '#/components/copy-button'
import { DataTable } from '#/components/data-table'
import type { Column } from '#/components/data-table'
import { EhrLogo } from '#/components/ehr-logo'
import { StatusBadge } from '#/components/status-badge'
import { StatusSwitch } from '#/components/status-switch'
import { Button } from '#/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '#/components/ui/tooltip'
import { APP_TYPE_LABELS } from '#/features/connections/sample-data'
import type { Connection, Ehr } from '#/features/connections/types'

// Sizes measured on the Connection frame. Cerner shows only its swirl: crop the wordmark to the left.
const LOGO_CLASS: Record<Ehr, string> = {
  athenahealth: '',
  cerner: 'h-[28px] w-[34px] max-w-none object-cover object-left',
  epic: 'h-5',
  nextgen: 'h-[22px]',
  drchrono: '',
}

function TableEhrLogo({ ehr }: { ehr: Ehr }) {
  if (ehr !== 'athenahealth') return <EhrLogo ehr={ehr} className={LOGO_CLASS[ehr]} />
  // athenahealth shows only its leaf (x 1–16, y 8–25 of the 122×37 wordmark), scaled to ~32px
  return (
    <span className="block h-8 w-[30px] overflow-hidden">
      <EhrLogo ehr={ehr} className="-mt-4 -ml-0.5 h-[72px] max-w-none" />
    </span>
  )
}

// Column widths measured on the Connection frame (header x minus the sidebar, minus the 8px cell padding).
const COLUMNS: ReadonlyArray<Column<Connection>> = [
  {
    id: 'ehr',
    header: 'EHR',
    className: 'w-[204px]',
    cell: (row) => <TableEhrLogo ehr={row.ehr} />,
  },
  {
    id: 'name',
    header: 'ID : Name',
    className: 'w-[321px]',
    cell: (row) => (
      <span className="inline-flex min-w-0 items-center gap-2">
        <CopyButton value={row.id} label={`ID of ${row.name}`} />
        <Link
          to="/connections/$connectionId"
          params={{ connectionId: row.id }}
          className="truncate font-medium text-foreground hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-ring"
        >
          {row.name}
        </Link>
      </span>
    ),
  },
  {
    id: 'clientId',
    header: 'Client ID',
    className: 'w-[208px]',
    cell: (row) => <CopyableText value={row.clientId} label={`client ID of ${row.name}`} />,
  },
  {
    id: 'orgRedirectUrl',
    header: 'Org Redirect URL',
    className: 'w-[265px]',
    cell: (row) => (
      <Tooltip>
        <TooltipTrigger asChild>
          {/* tabIndex lets keyboard users reach the full URL in the tooltip */}
          <span tabIndex={0} className="block max-w-[112px] truncate rounded-sm focus-visible:outline-2 focus-visible:outline-ring">
            {row.orgRedirectUrl}
          </span>
        </TooltipTrigger>
        <TooltipContent>{row.orgRedirectUrl}</TooltipContent>
      </Tooltip>
    ),
  },
  {
    id: 'appType',
    header: 'App Type',
    className: 'w-[198px]',
    cell: (row) => <StatusBadge variant="appType">{APP_TYPE_LABELS[row.appType]}</StatusBadge>,
  },
  {
    id: 'status',
    header: 'Status',
    className: 'w-[187px]',
    cell: (row) => <StatusSwitch defaultActive={row.status === 'active'} label={`Status of ${row.name}`} />,
  },
  {
    id: 'action',
    header: 'Action',
    cell: (row) => <RowActions connection={row} />,
  },
]

function RowActions({ connection }: { connection: Connection }) {
  const params = { connectionId: connection.id }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="ml-1 text-foreground" aria-label={`Actions for ${connection.name}`}>
          <EllipsisVertical className="size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40">
        <DropdownMenuItem asChild className="text-base">
          <Link to="/connections/$connectionId" params={params}>
            <Eye aria-hidden />
            View details
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="text-base">
          <Link to="/connections/$connectionId/edit" params={params} search={{ step: 'type' }}>
            <SquarePen aria-hidden />
            Edit
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function ConnectionsTable({ rows }: { rows: ReadonlyArray<Connection> }) {
  return <DataTable columns={COLUMNS} rows={rows} rowKey={(row) => row.id} caption="Connections" />
}
