import { Link } from '@tanstack/react-router'
import type { Control } from 'react-hook-form'

import { ContentCard } from '#/components/content-card'
import { FormActions } from '#/components/form-actions'
import { TextField } from '#/components/form-fields'
import { Button } from '#/components/ui/button'
import { Separator } from '#/components/ui/separator'
import type { PracticeFormValues } from './practice-form-schema'
import { SpecialtyField } from './specialty-field'

/**
 * Frame "Logs" (Add Practice, details step), with the SCREEN_MAP §6 corrections:
 * "NPI Number", Contact/Website/Zip added (shown on 41), Address line 2 optional, multi-select specialty, Cancel.
 */
export function PracticeDetailsStep({
  control,
}: {
  control: Control<PracticeFormValues>
}) {
  return (
    <ContentCard title="Add Details of New Practice">
      <div className="flex flex-col gap-[25px] pt-[24px] pr-[22px] pb-[19px] pl-[29px]">
        <TextField
          control={control}
          name="name"
          label="Practice Name"
          required
          placeholder="Enter the practice name"
          description="Ex : Birla Hospital. Enter practice name to connect"
        />
        <TextField
          control={control}
          name="npi"
          label="NPI Number"
          required
          placeholder="Enter the NPI number"
          description="Group or solo NPI number of the practice"
        />
        <TextField
          control={control}
          name="email"
          label="E-mail"
          type="email"
          required
          autoComplete="email"
          placeholder="Enter the e-mail address"
          description="Ex : birlahospital@gmail.com - Email address to connect"
        />
        <div className="grid items-start gap-x-[121px] gap-y-[25px] lg:grid-cols-2">
          <TextField
            control={control}
            name="contact"
            label="Contact"
            type="tel"
            required
            autoComplete="tel"
            placeholder="Enter the contact number"
            description="Ex : (457) 974-7574"
          />
          <TextField
            control={control}
            name="website"
            label="Website"
            type="url"
            autoComplete="url"
            placeholder="https://www.example.com"
            description="Optional. The practice's public website"
          />
        </div>
        <SpecialtyField control={control} />

        <Separator className="-mt-[7px] bg-input data-[orientation=horizontal]:h-[2px]" />

        <fieldset className="flex flex-col gap-[19px]">
          <legend className="mb-[23px] text-lg font-semibold text-foreground">
            Physical Address
          </legend>
          <div className="grid items-start gap-x-[121px] gap-y-[19px] lg:grid-cols-2">
            <TextField
              control={control}
              name="address1"
              label="Address line 1"
              required
              autoComplete="address-line1"
              placeholder="Enter the street address"
            />
            <TextField
              control={control}
              name="address2"
              label="Address line 2"
              autoComplete="address-line2"
              placeholder="Enter more direction if needed"
            />
            <TextField
              control={control}
              name="city"
              label="City"
              required
              autoComplete="address-level2"
              placeholder="Enter the City"
            />
            <TextField
              control={control}
              name="state"
              label="State"
              required
              autoComplete="address-level1"
              placeholder="Enter the State"
            />
            <TextField
              control={control}
              name="zip"
              label="Zip code"
              required
              autoComplete="postal-code"
              placeholder="Enter the Zip code"
            />
          </div>
        </fieldset>

        <FormActions className="mt-[8px]">
          <Button variant="outline" asChild>
            <Link to="/practices">Cancel</Link>
          </Button>
          <Button type="submit">Next</Button>
        </FormActions>
      </div>
    </ContentCard>
  )
}
