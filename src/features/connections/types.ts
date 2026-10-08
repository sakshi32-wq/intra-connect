export const EHRS = ['athenahealth', 'epic', 'cerner', 'nextgen', 'drchrono'] as const
export type Ehr = (typeof EHRS)[number]

export const APP_TYPES = ['provider', 'system', 'patient'] as const
export type AppType = (typeof APP_TYPES)[number]

export type ActiveStatus = 'active' | 'inactive'

export interface Connection {
  id: string
  ehr: Ehr
  appType: AppType
  name: string
  clientId: string
  clientSecret: string
  scope: string
  audience?: string
  nonce?: string
  launch?: string
  orgRedirectUrl: string
  /** System-generated callback URL shown read-only in the wizard. */
  redirectUrl: string
  status: ActiveStatus
  customerId: string
  createdAt: string
}
