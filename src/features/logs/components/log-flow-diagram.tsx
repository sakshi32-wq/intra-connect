import { Fragment } from 'react'
import { CircleCheck, CircleX } from 'lucide-react'

import type { LogStep } from '../types'
import { cn } from '#/lib/utils'

interface LogFlowDiagramProps {
  steps: ReadonlyArray<LogStep>
  selected: number | null
  onSelect: (index: number) => void
}

const COLUMNS = [
  { label: 'Practices', className: 'col-start-1 text-primary' },
  { label: 'Intraconnects', className: 'col-start-3 text-foreground' },
  { label: 'EHR', className: 'col-start-5 text-primary' },
] as const

/**
 * Thin connector with an open chevron head (Logs 1): grey left → right (1px #75818C, sampled;
 * closest token muted-foreground), primary for the row-1 → row-2 drop.
 */
function Arrow({ direction, className }: { direction: 'right' | 'down'; className?: string }) {
  const down = direction === 'down'
  return (
    <span
      aria-hidden
      className={cn(
        'relative flex items-center justify-center',
        down ? 'text-primary' : 'text-muted-foreground',
        className,
      )}
    >
      <span className={cn('bg-current', down ? 'h-full w-px' : 'h-px w-full')} />
      <svg
        viewBox={down ? '0 0 18 10' : '0 0 10 18'}
        className={cn(
          'absolute fill-none stroke-current stroke-[1.5]',
          down ? 'bottom-0 h-2.5 w-[18px]' : 'right-0 h-[18px] w-2.5',
        )}
      >
        <path d={down ? 'M1 1l8 8 8-8' : 'M1 1l8 8-8 8'} />
      </svg>
    </span>
  )
}

function FlowNode({ step, selected, onSelect }: { step: LogStep; selected: boolean; onSelect: () => void }) {
  const StatusIcon = step.status === 'failed' ? CircleX : CircleCheck
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        'flex h-[66px] min-w-0 flex-col justify-center rounded-[3px] border border-primary px-[17px] text-left transition-colors outline-none',
        'focus-visible:ring-[3px] focus-visible:ring-ring/50',
        selected ? 'bg-primary text-primary-foreground' : 'bg-white text-foreground hover:bg-secondary',
      )}
    >
      <span className="flex items-center gap-2">
        <StatusIcon
          aria-hidden
          className={cn(
            'size-6 shrink-0 stroke-[1.75]',
            selected ? 'text-primary-foreground' : step.status === 'failed' ? 'text-destructive' : 'text-success',
          )}
        />
        <span className="truncate text-base font-semibold">{step.title}</span>
        <span className="sr-only">({step.status})</span>
      </span>
      <span className={cn('mt-[3px] truncate text-[13px] leading-4', selected ? null : 'text-muted-foreground')}>
        Involved: {step.involved}
      </span>
    </button>
  )
}

/**
 * The selected log's 2×3 flow (Logs 1): request round on row 1, response round on row 2,
 * columns Practices · Intraconnects · EHR. What a selected node reveals is not designed yet.
 */
export function LogFlowDiagram({ steps, selected, onSelect }: LogFlowDiagramProps) {
  const rows = [steps.slice(0, 3), steps.slice(3, 6)]
  return (
    <div className="rounded-lg bg-secondary px-7 pt-[21px] pb-[22px] shadow-panel">
      <div className="grid grid-cols-[minmax(0,215px)_minmax(40px,1fr)_minmax(0,215px)_minmax(40px,1fr)_minmax(0,215px)] grid-rows-[66px_21px_66px_auto]">
        {rows.map((row, rowIndex) => (
          <Fragment key={rowIndex}>
            {row.map((step, columnIndex) => {
              const index = rowIndex * 3 + columnIndex
              return (
                <Fragment key={index}>
                  {columnIndex > 0 ? <Arrow direction="right" /> : null}
                  <FlowNode step={step} selected={selected === index} onSelect={() => onSelect(index)} />
                </Fragment>
              )
            })}
            {rowIndex === 0 ? (
              <Arrow direction="down" className="col-start-5" />
            ) : null}
          </Fragment>
        ))}
        {COLUMNS.map((column) => (
          <span key={column.label} className={cn('mt-[23px] text-center text-base font-semibold', column.className)}>
            {column.label}
          </span>
        ))}
      </div>
    </div>
  )
}
