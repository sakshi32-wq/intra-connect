import { useId } from 'react'
import { KeyRound, ServerCog } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { RadioGroup, RadioGroupItem } from '#/components/ui/radio-group'
import type { MfaMethod } from '../types'

const METHODS: ReadonlyArray<{ value: MfaMethod; title: string; description: string; icon: LucideIcon }> = [
  {
    value: 'app',
    title: 'Authenticator App',
    description: 'Authenticate through the code generation by an app installed on your mobile device or a computer',
    icon: ServerCog,
  },
  {
    value: 'key',
    title: 'Security Key',
    description: 'Authenticate by touching the hardware security key such as YubiKey, Feitian, etc',
    icon: KeyRound,
  },
]

/** Frame 11: intro card + two radio cards. Nothing is selected until the user picks a method. */
export function MfaMethodPicker({ value, onChange }: { value: MfaMethod | undefined; onChange: (method: MfaMethod) => void }) {
  const promptId = useId()
  return (
    <div className="flex flex-col">
      <section className="bg-card px-[37px] pt-[22px] pb-[21px] shadow-[0_0_10px_rgb(0_0_0/0.12)]">
        <h3 className="text-heading font-semibold text-foreground">Register for MFA</h3>
        <p className="mt-[17px] text-md text-muted-foreground">
          You can register an MFA device to provide a secondary means of verifying your identity, in addition to your
          password.
        </p>
        <a
          href="#"
          className="mt-2 inline-block text-base text-primary hover:underline focus-visible:outline-2 focus-visible:outline-ring"
        >
          Learn More
        </a>
      </section>

      <p id={promptId} className="mt-[57px] mb-[21px] pl-[37px] text-md text-muted-foreground">
        Select one option below to authenticate
      </p>
      <RadioGroup
        aria-labelledby={promptId}
        value={value ?? ''}
        onValueChange={(next) => onChange(next === 'key' ? 'key' : 'app')}
        className="gap-[22px]"
      >
        {METHODS.map((method) => {
          const id = `mfa-method-${method.value}`
          const Icon = method.icon
          return (
            <label
              key={method.value}
              htmlFor={id}
              className="flex min-h-[127px] cursor-pointer items-center gap-[27px] bg-card px-[37px] py-4 shadow-[0_0_10px_rgb(0_0_0/0.12)] transition-shadow has-[[data-state=checked]]:ring-2 has-[[data-state=checked]]:ring-primary"
            >
              <RadioGroupItem id={id} value={method.value} className="size-5 border-muted-foreground" />
              <span aria-hidden className="grid h-[94px] w-[63px] shrink-0 place-items-center bg-muted text-text-strong">
                <Icon className="size-9 stroke-[1.5]" />
              </span>
              <span className="flex flex-col gap-[13px]">
                <span className="text-heading font-medium text-foreground">{method.title}</span>
                <span className="text-md text-muted-foreground">{method.description}</span>
              </span>
            </label>
          )
        })}
      </RadioGroup>
    </div>
  )
}
