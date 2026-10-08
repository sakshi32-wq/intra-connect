import { Link } from '@tanstack/react-router'
import type { LinkProps } from '@tanstack/react-router'

import { Card } from '#/components/ui/card'
import { cn } from '#/lib/utils'

/** White 581px card on the auth gradient (frames 1–4): no border or shadow in the design. */
export function AuthCard({ className, ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card
      className={cn('w-[581px] max-w-full gap-0 border-0 px-6 py-0 shadow-none sm:px-[55px]', className)}
      {...props}
    />
  )
}

/** Cyan auth link text with a visible keyboard focus ring. */
export const authLinkClass =
  'rounded-sm text-auth-link hover:underline focus-visible:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'

interface AuthHeaderProps {
  eyebrow?: string
  title: string
  prompt: string
  linkLabel: string
  linkTo: LinkProps['to']
}

export function AuthHeader({ eyebrow, title, prompt, linkLabel, linkTo }: AuthHeaderProps) {
  return (
    <header className="text-center">
      {eyebrow ? <p className="mb-[41px] text-lg text-muted-foreground">{eyebrow}</p> : null}
      <h1 className="text-title font-semibold text-text-strong">{title}</h1>
      <p className="mt-[11px] text-lg text-muted-foreground">
        {prompt}{' '}
        <Link to={linkTo} className={cn('font-semibold', authLinkClass)}>
          {linkLabel}
        </Link>
      </p>
    </header>
  )
}

/** Full-width auth primary button styling (#009AC1, 48px). */
export const authButtonClass =
  'h-12 w-full bg-auth-primary text-lg font-semibold text-white hover:bg-auth-primary/90 [&_svg:not([class*=size-])]:size-5'
