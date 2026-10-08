import { useEffect, useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { DetailList } from '#/components/detail-list'
import { FormActions } from '#/components/form-actions'
import { SectionBar } from '#/components/section-bar'
import { Stepper } from '#/components/stepper'
import { SuccessState } from '#/components/success-state'
import { Button } from '#/components/ui/button'
import { formatDateTime } from '#/features/settings/components/format'
import { MfaMethodPicker } from '#/features/settings/components/mfa-method-picker'
import { SecurityKeySetup } from '#/features/settings/components/security-key-setup'
import { successDetailsClass, successLayoutClass } from '#/features/settings/components/success-layout'
import { TotpSetup } from '#/features/settings/components/totp-setup'
import { SAMPLE_MFA_DEVICES } from '#/features/settings/sample-data'
import type { MfaMethod } from '#/features/settings/types'
import { cn } from '#/lib/utils'

// Frames 11 (register), 12 / 16 (set up: app / key) and 13 / 17 (done).
export const Route = createFileRoute('/_app/settings/user-details/mfa')({
  validateSearch: z.object({
    step: z.enum(['register', 'setup', 'success']).default('register').catch('register'),
    method: z.enum(['app', 'key']).optional().catch(undefined),
    deviceId: z.string().optional().catch(undefined),
  }),
  staticData: { crumb: 'Multi-factor Authentication' },
  head: () => ({ meta: [{ title: 'Multi-factor Authentication · IntraConnect' }] }),
  component: MfaPage,
})

const STEPS = ['Register', 'MFA Set Up'] as const

function MfaPage() {
  const { step, method } = Route.useSearch()
  const navigate = Route.useNavigate()
  const [selected, setSelected] = useState<MfaMethod | undefined>(method)

  // Set-up and success need a method; without one, start again at Register (SCREEN_MAP §3).
  const missingMethod = step !== 'register' && !method
  useEffect(() => {
    if (missingMethod) void navigate({ search: { step: 'register' }, replace: true })
  }, [missingMethod, navigate])
  if (missingMethod) return null

  const finish = (chosen: MfaMethod) =>
    void navigate({ search: { step: 'success', method: chosen, deviceId: SAMPLE_MFA_DEVICES[chosen].id }, replace: true })

  if (step === 'success' && method) {
    const device = SAMPLE_MFA_DEVICES[method]
    return (
      <SuccessState
        title="Authentication completed!"
        details={
          <>
            <DetailList
              variant="card"
              className={successDetailsClass}
              items={[
                { label: 'Device Name', value: device.name },
                { label: 'App Name', value: device.appName ?? '-' },
                { label: 'App description', value: device.description },
                { label: 'First Authentication at', value: formatDateTime(device.authenticatedAt) },
              ]}
            />
            <p className="mt-1.5 text-lg text-muted-foreground">You can add more authentication devices for better security.</p>
          </>
        }
        action={{ label: 'Redirect to User Details', to: '/settings/user-details' }}
        className={successLayoutClass}
      />
    )
  }

  return (
    <div className="-mx-[23px] flex flex-col">
      <SectionBar className="text-foreground">Multi-factor Authentication</SectionBar>
      <Stepper
        steps={STEPS}
        current={step === 'register' ? 0 : 1}
        onStepClick={() => void navigate({ search: { step: 'register', method } })}
        className="mt-[13px] px-5 [&>ol]:justify-start [&>ol]:gap-28"
      />
      <section
        aria-label={step === 'register' ? 'Choose an MFA method' : 'Set up your MFA device'}
        className={cn(
          'mt-[25px] ml-[3px] bg-card shadow-[0_6px_10px_rgb(0_0_0/0.12)]',
          step === 'register' ? 'px-[22px] pt-[19px] pb-4' : 'px-[59px] pt-[26px] pb-[42px]',
        )}
      >
        {step === 'register' ? (
          <>
            <MfaMethodPicker value={selected} onChange={setSelected} />
            <FormActions className="mt-[45px]">
              <Button variant="outline" asChild>
                <Link to="/settings/user-details">Cancel</Link>
              </Button>
              <Button
                type="button"
                disabled={!selected}
                onClick={() => selected && void navigate({ search: { step: 'setup', method: selected } })}
              >
                Proceed
              </Button>
            </FormActions>
          </>
        ) : method === 'app' ? (
          <TotpSetup onVerified={() => finish('app')} />
        ) : (
          <SecurityKeySetup onProceed={() => finish('key')} />
        )}
      </section>
    </div>
  )
}
