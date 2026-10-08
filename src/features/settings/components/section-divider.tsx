import { Separator } from '#/components/ui/separator'
import { cn } from '#/lib/utils'

/** 3px #BFBFBF rule between form sections (Setting y=487–489, 10 y=527–529). */
export function SectionDivider({ className }: { className?: string }) {
  return <Separator className={cn('data-[orientation=horizontal]:h-[3px]', className)} />
}
