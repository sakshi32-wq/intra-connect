import { useEffect, useId } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { useForm, useFormContext, useWatch } from 'react-hook-form'
import type { Control, FieldPath } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { DetailList } from '#/components/detail-list'
import type { DetailItem } from '#/components/detail-list'
import { EhrLogo, ehrName } from '#/components/ehr-logo'
import { FormActions } from '#/components/form-actions'
import { TextField, fieldControlClass } from '#/components/form-fields'
import { WizardCard } from '#/components/wizard-card'
import { Button } from '#/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '#/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#/components/ui/select'
import { Switch } from '#/components/ui/switch'
import { EHRS } from '#/features/connections/types'
import type { Ehr } from '#/features/connections/types'
import { samplePracticeConnection } from '#/features/practices/sample-data'
import type { Practice } from '#/features/practices/types'
import { cn } from '#/lib/utils'
import { DetailSuccess } from './detail-success'
import { MultiLine, appTypeLines } from './practice-connection-view'
import { CONNECTION_OPTIONS } from './sample-lookup'

export const PRACTICE_CONNECTION_STEPS = ['ehr', 'app-types', 'practice-id', 'summary', 'success'] as const
export type PracticeConnectionStep = (typeof PRACTICE_CONNECTION_STEPS)[number]

const STEP_LABELS = ['EHR Name', 'EHR Type', 'Practice ID', 'Summary']

const wizardSchema = z
  .object({
    ehr: z.string(),
    patientEnabled: z.boolean(),
    patientConnection: z.string(),
    providerEnabled: z.boolean(),
    providerConnection: z.string(),
    ehrPracticeId: z.string(),
  })
  // every rule lives here so each step can validate its own fields independently
  .superRefine((values, ctx) => {
    if (!(EHRS as ReadonlyArray<string>).includes(values.ehr)) {
      ctx.addIssue({ code: 'custom', path: ['ehr'], message: 'Select an EHR' })
    }
    if (!values.patientEnabled && !values.providerEnabled) {
      ctx.addIssue({ code: 'custom', path: ['patientEnabled'], message: 'Enable at least one app type' })
    }
    if (values.patientEnabled && !values.patientConnection) {
      ctx.addIssue({ code: 'custom', path: ['patientConnection'], message: 'Select the patient connection' })
    }
    if (values.providerEnabled && !values.providerConnection) {
      ctx.addIssue({ code: 'custom', path: ['providerConnection'], message: 'Select the provider connection' })
    }
    if (!values.ehrPracticeId.trim()) {
      ctx.addIssue({ code: 'custom', path: ['ehrPracticeId'], message: 'Practice ID is required' })
    }
  })

type WizardValues = z.infer<typeof wizardSchema>

const STEP_FIELDS: Record<'ehr' | 'app-types' | 'practice-id', Array<FieldPath<WizardValues>>> = {
  ehr: ['ehr'],
  'app-types': ['patientEnabled', 'patientConnection', 'providerEnabled', 'providerConnection'],
  'practice-id': ['ehrPracticeId'],
}

const EMPTY_VALUES: WizardValues = {
  ehr: '',
  patientEnabled: true,
  patientConnection: '',
  providerEnabled: false,
  providerConnection: '',
  ehrPracticeId: '',
}

function editDefaults(): WizardValues {
  const { ehr, appTypes, ehrPracticeId } = samplePracticeConnection
  return {
    ehr,
    patientEnabled: Boolean(appTypes.patient),
    patientConnection: appTypes.patient ?? '',
    providerEnabled: Boolean(appTypes.provider),
    providerConnection: appTypes.provider ?? '',
    ehrPracticeId,
  }
}

const COPY = {
  attach: {
    card: 'Attach Connection',
    ehr: 'Add EHR of connection',
    appTypes: 'Add EHR Type',
    practiceId: 'Add Practice ID',
    submit: 'Attach Connection',
    success: 'Connection Attached Successfully',
  },
  edit: {
    card: 'Edit Connection Details',
    ehr: 'Edit EHR of connection',
    appTypes: 'Edit EHR Type',
    practiceId: 'Edit Practice ID',
    submit: 'Update Connection',
    success: 'Connection Updated Successfully',
  },
} as const

interface PracticeConnectionWizardProps {
  mode: 'attach' | 'edit'
  practice: Practice
  step: PracticeConnectionStep
  onStepChange: (step: PracticeConnectionStep, options?: { replace?: boolean }) => void
}

