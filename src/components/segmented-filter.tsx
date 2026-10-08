import { ToggleGroup, ToggleGroupItem } from '#/components/ui/toggle-group'

interface SegmentedFilterProps<T extends string> {
  label: string
  value: T
  options: ReadonlyArray<{ value: T; label: string }>
  onChange: (value: T) => void
}

/** All / Active / Inactive segmented buttons (Connection toolbar). */
export function SegmentedFilter<T extends string>({ label, value, options, onChange }: SegmentedFilterProps<T>) {
  return (
    <ToggleGroup
      type="single"
      aria-label={label}
      value={value}
      onValueChange={(next) => {
        const option = options.find((candidate) => candidate.value === next)
        if (option) onChange(option.value)
      }}
      className="gap-px shadow-none"
    >
      {options.map((option) => (
        <ToggleGroupItem
          key={option.value}
          value={option.value}
          className="h-9 rounded-sm! border border-primary bg-white px-5 text-base text-primary hover:bg-secondary hover:text-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
        >
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
