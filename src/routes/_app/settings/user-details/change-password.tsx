import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { SectionBar } from '#/components/section-bar'
import { SuccessState } from '#/components/success-state'
import { ChangePasswordForm, changePasswordSchema } from '#/features/settings/components/change-password-form'
import type { ChangePasswordValues } from '#/features/settings/components/change-password-form'
import { successLayoutClass } from '#/features/settings/components/success-layout'

// Frames 15 (form) and 20 (updated). The User Details pill stays active (20 draws Manage User).
export const Route = createFileRoute('/_app/settings/user-details/change-password')({
  validateSearch: z.object({
    step: z.enum(['form', 'success']).default('form').catch('form'),
  }),
  staticData: { crumb: 'Change Password' },
  head: () => ({ meta: [{ title: 'Change Password · IntraConnect' }] }),
  component: ChangePasswordPage,
})

function ChangePasswordPage() {
  const { step } = Route.useSearch()
  const navigate = Route.useNavigate()
  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' },
  })

  if (step === 'success') {
    return (
      <SuccessState
        title="Password Updated!"
        description="You can manage your password from User Details."
        action={{ label: 'Redirect to User Details', to: '/settings/user-details' }}
        className={successLayoutClass}
      />
    )
  }

  return (
    <div className="-mx-[23px] pt-[22px]">
      <SectionBar tone="accent" className="pl-[30px]">
        Change password
      </SectionBar>
      <ChangePasswordForm
        form={form}
        onSubmit={() => {
          // never keep passwords around once the change is done
          form.reset()
          void navigate({ search: { step: 'success' }, replace: true })
        }}
      />
    </div>
  )
}
