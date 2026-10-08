import { ContentCard } from '#/components/content-card'
import { Stepper } from '#/components/stepper'

interface WizardCardProps {
  title: string
  steps: ReadonlyArray<string>
  current: number
  children: React.ReactNode
  className?: string
}

/** Grey-header card + step bar + body, shared by every wizard (29–32, 36–38, 42–44, 47–50, 58–61, 64–66). */
export function WizardCard({ title, steps, current, children, className }: WizardCardProps) {
  return (
    <ContentCard title={title} tone="muted" className={className}>
      <Stepper steps={steps} current={current} className="mt-[13px] px-[13px]" />
      <div className="px-12 pt-[18px] pb-[26px]">{children}</div>
    </ContentCard>
  )
}
