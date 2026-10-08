import { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import type { LinkProps } from '@tanstack/react-router'

import { ContentCard } from '#/components/content-card'
import { FormActions } from '#/components/form-actions'
import { Stepper } from '#/components/stepper'
import { SuccessState } from '#/components/success-state'
import { Button } from '#/components/ui/button'
import { Form } from '#/components/ui/form'
import {
  ConnectionDetailsStep,
  ConnectionSummaryStep,
  ConnectionTypeStep,
  GettingStartedStep,
} from '#/features/connections/components/connection-wizard-steps'
import type { WizardMode } from '#/features/connections/components/connection-wizard-steps'
import { CONNECTION_DETAIL_FIELDS, CONNECTION_TYPE_FIELDS, connectionFormSchema } from '#/features/connections/schemas'
import type { ConnectionFormValues } from '#/features/connections/schemas'

export type WizardStep = 'getting-started' | 'type' | 'details' | 'summary' | 'success'

const STEP_LABELS: Record<Exclude<WizardStep, 'success'>, string> = {
  'getting-started': 'Getting Started',
  type: 'Connection Type',
  details: 'Connection Details',
  summary: 'Connection Summary',
}

const FLOWS: Record<WizardMode, ReadonlyArray<Exclude<WizardStep, 'success'>>> = {
  add: ['getting-started', 'type', 'details', 'summary'],
  edit: ['type', 'details', 'summary'],
}

const EMPTY_VALUES: Partial<ConnectionFormValues> = {
  name: '',
  clientId: '',
  scope: '',
  clientSecret: '',
  audience: '',
  nonce: '',
  orgRedirectUrl: '',
  launch: '',
}

interface ConnectionWizardProps {
  mode: WizardMode
  step: WizardStep
  onStepChange: (step: WizardStep, options?: { replace?: boolean }) => void
  /** Pre-filled values (edit). */
  initialValues?: ConnectionFormValues
  /** Names of the other connections, to keep "Name" unique. */
  takenNames: ReadonlyArray<string>
  redirectUrl: string
  /** Where Cancel leads (list for add, the detail page for edit). */
  cancel: { to: LinkProps['to']; params?: LinkProps['params'] }
  success: React.ComponentProps<typeof SuccessState>
}

/** Add (58–62) and edit (64–67) connection wizard: one form kept across the `step` search param. */
export function ConnectionWizard({
  mode,
  step,
  onStepChange,
  initialValues,
  takenNames,
  redirectUrl,
  cancel,
  success,
}: ConnectionWizardProps) {
  const schema = useMemo(() => connectionFormSchema(takenNames), [takenNames])
  const form = useForm<ConnectionFormValues>({
    resolver: zodResolver(schema),
    defaultValues: initialValues ?? EMPTY_VALUES,
    mode: 'onTouched',
  })

  const flow = FLOWS[mode]
  const index = step === 'success' ? flow.length : flow.indexOf(step)

  // Opened on a later step (reload, deep link) without the earlier answers: go back to the first incomplete step.
  useEffect(() => {
    if (step !== 'details' && step !== 'summary') return
    const values = form.getValues()
    const typeDone = schema.pick({ ehr: true, appType: true }).safeParse(values).success
    if (!typeDone) onStepChange('type', { replace: true })
    else if (step === 'summary' && !schema.safeParse(values).success) onStepChange('details', { replace: true })
  }, [step, form, schema, onStepChange])

  // Centred lower in the page, with the design's wider gaps (62, 67)
  if (step === 'success') return <SuccessState {...success} className="pt-[225px] [&>a]:mt-[15px] [&>h2]:mt-[49px]" />

  const previous = index > 0 ? flow[index - 1] : undefined
  const back = previous ? (
    <Button type="button" variant="outline" onClick={() => onStepChange(previous)}>
      Previous
    </Button>
  ) : (
    <Button variant="outline" asChild>
      <Link to={cancel.to} params={cancel.params}>
        Cancel
      </Link>
    </Button>
  )

  const next = async () => {
    if (step === 'type' && !(await form.trigger([...CONNECTION_TYPE_FIELDS], { shouldFocus: true }))) return
    if (step === 'details' && !(await form.trigger([...CONNECTION_DETAIL_FIELDS], { shouldFocus: true }))) return
    onStepChange(flow[index + 1])
  }

  const submit = form.handleSubmit(
    () => onStepChange('success'),
    (errors) => {
      const typeInvalid = CONNECTION_TYPE_FIELDS.some((field) => field in errors)
      onStepChange(typeInvalid ? 'type' : 'details')
    },
  )

  const actions = (
    <FormActions>
      {back}
      {step === 'summary' ? (
        <Button type="submit">{mode === 'add' ? 'Create Connection' : 'Update Connection'}</Button>
      ) : (
        <Button type="button" onClick={() => void next()}>
          Next
        </Button>
      )}
    </FormActions>
  )

  return (
    <ContentCard
      title={mode === 'add' ? 'Add New Connection Details' : 'Edit Connection Details'}
      tone="muted"
      className="min-h-[878px]"
    >
      <Stepper
        steps={flow.map((key) => STEP_LABELS[key])}
        current={index}
        onStepClick={(target) => onStepChange(flow[target])}
        // Steps sit in ~280px slots on the left of the bar (58–61, 64–66), not spread across it.
        className="mt-[13px] px-[13px] [&>ol]:grid [&>ol]:grid-cols-[repeat(4,minmax(max-content,278px))] [&>ol]:justify-start [&>ol]:gap-x-6 max-xl:[&>ol]:gap-x-8 max-xl:[&>ol]:overflow-x-auto"
      />
      <Form {...form}>
        <form
          noValidate
          onSubmit={(event) => {
            // Enter in a field advances the step; only the summary submits
            if (step === 'summary') void submit(event)
            else {
              event.preventDefault()
              void next()
            }
          }}
          className="px-12 pt-[14px] pb-[26px]"
          aria-label={STEP_LABELS[flow[index]]}
        >
          {step === 'getting-started' ? (
            <GettingStartedStep actions={actions} />
          ) : step === 'type' ? (
            <ConnectionTypeStep mode={mode} actions={actions} />
          ) : step === 'details' ? (
            <ConnectionDetailsStep mode={mode} redirectUrl={redirectUrl} actions={actions} />
          ) : (
            <ConnectionSummaryStep mode={mode} redirectUrl={redirectUrl} actions={actions} />
          )}
        </form>
      </Form>
    </ContentCard>
  )
}
