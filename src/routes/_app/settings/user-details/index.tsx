import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { toast } from 'sonner'

import { MfaSection } from '#/features/settings/components/mfa-section'
import { PasswordSection } from '#/features/settings/components/password-section'
import { SectionDivider } from '#/features/settings/components/section-divider'
import { UserProfileForm } from '#/features/settings/components/user-profile-form'
import { SAMPLE_CURRENT_USER, SAMPLE_MFA_DEVICES } from '#/features/settings/sample-data'
import type { MfaDevice } from '#/features/settings/types'

// Frames 14 (two MFA devices) and 10 (none: shown once both are deleted).
export const Route = createFileRoute('/_app/settings/user-details/')({
  head: () => ({ meta: [{ title: 'User Details · IntraConnect' }] }),
  component: UserDetailsPage,
})

function UserDetailsPage() {
  const [devices, setDevices] = useState<ReadonlyArray<MfaDevice>>(() => Object.values(SAMPLE_MFA_DEVICES))

  return (
    <div className="flex flex-col pt-[22px]">
      <UserProfileForm user={SAMPLE_CURRENT_USER} />
      <SectionDivider className="mt-[25px] mb-[41px]" />
      <MfaSection
        devices={devices}
        onDelete={(device) => {
          setDevices((current) => current.filter((item) => item.id !== device.id))
          toast.success(`${device.name} removed`)
        }}
      />
      <SectionDivider className="mt-[25px] mb-[43px]" />
      <PasswordSection updatedAt={SAMPLE_CURRENT_USER.passwordUpdatedAt} />
    </div>
  )
}
