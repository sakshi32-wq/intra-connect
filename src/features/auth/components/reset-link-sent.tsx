import { useEffect, useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { toast } from 'sonner'

import { SuccessIcon } from '#/components/success-icon'
import { Button } from '#/components/ui/button'
import { cn } from '#/lib/utils'
import { requestPasswordResetMutation } from '../api'
import { authLinkClass } from './auth-card'

/** Frame 4: confirmation after requesting a reset link. */
export function ResetLinkSent({ email }: { email?: string }) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const resend = useMutation({
    ...requestPasswordResetMutation(),
    onSuccess: () => toast.success('Verification link sent again.'),
    onError: (error) => toast.error(error.message),
  })

  // The form this replaces unmounted with focus inside it; announce the new state.
  useEffect(() => headingRef.current?.focus(), [])

  return (
    <div className="flex flex-col items-center text-center">
      <SuccessIcon />
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="mt-[42px] text-heading font-semibold text-text-strong outline-none"
      >
        Reset password link sent
      </h1>
      <div className="mt-[42px] text-lg">
        {/* frame 4 draws this line in pure black */}
        <p className="text-black [overflow-wrap:anywhere]">
          An email is sent to {email ?? 'your email address'}
        </p>
        <p className="leading-[29px] font-medium text-muted-foreground">
          Please check your mail and click the verification link to reset your password.
        </p>
      </div>
      <p className="mt-[58px] text-lg text-muted-foreground">
        Didn’t receive a verification mail?{' '}
        {/* aria-disabled (not disabled) while pending so keyboard focus stays on the button */}
        <Button
          type="button"
          variant="link"
          disabled={!email}
          aria-disabled={resend.isPending || undefined}
          onClick={() => {
            if (email && !resend.isPending) resend.mutate({ email })
          }}
          className={cn(
            'h-auto p-0 align-baseline text-lg font-medium aria-disabled:cursor-wait aria-disabled:opacity-60',
            authLinkClass,
          )}
        >
          {resend.isPending ? 'Sending…' : 'Resend Link'}
        </Button>
      </p>
      <Link to="/login" className={cn('mt-3 text-base font-medium', authLinkClass)}>
        Back to Sign In
      </Link>
    </div>
  )
}
