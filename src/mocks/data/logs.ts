import type { Ehr } from '#/features/connections/types'
import type { Log, LogEvent, LogStatus, LogStep } from '#/features/logs/types'
import { createRandom, minutesAgo } from '../seed'
import { practiceConnectionsSeed, practicesSeed } from './practices'

const random = createRandom(91)

const DATA_MODELS = [
  'DiagnosticReport.claim',
  'Patient.demographics',
  'Appointment.schedule',
  'Observation.vitals',
  'Encounter.summary',
  'MedicationRequest.order',
]

const EHR_NAME: Record<Ehr, string> = {
  athenahealth: 'Athenahealth',
  epic: 'Epic',
  cerner: 'Cerner',
  nextgen: 'NextGen',
  drchrono: 'DrChrono',
}

function logId() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  const part = (length: number) =>
    Array.from({ length }, () => random.pick(chars.split(''))).join('')
  return `${part(10)}-${part(3)}-${part(8)}${part(6)}`
}

function steps(practiceName: string, ehr: Ehr, status: LogStatus): Array<LogStep> {
  // A failed log fails at a random step; later steps inherit the failure.
  const failAt = status === 'failed' ? random.int(1, 5) : 6
  const row = (title: string, lane: LogStep['lane'], involved: string): Omit<LogStep, 'status'> => ({
    title,
    lane,
    involved,
  })
  return [
    row('IC Request', 'practice', practiceName),
    row('IC Request', 'intraconnects', 'Intraconnects'),
    row('EHR Response', 'ehr', EHR_NAME[ehr]),
    row('IC Request', 'practice', practiceName),
    row('IC Request', 'intraconnects', 'Intraconnects'),
    row('EHR Response', 'ehr', EHR_NAME[ehr]),
  ].map((step, index) => ({ ...step, status: index < failAt ? 'successful' : 'failed' }))
}

export const logsSeed: Array<Log> = Array.from({ length: 64 }, (_, index) => {
  const link = random.pick(practiceConnectionsSeed)
  const practice = practicesSeed.find(({ id }) => id === link.practiceId)
  const status: LogStatus = random.chance(0.2) ? 'failed' : 'successful'
  return {
    id: logId(),
    practiceId: link.practiceId,
    ehr: link.ehr,
    dataModel: random.pick(DATA_MODELS),
    event: random.pick<LogEvent>(['update', 'update', 'create', 'read', 'delete']),
    logType: 'request',
    status,
    timestamp: minutesAgo(index * 47 + random.int(0, 40)),
    steps: steps(practice?.name ?? 'Practice', link.ehr, status),
  }
})
