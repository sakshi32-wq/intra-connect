import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { DetailList } from '#/components/detail-list'
import { SectionBar } from '#/components/section-bar'
import { SuccessState } from '#/components/success-state'
import { InviteUserForm, inviteUserSchema } from '#/features/settings/components/invite-user-form'
import type { InviteUserDraft, InviteUserValues } from '#/features/settings/components/invite-user-form'
import { successDetailsClass, successLayoutClass } from '#/features/settings/components/success-layout'
import { ROLE_LABELS } from '#/features/settings/sample-data'

// Frames 18 (form) and 19 (invite sent).
export const Route = createFileRoute('/_app/settings/users/invite')({
  validateSearch: z.object({
    step: z.enum(['form', 'success']).default('form').catch('form'),
    createdId: z.string().optional().catch(undefined),
  }),
  staticData: { crumb: 'Invite New User' },
  head: () => ({ meta: [{ title: 'Invite New User · IntraConnect' }] }),
  component: InviteUserPage,
})

interface Invitation extends InviteUserValues {
  id: string
}

function InviteUserPage() {
  const { step, createdId } = Route.useSearch()
  const navigate = Route.useNavigate()
  const [invitation, setInvitation] = useState<Invitation | null>(null)
  const form = useForm<InviteUserDraft, unknown, InviteUserValues>({
    resolver: zodResolver(inviteUserSchema),
    defaultValues: { name: '', email: '', role: '' },
  })

  // UI-only: the invited user lives in this page's state, so a cold deep link to the
  // success step has nothing to show and falls back to the form (SCREEN_MAP §2.2).
  const sent = step === 'success' && invitation !== null && invitation.id === createdId
  useEffect(() => {
    if (step === 'success' && !sent) void navigate({ search: { step: 'form' }, replace: true })
  }, [step, sent, navigate])

  if (step === 'success') {
    if (!sent) return null
    return (
      <SuccessState
        title="Invite Sent!"
        details={
          <>
            <DetailList
              variant="card"
              className={successDetailsClass}
              items={[
                { label: 'User Name', value: invitation.name },
                { label: 'User Role', value: ROLE_LABELS[invitation.role] },
                { label: 'E-mail', value: invitation.email },
              ]}
            />
            <p className="mt-1.5 max-w-[500px] text-lg text-muted-foreground">
              Once the user accepts the invite, they will be shown as an active user in the list of users.
            </p>
          </>
        }
        action={{ label: 'Redirect to Manage Users', to: '/settings/users' }}
        className={successLayoutClass}
      />
    )
  }

  return (
    <div className="-mx-[23px] pt-[22px]">
      <SectionBar tone="accent" className="pl-[30px] text-heading">
        Invite New User
      </SectionBar>
      <InviteUserForm
        form={form}
        onSubmit={(values) => {
          const id = `inv_${Date.now().toString(36)}`
          setInvitation({ ...values, id })
          void navigate({ search: { step: 'success', createdId: id }, replace: true })
        }}
      />
    </div>
  )
}
