import type { Ehr } from '#/features/connections/types'

export const LOG_STATUSES = ['successful', 'failed'] as const
export type LogStatus = (typeof LOG_STATUSES)[number]

export const LOG_EVENTS = ['create', 'update', 'delete', 'read'] as const
export type LogEvent = (typeof LOG_EVENTS)[number]

export type LogLane = 'practice' | 'intraconnects' | 'ehr'

export interface LogStep {
  title: string
  lane: LogLane
  involved: string
  status: LogStatus
}

export interface Log {
  id: string
  practiceId: string
  ehr: Ehr
  dataModel: string
  event: LogEvent
  logType: 'request' | 'response'
  status: LogStatus
  timestamp: string
  /** Six steps, drawn as a 2×3 grid (Practices · Intraconnects · EHR). */
  steps: Array<LogStep>
}
