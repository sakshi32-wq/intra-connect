import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'

import { AuthCard, AuthHeader } from '#/features/auth/components/auth-card'
import { SignUpForm } from '#/features/auth/components/sign-up-form'

export const Route = createFileRoute('/_auth/signup')({
  head: () => ({ meta: [{ title: 'Sign Up · IntraConnect' }] }),
  component: SignUpPage,
})

function SignUpPage() {
  const navigate = Route.useNavigate()

  return (
    <AuthCard className="pt-[95px] pb-[41px]">
      <AuthHeader
        eyebrow="Welcome !"
        title="Create Account"
        prompt="Already have an account?"
        linkLabel="Sign In"
        linkTo="/login"
      />
      <SignUpForm
        onSignedUp={(email) => {
          toast.success('Account created', { description: `Sign in with ${email} to continue.` })
          void navigate({ to: '/login' })
        }}
      />
    </AuthCard>
  )
}
