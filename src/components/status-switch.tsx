import { useId, useState } from 'react'
import { toast } from 'sonner'

import { Switch } from '#/components/ui/switch'
import { cn } from '#/lib/utils'

interface StatusSwitchProps {
  defaultActive: boolean
  /** Accessible context, e.g. the row name: "Status of TestEpicSystem". */
  label: string
  /** pill = table cell; framed = card header with a caption (28, 35, 63). */
  variant?: 'pill' | 'framed'
  caption?: string
}

/** Green switch + Active/Inactive label in a grey pill. UI-only: toggles local state with a toast. */
export function StatusSwitch({ defaultActive, label, variant = 'pill', caption }: StatusSwitchProps) {
  const [active, setActive] = useState(defaultActive)
  const id = useId()

  const pill = (
    <span className="inline-flex h-[30px] items-center gap-1.5 rounded-full bg-toggle-pill py-[3px] pr-3 pl-[3px]">
      <Switch
        id={id}
        checked={active}
        onCheckedChange={(next) => {
          setActive(next)
          toast.success(`${label.replace(/^Status of /, '')} is now ${next ? 'active' : 'inactive'}`)
        }}
        aria-label={label}
        className="h-6 w-10 data-[size=default]:h-6 data-[size=default]:w-10 data-[state=checked]:bg-success data-[state=unchecked]:bg-toggle-off [&>span]:size-[18px] [&>span]:data-[state=checked]:translate-x-[18px] [&>span]:data-[state=unchecked]:translate-x-[2px]"
      />
      <label htmlFor={id} className="w-[54px] text-base text-muted-foreground">
        {active ? 'Active' : 'Inactive'}
      </label>
    </span>
  )

  if (variant === 'pill') return pill
  return (
    <span className={cn('inline-flex h-9 items-center gap-1.5 rounded-sm border border-primary bg-white pr-3 pl-[19px]')}>
      <span className="text-base text-primary">{caption ?? 'Status :'}</span>
      {pill}
    </span>
  )
}
