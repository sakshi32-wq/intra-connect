import type { ActiveStatus, Ehr } from '#/features/connections/types'

export interface Practice {
  id: string
  name: string
  email: string
  npi: string
  contact: string
  website?: string
  specialties: Array<string>
  address1: string
  address2?: string
  city: string
  state: string
  zip: string
  status: ActiveStatus
  customerId: string
  createdAt: string
}

/** The single EHR connection attached to a practice (SCREEN_MAP Q17). */
export interface PracticeConnection {
  practiceId: string
  ehr: Ehr
  /** Connection ids per enabled app type. */
  appTypes: { patient?: string; provider?: string }
  ehrPracticeId: string
  status: ActiveStatus
}

export type Gender = 'male' | 'female'

export interface Provider {
  id: string
  practiceId: string
  name: string
  gender: Gender
  serviceType: string
  ehrId: string
  npiId: string
  status: ActiveStatus
}

export interface Patient {
  id: string
  practiceId: string
  name: string
  gender: Gender
  dob: string
  serviceUse: string
  ehrId: string
  status: ActiveStatus
}
