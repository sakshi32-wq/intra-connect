import { useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import type { Control } from 'react-hook-form'

import { fieldControlClass } from '#/components/form-fields'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '#/components/ui/command'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '#/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '#/components/ui/popover'
import { cn } from '#/lib/utils'
import { SPECIALTIES } from '../../sample-data'
import type { PracticeFormValues } from './practice-form-schema'

/** "Specialty Provided" multi-select (drawn as a single select on Logs/23; review 41 shows several). */
export function SpecialtyField({
  control,
}: {
  control: Control<PracticeFormValues>
}) {
  const [open, setOpen] = useState(false)

  return (
    <FormField
      control={control}
      name="specialties"
      render={({ field }) => {
        const selected = field.value
        const toggle = (specialty: string) =>
          field.onChange(
            selected.includes(specialty)
              ? selected.filter((value) => value !== specialty)
              : [...selected, specialty],
          )
        return (
          <FormItem className="gap-[7px]">
            <FormLabel className="text-lg font-semibold text-foreground">
              Specialty Provided
              <span className="-ml-1.5 text-destructive" aria-hidden>
                *
              </span>
            </FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <button
                    type="button"
                    role="combobox"
                    aria-expanded={open}
                    aria-required
                    onBlur={field.onBlur}
                    ref={field.ref}
                    className={cn(
                      fieldControlClass,
                      'flex w-full items-center justify-between gap-3 border text-left outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive',
                    )}
                  >
                    <span
                      className={cn(
                        'truncate',
                        selected.length === 0 && 'text-muted-foreground',
                      )}
                    >
                      {selected.length > 0
                        ? selected.join(', ')
                        : 'Select Specialty'}
                    </span>
                    <ChevronDown
                      className="size-5 shrink-0 text-muted-foreground"
                      aria-hidden
                    />
                  </button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className="w-(--radix-popover-trigger-width) p-0"
              >
                <Command>
                  <CommandInput
                    placeholder="Search specialty"
                    className="text-base"
                  />
                  <CommandList>
                    <CommandEmpty>No specialty found.</CommandEmpty>
                    <CommandGroup>
                      {SPECIALTIES.map((specialty) => {
                        const checked = selected.includes(specialty)
                        return (
                          <CommandItem
                            key={specialty}
                            value={specialty}
                            onSelect={() => toggle(specialty)}
                            className="text-base text-foreground"
                          >
                            <span
                              aria-hidden
                              className={cn(
                                'grid size-4 place-items-center rounded-[3px] border border-input',
                                checked &&
                                  'border-primary bg-primary text-primary-foreground',
                              )}
                            >
                              {checked ? (
                                <Check
                                  className="size-3 text-primary-foreground"
                                  strokeWidth={3}
                                />
                              ) : null}
                            </span>
                            {specialty}
                            {checked ? (
                              <span className="sr-only">(selected)</span>
                            ) : null}
                          </CommandItem>
                        )
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormDescription className="text-md text-muted-foreground">
              Ex : Physiotherapy. Select every specialty the practice provides
            </FormDescription>
            <FormMessage className="text-base" />
          </FormItem>
        )
      }}
    />
  )
}
