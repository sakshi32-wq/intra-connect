import { Link } from '@tanstack/react-router'
import type { LinkProps } from '@tanstack/react-router'

import { SuccessIcon } from '#/components/success-icon'
import { Button } from '#/components/ui/button'
import { cn } from '#/lib/utils'

interface SuccessStateProps {
  title: string
  description?: React.ReactNode
  /** Optional DetailList variant="card" (13, 17, 19). */
  details?: React.ReactNode
  action: { label: string; to: LinkProps['to']; params?: LinkProps['params']; search?: LinkProps['search'] }
  /** 8 draws a dark heading; everywhere else it is green. */
  tone?: 'success' | 'neutral'
  className?: string
}

/** Centred confirmation shown in place of a finished form/wizard (8, 13, 17, 19, 20, 24, 33, 39, 45, 51, 54, 62, 67). */
export function SuccessState({ title, description, details, action, tone = 'success', className }: SuccessStateProps) {
  return (
    <div role="status" className={cn('flex flex-col items-center gap-6 py-16 text-center', className)}>
      <SuccessIcon />
      <h2 className={cn('text-title font-semibold', tone === 'success' ? 'text-success' : 'text-foreground')}>{title}</h2>
      {description ? <div className="max-w-[640px] text-lg text-muted-foreground">{description}</div> : null}
      {details}
      <Button variant="outline" asChild>
        <Link to={action.to} params={action.params} search={action.search}>
          {action.label}
        </Link>
      </Button>
    </div>
  )
}
