import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { AuthCard, AuthHeader } from '#/features/auth/components/auth-card'
import { ForgotPasswordForm } from '#/features/auth/components/forgot-password-form'
import { ResetLinkSent } from '#/features/auth/components/reset-link-sent'

export const Route = createFileRoute('/_auth/forgot-password')({
  validateSearch: z.object({
    step: z.enum(['request', 'sent']).default('request').catch('request'),
    email: z.email().optional().catch(undefined),
  }),
  head: () => ({ meta: [{ title: 'Forgot Password · IntraConnect' }] }),
  component: ForgotPasswordPage,
})

function ForgotPasswordPage() {
  const { step, email } = Route.useSearch()
  const navigate = Route.useNavigate()

  if (step === 'sent') {
    return (
      <AuthCard className="pt-[61px] pb-[27px]">
        <ResetLinkSent email={email} />
      </AuthCard>
    )
  }

  return (
    <AuthCard className="pt-[77px] pb-[86px]">
      <AuthHeader
        title="Forgot Password"
        prompt="Want to get back?"
        linkLabel="Sign In"
        linkTo="/login"
      />
      <ForgotPasswordForm
        onSent={(sentTo) => void navigate({ search: { step: 'sent', email: sentTo } })}
      />
    </AuthCard>
  )
}
