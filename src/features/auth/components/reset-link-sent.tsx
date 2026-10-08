import { useMutation } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { toast } from 'sonner'

import { SuccessIcon } from '#/components/success-icon'
import { requestPasswordResetMutation } from '../api'

/** Frame 4: confirmation after requesting a reset link. */
export function ResetLinkSent({ email }: { email?: string }) {
  const resend = useMutation({
    ...requestPasswordResetMutation(),
    onSuccess: () => toast.success('Verification link sent again.'),
    onError: (error) => toast.error(error.message),
  })

  return (
    <div className="flex flex-col items-center text-center">
      <SuccessIcon size="lg" />
      <h1 className="mt-[42px] text-heading font-semibold text-text-strong">
        Reset password link sent
      </h1>
      <div className="mt-[42px] text-lg">
        <p className="text-black [overflow-wrap:anywhere]">
          An email is sent to {email ?? 'your email address'}
        </p>
        <p className="leading-[29px] font-medium text-muted-foreground">
          Please check your mail and click the verification link to reset your password.
        </p>
      </div>
      <p className="mt-[58px] text-lg text-muted-foreground">
        Didn’t receive a verification mail?{' '}
        <button
          type="button"
          disabled={!email || resend.isPending}
          onClick={() => email && resend.mutate({ email })}
          className="font-medium text-auth-link hover:underline disabled:opacity-60"
        >
          {resend.isPending ? 'Sending…' : 'Resend Link'}
        </button>
      </p>
      <Link to="/login" className="mt-3 text-base font-medium text-auth-link hover:underline">
        Back to Sign In
      </Link>
    </div>
  )
}
