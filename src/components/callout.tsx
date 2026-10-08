import { Info } from 'lucide-react'

import { cn } from '#/lib/utils'

interface CalloutProps extends Omit<React.ComponentProps<'div'>, 'title'> {
  /** info = white bordered banner with an info icon (27, 46, 52, 53); muted = grey note (38, 44, 59, 64). */
  variant?: 'info' | 'muted'
  title?: React.ReactNode
}

export function Callout({ variant = 'info', title, className, children, ...props }: CalloutProps) {
  if (variant === 'info') {
    return (
      <div
        role="note"
        className={cn('flex min-h-[62px] items-center gap-3 border border-input bg-white px-5 text-lg text-text-strong', className)}
        {...props}
      >
        <Info className="size-6 shrink-0 fill-primary text-white" aria-hidden />
        <div>{title ?? children}</div>
      </div>
    )
  }
  return (
    <div role="note" className={cn('rounded-lg bg-muted px-5 py-4 text-base text-muted-foreground', className)} {...props}>
      {title ? <p className="mb-1 font-semibold text-primary">{title}</p> : null}
      {children}
    </div>
  )
}
