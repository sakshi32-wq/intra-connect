import { z } from 'zod'

import { capitalize } from './format'
import { LOG_DATA_MODELS } from './sample-data'
import { LOG_EVENTS, LOG_STATUSES } from './types'
import type { Log } from './types'
import { ehrName } from '#/components/ehr-logo'
import { EHRS } from '#/features/connections/types'
import { samplePractices } from '#/features/practices/sample-data'

/** Filter-sheet values (Frame 1). An empty string means "any". */
export const logFiltersSchema = z.object({
  ehr: z.string(),
  practiceId: z.string(),
  dataModel: z.string(),
  event: z.string(),
  status: z.string(),
})
export type LogFilters = z.infer<typeof logFiltersSchema>

export const EMPTY_LOG_FILTERS: LogFilters = { ehr: '', practiceId: '', dataModel: '', event: '', status: '' }

export const LOG_FILTER_OPTIONS: Record<keyof LogFilters, ReadonlyArray<{ value: string; label: string }>> = {
  ehr: EHRS.map((ehr) => ({ value: ehr, label: ehrName(ehr) })),
  practiceId: samplePractices.map((practice) => ({ value: practice.id, label: practice.name })),
  dataModel: LOG_DATA_MODELS.map((model) => ({ value: model, label: model })),
  event: LOG_EVENTS.map((event) => ({ value: event, label: capitalize(event) })),
  status: LOG_STATUSES.map((status) => ({ value: status, label: capitalize(status) })),
}

export function activeFilterCount(filters: LogFilters) {
  return Object.values(filters).filter(Boolean).length
}

export function filterLogs(logs: ReadonlyArray<Log>, filters: LogFilters) {
  return logs.filter(
    (log) =>
      (!filters.ehr || log.ehr === filters.ehr) &&
      (!filters.practiceId || log.practiceId === filters.practiceId) &&
      (!filters.dataModel || log.dataModel === filters.dataModel) &&
      (!filters.event || log.event === filters.event) &&
      (!filters.status || log.status === filters.status),
  )
}
