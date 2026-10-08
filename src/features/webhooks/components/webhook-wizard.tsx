import { useEffect, useId, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import type { UseFormReturn } from 'react-hook-form'

import { Callout } from '#/components/callout'
import { CenteredFormCard } from '#/components/centered-form-card'
import { CopyButton } from '#/components/copy-button'
import { DetailList } from '#/components/detail-list'
import { FormActions } from '#/components/form-actions'
import { SelectField, TextField, fieldControlClass } from '#/components/form-fields'
import { SuccessState } from '#/components/success-state'
import { Button } from '#/components/ui/button'
import { Form } from '#/components/ui/form'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { WizardCard } from '#/components/wizard-card'
import { cn } from '#/lib/utils'
import { webhookDetailsSchema } from '../schemas'
import type { WebhookDetailsValues, WebhookStep } from '../schemas'
import { WEBHOOK_METHODS } from '../types'
import type { Webhook } from '../types'

const STEP_LABELS = ['Webhook Details', 'Webhook Summary', 'Verification'] as const
const STEP_INDEX: Record<Exclude<WebhookStep, 'success'>, number> = { details: 0, summary: 1, verification: 2 }
// Success block lands where 39/45 draw it: icon top at y≈336, ~73px above the heading.
const SUCCESS_CLASS = 'pt-[168px] [&>h2]:mt-[49px]'
const METHOD_OPTIONS = WEBHOOK_METHODS.map((method) => ({ value: method, label: method }))

type WizardProps = {
  practiceId: string
  step: WebhookStep
  onStepChange: (step: WebhookStep, options?: { replace?: boolean }) => void
} & ({ mode: 'add'; webhook?: undefined } | { mode: 'edit'; webhook: Webhook })

/**
 * Add (42–45) and edit (36–39) webhook wizard: details → summary → verification → success.
 * UI only: the values live in the form; "Generate Token" just shows the success state.
 */
export function WebhookWizard({ mode, practiceId, webhook, step, onStepChange }: WizardProps) {
  const form = useForm<WebhookDetailsValues>({
    resolver: zodResolver(webhookDetailsSchema),
    defaultValues: webhook
      ? { name: webhook.name, url: webhook.url, method: webhook.method }
      : { name: '', url: '' },
  })
  // An add flow opened mid-way (deep link, refresh) has no details yet: send it back to step 1.
  const [detailsDone, setDetailsDone] = useState(mode === 'edit')
  const missingDetails = !detailsDone && (step === 'summary' || step === 'verification')
  useEffect(() => {
    if (missingDetails) onStepChange('details', { replace: true })
  }, [missingDetails, onStepChange])

  const detailParams = webhook ? { practiceId, webhookId: webhook.id } : undefined

  if (step === 'success') {
    return mode === 'add' ? (
      <SuccessState
        title="Webhook Added Successfully"
        description="You will receive the webhook details on your registered mail ID."
        className={SUCCESS_CLASS}
        action={{ label: 'Redirect to Webhooks', to: '/practices/$practiceId/webhooks', params: { practiceId } }}
      />
    ) : (
      <SuccessState
        title="Webhook Updated Successfully"
        description="The new token is sent to your registered mail ID."
        className={SUCCESS_CLASS}
        action={{
          label: 'Redirect to Webhook Details',
          to: '/practices/$practiceId/webhooks/$webhookId',
          params: detailParams,
        }}
      />
    )
  }
  if (missingDetails) return null

  return (
    <WizardCard
      title={mode === 'add' ? 'Add New Webhook Details' : 'Edit Webhook Details'}
      steps={STEP_LABELS}
      current={STEP_INDEX[step]}
      // Steps sit left-aligned 80px apart here (36–38, 42–44), not spread across the bar.
      className="flex-1 [&_nav>ol]:flex-none [&_nav>ol]:justify-start [&_nav>ol]:gap-x-20"
    >
      {step === 'details' ? (
        <DetailsStep
          mode={mode}
          form={form}
          cancel={
            detailParams ? (
              <Link to="/practices/$practiceId/webhooks/$webhookId" params={detailParams}>
                Cancel
              </Link>
            ) : (
              <Link to="/practices/$practiceId/webhooks" params={{ practiceId }}>
                Cancel
              </Link>
            )
          }
          onNext={() => {
            setDetailsDone(true)
            onStepChange('summary')
          }}
        />
      ) : null}
      {step === 'summary' ? (
        <SummaryStep
          mode={mode}
          values={form.getValues()}
          onPrevious={() => onStepChange('details')}
          onNext={() => onStepChange('verification')}
        />
      ) : null}
      {step === 'verification' ? (
        <VerificationStep
          tokenId={webhook?.tokenId}
          onPrevious={() => onStepChange('summary')}
          onGenerate={() => onStepChange('success')}
        />
      ) : null}
    </WizardCard>
  )
}

function StepHeading({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <header className="flex flex-col gap-[13px]">
      <h3 className="text-heading font-medium text-foreground">{title}</h3>
      <p className="text-lg text-muted-foreground">{children}</p>
    </header>
  )
}

function DetailsStep({
  mode,
  form,
  cancel,
  onNext,
}: {
  mode: 'add' | 'edit'
  form: UseFormReturn<WebhookDetailsValues>
  cancel: React.ReactElement
  onNext: () => void
}) {
  return (
    <CenteredFormCard
      title="Webhook Details"
      subtitle={
        mode === 'add'
          ? 'Adding a new webhook lets this practice receive its events.'
          : 'Update where this practice’s events are sent.'
      }
      className="mt-3 gap-[47px] px-[38px] pt-[41px] pb-[46px] shadow-[0_0_4px_rgb(0_0_0/0.08)]"
    >
      <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(onNext)} className="flex flex-col gap-[31px]">
          <TextField
            control={form.control}
            name="name"
            label="Webhook Name"
            required
            placeholder="Enter webhook name"
            description="Ex : PaceHospitalWebhook - Webhook Name"
          />
          <TextField
            control={form.control}
            name="url"
            type="url"
            label="Webhook URL"
            required
            placeholder="Enter webhook URL"
            description="URL of webhook connection"
          />
          <SelectField
            control={form.control}
            name="method"
            label="Method Type"
            required
            placeholder="Select method type"
            description="HTTP method used to call the webhook"
            options={METHOD_OPTIONS}
          />
          <FormActions className="mt-[13px]">
            <Button variant="outline" asChild>
              {cancel}
            </Button>
            <Button type="submit">Next</Button>
          </FormActions>
        </form>
      </Form>
    </CenteredFormCard>
  )
}

