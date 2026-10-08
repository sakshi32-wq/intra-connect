import { Check, Dot } from 'lucide-react'

import { useFormField } from '#/components/ui/form'
import { cn } from '#/lib/utils'
import { PASSWORD_RULES } from '../schemas'

/** Live checklist under the Sign Up password (frame 2 draws it as static bullets). */
/** Rendered inside the password FormItem; doubles as its FormDescription. */
export function PasswordRules({ value, showErrors }: { value: string; showErrors: boolean }) {
  const { formDescriptionId } = useFormField()
  return (
    <ul id={formDescriptionId} className="-ml-[9px] flex flex-col gap-[11px]">
      {PASSWORD_RULES.map((rule) => {
        const met = rule.test(value)
        return (
          <li
            key={rule.id}
            className={cn(
              'flex gap-0.5 text-sm text-muted-foreground',
              met && 'text-success',
              !met && showErrors && 'text-destructive',
            )}
          >
            {met ? (
              <Check className="mt-0.5 size-3.5 shrink-0" aria-hidden />
            ) : (
              <Dot className="-mx-1 size-5 shrink-0" aria-hidden />
            )}
            <span>
              {rule.label}
              <span className="sr-only">{met ? ' (met)' : ' (not met)'}</span>
            </span>
          </li>
        )
      })}
    </ul>
  )
}
