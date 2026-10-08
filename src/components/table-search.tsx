import { Search } from 'lucide-react'

import { cn } from '#/lib/utils'

/** Underline-style search field (Practices, Connection toolbars). */
export function TableSearch({ className, ...props }: Omit<React.ComponentProps<'input'>, 'type'>) {
  return (
    <label className={cn('flex h-9 w-[479px] max-w-full items-center gap-4 border-b border-input px-4', className)}>
      <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden />
      <span className="sr-only">Search</span>
      <input
        type="search"
        className="h-full min-w-0 flex-1 bg-transparent text-lg text-foreground outline-none placeholder:text-muted-foreground"
        {...props}
      />
    </label>
  )
}
