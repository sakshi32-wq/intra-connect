import { useState } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import type { Control } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'

import { Callout } from '#/components/callout'
import { CenteredFormCard } from '#/components/centered-form-card'
import { CopyButton } from '#/components/copy-button'
import { DetailList } from '#/components/detail-list'
import type { DetailItem } from '#/components/detail-list'
import { ehrName } from '#/components/ehr-logo'
import { SelectField, TextField, fieldControlClass } from '#/components/form-fields'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '#/components/ui/form'
import { Input } from '#/components/ui/input'
import { Separator } from '#/components/ui/separator'
import { maskSecret } from '#/features/connections/format'
import { APP_TYPE_LABELS } from '#/features/connections/sample-data'
import type { ConnectionFormValues } from '#/features/connections/schemas'
import { APP_TYPES, EHRS } from '#/features/connections/types'
import { cn } from '#/lib/utils'

const DOCS_URL = 'https://docs.intraconnects.com'

const EHR_OPTIONS = EHRS.map((ehr) => ({ value: ehr, label: ehrName(ehr) }))
const APP_TYPE_OPTIONS = APP_TYPES.map((appType) => ({ value: appType, label: APP_TYPE_LABELS[appType] }))

export type WizardMode = 'add' | 'edit'

function StepHeading({ title, description }: { title: string; description: React.ReactNode }) {
  return (
    <header className="flex flex-col gap-[13px]">
      <h3 className="text-heading font-semibold text-foreground">{title}</h3>
      <div className="flex flex-col gap-[11px] text-md text-muted-foreground">{description}</div>
    </header>
  )
}

/** 58: introduction with three green-dot bullets. */
export function GettingStartedStep({ actions }: { actions: React.ReactNode }) {
  const bullets = [
    'Choose the EHR and the app type of the connection. Make sure the pre-requisite EHR integration process is complete for that EHR.',
    'Fill in the details of your connection required for the process, like the client ID, client secret, scope, audience and nonce.',
    'Confirm all the details you filled in before submitting the form. Editing a connection later can affect the practices that use it, so please check that every detail is correct.',
  ]
  return (
    <div className="flex flex-col">
      <StepHeading title="Getting Started" description="Let’s get started with the journey of adding a new connection" />
      <p className="mt-[37px] text-lg text-text-strong">Follow the few steps given below to create a new connection</p>
      <ul className="mt-[22px] flex max-w-[1170px] flex-col gap-5 text-lg text-text-strong">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex gap-[22px]">
            <span aria-hidden className="mt-[9px] size-[7px] shrink-0 rounded-full bg-success" />
            {bullet}
          </li>
        ))}
      </ul>
      <div className="mt-[52px]">{actions}</div>
    </div>
  )
}

/** 59 / 64: EHR + app type selects in a centred card, with a grey note under the buttons. */
export function ConnectionTypeStep({ mode, actions }: { mode: WizardMode; actions: React.ReactNode }) {
  const { control } = useFormContext<ConnectionFormValues>()
  return (
    <CenteredFormCard
      title={mode === 'add' ? 'Add Connection Type' : 'Edit Connection Type'}
      subtitle={mode === 'add' ? 'Let’s get started with the journey of adding a connection' : 'EHR Name & App Type details'}
      className="gap-[34px] pt-10 pb-12"
    >
      <div className="flex flex-col gap-[26px]">
        <SelectField
          control={control}
          name="ehr"
          label="EHR Name"
          required
          placeholder="Select EHR"
          options={EHR_OPTIONS}
          description="Ex : athenahealth - Select EHR Name to connect"
        />
        <SelectField
          control={control}
          name="appType"
          label="App Type for Connection"
          required
          placeholder="Select App Type"
          options={APP_TYPE_OPTIONS}
          description="Ex : Provider - Select Application Type to Configure"
        />
        <div className="mt-[11px]">{actions}</div>
      </div>
      {mode === 'add' ? (
        <Callout variant="muted" className="flex flex-col gap-[13px] rounded-none py-[18px] text-md">
          <p>
            Pre-requisite link EHR integration :{' '}
            <a
              href={DOCS_URL}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-ring"
            >
              Link<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
          <p>(We consider you have completed the pre-requisite EHR integration process.</p>
          <p>Just in case not, you can complete it in a few steps from the pre-requisite link given above.)</p>
        </Callout>
      ) : (
        <Callout variant="muted" className="rounded-none py-[18px] text-lg">
          <p className="mb-1.5 text-lg font-semibold text-foreground">Note to Remember</p>
          <p>If you are updating the details, please consider that the changes can affect the practices this connection is attached to in future processes.</p>
        </Callout>
      )}
    </CenteredFormCard>
  )
}

