import { z } from 'zod'

import { APP_TYPES, EHRS } from './types'
import type { Connection } from './types'

/** Fields of the Connection Type step (59, 64). */
export const CONNECTION_TYPE_FIELDS = ['ehr', 'appType'] as const
/** Fields of the Connection Details step (60, 65). */
export const CONNECTION_DETAIL_FIELDS = [
  'name',
  'clientId',
  'scope',
  'clientSecret',
  'audience',
  'nonce',
  'orgRedirectUrl',
  'launch',
] as const

const required = (message: string) => z.string().trim().min(1, message)

/** Add/edit connection wizard values. `takenNames` keeps "Name" unique (helper text on 60). */
export function connectionFormSchema(takenNames: ReadonlyArray<string>) {
  const taken = new Set(takenNames.map((name) => name.toLowerCase()))
  return z.object({
    ehr: z.enum(EHRS, { message: 'Select an EHR' }),
    appType: z.enum(APP_TYPES, { message: 'Select an app type' }),
    name: required('Enter a connection name').refine((name) => !taken.has(name.toLowerCase()), {
      message: 'A connection with this name already exists',
    }),
    clientId: required('Enter the client ID'),
    scope: required('Enter the scope'),
    clientSecret: z.string(),
    audience: z.union([z.literal(''), z.url({ message: 'Enter a valid URL' })]),
    nonce: z.string(),
    orgRedirectUrl: z.url({ message: 'Enter a valid URL, e.g. https://example.org/callback' }),
    launch: z.string(),
  })
}

export type ConnectionFormValues = z.infer<ReturnType<typeof connectionFormSchema>>

export function connectionFormValues(connection: Connection): ConnectionFormValues {
  return {
    ehr: connection.ehr,
    appType: connection.appType,
    name: connection.name,
    clientId: connection.clientId,
    scope: connection.scope,
    clientSecret: connection.clientSecret,
    audience: connection.audience ?? '',
    nonce: connection.nonce ?? '',
    orgRedirectUrl: connection.orgRedirectUrl,
    launch: connection.launch ?? '',
  }
}