/** Attach / edit the practice's EHR connection: EHR Name · EHR Type · Practice ID · Summary (29–33, 47–51). */
export function PracticeConnectionWizard({ mode, practice, step, onStepChange }: PracticeConnectionWizardProps) {
  const copy = COPY[mode]
  const form = useForm<WizardValues>({
    resolver: zodResolver(wizardSchema),
    mode: 'onTouched',
    defaultValues: mode === 'edit' ? editDefaults() : EMPTY_VALUES,
  })
  const values = useWatch({ control: form.control })
  const blankAttach = mode === 'attach' && !form.getValues('ehr')
  const lostState = blankAttach && step !== 'ehr' && step !== 'success'

  // later steps opened without the earlier answers (deep link / refresh) start over
  useEffect(() => {
    if (lostState) onStepChange('ehr', { replace: true })
  }, [lostState, onStepChange])

  if (step === 'success') {
    return (
      <DetailSuccess
        title={copy.success}
        description="You will receive the connection details on your registered e-mail ID."
        action={{
          label: 'Redirect to Connection Details',
          to: '/practices/$practiceId/connection',
          params: { practiceId: practice.id },
        }}
      />
    )
  }
  if (lostState) return null

  const index = PRACTICE_CONNECTION_STEPS.indexOf(step)
  const previous = index > 0 ? PRACTICE_CONNECTION_STEPS[index - 1] : null

  async function next() {
    if (step === 'summary' || step === 'success') return
    if (await form.trigger(STEP_FIELDS[step])) onStepChange(PRACTICE_CONNECTION_STEPS[index + 1])
  }

  const submit = form.handleSubmit(() => {
    toast.success(copy.success)
    onStepChange('success', { replace: true })
  })

  const ehr = (EHRS as ReadonlyArray<string>).includes(values.ehr ?? '') ? (values.ehr as Ehr) : null
  const summaryItems: Array<DetailItem> = [
    { label: 'Practice Name', value: practice.name },
    { label: 'Practice E-mail', value: practice.email },
    { label: 'Customer ID', value: practice.customerId },
  ]
  if (index >= 1 && ehr) summaryItems.push({ label: 'EHR Name', value: ehrName(ehr) })
  if (index >= 2) {
    const lines = appTypeLines({
      patient: values.patientEnabled ? values.patientConnection : undefined,
      provider: values.providerEnabled ? values.providerConnection : undefined,
    })
    summaryItems.push({ label: 'EHR Type', value: <MultiLine lines={lines} /> })
  }
  if (index >= 3) summaryItems.push({ label: 'Practice ID', value: values.ehrPracticeId })

  const heading = {
    ehr: { title: copy.ehr, subtitle: 'Select the EHR whose connection this practice uses.' },
    'app-types': { title: copy.appTypes, subtitle: null },
    'practice-id': { title: copy.practiceId, subtitle: 'Add the practice ID this connection uses in the EHR.' },
    summary: { title: 'Connection Summary', subtitle: 'Confirm all the details before submitting the information.' },
  }[step]

  return (
    <WizardCard
      title={copy.card}
      steps={STEP_LABELS}
      current={index}
      // steps sit ~140px apart from the left in 29–32 / 47–50, not spread across the bar
      className="flex-1 [&_nav>ol]:justify-start [&_nav>ol]:gap-x-6 min-[1800px]:[&_nav>ol]:gap-x-[139px]"
    >
      <Form {...form}>
        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault()
            if (step === 'summary') void submit(event)
            else void next()
          }}
        >
          <h3 className="text-heading font-semibold text-foreground">{heading.title}</h3>
          {heading.subtitle ? <p className="mt-[11px] text-md text-muted-foreground">{heading.subtitle}</p> : null}

          <DetailList
            title={step === 'ehr' ? 'Practice Details' : undefined}
            items={summaryItems}
            className={cn('-mx-[11px] mt-[27px] [&_h3]:mb-[17px] [&_h3]:font-medium', !heading.subtitle && 'mt-[15px]')}
          />

          {step === 'ehr' ? <EhrField control={form.control} onChange={() => {
            form.setValue('patientConnection', '')
            form.setValue('providerConnection', '')
          }} /> : null}

          {step === 'app-types' ? (
            <fieldset className="mt-[29px]">
              <legend className="text-heading font-medium text-foreground">
                EHR Type
                <span className="text-destructive" aria-hidden>
                  *
                </span>
              </legend>
              <p className="mt-[11px] text-md text-muted-foreground">
                Enabling an app type will allow you to add a connection of the specific EHR.
              </p>
              <div className="mt-[29px] flex flex-col gap-[13px]">
                <AppTypeRow control={form.control} type="patient" ehr={ehr} onDisable={() => form.setValue('patientConnection', '')} />
                <AppTypeRow control={form.control} type="provider" ehr={ehr} onDisable={() => form.setValue('providerConnection', '')} />
              </div>
              {form.formState.errors.patientEnabled ? (
                <p role="alert" className="mt-2 text-base text-destructive">
                  {form.formState.errors.patientEnabled.message}
                </p>
              ) : null}
            </fieldset>
          ) : null}

          {step === 'practice-id' ? (
            <TextField
              control={form.control}
              name="ehrPracticeId"
              label="Practice ID"
              required
              placeholder="Enter the practice ID"
              description="Enter the Practice ID of the connection"
              className="mt-[30px] w-[537px] max-w-full"
            />
          ) : null}

          <FormActions className={cn(step === 'app-types' ? 'mt-[18px]' : 'mt-[29px]')}>
            {previous ? (
              <Button type="button" variant="outline" onClick={() => onStepChange(previous)}>
                Previous
              </Button>
            ) : (
              <Button variant="outline" asChild>
                <Link to="/practices/$practiceId/connection" params={{ practiceId: practice.id }}>
                  Cancel
                </Link>
              </Button>
            )}
            <Button type="submit">{step === 'summary' ? copy.submit : 'Next'}</Button>
          </FormActions>
        </form>
      </Form>
    </WizardCard>
  )
}

