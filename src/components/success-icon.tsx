import { Check } from 'lucide-react'

/**
 * Green filled circle with a white check (136px, auth frame 4).
 * The 94px in-app variant is added with the first app success screen.
 */
export function SuccessIcon() {
  return (
    <span
      aria-hidden
      // lucide's check spans 2/3 of its box; 116px makes the mark span ~57% of the circle
      className="inline-grid size-[136px] shrink-0 place-items-center rounded-full bg-success text-success-foreground [&>svg]:size-[116px]"
    >
      <Check strokeWidth={2.4} />
    </span>
  )
}
