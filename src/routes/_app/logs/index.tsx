import { useMemo, useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { SearchX } from 'lucide-react'

import { PageHeader } from '#/components/page-header'
import { TablePagination } from '#/components/table-pagination'
import { Button } from '#/components/ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '#/components/ui/empty'
import { LogCard } from '#/features/logs/components/log-card'
import { LogFlowDiagram } from '#/features/logs/components/log-flow-diagram'
import { LogsFilterSheet } from '#/features/logs/components/logs-filter-sheet'
import { EMPTY_LOG_FILTERS, activeFilterCount, filterLogs } from '#/features/logs/filters'
import type { LogFilters } from '#/features/logs/filters'
import { sampleLogs } from '#/features/logs/sample-data'

const PAGE_SIZE = 5

export const Route = createFileRoute('/_app/logs/')({
  head: () => ({ meta: [{ title: 'Logs · IntraConnect' }] }),
  component: LogsPage,
})

// UI-only mode: filters, page and selection are local state over static sample logs.
function LogsPage() {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filters, setFilters] = useState<LogFilters>(EMPTY_LOG_FILTERS)
  const [page, setPage] = useState(1)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<number | null>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const filtered = useMemo(() => filterLogs(sampleLogs, filters), [filters])
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageLogs = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  // No "nothing selected" state is designed, so the first log on the page is shown by default.
  const selected = pageLogs.find((log) => log.id === selectedId) ?? pageLogs.at(0)
  const filterCount = activeFilterCount(filters)

  const goToPage = (next: number) => {
    setPage(next)
    setSelectedNode(null)
    listRef.current?.scrollTo({ top: 0 })
  }
  const selectLog = (id: string) => {
    setSelectedId(id)
    setSelectedNode(null)
  }
  const applyFilters = (next: LogFilters) => {
    setFilters(next)
    setFiltersOpen(false)
    goToPage(1)
  }

  return (
    <>
      <PageHeader
        title="Logs"
        breadcrumbs={[{ label: 'Logs' }]}
        variant="navy"
        actions={
          <Button className="h-9 px-[29px] text-lg font-semibold" onClick={() => setFiltersOpen(true)}>
            Filters
            {filterCount > 0 ? (
              <span className="-mr-2 grid size-5 place-items-center rounded-full bg-white text-xs text-primary">
                {filterCount}
                <span className="sr-only"> applied</span>
              </span>
            ) : null}
          </Button>
        }
      />

      <div className="flex flex-col gap-10 px-gutter pt-[23px] pb-[29px] 2xl:grid 2xl:h-[calc(100svh-var(--spacing-header))] 2xl:grid-cols-[502px_minmax(0,1fr)] 2xl:gap-[17px]">
        <section aria-labelledby="logs-heading" className="flex min-h-0 flex-col 2xl:-ml-px">
          <div className="flex items-center gap-4 pl-px">
            <h2 id="logs-heading" className="text-lg font-semibold text-foreground">
              Logs
            </h2>
            {filterCount > 0 ? (
              <p className="ml-auto flex items-center gap-3 text-sm text-muted-foreground" aria-live="polite">
                {filtered.length} of {sampleLogs.length} logs
                <Button variant="link" className="h-auto p-0 text-sm" onClick={() => applyFilters(EMPTY_LOG_FILTERS)}>
                  Clear filters
                </Button>
              </p>
            ) : null}
          </div>

          {pageLogs.length > 0 ? (
            <ul
              ref={listRef}
              aria-label="Logs on this page"
              className="mt-4 mr-[25px] ml-px flex h-[640px] min-h-0 flex-col gap-[21px] overflow-y-auto pr-[11px] 2xl:h-auto 2xl:flex-1 [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-[3px] [&::-webkit-scrollbar-thumb]:border-solid [&::-webkit-scrollbar-thumb]:border-strip [&::-webkit-scrollbar-thumb]:bg-scrollbar-thumb [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-strip"
            >
              {pageLogs.map((log) => (
                <li key={log.id}>
                  <LogCard log={log} selected={log.id === selected?.id} onSelect={() => selectLog(log.id)} />
                </li>
              ))}
            </ul>
          ) : (
            <Empty className="mt-4 flex-1 border border-dashed">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <SearchX />
                </EmptyMedia>
                <EmptyTitle>No logs match these filters</EmptyTitle>
                <EmptyDescription>Change or clear the filters to see more logs.</EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button variant="outline" onClick={() => applyFilters(EMPTY_LOG_FILTERS)}>
                  Clear filters
                </Button>
              </EmptyContent>
            </Empty>
          )}

          <TablePagination
            page={page}
            pageCount={pageCount}
            onPageChange={goToPage}
            className="mt-[26px] h-[53px] shrink-0 px-4"
          />
        </section>

        {selected ? (
          <section aria-labelledby="log-detail-heading" className="min-w-0">
            <h2 id="log-detail-heading" className="text-lg font-semibold break-all text-foreground">
              Log ID : <span className="font-normal text-muted-foreground">{selected.id}</span>
            </h2>
            <div className="mt-[22px]">
              <LogFlowDiagram steps={selected.steps} selected={selectedNode} onSelect={setSelectedNode} />
            </div>
          </section>
        ) : null}
      </div>

      <LogsFilterSheet open={filtersOpen} onOpenChange={setFiltersOpen} applied={filters} onApply={applyFilters} />
    </>
  )
}
