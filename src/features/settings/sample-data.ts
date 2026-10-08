// Static sample data for the Setting UI (frames Setting, 8–20; typos corrected per
// SCREEN_MAP §6.2). Replaced by api.ts queries when integration resumes.
import type { CurrentUser, MfaDevice, MfaMethod, Organisation, OrgUser, UserRole } from './types'

export const SAMPLE_ORGANISATION: Organisation = {
  name: 'DocMD',
  overview:
    'DocMD builds patient engagement software for independent practices and connects to their EHRs through Intraconnects.',
  alertEmail: 'alerts@docmd.com',
  salesEmail: 'sales@docmd.com',
  contact: '(415) 555-0142',
  website: 'https://www.docmd.com',
  twitter: '@docmd',
  category: 'healthcare-platform',
  envType: 'production',
}

// Option lists are not designed (SCREEN_MAP Q12); these are the documented defaults.
export const CATEGORY_OPTIONS = [
  { value: 'healthcare-platform', label: 'Healthcare Platform' },
  { value: 'practice-management', label: 'Practice Management' },
  { value: 'telehealth', label: 'Telehealth' },
  { value: 'patient-engagement', label: 'Patient Engagement' },
] as const

export const ENV_TYPE_OPTIONS = [
  { value: 'production', label: 'Production' },
  { value: 'sandbox', label: 'Sandbox' },
] as const

export const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Admin',
  developer: 'Developer',
  viewer: 'Viewer',
}

export const ROLE_OPTIONS = Object.entries(ROLE_LABELS).map(([value, label]) => ({ value, label }))

/** Frame 9: two pending invites, two active users (the design repeats one e-mail; made unique here). */
export const SAMPLE_ORG_USERS: ReadonlyArray<OrgUser> = [
  {
    id: 'usr_101',
    name: 'Rocky',
    email: 'rocky.adel@gmail.com',
    status: 'pending',
    role: 'developer',
    phiAccess: true,
    ownership: 'owner',
    mfa: 'inactive',
    invitedAt: '2026-09-30T10:15:00.000Z',
  },
  {
    id: 'usr_102',
    name: 'James',
    email: 'james.jpy@gmail.com',
    status: 'pending',
    role: 'developer',
    phiAccess: true,
    ownership: 'owner',
    mfa: 'inactive',
    invitedAt: '2026-10-02T09:40:00.000Z',
  },
  {
    id: 'usr_103',
    name: 'Rocky',
    email: 'rocky.smith@gmail.com',
    status: 'active',
    role: 'developer',
    phiAccess: true,
    ownership: 'sub-user',
    mfa: 'active',
    invitedAt: '2026-06-12T14:05:00.000Z',
  },
  {
    id: 'usr_104',
    name: 'Avhi',
    email: 'avhi.patel@gmail.com',
    status: 'active',
    role: 'developer',
    phiAccess: true,
    ownership: 'sub-user',
    mfa: 'inactive',
    invitedAt: '2026-07-21T11:30:00.000Z',
  },
]

export const SAMPLE_CURRENT_USER: CurrentUser = {
  id: 'usr_001',
  name: 'James Joy',
  email: 'jamesjoy@xyz.com',
  contact: '(415) 555-0187',
  passwordUpdatedAt: '2021-01-23T15:48:00',
}

/** Frame 14 devices; also the device shown on the MFA success screens (13, 17). */
export const SAMPLE_MFA_DEVICES: Readonly<Record<MfaMethod, MfaDevice>> = {
  app: {
    id: 'mfa_001',
    method: 'app',
    name: 'One Plus 4s',
    appName: 'Google Authenticator',
    description: 'Authenticator app level 2',
    authenticatedAt: '2022-01-22T16:30:00',
  },
  key: {
    id: 'mfa_002',
    method: 'key',
    name: 'Security Key SL',
    description: 'Key',
    authenticatedAt: '2023-01-22T16:30:00',
  },
}

/** Frame 16 "Security Credentials" (static U2F registration details). */
export const SAMPLE_U2F_CREDENTIALS = {
  userArn: 'dsoifhjoinjcxvoi/aiushfdiu',
  path: 'dsoifhjoinjcxvoi/aiushfdiu',
  createdAt: '2022-01-22T16:30:00',
}

/** Secret behind the frame 12 QR code (copied by "Copy secret key"). */
export const SAMPLE_TOTP_SECRET = 'JBSWY3DPEHPK3PXPJBSWY3DPEHPK3PXP'
