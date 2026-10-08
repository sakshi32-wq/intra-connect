import { cn } from '#/lib/utils'

export interface DetailItem {
  label: string
  value: React.ReactNode
  required?: boolean
}

interface DetailListProps {
  items: ReadonlyArray<DetailItem>
  title?: string
  /** block = grey panel (detail pages); plain = no background (summaries); card = compact grey card (success screens). */
  variant?: 'block' | 'plain' | 'card'
  columns?: 1 | 2
  className?: string
}

/** "Label : value" rows (frames 22, 28, 35, 61, 63 …). Labels muted, values dark. */
export function DetailList({ items, title, variant = 'block', columns = 1, className }: DetailListProps) {
  return (
    <div
      className={cn(
        variant === 'block' && 'bg-panel px-[27px] py-[19px]',
        variant === 'card' && 'w-[542px] max-w-full rounded-lg bg-panel px-6 py-4',
        className,
      )}
    >
      {title ? <h3 className="mb-3 text-lg font-semibold text-foreground">{title}</h3> : null}
      <dl className={cn('grid gap-x-12 gap-y-3', columns === 2 && 'lg:grid-cols-2')}>
        {items.map((item) => (
          <div key={item.label} className="grid grid-cols-[minmax(150px,246px)_auto_1fr] items-baseline gap-x-[14px]">
            <dt className={cn('text-muted-foreground', variant === 'card' ? 'text-base' : 'text-lg')}>
              {item.label}
              {item.required ? <span className="text-destructive">*</span> : null}
            </dt>
            <span aria-hidden className="text-lg text-foreground">
              :
            </span>
            <dd className={cn('min-w-0 break-words text-foreground', variant === 'card' ? 'text-base' : 'text-lg')}>
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
