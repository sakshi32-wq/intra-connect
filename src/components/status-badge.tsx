import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { ShieldCheck } from 'lucide-react'

import { cn } from '#/lib/utils'

const statusBadgeVariants = cva(
  'inline-flex h-[30px] items-center justify-center gap-1.5 rounded-[2px] border px-3 text-base whitespace-nowrap',
  {
    variants: {
      variant: {
        success: 'border-success bg-success-tint text-success',
        verified: 'border-success bg-success-tint text-success',
        muted: 'border-transparent bg-neutral-badge text-foreground',
        inactive: 'border-inactive-badge-border bg-inactive-badge text-foreground',
        neutral: 'border-input bg-white text-foreground',
        appType: 'w-[104px] border-input bg-white text-muted-foreground',
        chip: 'border-primary bg-white text-primary',
      },
    },
    defaultVariants: { variant: 'neutral' },
  },
)

/** Rectangular status badges (frames 9, 22, 34, Connection). */
export function StatusBadge({
  className,
  variant,
  children,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof statusBadgeVariants>) {
  return (
    <span className={cn(statusBadgeVariants({ variant }), className)} {...props}>
      {variant === 'verified' ? <ShieldCheck className="size-4" aria-hidden /> : null}
      {children}
    </span>
  )
}