function SummaryStep({
  mode,
  values,
  onPrevious,
  onNext,
}: {
  mode: 'add' | 'edit'
  values: WebhookDetailsValues
  onPrevious: () => void
  onNext: () => void
}) {
  return (
    <div className="flex flex-col">
      <StepHeading title="Webhook Summary">
        Check the summary once before submitting, so that the webhook is {mode === 'add' ? 'created' : 'updated'} with
        the correct details.
      </StepHeading>
      <DetailList
        variant="plain"
        className="mt-[30px]"
        items={[
          { label: 'Webhook Name', value: values.name },
          {
            label: 'Webhook URL',
            value: (
              <a
                href={values.url}
                target="_blank"
                rel="noreferrer"
                className="break-all text-primary hover:underline focus-visible:outline-2 focus-visible:outline-ring"
              >
                {values.url}
              </a>
            ),
          },
          { label: 'Method Type', value: values.method },
        ]}
      />
      <FormActions className="mt-[46px]">
        <Button variant="outline" onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={onNext}>Next</Button>
      </FormActions>
    </div>
  )
}

function VerificationStep({
  tokenId,
  onPrevious,
  onGenerate,
}: {
  /** Current token (edit); a new webhook has none until it is generated. */
  tokenId?: string
  onPrevious: () => void
  onGenerate: () => void
}) {
  const inputId = useId()
  const helperId = useId()
  return (
    <div className="flex flex-col">
      <StepHeading title="Verification">
        {tokenId
          ? 'Updated changes will be verified through generating a new token to verify the webhook.'
          : 'The new webhook will be verified through generating a token.'}
      </StepHeading>
      <div className="mt-[35px] grid gap-x-[70px] gap-y-6 xl:grid-cols-[minmax(0,571px)_minmax(0,571px)]">
        <div className="flex flex-col">
          <div className="flex flex-col gap-[7px]">
            <Label htmlFor={inputId} className="text-lg font-semibold text-foreground">
              Token ID
            </Label>
            <div className="relative">
              <Input
                id={inputId}
                readOnly
                value={tokenId ?? ''}
                placeholder="Generated when you submit"
                aria-describedby={helperId}
                className={cn(fieldControlClass, tokenId && 'pr-12')}
              />
              {tokenId ? (
                <span className="absolute top-1/2 right-3 -translate-y-1/2">
                  <CopyButton value={tokenId} label="token ID" />
                </span>
              ) : null}
            </div>
            <p id={helperId} className="text-md text-muted-foreground">
              Generating this token gets the webhook verified in a few minutes.
            </p>
          </div>
          <FormActions className="mt-[37px]">
            <Button variant="outline" onClick={onPrevious}>
              Previous
            </Button>
            <Button onClick={onGenerate}>Generate Token</Button>
          </FormActions>
        </div>
        <Callout variant="muted" title="Generate New Verification Token" className="self-start px-5 pt-[21px] pb-[19px] text-md">
          {tokenId
            ? 'Generating a new token will allow you to verify the webhook again. So, generate a new token only when you want to reverify the webhook.'
            : 'The token verifies that the webhook belongs to this practice. Verification is done within a few minutes of generating it.'}
        </Callout>
      </div>
    </div>
  )
}
