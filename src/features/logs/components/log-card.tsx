import { capitalize, formatLogTimestamp, logDataModelLabel } from '../format'
import type { Log } from '../types'
import { cn } from '#/lib/utils'

interface LogCardProps {
  log: Log
  selected: boolean
  onSelect: () => void
}

function Field({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <span className="flex flex-col items-center first:justify-self-start nth-2:justify-self-center last:justify-self-end">
      <span className="text-xs text-text-strong">{label}</span>
      <span className={cn('mt-0.5 text-base font-semibold text-text-strong', className)}>{value}</span>
    </span>
  )
}

/** One entry of the Logs list (Logs 1). No selected style is drawn; a primary ring marks it. */
export function LogCard({ log, selected, onSelect }: LogCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        'block w-full rounded-md border border-border bg-card px-3 pt-[18px] pb-[19px] text-left shadow-card transition-colors outline-none',
        'hover:border-primary/60 focus-visible:ring-[3px] focus-visible:ring-ring/50',
        selected && 'border-primary ring-1 ring-primary hover:border-primary',
      )}
    >
      <span className="flex h-[52px] flex-col justify-center rounded-md bg-strip px-[13px]">
        <span className="text-xs text-text-strong">Data Model</span>
        <span className="mt-0.5 truncate text-base font-semibold text-text-strong">{logDataModelLabel(log)}</span>
      </span>
      <span className="mt-[17px] grid grid-cols-3 items-start pl-[3px]">
        <Field label="Event" value={capitalize(log.event)} />
        <Field label="Log Type" value={capitalize(log.logType)} />
        <Field
          label="Log Status"
          value={capitalize(log.status)}
          className={log.status === 'failed' ? 'text-destructive' : 'text-success'}
        />
      </span>
      <time dateTime={log.timestamp} className="mt-6 block pl-[3px] text-base text-text-strong">
        {formatLogTimestamp(log.timestamp)}
      </time>
    </button>
  )
}
