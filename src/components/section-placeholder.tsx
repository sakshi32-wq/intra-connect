import { Construction } from 'lucide-react'

import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '#/components/ui/empty'

/** Temporary body for sections whose screens are built in a later phase. */
export function SectionPlaceholder({ section }: { section: string }) {
  return (
    <Empty className="flex-1">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Construction />
        </EmptyMedia>
        <EmptyTitle>{section} is on its way</EmptyTitle>
        <EmptyDescription>This section is being built from the design and will appear here soon.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
