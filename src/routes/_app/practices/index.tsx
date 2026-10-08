import { useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

import { PageContent } from '#/components/page-content'
import { PageHeader } from '#/components/page-header'
import { TablePagination } from '#/components/table-pagination'
import { TableSearch } from '#/components/table-search'
import { Button } from '#/components/ui/button'
import { PracticesEmptyState } from '#/features/practices/components/list/practices-empty-state'
import { PracticesTable } from '#/features/practices/components/list/practices-table'
import {
  SAMPLE_PRACTICE_TOTAL,
  samplePractices,
} from '#/features/practices/sample-data'

export const Route = createFileRoute('/_app/practices/')({
  head: () => ({ meta: [{ title: 'Practices · IntraConnect' }] }),
  component: PracticesPage,
})

const PAGE_SIZE = 10

// Frames Practices (list), Frame 2 (row menu) and 52 (empty). UI only: search and paging are local state.
function PracticesPage() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const term = query.trim().toLowerCase()
  const rows = term
    ? samplePractices.filter((practice) =>
        [practice.name, practice.email, practice.city, practice.contact].some(
          (value) => value.toLowerCase().includes(term),
        ),
      )
    : samplePractices
  // The sample rows stand in for every page of the unfiltered list ("Showing 1 to 10 of 100 Entries").
  const total = term ? rows.length : SAMPLE_PRACTICE_TOTAL
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const from = (page - 1) * PAGE_SIZE + 1

  return (
    <>
      <PageHeader title="Practices" breadcrumbs={[{ label: 'Practices' }]}>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-px">
          <TableSearch
            placeholder="Search ( Ex. Pace Hospital)"
            aria-label="Search practices"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setPage(1)
            }}
          />
          <Button asChild className="-mr-[3px]">
            <Link to="/practices/new">
              <Plus className="size-5" aria-hidden />
              Add New Practice
            </Link>
          </Button>
        </div>
      </PageHeader>
      {rows.length === 0 ? (
        <PageContent>
          <section
            aria-label="No practices"
            className="bg-card px-[29px] pt-[17px] pb-[60px] shadow-card"
          >
            <PracticesEmptyState
              banner={
                term
                  ? `No practice matches “${query.trim()}”.`
                  : 'No practice is added yet!'
              }
            />
          </section>
        </PageContent>
      ) : (
        <div className="min-w-0">
          <PracticesTable practices={rows} />
          <TablePagination
            page={page}
            pageCount={pageCount}
            onPageChange={setPage}
            summary={{ from, to: Math.min(from + PAGE_SIZE - 1, total), total }}
          />
        </div>
      )}
    </>
  )
}
