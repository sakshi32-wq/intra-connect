import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui/table'
import { cn } from '#/lib/utils'

export interface Column<T> {
  id: string
  header: React.ReactNode
  cell: (row: T) => React.ReactNode
  className?: string
}

interface DataTableProps<T> {
  columns: ReadonlyArray<Column<T>>
  rows: ReadonlyArray<T>
  rowKey: (row: T) => string
  /** bleed = full-width list page table; card = inside a shadowed card (25, 26, 34). */
  variant?: 'bleed' | 'card'
  caption?: string
  emptyMessage?: string
  className?: string
}

/** Static data table: light-blue 62px header, 70px rows with grey dividers (Connection, Practices …). */
export function DataTable<T>({
  columns,
  rows,
  rowKey,
  variant = 'bleed',
  caption,
  emptyMessage = 'No results.',
  className,
}: DataTableProps<T>) {
  return (
    <div className={cn(variant === 'card' && 'bg-card shadow-card', className)}>
      <Table className="text-lg">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <TableHeader>
          <TableRow className="border-0 bg-table-header hover:bg-table-header">
            {columns.map((column, index) => (
              <TableHead
                key={column.id}
                className={cn(
                  'h-[62px] text-lg font-medium text-foreground',
                  index === 0 && 'pl-gutter',
                  index === columns.length - 1 && 'pr-gutter',
                  column.className,
                )}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-32 text-center text-muted-foreground">
                {emptyMessage}
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow key={rowKey(row)} className="h-[71px] border-b border-input hover:bg-secondary/40">
                {columns.map((column, index) => (
                  <TableCell
                    key={column.id}
                    className={cn(
                      'text-lg text-muted-foreground',
                      index === 0 && 'pl-gutter',
                      index === columns.length - 1 && 'pr-gutter',
                      column.className,
                    )}
                  >
                    {column.cell(row)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
