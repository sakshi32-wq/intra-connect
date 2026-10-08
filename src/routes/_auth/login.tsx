import { createFileRoute, useRouter } from '@tanstack/react-router'
import { z } from 'zod'

import { AuthCard, AuthHeader } from '#/features/auth/components/auth-card'
import { SignInForm } from '#/features/auth/components/sign-in-form'
import { safeRedirect } from '#/lib/session'

export const Route = createFileRoute('/_auth/login')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(undefined),
  }),
  head: () => ({ meta: [{ title: 'Sign In · IntraConnect' }] }),
  component: LoginPage,
})

function LoginPage() {
  const { redirect } = Route.useSearch()
  const navigate = Route.useNavigate()
  const router = useRouter()

  const goToApp = () => {
    const target = safeRedirect(redirect)
    if (target) router.history.push(target)
    else void navigate({ to: '/overview' })
  }

  return (
    <AuthCard className="pt-[95px] pb-[82px]">
      <AuthHeader
        eyebrow="Welcome Back!"
        title="Sign In"
        prompt="Don’t have an account?"
        linkLabel="Sign Up"
        linkTo="/signup"
      />
      <SignInForm onSignedIn={goToApp} />
    </AuthCard>
  )
}
