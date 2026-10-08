import type { Log } from './types'
import { samplePractices } from '#/features/practices/sample-data'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const capitalize = (value: string) => value.charAt(0).toUpperCase() + value.slice(1)

/** "12 Apr, 2023 12:30 AM" (Logs 1). Rendered in UTC so the sample data reads the same everywhere. */
export function formatLogTimestamp(iso: string) {
  const date = new Date(iso)
  const hours = date.getUTCHours()
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  const hour12 = String(hours % 12 === 0 ? 12 : hours % 12).padStart(2, '0')
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]}, ${date.getUTCFullYear()} ${hour12}:${minutes} ${hours < 12 ? 'AM' : 'PM'}`
}

/** Card strip value, e.g. "Bombay. DiagnosticReport.claim" (practice short name + resource). */
export function logDataModelLabel(log: Log) {
  const practice = samplePractices.find((candidate) => candidate.id === log.practiceId)
  const short = practice?.name.split(' ')[0]
  return short ? `${short}. ${log.dataModel}` : log.dataModel
}
