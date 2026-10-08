import { ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from '#/lib/utils'

interface TablePaginationProps {
  page: number
  pageCount: number
  onPageChange: (page: number) => void
  /** "Showing 1 to 10 of 100 Entries"; omitted under the Logs list. */
  summary?: { from: number; to: number; total: number }
  className?: string
}

function pageWindow(page: number, pageCount: number): Array<number | 'gap'> {
  if (pageCount <= 5) return Array.from({ length: pageCount }, (_, index) => index + 1)
  const pages = new Set([1, pageCount, page - 1, page, page + 1].filter((p) => p >= 1 && p <= pageCount))
  const sorted = [...pages].sort((a, b) => a - b)
  return sorted.flatMap((p, index) => (index > 0 && p - sorted[index - 1] > 1 ? ['gap' as const, p] : [p]))
}

/** Light-blue 70px pager strip (Connection, Practices, Logs 1). */
export function TablePagination({ page, pageCount, onPageChange, summary, className }: TablePaginationProps) {
  const box =
    'grid size-[26px] place-items-center rounded-[2px] border border-input bg-white text-foreground disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-ring'
  return (
    <nav
      aria-label="Pagination"
      className={cn('flex h-[70px] items-center justify-between gap-4 bg-secondary px-gutter', className)}
    >
      <p className="text-lg text-muted-foreground">
        {summary ? `Showing ${summary.from} to ${summary.to} of ${summary.total} Entries` : null}
      </p>
      <div className="flex items-center gap-[22px] text-sm text-text-strong">
        <button type="button" className={box} disabled={page <= 1} onClick={() => onPageChange(page - 1)} aria-label="Previous page">
          <ChevronLeft className="size-4" />
        </button>
        <ol className="flex items-center gap-[22px]">
          {pageWindow(page, pageCount).map((item, index) =>
            item === 'gap' ? (
              <li key={`gap-${index}`} aria-hidden className="-mx-3 tracking-widest">
                ……
              </li>
            ) : (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => onPageChange(item)}
                  aria-current={item === page ? 'page' : undefined}
                  aria-label={`Page ${item}`}
                  className={cn(
                    'grid size-[22px] place-items-center rounded-[2px] focus-visible:outline-2 focus-visible:outline-ring',
                    item === page ? 'bg-primary text-primary-foreground' : 'hover:bg-white',
                  )}
                >
                  {item}
                </button>
              </li>
            ),
          )}
        </ol>
        <button
          type="button"
          className={box}
          disabled={page >= pageCount}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </nav>
  )
}
