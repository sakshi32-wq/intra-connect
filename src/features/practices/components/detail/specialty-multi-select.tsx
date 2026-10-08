import { useState } from 'react'
import { Check, ChevronDown, X } from 'lucide-react'

import { fieldControlClass } from '#/components/form-fields'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '#/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '#/components/ui/popover'
import { cn } from '#/lib/utils'

interface SpecialtyMultiSelectProps extends Omit<React.ComponentProps<'button'>, 'value' | 'onChange'> {
  value: ReadonlyArray<string>
  onChange: (value: Array<string>) => void
  options: ReadonlyArray<string>
  placeholder?: string
}

/** "Specialty Provided" picker: a searchable multi-select drawn like the app's selects (23). */
export function SpecialtyMultiSelect({
  value,
  onChange,
  options,
  placeholder = 'Select Specialty',
  className,
  ...triggerProps
}: SpecialtyMultiSelectProps) {
  const [open, setOpen] = useState(false)

  function toggle(option: string) {
    onChange(value.includes(option) ? value.filter((item) => item !== option) : [...value, option])
  }

  return (
    <div className="flex flex-col gap-2.5">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            role="combobox"
            aria-expanded={open}
            className={cn(
              fieldControlClass,
              'flex w-full items-center justify-between border text-left focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive',
              value.length === 0 && 'text-muted-foreground',
              className,
            )}
            {...triggerProps}
          >
            <span className="truncate">{value.length === 0 ? placeholder : `${value.length} selected`}</span>
            <ChevronDown className="size-5 shrink-0 opacity-50" aria-hidden />
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-(--radix-popover-trigger-width) p-0">
          <Command>
            <CommandInput placeholder="Search specialty" />
            <CommandList>
              <CommandEmpty>No specialty found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const selected = value.includes(option)
                  return (
                    <CommandItem key={option} value={option} onSelect={() => toggle(option)} className="text-base">
                      <Check className={cn('size-4', selected ? 'opacity-100' : 'opacity-0')} aria-hidden />
                      {option}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {value.length > 0 ? (
        <ul aria-label="Selected specialties" className="flex flex-wrap gap-2">
          {value.map((item) => (
            <li
              key={item}
              className="inline-flex h-8 items-center gap-1 rounded-sm border border-primary bg-white pr-1 pl-3 text-base text-primary"
            >
              {item}
              <button
                type="button"
                onClick={() => toggle(item)}
                aria-label={`Remove ${item}`}
                className="grid size-6 place-items-center rounded-sm hover:bg-secondary focus-visible:outline-2 focus-visible:outline-ring"
              >
                <X className="size-4" aria-hidden />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
