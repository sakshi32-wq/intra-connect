import { z } from 'zod'

const required = (label: string) =>
  z.string().trim().min(1, `${label} is required`)

export const practiceFormSchema = z.object({
  name: required('Practice name'),
  npi: required('NPI number').regex(
    /^\d{10,15}$/,
    'Enter a valid NPI number (10–15 digits)',
  ),
  email: required('E-mail').pipe(z.email('Enter a valid e-mail address')),
  contact: required('Contact').regex(
    /^[\d\s()+-]{7,20}$/,
    'Enter a valid contact number',
  ),
  website: z.union([
    z.literal(''),
    z.url({ message: 'Enter a full URL, e.g. https://www.example.com' }),
  ]),
  specialties: z.array(z.string()).min(1, 'Select at least one specialty'),
  address1: required('Address line 1'),
  address2: z.string().trim(),
  city: required('City'),
  state: required('State'),
  zip: required('Zip code').regex(
    /^[A-Za-z0-9 -]{3,10}$/,
    'Enter a valid zip code',
  ),
})

export type PracticeFormValues = z.infer<typeof practiceFormSchema>

export const emptyPracticeForm: PracticeFormValues = {
  name: '',
  npi: '',
  email: '',
  contact: '',
  website: '',
  specialties: [],
  address1: '',
  address2: '',
  city: '',
  state: '',
  zip: '',
}
