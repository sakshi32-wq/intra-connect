// Static sample data for the Logs UI (values from frame "Logs 1", typos corrected per
// SCREEN_MAP §6: "Data Modal" → "Data Model", "Diagosticrepory" → "DiagnosticReport").
// Replaced by api.ts when integration resumes.
import type { Log, LogEvent, LogStatus, LogStep } from './types'
import { ehrName } from '#/components/ehr-logo'
import type { Ehr } from '#/features/connections/types'
import { samplePractices } from '#/features/practices/sample-data'

export const LOG_DATA_MODELS = [
  'DiagnosticReport.claim',
  'Patient.demographics',
  'Appointment.booking',
  'Observation.vitals',
  'Encounter.summary',
  'MedicationRequest.order',
] as const

// Bombay Hospital first, as drawn on every card in the frame.
const PRACTICE_CYCLE = ['prc_002', 'prc_002', 'prc_001', 'prc_003', 'prc_002', 'prc_004', 'prc_008']
const EHR_CYCLE: Array<Ehr> = ['epic', 'epic', 'athenahealth', 'cerner', 'epic', 'nextgen', 'drchrono']
const EVENT_CYCLE: Array<LogEvent> = ['update', 'update', 'update', 'create', 'update', 'read', 'delete']

/** Stand-ins for the opaque IDs on the frame ("3a1e9fgcxw-scv aatfdsrw=hvsfxAaerc"). */
function sampleLogId(index: number) {
  if (index === 0) return '3a1e9fgcxw-scvaatfdsrw-hvsfxAaerc'
  const alphabet = 'abcdefghijkmnpqrstuvwxyz0123456789'
  let seed = 7919 * (index + 3)
  const chars = Array.from({ length: 30 }, () => {
    seed = (Math.imul(seed, 1103515245) + 12345) >>> 0
    return alphabet[seed % alphabet.length]
  })
  return `${chars.slice(0, 10).join('')}-${chars.slice(10, 21).join('')}-${chars.slice(21).join('')}`
}

/**
 * The 2×3 flow grid: row 1 is the request round, row 2 the response round. When a log
 * failed, the step at `failedAt` and every step after it are marked failed.
 */
function sampleSteps(practiceName: string, ehr: Ehr, failedAt?: number): Array<LogStep> {
  const round: Array<Omit<LogStep, 'status'>> = [
    { title: 'IC Request', lane: 'practice', involved: practiceName },
    { title: 'IC Request', lane: 'intraconnects', involved: 'Intraconnects' },
    { title: 'EHR Response', lane: 'ehr', involved: ehrName(ehr) },
  ]
  return [...round, ...round].map((step, index) => ({
    ...step,
    status: failedAt !== undefined && index >= failedAt ? 'failed' : 'successful',
  }))
}

const START = Date.UTC(2023, 3, 12, 0, 30)

export const sampleLogs: Array<Log> = Array.from({ length: 24 }, (_, index) => {
  const practiceId = PRACTICE_CYCLE[index % PRACTICE_CYCLE.length]
  const practice = samplePractices.find((candidate) => candidate.id === practiceId) ?? samplePractices[0]
  const ehr = EHR_CYCLE[index % EHR_CYCLE.length]
  const status: LogStatus = index % 5 === 1 ? 'failed' : 'successful'
  return {
    id: sampleLogId(index),
    practiceId: practice.id,
    ehr,
    dataModel: LOG_DATA_MODELS[index % 4 === 0 ? 0 : index % LOG_DATA_MODELS.length],
    event: EVENT_CYCLE[index % EVENT_CYCLE.length],
    logType: index % 3 === 2 ? 'response' : 'request',
    status,
    // Newest first: one entry every 3h 15m going back from 12 Apr 2023 12:30 AM.
    timestamp: new Date(START - index * 195 * 60_000).toISOString(),
    steps: sampleSteps(practice.name, ehr, status === 'failed' ? 2 + (index % 4) : undefined),
  }
})
