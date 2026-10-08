import { Building2 } from 'lucide-react'
import { z } from 'zod'
import type { UseFormReturn } from 'react-hook-form'

import { SelectField, TextField } from '#/components/form-fields'
import { ImageUploadCard } from '#/components/image-upload-card'
import { Button } from '#/components/ui/button'
import { Form } from '#/components/ui/form'
import { CATEGORY_OPTIONS, ENV_TYPE_OPTIONS } from '../sample-data'
import { SectionDivider } from './section-divider'

const optionalUrl = z.union([z.literal(''), z.url('Enter a valid URL, starting with https://')])

export const organisationSchema = z.object({
  name: z.string().trim().min(1, 'Enter the organisation name.'),
  overview: z.string().trim().min(1, 'Enter a short overview of the organisation.'),
  alertEmail: z.email('Enter a valid email address.'),
  salesEmail: z.email('Enter a valid email address.'),
  contact: z.string().trim(),
  website: optionalUrl,
  twitter: z.string().trim(),
  category: z.string(),
  envType: z.string(),
})
export type OrganisationValues = z.infer<typeof organisationSchema>

/** Frame "Setting": logo card + identity, contact details, classification, Save. */
export function OrganisationProfileForm({
  form,
  onSubmit,
}: {
  form: UseFormReturn<OrganisationValues>
  onSubmit: (values: OrganisationValues) => void
}) {
  const { control } = form
  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        aria-label="Organisation profile"
        className="mx-auto flex w-full max-w-[1198px] flex-col pt-[19px]"
      >
        <div className="flex flex-col gap-8 md:flex-row md:gap-[68px]">
          <ImageUploadCard
            caption="Organisation Profile"
            uploadLabel="Upload Org Logo"
            placeholder={<Building2 className="size-28 stroke-1 text-foreground" aria-hidden />}
          />
          <div className="flex min-w-0 flex-1 flex-col gap-[65px]">
            <TextField
              control={control}
              name="name"
              label="Organisation Name"
              required
              placeholder="Enter Organisation Name"
              description="Enter registered Name of Organisation"
              autoComplete="organization"
            />
            <TextField
              control={control}
              name="overview"
              label="Organisation Overview"
              required
              multiline
              placeholder="Enter Overview for the organisation in brief"
            />
          </div>
        </div>

        <SectionDivider className="mt-[23px] mb-7" />

        <div className="grid gap-x-28 gap-y-6 lg:grid-cols-2">
          <TextField
            control={control}
            name="alertEmail"
            label="Alert Email"
            required
            type="email"
            placeholder="Enter email for alert notifications"
            description="Alerts about connections and webhooks are sent here."
          />
          <TextField
            control={control}
            name="salesEmail"
            label="Sales Email"
            required
            type="email"
            placeholder="Enter email for sales notifications"
            description="Billing and plan updates are sent here."
          />
          <TextField
            control={control}
            name="contact"
            label="Contact"
            type="tel"
            placeholder="Enter Contact number for the org"
            autoComplete="tel"
          />
          <TextField control={control} name="website" label="Website" type="url" placeholder="Enter Website URL" autoComplete="url" />
          <TextField control={control} name="twitter" label="Twitter" placeholder="Enter Twitter ID" />
        </div>

        <SectionDivider className="mt-6 mb-[30px]" />

        <div className="grid gap-x-28 gap-y-6 lg:grid-cols-2">
          <SelectField
            control={control}
            name="category"
            label="Categories"
            placeholder="Select Category of service for this profile"
            description="Category of service provided"
            options={CATEGORY_OPTIONS}
          />
          <SelectField
            control={control}
            name="envType"
            label="Env Type"
            placeholder="Select Env Type"
            description="Env type the organisation is logged in currently"
            options={ENV_TYPE_OPTIONS}
          />
        </div>

        <Button type="submit" className="mt-[18px] self-start">
          Save
        </Button>
      </form>
    </Form>
  )
}
