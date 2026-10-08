// Static sample data for the Practices UI (values from frames Practices, 22–51,
// typos corrected per SCREEN_MAP §6.2). Replaced by api.ts when integration resumes.
import type { Patient, Practice, PracticeConnection, Provider } from './types'
import type { Webhook } from '#/features/webhooks/types'

const LOCATIONS: Array<[city: string, state: string]> = [
  ['Hampton', 'Virginia'],
  ['New York', 'New York'],
  ['Boston', 'Massachusetts'],
  ['Denver', 'Colorado'],
  ['Hampton', 'Virginia'],
  ['Boston', 'Massachusetts'],
  ['New York', 'New York'],
  ['Denver', 'Colorado'],
  ['Hampton', 'Virginia'],
  ['Boston', 'Massachusetts'],
]

const NAMES = [
  'Pace Hospital',
  'Bombay Hospital',
  'Milaan Hospital',
  'Pune Hospital',
  'Medicover Hospital',
  'Midcover Hospital',
  'Millan Hospital',
  'Birla Hospital',
  'Asia Cosmetic Hospital',
  'Ruby Hall Clinic',
]

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '')
}

export const SPECIALTIES = [
  'Orthopedic',
  'Physiotherapy',
  'Neuro-special',
  'Psychology',
  'Physicians',
  'Acupuncturist',
  'Cardiology',
  'Dermatology',
] as const

export const samplePractices: Array<Practice> = NAMES.map((name, index) => ({
  id: `prc_${String(index + 1).padStart(3, '0')}`,
  name,
  email: index === 0 ? 'pace.hospital@gmail.com' : `${slug(name)}@gmail.com`,
  npi: index === 0 ? '27353629257' : String(27353629257 + index * 7919),
  contact: index === 0 ? '(457) 974-7574' : `(${326 + index}) 585-83${String(10 + index)}`,
  website: `https://www.${slug(name)}.com`,
  specialties: index === 0 ? [...SPECIALTIES.slice(0, 6)] : ['Physicians', 'Physiotherapy'],
  address1: index === 0 ? '3287, St Johns Street' : `${120 + index * 37}, Maple Avenue`,
  address2: index === 0 ? undefined : 'Suite 4',
  city: LOCATIONS[index][0],
  state: LOCATIONS[index][1],
  zip: index === 0 ? '116488' : String(23660 + index),
  status: index === 2 || index === 6 ? 'inactive' : 'active',
  customerId: index === 0 ? '27353629257' : String(48210000000 + index * 1337),
  createdAt: '2026-09-30T10:00:00.000Z',
}))

/** Total rows the list footer reports ("Showing 1 to 10 of 100 Entries"). */
export const SAMPLE_PRACTICE_TOTAL = 100

export const samplePractice = samplePractices[0]

export const samplePracticeConnection: PracticeConnection = {
  practiceId: samplePractice.id,
  ehr: 'epic',
  appTypes: { patient: 'EpicPatient13', provider: 'EpicTest12' },
  ehrPracticeId: 'E-463877',
  status: 'active',
}

export const sampleProviders: Array<Provider> = [
  ['Rocky Joy', 'male', 'Neurosurgeon', '473g4850', '46527', 'active'],
  ['Jerry Smith', 'male', 'Physiotherapist', '973g2250', '43351', 'active'],
  ['Grace Deo', 'female', 'Dental Health', '857g3751', '95738', 'inactive'],
  ['John Adel', 'male', 'Orthodontist', '653g4384', '36388', 'active'],
  ['Priya Patel', 'female', 'Cardiologist', '384g9921', '51842', 'active'],
  ['Maria Garcia', 'female', 'Pediatrician', '219g7743', '62917', 'active'],
].map(([name, gender, serviceType, ehrId, npiId, status], index) => ({
  id: `prv_${index + 1}`,
  practiceId: samplePractice.id,
  name,
  gender: gender as Provider['gender'],
  serviceType,
  ehrId,
  npiId,
  status: status as Provider['status'],
}))

export const samplePatients: Array<Patient> = [
  ['Samuel Brown', 'male', '1989-01-21', 'Orthodontist', '473g4851', 'active'],
  ['Elena Rossi', 'female', '1987-04-23', 'Physiotherapist', '973g2251', 'active'],
  ['David Kim', 'male', '1975-09-02', 'Cardiologist', '857g3752', 'inactive'],
  ['Aisha Khan', 'female', '1994-12-11', 'Dermatologist', '653g4385', 'active'],
  ['John Smith', 'male', '2001-06-30', 'Pediatrician', '384g9922', 'active'],
].map(([name, gender, dob, serviceUse, ehrId, status], index) => ({
  id: `pat_${index + 1}`,
  practiceId: samplePractice.id,
  name,
  gender: gender as Patient['gender'],
  dob,
  serviceUse,
  ehrId,
  status: status as Patient['status'],
}))

export const sampleWebhooks: Array<Webhook> = [
  ['PaceHospitalWebhook', 'https://hooks.pacehospital.com/intraconnects', 'c127da61-4f2e-4b8a-9e1d-7a51c2b9d3e0', true, 'active'],
  ['BombayHospitalWebhook', 'https://hooks.bombayhospital.com/events', 'c2163dkj-dskn-snfskkjdiv7', true, 'active'],
  ['AsiaCosmeticHospitalWebhook', 'https://hooks.asiacosmetic.com/intraconnects', 'cuiewr473-4y7erj-dskjrhu-dsaj', false, 'inactive'],
  ['BirlaHospitalWebhook', 'https://hooks.birlahospital.com/ehr', 'f81d4fae-7dec-11d0-a765-00a0c91e6bf6', true, 'active'],
].map(([name, url, tokenId, verified, status], index) => ({
  id: `whk_${index + 1}`,
  practiceId: samplePractice.id,
  name: name as string,
  url: url as string,
  method: 'POST',
  tokenId: tokenId as string,
  verified: verified as boolean,
  status: status as Webhook['status'],
  createdAt: '2026-09-30T10:00:00.000Z',
}))

/**
 * Practices without an attached EHR connection (drives the empty states in
 * 27 and 46). Milaan Hospital (prc_003) is the sample "not connected" practice.
 */
export function hasSampleConnection(practiceId: string) {
  return practiceId !== 'prc_003'
}
