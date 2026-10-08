import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ContentCard } from '#/components/content-card'
import { FormActions } from '#/components/form-actions'
import { TextField } from '#/components/form-fields'
import { Button } from '#/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '#/components/ui/form'
import { Separator } from '#/components/ui/separator'
import { SPECIALTIES } from '#/features/practices/sample-data'
import type { Practice } from '#/features/practices/types'
import { SpecialtyMultiSelect } from './specialty-multi-select'

const required = (label: string) => z.string().trim().min(1, `${label} is required`)

const practiceProfileSchema = z.object({
  name: required('Practice name'),
  npi: required('NPI number').regex(/^\d{10,11}$/, 'Enter a 10 or 11 digit NPI number'),
  email: required('E-mail').pipe(z.email('Enter a valid e-mail address')),
  contact: required('Contact').regex(/^[\d\s()+-]{7,20}$/, 'Enter a valid phone number'),
  website: z.union([z.literal(''), z.url('Enter a valid URL, e.g. https://www.example.com')]),
  specialties: z.array(z.string()).min(1, 'Select at least one specialty'),
  address1: required('Address line 1'),
  address2: z.string(),
  city: required('City'),
  state: required('State'),
  zip: required('Zip code').regex(/^[A-Za-z0-9 -]{3,10}$/, 'Enter a valid zip code'),
})

type PracticeProfileValues = z.infer<typeof practiceProfileSchema>

/** Practice profile edit form, pre-filled (23). Save moves to the success state. */
export function PracticeProfileForm({ practice, onSaved }: { practice: Practice; onSaved: () => void }) {
  const form = useForm<PracticeProfileValues>({
    resolver: zodResolver(practiceProfileSchema),
    defaultValues: {
      name: practice.name,
      npi: practice.npi,
      email: practice.email,
      contact: practice.contact,
      website: practice.website ?? '',
      specialties: practice.specialties,
      address1: practice.address1,
      address2: practice.address2 ?? '',
      city: practice.city,
      state: practice.state,
      zip: practice.zip,
    },
  })
  const { control } = form

  return (
    <ContentCard title="Practice Profile Details">
      <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSaved)} className="flex flex-col px-[29px] pt-[26px] pb-[30px]">
          <div className="flex flex-col gap-6">
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
              description="Ex : 3312392897. Group or solo NPI number of the practice"
            />
            <TextField
              control={control}
              name="email"
              label="E-mail"
              required
              type="email"
              autoComplete="email"
              placeholder="Enter the e-mail address"
              description="Ex : birlahospital@gmail.com. E-mail address to connect"
            />
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-x-[121px]">
              <TextField
                control={control}
                name="contact"
                label="Contact"
                required
                type="tel"
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
                placeholder="Enter the website URL"
                description="Ex : https://www.birlahospital.com"
              />
            </div>
            <FormField
              control={control}
              name="specialties"
              render={({ field }) => (
                <FormItem className="gap-[7px]">
                  <FormLabel className="text-lg font-semibold text-foreground">
                    Specialty Provided
                    <span className="-ml-1.5 text-destructive" aria-hidden>
                      *
                    </span>
                  </FormLabel>
                  <FormControl>
                    <SpecialtyMultiSelect
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      options={SPECIALTIES}
                    />
                  </FormControl>
                  <FormDescription className="text-md text-muted-foreground">
                    Ex : Physiotherapy. Select every specialty the practice provides
                  </FormDescription>
                  <FormMessage className="text-base" />
                </FormItem>
              )}
            />
          </div>

          <Separator className="mt-[26px] mb-[25px] h-[2px] bg-input" />

          <fieldset className="flex flex-col gap-6">
            <legend className="mb-6 text-heading font-medium text-foreground">Physical Address</legend>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-x-[121px]">
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

          <FormActions className="mt-8">
            <Button variant="outline" asChild>
              <Link to="/practices/$practiceId/profile" params={{ practiceId: practice.id }}>
                Cancel
              </Link>
            </Button>
            <Button type="submit">Save</Button>
          </FormActions>
        </form>
      </Form>
    </ContentCard>
  )
}
