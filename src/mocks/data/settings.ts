import type {
  CurrentUser,
  MfaDevice,
  Organisation,
  OrgUser,
} from '#/features/settings/types'
import { minutesAgo } from '../seed'

export const organisationSeed: Organisation = {
  name: 'DocMD',
  overview:
    'DocMD builds patient engagement software for independent practices and connects to their EHRs through Intraconnects.',
  alertEmail: 'alerts@docmd.com',
  salesEmail: 'sales@docmd.com',
  contact: '(415) 555-0142',
  website: 'https://www.docmd.com',
}

export const currentUserSeed: CurrentUser = {
  id: 'usr_001',
  name: 'James Joy',
  email: 'jamesjoy@xyz.com',
  contact: '(415) 555-0187',
  passwordUpdatedAt: '2026-01-23T15:48:00.000Z',
}

const users: Array<Omit<OrgUser, 'id' | 'invitedAt'>> = [
  { name: 'James Joy', email: 'jamesjoy@xyz.com', status: 'active', role: 'admin', phiAccess: true, ownership: 'owner', mfa: 'active' },
  { name: 'Rocky Smith', email: 'rocky.smith@docmd.com', status: 'active', role: 'developer', phiAccess: true, ownership: 'sub-user', mfa: 'active' },
  { name: 'Avhi Patel', email: 'avhi.patel@docmd.com', status: 'active', role: 'developer', phiAccess: false, ownership: 'sub-user', mfa: 'inactive' },
  { name: 'Grace Deo', email: 'grace.deo@docmd.com', status: 'active', role: 'viewer', phiAccess: false, ownership: 'sub-user', mfa: 'inactive' },
  { name: 'Rocky Adel', email: 'rocky.adel@docmd.com', status: 'pending', role: 'developer', phiAccess: true, ownership: 'sub-user', mfa: 'inactive' },
  { name: 'Maria Garcia', email: 'maria.garcia@docmd.com', status: 'pending', role: 'viewer', phiAccess: false, ownership: 'sub-user', mfa: 'inactive' },
]

export const orgUsersSeed: Array<OrgUser> = users.map((user, index) => ({
  id: `usr_${String(index + 1).padStart(3, '0')}`,
  invitedAt: minutesAgo(index * 4000),
  ...user,
}))

export const mfaDevicesSeed: Array<MfaDevice> = [
  {
    id: 'mfa_001',
    method: 'app',
    name: 'One Plus 4s',
    appName: 'Google Authenticator',
    description: 'Authenticator app level 2',
    authenticatedAt: '2026-01-22T16:30:00.000Z',
  },
  {
    id: 'mfa_002',
    method: 'key',
    name: 'Security Key SL',
    description: 'Hardware security key',
    authenticatedAt: '2026-02-22T16:30:00.000Z',
  },
]