function EhrField({ control, onChange }: { control: Control<WizardValues>; onChange: () => void }) {
  const { clearErrors } = useFormContext<WizardValues>()
  return (
    <FormField
      control={control}
      name="ehr"
      render={({ field }) => (
        <FormItem className="mt-[38px] gap-[7px]">
          <FormLabel className="text-lg font-semibold text-foreground">
            EHR Name
            <span className="-ml-1.5 text-destructive" aria-hidden>
              *
            </span>
          </FormLabel>
          <Select
            value={field.value}
            onValueChange={(value) => {
              field.onChange(value)
              clearErrors('ehr')
              onChange()
            }}
          >
            <FormControl>
              <SelectTrigger
                onBlur={field.onBlur}
                className={cn(
                  fieldControlClass,
                  'w-[537px] max-w-full data-[placeholder]:text-muted-foreground data-[size=default]:h-[46px] [&>svg]:size-5',
                )}
              >
                <SelectValue placeholder="Select EHR Name" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {EHRS.map((option) => (
                <SelectItem key={option} value={option} className="text-base">
                  <span className="grid w-[64px] place-items-center">
                    <EhrLogo ehr={option} className="h-5 max-w-[64px]" />
                  </span>
                  {ehrName(option)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription className="text-md text-muted-foreground">
            Ex : athenahealth. Select the EHR that needs to be connected to this practice
          </FormDescription>
          <FormMessage className="text-base" />
        </FormItem>
      )}
    />
  )
}

interface AppTypeRowProps {
  control: Control<WizardValues>
  type: 'patient' | 'provider'
  ehr: Ehr | null
  onDisable: () => void
}

/** App Type Status switch + Connection Name select; the select is disabled and cleared while switched off (30, 48). */
function AppTypeRow({ control, type, ehr, onDisable }: AppTypeRowProps) {
  const switchId = useId()
  const label = type === 'patient' ? 'Patient' : 'Provider'
  const enabledName = type === 'patient' ? 'patientEnabled' : 'providerEnabled'
  const connectionName = type === 'patient' ? 'patientConnection' : 'providerConnection'
  const enabled = useWatch({ control, name: enabledName })
  const { clearErrors } = useFormContext<WizardValues>()
  const options = ehr ? CONNECTION_OPTIONS[ehr][type] : []

  return (
    <div className="grid gap-4 bg-panel px-[27px] py-[22px] lg:grid-cols-[462px_minmax(0,624px)] lg:gap-0">
      <FormField
        control={control}
        name={enabledName}
        render={({ field }) => (
          <div className="flex flex-col gap-[17px]">
            <span className="text-lg font-semibold text-foreground">
              App Type Status
            </span>
            <div className="flex items-center gap-1.5">
              <Switch
                id={switchId}
                checked={field.value}
                onCheckedChange={(checked) => {
                  field.onChange(checked)
                  clearErrors(['patientEnabled', connectionName])
                  if (!checked) onDisable()
                }}
                aria-label={`${label} app type status`}
                // the shadcn size="default" variant pins 18×32; the design draws a 24×40 track with an 18px knob
                className="data-[size=default]:h-6 data-[size=default]:w-10 data-[state=checked]:bg-success data-[state=unchecked]:bg-toggle-off [&>span]:size-[18px]! [&>span]:data-[state=checked]:translate-x-[19px]! [&>span]:data-[state=unchecked]:translate-x-[2px]!"
              />
              <label htmlFor={switchId} className="text-md text-muted-foreground">
                {label}
              </label>
            </div>
          </div>
        )}
      />
      <FormField
        control={control}
        name={connectionName}
        render={({ field }) => (
          <FormItem className="gap-[7px]">
            <FormLabel className="text-lg font-semibold text-foreground">
              Connection Name<span className="sr-only"> for {label}</span>
            </FormLabel>
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value)
                clearErrors(connectionName)
              }}
              disabled={!enabled}
            >
              <FormControl>
                <SelectTrigger
                  onBlur={field.onBlur}
                  className={cn(
                    fieldControlClass,
                    'w-full data-[placeholder]:text-foreground data-[size=default]:h-[46px] [&>svg]:size-5',
                  )}
                >
                  <SelectValue placeholder="Select Connection Name" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option} value={option} className="text-base">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className="text-base" />
          </FormItem>
        )}
      />
    </div>
  )
}
