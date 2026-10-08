import type { Ehr } from '#/features/connections/types'
import type {
  Gender,
  Patient,
  Practice,
  PracticeConnection,
  Provider,
} from '#/features/practices/types'
import { createRandom, minutesAgo, padId } from '../seed'
import { connectionsSeed } from './connections'

const random = createRandom(7)

export const SPECIALTIES = [
  'Orthopedic',
  'Physiotherapy',
  'Neurology',
  'Psychology',
  'Physicians',
  'Acupuncture',
  'Cardiology',
  'Dermatology',
  'Pediatrics',
  'Dental Health',
] as const

const NAME_PREFIXES = [
  'Pace',
  'Bombay',
  'Milaan',
  'Pune',
  'Medicover',
  'Birla',
  'Asia Cosmetic',
  'Ruby Hall',
  'Sahyadri',
  'Lakeside',
]
const NAME_SUFFIXES = [
  'Hospital',
  'Clinic',
  'Medical Center',
  'Health Care',
  'Diagnostics',
  'Specialty Hospital',
  "Children's Hospital",
  'Care Center',
  'Eye Hospital',
  'Wellness Clinic',
]
const CITIES: Array<[city: string, state: string, zip: string]> = [
  ['Hampton', 'Virginia', '23669'],
  ['New York', 'New York', '10016'],
  ['Boston', 'Massachusetts', '02115'],
  ['Denver', 'Colorado', '80218'],
  ['Austin', 'Texas', '78705'],
  ['Seattle', 'Washington', '98104'],
  ['Chicago', 'Illinois', '60611'],
  ['Phoenix', 'Arizona', '85006'],
]
const STREETS = ['St Johns Street', 'Maple Avenue', 'Oak Lane', 'Park Road', 'Cedar Drive']

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '')
}

// Pace Hospital carries the values from the detail frames (22, 28, 63).
const PACE_HOSPITAL: Partial<Practice> = {
  email: 'pace.hospital@gmail.com',
  contact: '(457) 974-7574',
  npi: '2735362925',
  specialties: ['Orthopedic', 'Physiotherapy', 'Neurology', 'Psychology', 'Physicians', 'Acupuncture'],
  address1: '3287, St Johns Street',
  address2: undefined,
  city: 'Hampton',
  state: 'Virginia',
  zip: '23669',
  status: 'active',
  customerId: '27353629257',
}

export const practicesSeed: Array<Practice> = NAME_SUFFIXES.flatMap((suffix) =>
  NAME_PREFIXES.map((prefix) => `${prefix} ${suffix}`),
).map((name, index) => {
  const [city, state, zip] = random.pick(CITIES)
  const specialties = SPECIALTIES.filter(() => random.chance(0.35))
  return {
    id: padId('prc', index),
    name,
    email: `${slug(name)}@gmail.com`,
    npi: random.digits(10),
    contact: `(${random.digits(3)}) ${random.digits(3)}-${random.digits(4)}`,
    website: random.chance(0.8) ? `https://www.${slug(name)}.com` : undefined,
    specialties: specialties.length ? specialties : ['Physicians'],
    address1: `${random.int(100, 9999)}, ${random.pick(STREETS)}`,
    address2: random.chance(0.3) ? `Suite ${random.int(1, 40)}` : undefined,
    city,
    state,
    zip,
    status: random.chance(0.15) ? 'inactive' : 'active',
    customerId: random.digits(11),
    createdAt: minutesAgo(index * 720 + random.int(0, 300)),
    ...(index === 0 ? PACE_HOSPITAL : {}),
  }
})

/** Every third practice has no EHR connection yet (frames 27 and 46). */
export function hasConnection(index: number) {
  return index % 3 !== 2
}

export const practiceConnectionsSeed: Array<PracticeConnection> = practicesSeed
  .filter((_, index) => hasConnection(index))
  .map((practice) => {
    const ehr = random.pick<Ehr>(['epic', 'athenahealth', 'cerner', 'nextgen', 'drchrono'])
    const ofEhr = connectionsSeed.filter((connection) => connection.ehr === ehr)
    const patient = ofEhr.find((connection) => connection.appType === 'patient')
    const provider = ofEhr.find((connection) => connection.appType === 'provider')
    return {
      practiceId: practice.id,
      ehr,
      appTypes: {
        patient: patient?.id,
        provider: random.chance(0.6) ? provider?.id : undefined,
      },
      ehrPracticeId: `${ehr.charAt(0).toUpperCase()}-${random.digits(6)}`,
      status: practice.status,
    }
  })

const FIRST_NAMES: Array<[string, Gender]> = [
  ['Rocky', 'male'],
  ['Jerry', 'male'],
  ['Grace', 'female'],
  ['John', 'male'],
  ['Priya', 'female'],
  ['Maria', 'female'],
  ['David', 'male'],
  ['Aisha', 'female'],
  ['Samuel', 'male'],
  ['Elena', 'female'],
]
const LAST_NAMES = ['Joy', 'Smith', 'Deo', 'Adel', 'Patel', 'Garcia', 'Kim', 'Khan', 'Brown', 'Rossi']
const SERVICES = [
  'Neurosurgeon',
  'Physiotherapist',
  'Dental Health',
  'Orthodontist',
  'Cardiologist',
  'Dermatologist',
  'Pediatrician',
]

function person(seedIndex: number): [string, Gender] {
  const [first, gender] = FIRST_NAMES[seedIndex % FIRST_NAMES.length]
  const last = LAST_NAMES[Math.floor(seedIndex / FIRST_NAMES.length) % LAST_NAMES.length]
  return [`${first} ${last}`, gender]
}

export const providersSeed: Array<Provider> = practicesSeed.flatMap((practice, practiceIndex) =>
  Array.from({ length: random.int(4, 8) }, (_, index) => {
    const [name, gender] = person(practiceIndex * 3 + index * 11)
    return {
      id: `${practice.id}_prv_${index + 1}`,
      practiceId: practice.id,
      name,
      gender,
      serviceType: random.pick(SERVICES),
      ehrId: `${random.digits(3)}g${random.digits(4)}`,
      npiId: random.digits(5),
      status: random.chance(0.2) ? 'inactive' : 'active',
    }
  }),
)

export const patientsSeed: Array<Patient> = practicesSeed.flatMap((practice, practiceIndex) =>
  Array.from({ length: random.int(5, 10) }, (_, index) => {
    const [name, gender] = person(practiceIndex * 7 + index * 13 + 5)
    const year = random.int(1950, 2015)
    const month = String(random.int(1, 12)).padStart(2, '0')
    const day = String(random.int(1, 28)).padStart(2, '0')
    return {
      id: `${practice.id}_pat_${index + 1}`,
      practiceId: practice.id,
      name,
      gender,
      dob: `${year}-${month}-${day}`,
      serviceUse: random.pick(SERVICES),
      ehrId: `${random.digits(3)}g${random.digits(4)}`,
      status: random.chance(0.1) ? 'inactive' : 'active',
    }
  }),
)
