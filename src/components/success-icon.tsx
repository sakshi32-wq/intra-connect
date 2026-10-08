import { Check } from 'lucide-react'

import { cn } from '#/lib/utils'

/** Green filled circle with a white check: 94px in the app, 136px on auth (frame 4). */
export function SuccessIcon({ size = 'md' }: { size?: 'md' | 'lg' }) {
  return (
    <span
      aria-hidden
      // lucide's check spans 2/3 of its box; size it so the mark spans ~57% of the circle
      className={cn(
        'inline-grid shrink-0 place-items-center rounded-full bg-success text-success-foreground',
        size === 'lg' ? 'size-[136px] [&>svg]:size-[116px]' : 'size-[94px] [&>svg]:size-[80px]',
      )}
    >
      <Check strokeWidth={2.4} />
    </span>
  )
}
