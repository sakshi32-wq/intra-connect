import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { PageHeader } from '#/components/page-header'
import { TablePagination } from '#/components/table-pagination'
import { ConnectionsEmptyState } from '#/features/connections/components/connections-empty-state'
import { ConnectionsTable } from '#/features/connections/components/connections-table'
import { ConnectionsToolbar } from '#/features/connections/components/connections-toolbar'
import type { ConnectionFilters } from '#/features/connections/components/connections-toolbar'
import { sampleConnections } from '#/features/connections/sample-data'

const PAGE_SIZE = 10
const NO_FILTERS: ConnectionFilters = { status: 'all', query: '', appType: 'all' }

export const Route = createFileRoute('/_app/connections/')({
  head: () => ({ meta: [{ title: 'Connections · IntraConnect' }] }),
  component: ConnectionsPage,
})

// Connection, 56, 57 (list + status filter) and 53 (empty). UI-only: filters are local state.
function ConnectionsPage() {
  const [filters, setFilters] = useState<ConnectionFilters>(NO_FILTERS)
  const [page, setPage] = useState(1)

  const query = filters.query.trim().toLowerCase()
  const rows = sampleConnections.filter(
    (connection) =>
      (filters.status === 'all' || connection.status === filters.status) &&
      (filters.appType === 'all' || connection.appType === filters.appType) &&
      (query === '' || connection.name.toLowerCase().includes(query)),
  )
  const pageCount = Math.max(1, Math.ceil(rows.length / PAGE_SIZE))
  const current = Math.min(page, pageCount)
  const from = (current - 1) * PAGE_SIZE
  const pageRows = rows.slice(from, from + PAGE_SIZE)
  const hasConnections = sampleConnections.length > 0

  return (
    <>
      <PageHeader title="Connections" breadcrumbs={[{ label: 'Connections' }]}>
        {hasConnections ? (
          <ConnectionsToolbar
            filters={filters}
            onChange={(next) => {
              setFilters(next)
              setPage(1)
            }}
          />
        ) : null}
      </PageHeader>
      {rows.length === 0 ? (
        <div className="px-gutter pt-[33px] pb-8">
          <section className="bg-card p-[29px] shadow-card">
            <ConnectionsEmptyState filtered={hasConnections} />
          </section>
        </div>
      ) : (
        <div className="flex flex-1 flex-col">
          <ConnectionsTable rows={pageRows} />
          <TablePagination
            page={current}
            pageCount={pageCount}
            onPageChange={setPage}
            summary={{ from: from + 1, to: from + pageRows.length, total: rows.length }}
            className="mt-auto"
          />
        </div>
      )}
    </>
  )
}
