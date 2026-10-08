import { ChevronRight, CircleCheck } from 'lucide-react'

import { cn } from '#/lib/utils'

interface StepperProps {
  steps: ReadonlyArray<string>
  /** Zero-based index of the current step. */
  current: number
  /** Makes completed steps clickable (going back). */
  onStepClick?: (index: number) => void
  /** Trailing chevron that advances to the next step. */
  onNext?: () => void
  className?: string
}

/**
 * Light-blue step bar used on Overview and every wizard.
 * Completed = check, current = filled number, upcoming = outlined number (SCREEN_MAP Q3).
 */
export function Stepper({ steps, current, onStepClick, onNext, className }: StepperProps) {
  return (
    <nav aria-label="Progress" className={cn('flex h-[78px] items-center bg-secondary px-[23px]', className)}>
      <ol className="flex flex-1 items-center justify-between gap-6">
        {steps.map((label, index) => {
          const state = index < current ? 'complete' : index === current ? 'current' : 'upcoming'
          const content = (
            <>
              {state === 'complete' ? (
                <CircleCheck className="size-6 shrink-0 stroke-[1.5]" aria-hidden />
              ) : (
                <span
                  aria-hidden
                  className={cn(
                    'grid size-6 shrink-0 place-items-center rounded-full border-[1.5px] border-primary text-xs font-semibold',
                    state === 'current' ? 'bg-primary text-primary-foreground' : 'text-primary',
                  )}
                >
                  {index + 1}
                </span>
              )}
              <span>{label}</span>
              <span className="sr-only">
                {state === 'complete' ? '(completed)' : state === 'current' ? '(current step)' : ''}
              </span>
            </>
          )
          return (
            <li key={`${index}-${label}`} aria-current={state === 'current' ? 'step' : undefined}>
              {state === 'complete' && onStepClick ? (
                <button
                  type="button"
                  onClick={() => onStepClick(index)}
                  className="flex items-center gap-[11px] rounded-sm text-lg whitespace-nowrap text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {content}
                </button>
              ) : (
                <span className="flex items-center gap-[11px] text-lg whitespace-nowrap text-primary">{content}</span>
              )}
            </li>
          )
        })}
      </ol>
      {onNext ? (
        <button
          type="button"
          onClick={onNext}
          disabled={current >= steps.length - 1}
          aria-label="Next step"
          className="ml-6 grid size-8 place-items-center rounded-sm text-primary hover:bg-primary/10 focus-visible:outline-2 focus-visible:outline-ring disabled:opacity-40"
        >
          <ChevronRight className="size-6" aria-hidden />
        </button>
      ) : null}
    </nav>
  )
}
