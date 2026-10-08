import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { EMPTY_LOG_FILTERS, LOG_FILTER_OPTIONS, logFiltersSchema } from '../filters'
import type { LogFilters } from '../filters'
import { FormActions } from '#/components/form-actions'
import { SelectField } from '#/components/form-fields'
import { Button } from '#/components/ui/button'
import { Form } from '#/components/ui/form'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '#/components/ui/sheet'

interface LogsFilterSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  applied: LogFilters
  onApply: (filters: LogFilters) => void
}

const FIELDS: ReadonlyArray<{ name: keyof LogFilters; label: string; placeholder: string }> = [
  { name: 'ehr', label: 'EHR Connection', placeholder: 'Filter by EHR' },
  { name: 'practiceId', label: 'Practices', placeholder: 'Filter by practices' },
  { name: 'dataModel', label: 'Data Model', placeholder: 'Filter by data model' },
  { name: 'event', label: 'Event Type', placeholder: 'Filter by event type' },
  { name: 'status', label: 'Status', placeholder: 'Filter by status' },
]

/** Draft form; mounted each time the sheet opens so it starts from the applied filters. */
function FilterForm({ applied, onApply }: Pick<LogsFilterSheetProps, 'applied' | 'onApply'>) {
  const form = useForm<LogFilters>({ resolver: zodResolver(logFiltersSchema), defaultValues: applied })

  const clear = () => {
    form.reset(EMPTY_LOG_FILTERS)
    onApply(EMPTY_LOG_FILTERS)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onApply)} className="flex flex-col gap-[35px] px-[41px] pt-[35px] pb-8 [&_[data-slot=select-trigger]>svg]:opacity-100">
        {FIELDS.map((field) => (
          <SelectField
            key={field.name}
            control={form.control}
            name={field.name}
            label={field.label}
            placeholder={field.placeholder}
            options={LOG_FILTER_OPTIONS[field.name]}
          />
        ))}
        <FormActions>
          <Button type="button" variant="outline" onClick={clear}>
            Clear filters
          </Button>
          <Button type="submit">Apply Filters</Button>
        </FormActions>
      </form>
    </Form>
  )
}

/** "Filter the logs by" (Frame 1): a 591px right sheet with five selects. */
export function LogsFilterSheet({ open, onOpenChange, applied, onApply }: LogsFilterSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full gap-0 overflow-y-auto border-l-0 p-0 sm:max-w-[591px] [&>button:last-child]:top-[37px] [&>button:last-child]:right-[41px] [&>button:last-child>svg]:size-6"
      >
        <SheetHeader className="h-[98px] shrink-0 justify-center px-[41px] py-0 shadow-sheet-header">
          <SheetTitle className="text-title font-normal">Filter the logs by</SheetTitle>
          <SheetDescription className="sr-only">
            Narrow the logs list by EHR connection, practice, data model, event type and status.
          </SheetDescription>
        </SheetHeader>
        <FilterForm applied={applied} onApply={onApply} />
      </SheetContent>
    </Sheet>
  )
}
