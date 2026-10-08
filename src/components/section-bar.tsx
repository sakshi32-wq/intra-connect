import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import { cn } from '#/lib/utils'

const sectionBarVariants = cva('flex h-[78px] items-center px-[23px] text-lg font-semibold', {
  variants: {
    tone: {
      muted: 'bg-muted text-text-strong',
      accent: 'bg-secondary text-foreground',
    },
  },
  defaultVariants: { tone: 'muted' },
})

/** Full-width 78px title bar (Overview "1. How intraconnects works", Change password, Invite New User). */
export function SectionBar({
  className,
  tone,
  ...props
}: React.ComponentProps<'h2'> & VariantProps<typeof sectionBarVariants>) {
  return <h2 className={cn(sectionBarVariants({ tone }), className)} {...props} />
}
