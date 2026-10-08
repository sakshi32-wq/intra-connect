export interface Organisation {
  name: string
  overview: string
  alertEmail: string
  salesEmail: string
  contact?: string
  website?: string
  twitter?: string
  category?: string
  envType?: string
  logoUrl?: string
}

export const USER_ROLES = ['admin', 'developer', 'viewer'] as const
export type UserRole = (typeof USER_ROLES)[number]

export interface OrgUser {
  id: string
  name: string
  email: string
  status: 'pending' | 'active'
  role: UserRole
  phiAccess: boolean
  ownership: 'owner' | 'sub-user'
  mfa: 'active' | 'inactive'
  invitedAt: string
}

export interface CurrentUser {
  id: string
  name: string
  email: string
  contact?: string
  passwordUpdatedAt: string
}

export type MfaMethod = 'app' | 'key'

export interface MfaDevice {
  id: string
  method: MfaMethod
  name: string
  appName?: string
  description: string
  authenticatedAt: string
}