function SecretField({ control }: { control: Control<ConnectionFormValues> }) {
  const [visible, setVisible] = useState(false)
  return (
    <FormField
      control={control}
      name="clientSecret"
      render={({ field }) => (
        <FormItem className="gap-[7px]">
          <FormLabel className="text-lg font-semibold text-foreground">Client Secret</FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                type={visible ? 'text' : 'password'}
                placeholder="Enter Client Secret"
                autoComplete="off"
                className={cn(fieldControlClass, 'pr-12')}
                {...field}
              />
            </FormControl>
            <button
              type="button"
              onClick={() => setVisible((value) => !value)}
              aria-label={visible ? 'Hide client secret' : 'Show client secret'}
              aria-pressed={visible}
              className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-sm text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
            >
              {visible ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
            </button>
          </div>
          <FormDescription className="text-md text-muted-foreground">
            The value is your app’s OAuth client secret, must be unique
          </FormDescription>
          <FormMessage className="text-base" />
        </FormItem>
      )}
    />
  )
}

/** 60 / 65: context lines, system-generated Redirect URL and the 8-field grid. */
export function ConnectionDetailsStep({
  mode,
  redirectUrl,
  actions,
}: {
  mode: WizardMode
  redirectUrl: string
  actions: React.ReactNode
}) {
  const { control } = useFormContext<ConnectionFormValues>()
  const [ehr, appType] = useWatch({ control, name: ['ehr', 'appType'] })
  return (
    <div className="flex flex-col">
      <StepHeading
        title={mode === 'add' ? 'Add New Connection Details' : 'Edit Connection Details'}
        description={
          <>
            <p>EHR Name : {ehrName(ehr)}</p>
            <p>Connection App Type : {APP_TYPE_LABELS[appType]}</p>
          </>
        }
      />
      <Separator className="mt-[18px] bg-input" />
      <div className="mt-[20px] flex flex-wrap items-center gap-x-3 gap-y-1 text-lg">
        <span className="font-semibold text-foreground">Redirect URL :</span>
        <span className="break-all text-muted-foreground">{redirectUrl}</span>
        <CopyButton value={redirectUrl} label="redirect URL" />
      </div>
      <div className="mt-[19px] grid gap-x-[92px] gap-y-7 lg:grid-cols-[repeat(2,minmax(0,571px))]">
        <TextField
          control={control}
          name="name"
          label="Name"
          required
          placeholder="Enter Connection Name"
          description="Short name for this connection, must be unique"
        />
        <TextField
          control={control}
          name="clientId"
          label="Client ID"
          required
          placeholder="Client ID"
          description="The value is your app’s OAuth client ID, must be unique"
        />
        <TextField
          control={control}
          name="scope"
          label="Scope"
          required
          placeholder="Enter Scope"
          description="Requested “scopes” for services to access"
        />
        <SecretField control={control} />
        <TextField
          control={control}
          name="audience"
          label="Audience"
          type="url"
          placeholder="Audience"
          description="The target “audience” server URL"
        />
        <TextField
          control={control}
          name="nonce"
          label="Nonce"
          placeholder="Enter Nonce"
          description="Required if requesting the openid scope"
        />
        <TextField
          control={control}
          name="orgRedirectUrl"
          label="Organisation Redirect URL"
          required
          type="url"
          placeholder="Org Redirect URL"
          description="Where your organisation receives the OAuth redirect"
        />
        <TextField
          control={control}
          name="launch"
          label="Launch"
          placeholder="Enter Launch"
          description="Launch context requested from the EHR, if any"
        />
      </div>
      <div className="mt-[30px]">{actions}</div>
    </div>
  )
}

function UrlValue({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="break-all text-primary hover:underline focus-visible:outline-2 focus-visible:outline-ring"
    >
      {href}
    </a>
  )
}

/** 61 / 66: read-only review of every value. */
export function ConnectionSummaryStep({
  mode,
  redirectUrl,
  actions,
}: {
  mode: WizardMode
  redirectUrl: string
  actions: React.ReactNode
}) {
  const { control } = useFormContext<ConnectionFormValues>()
  const values = useWatch({ control })
  const optional = (value: string | undefined) => (value ? value : '—')
  const items: Array<DetailItem> = [
    { label: 'EHR Name', value: values.ehr ? ehrName(values.ehr) : '—' },
    { label: 'App Type', value: values.appType ? APP_TYPE_LABELS[values.appType] : '—' },
    { label: 'Redirect URL', value: <UrlValue href={redirectUrl} /> },
    { label: 'Name', value: optional(values.name) },
    { label: 'Client ID', value: optional(values.clientId) },
    { label: 'Scope', value: optional(values.scope) },
    { label: 'Client Secret', value: maskSecret(values.clientSecret ?? '') },
    { label: 'Audience', value: optional(values.audience) },
    { label: 'Nonce', value: optional(values.nonce) },
    { label: 'Org Redirect URL', value: values.orgRedirectUrl ? <UrlValue href={values.orgRedirectUrl} /> : '—' },
    { label: 'Launch', value: optional(values.launch) },
  ]
  return (
    <div className="flex flex-col">
      <StepHeading
        title={mode === 'add' ? 'New Connection Summary' : 'Connection Summary'}
        description={`Check the summary once before submitting, so that the connection is ${mode === 'add' ? 'created' : 'updated'} correctly.`}
      />
      <DetailList
        variant="plain"
        items={items}
        className="mt-[34px] [&_dd]:text-muted-foreground [&_dl>div]:grid-cols-[minmax(150px,231px)_auto_1fr] [&_dt]:text-foreground"
      />
      <div className="mt-[42px]">{actions}</div>
    </div>
  )
}
