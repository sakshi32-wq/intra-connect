import { Plus } from 'lucide-react'

import { Callout } from '#/components/callout'
import { Button } from '#/components/ui/button'
import { cn } from '#/lib/utils'

export interface FollowStep {
  title: string
  body: React.ReactNode
}

interface OnboardingEmptyStateProps {
  banner: string
  illustration: { src: string; alt: string }
  body: React.ReactNode
  action: { label: string; onClick?: () => void; render?: React.ReactElement }
  steps: ReadonlyArray<FollowStep>
  stepsIntro?: string
  /** Index of the highlighted step (filled circle). */
  currentStep?: number
}

/** Info banner + illustration card + "Steps to Follow" (27, 46, 52, 53). */
export function OnboardingEmptyState({
  banner,
  illustration,
  body,
  action,
  steps,
  stepsIntro = 'You can add new practice through the following steps.',
  currentStep = 0,
}: OnboardingEmptyStateProps) {
  return (
    <div className="flex flex-col gap-[22px]">
      <Callout title={banner} />
      <div className="grid gap-[22px] lg:grid-cols-2">
        <section className="flex flex-col items-center gap-5 bg-card px-10 py-8 text-center shadow-tile">
          <img src={illustration.src} alt={illustration.alt} className="h-[260px] w-auto object-contain" />
          <div className="flex flex-col gap-3 text-lg text-text-strong">{body}</div>
          {action.render ?? (
            <Button onClick={action.onClick}>
              <Plus aria-hidden />
              {action.label}
            </Button>
          )}
        </section>
        <section aria-labelledby="steps-heading" className="bg-secondary px-10 py-8">
          <h2 id="steps-heading" className="text-title font-medium text-foreground">
            Steps to Follow
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">{stepsIntro}</p>
          <ol className="mt-6 flex flex-col">
            {steps.map((step, index) => (
              <li key={step.title} className="relative flex gap-4 pb-6 last:pb-0">
                {index < steps.length - 1 ? (
                  <span aria-hidden className="absolute top-7 bottom-1 left-[11px] w-px bg-input" />
                ) : null}
                <span
                  aria-hidden
                  className={cn(
                    'z-10 grid size-6 shrink-0 place-items-center rounded-full border-[1.5px] border-primary text-xs font-semibold',
                    index === currentStep ? 'bg-primary text-primary-foreground' : 'bg-secondary text-primary',
                  )}
                >
                  {index + 1}
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-lg font-semibold text-primary">{step.title}</h3>
                  <div className="text-base text-text-strong">{step.body}</div>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  )
}
