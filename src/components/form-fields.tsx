import type { Control, FieldPath, FieldValues } from 'react-hook-form'

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '#/components/ui/form'
import { Input } from '#/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#/components/ui/select'
import { Textarea } from '#/components/ui/textarea'
import { cn } from '#/lib/utils'

/** App form control styling (Setting, 60): 46px, #BFBFBF border, 18px text. */
export const fieldControlClass =
  'h-[46px] rounded-md border-input bg-white px-[15px] text-md text-foreground shadow-none placeholder:text-muted-foreground md:text-md'

interface BaseFieldProps<T extends FieldValues> {
  control: Control<T>
  name: FieldPath<T>
  label: string
  required?: boolean
  description?: string
  className?: string
}

function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <FormLabel className="text-lg font-semibold text-foreground">
      {label}
      {required ? <span className="-ml-1.5 text-destructive" aria-hidden>*</span> : null}
    </FormLabel>
  )
}

export function TextField<T extends FieldValues>({
  control,
  name,
  label,
  required,
  description,
  className,
  placeholder,
  type = 'text',
  multiline,
  readOnly,
  autoComplete,
}: BaseFieldProps<T> & {
  placeholder?: string
  type?: React.HTMLInputTypeAttribute
  multiline?: boolean
  readOnly?: boolean
  autoComplete?: string
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('gap-[7px]', className)}>
          <FieldLabel label={label} required={required} />
          <FormControl>
            {multiline ? (
              <Textarea
                placeholder={placeholder}
                readOnly={readOnly}
                className={cn(fieldControlClass, 'h-[73px] min-h-[73px] resize-y py-2.5')}
                {...field}
                value={field.value ?? ''}
              />
            ) : (
              <Input
                type={type}
                placeholder={placeholder}
                readOnly={readOnly}
                autoComplete={autoComplete}
                aria-required={required || undefined}
                className={cn(fieldControlClass, readOnly && 'bg-muted')}
                {...field}
                value={field.value ?? ''}
              />
            )}
          </FormControl>
          {description ? <FormDescription className="text-md text-muted-foreground">{description}</FormDescription> : null}
          <FormMessage className="text-base" />
        </FormItem>
      )}
    />
  )
}

export function SelectField<T extends FieldValues>({
  control,
  name,
  label,
  required,
  description,
  className,
  placeholder,
  options,
}: BaseFieldProps<T> & { placeholder: string; options: ReadonlyArray<{ value: string; label: string }> }) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('gap-[7px]', className)}>
          <FieldLabel label={label} required={required} />
          <Select value={field.value ?? ''} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger
                className={cn(fieldControlClass, 'w-full data-[placeholder]:text-muted-foreground data-[size=default]:h-[46px] [&>svg]:size-5')}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value} className="text-base">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description ? <FormDescription className="text-md text-muted-foreground">{description}</FormDescription> : null}
          <FormMessage className="text-base" />
        </FormItem>
      )}
    />
  )
}
