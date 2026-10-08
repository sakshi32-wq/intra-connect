import { cn } from '#/lib/utils'

/** Left-aligned button pair under forms and wizard steps (outline first, primary second). */
export function FormActions({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('flex flex-wrap items-center gap-[22px]', className)} {...props} />
}
