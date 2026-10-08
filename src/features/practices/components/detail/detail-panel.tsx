import { cn } from '#/lib/utils'

interface DetailPanelProps {
  title?: string
  children: React.ReactNode
  /** Lay the children out as two independent columns from lg up (22: identity, address). */
  columns?: 1 | 2
  className?: string
}

/** Grey block grouping one or two DetailLists under an optional heading (22, 28). */
export function DetailPanel({ title, children, columns = 1, className }: DetailPanelProps) {
  return (
    <div className={cn('bg-panel px-[27px] py-[19px]', className)}>
      {title ? <h3 className="mb-4 text-lg font-medium text-foreground">{title}</h3> : null}
      <div className={cn('grid gap-x-12 gap-y-3', columns === 2 && 'lg:grid-cols-2')}>{children}</div>
    </div>
  )
}
