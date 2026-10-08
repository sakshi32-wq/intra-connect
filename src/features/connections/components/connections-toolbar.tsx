import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

import { SegmentedFilter } from '#/components/segmented-filter'
import { TableSearch } from '#/components/table-search'
import { Button } from '#/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#/components/ui/select'
import { APP_TYPE_LABELS } from '#/features/connections/sample-data'
import { APP_TYPES } from '#/features/connections/types'
import type { AppType } from '#/features/connections/types'

export type StatusFilter = 'all' | 'active' | 'inactive'
export type AppTypeFilter = AppType | 'all'

export interface ConnectionFilters {
  status: StatusFilter
  query: string
  appType: AppTypeFilter
}

const STATUS_OPTIONS: ReadonlyArray<{ value: StatusFilter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]

interface ConnectionsToolbarProps {
  filters: ConnectionFilters
  onChange: (filters: ConnectionFilters) => void
}

/** Status pills · search · App Type · Add (Connection, 56, 57), shown in the PageHeader's second row. */
export function ConnectionsToolbar({ filters, onChange }: ConnectionsToolbarProps) {
  return (
    // 8px lower than the header's default second row (toolbar at y105 on the Connection frame)
    <div className="mt-2 -mb-2 flex flex-wrap items-center gap-x-[26px] gap-y-3">
      <SegmentedFilter
        label="Filter by status"
        value={filters.status}
        options={STATUS_OPTIONS}
        onChange={(status) => onChange({ ...filters, status })}
      />
      <TableSearch
        placeholder="Search (Ex. TestNextgenPatient)"
        aria-label="Search connections by name"
        value={filters.query}
        onChange={(event) => onChange({ ...filters, query: event.target.value })}
        className="w-[476px] min-w-[220px] flex-1 lg:flex-none"
      />
      <div className="ml-auto flex items-center gap-4">
        <Select
          // '' shows the "App Type" placeholder while no app type is picked
          value={filters.appType === 'all' ? '' : filters.appType}
          onValueChange={(value) => {
            const appType = APP_TYPES.find((candidate) => candidate === value) ?? 'all'
            onChange({ ...filters, appType })
          }}
        >
          <SelectTrigger
            aria-label="Filter by app type"
            className="w-[178px] rounded-sm bg-white px-[15px] text-lg text-foreground shadow-none [&>svg]:size-5"
          >
            <SelectValue placeholder="App Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all" className="text-base">
              All app types
            </SelectItem>
            {APP_TYPES.map((appType) => (
              <SelectItem key={appType} value={appType} className="text-base">
                {APP_TYPE_LABELS[appType]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button asChild className="text-base">
          <Link to="/connections/new" search={{ step: 'getting-started' }}>
            <Plus className="size-5" aria-hidden />
            Add New Connection
          </Link>
        </Button>
      </div>
    </div>
  )
}
