import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'

import { fieldControlClass } from '#/components/form-fields'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '#/components/ui/form'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '#/components/ui/input-group'
import { cn } from '#/lib/utils'

interface PasswordFieldProps<T extends FieldValues> {
  control: Control<T>
  name: FieldPath<T>
  label: string
  placeholder: string
  autoComplete: 'current-password' | 'new-password'
}

/** App-styled password input (frame 15) with a show/hide toggle. */
export function PasswordField<T extends FieldValues>({ control, name, label, placeholder, autoComplete }: PasswordFieldProps<T>) {
  const [visible, setVisible] = useState(false)
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="gap-[7px]">
          <FormLabel className="text-lg font-semibold text-foreground">{label}</FormLabel>
          <InputGroup className={cn(fieldControlClass, 'px-0 has-[[data-slot=input-group-control]:focus-visible]:ring-[3px]')}>
            <FormControl>
              <InputGroupInput
                type={visible ? 'text' : 'password'}
                placeholder={placeholder}
                autoComplete={autoComplete}
                className="h-full px-[15px] text-md placeholder:text-muted-foreground md:text-md"
                {...field}
                value={field.value ?? ''}
              />
            </FormControl>
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                size="icon-sm"
                aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
                onClick={() => setVisible((value) => !value)}
              >
                {visible ? <Eye /> : <EyeOff />}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <FormMessage className="text-base" />
        </FormItem>
      )}
    />
  )
}
