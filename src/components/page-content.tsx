import { cn } from '#/lib/utils'

/** Page body under the header: 42px side gutter, 13px below the header (TOKENS layout). */
export function PageContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex flex-1 flex-col px-gutter pt-[13px] pb-8', className)} {...props} />
}
