import { useId } from 'react'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '#/components/ui/select'

interface SidebarSelectProps<T extends string> {
  label: string
  value: T
  options: ReadonlyArray<T>
  onChange: (value: T) => void
}

/** Caption + compact white select in the sidebar footer (CURRENT ENVIRONMENT / ORGANISATION). */
export function SidebarSelect<T extends string>({ label, value, options, onChange }: SidebarSelectProps<T>) {
  const id = useId()
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="pl-[3px] text-base text-sidebar-caption uppercase">
        {label}
      </label>
      <Select
        value={value}
        onValueChange={(next) => {
          const option = options.find((candidate) => candidate === next)
          if (option) onChange(option)
        }}
      >
        <SelectTrigger
          id={id}
          className="h-8 w-full rounded-md border-0 bg-white px-[15px] text-sm text-black shadow-none data-[size=default]:h-8 [&_svg:not([class*=text-])]:text-foreground [&>svg]:size-5 [&>svg]:stroke-[1.5] [&>svg]:opacity-100"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
