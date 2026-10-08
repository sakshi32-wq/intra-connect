import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import type { Control, FieldPath } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { FormActions } from '#/components/form-actions'
import { Button } from '#/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '#/components/ui/form'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '#/components/ui/input-otp'
import { useCopyToClipboard } from '#/hooks/use-copy-to-clipboard'
import { SAMPLE_TOTP_SECRET } from '../sample-data'
import { QrPlaceholder } from './qr-placeholder'

const code = z.string().regex(/^\d{6}$/, 'Enter the 6-digit code from your app.')
const totpSchema = z
  .object({ code1: code, code2: code })
  .refine((values) => values.code1 !== values.code2, {
    path: ['code2'],
    message: 'Wait for the next code; it must differ from the first one.',
  })
type TotpValues = z.infer<typeof totpSchema>

const linkClass = 'text-primary hover:underline focus-visible:outline-2 focus-visible:outline-ring'

function CopySecretButton() {
  const { copied, copy } = useCopyToClipboard()
  return (
    <button
      type="button"
      className={linkClass}
      onClick={async () => {
        if (await copy(SAMPLE_TOTP_SECRET)) toast.success('Secret key copied')
        else toast.error('Could not copy to the clipboard')
      }}
    >
      {copied ? 'Copied' : 'Copy Secret key'}
    </button>
  )
}

function CodeField({ name, label, control }: { name: FieldPath<TotpValues>; label: string; control: Control<TotpValues> }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="gap-[7px]">
          <FormLabel className="text-base font-medium text-text-strong">{label}</FormLabel>
          <FormControl>
            <InputOTP maxLength={6} inputMode="numeric" pattern="^[0-9]*$" autoComplete="one-time-code" {...field}>
              <InputOTPGroup>
                {Array.from({ length: 6 }, (_, index) => (
                  <InputOTPSlot key={index} index={index} className="h-[42px] w-[46px] text-md" />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </FormControl>
          <FormMessage className="text-base" />
        </FormItem>
      )}
    />
  )
}

/** Frame 12: authenticator-app set-up. Cancel / Verify are added (missing in the design). */
export function TotpSetup({ onVerified }: { onVerified: () => void }) {
  const form = useForm<TotpValues>({ resolver: zodResolver(totpSchema), defaultValues: { code1: '', code2: '' } })

  return (
    <Form {...form}>
      <form noValidate onSubmit={form.handleSubmit(onVerified)} className="flex flex-col">
        <h3 className="text-heading font-semibold text-foreground">Set up virtual MFA device</h3>
        <p className="mt-[19px] text-md text-muted-foreground">Follow the steps given below to virtually set the MFA device up</p>
        <ol className="mt-[19px] flex list-decimal flex-col gap-[25px] pl-[30px] text-lg font-medium text-foreground marker:font-medium">
          <li className="pl-0.5">
            Install the compatible app on your device or computer
            <p className="mt-2 text-md font-normal text-muted-foreground">
              The app can be{' '}
              <a href="https://support.google.com/accounts/answer/1066447" target="_blank" rel="noreferrer" className={linkClass}>
                Google Authenticator
              </a>{' '}
              or any other app of your choice on your device, like these{' '}
              <a href="#" className={linkClass}>
                List of authenticator apps.
              </a>
            </p>
          </li>
          <li className="pl-0.5">
            Use your virtual MFA app &amp; device’s camera to scan the QR code
            <p className="mt-2 text-md font-normal text-muted-foreground">
              Scan the QR code by an app installed on your mobile device or a computer
            </p>
            <div className="mt-[18px] grid h-[210px] w-[220px] place-items-center bg-white text-black shadow-tile">
              <QrPlaceholder seed={SAMPLE_TOTP_SECRET} label="QR code for your authenticator app (sample)" />
            </div>
            <p className="mt-[18px] text-md font-normal text-muted-foreground">
              Alternatively, you can type the secret key, <CopySecretButton />
            </p>
          </li>
          <li className="pl-0.5">
            Type two consecutive MFA codes below
            <div className="mt-2.5 flex flex-col gap-4 font-normal">
              <CodeField control={form.control} name="code1" label="MFA code 1" />
              <CodeField control={form.control} name="code2" label="MFA code 2" />
            </div>
          </li>
        </ol>
        <FormActions className="mt-10">
          <Button variant="outline" asChild>
            <Link to="/settings/user-details">Cancel</Link>
          </Button>
          <Button type="submit">Verify</Button>
        </FormActions>
      </form>
    </Form>
  )
}
