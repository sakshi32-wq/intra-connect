import { Link } from '@tanstack/react-router'
import type { LinkProps } from '@tanstack/react-router'

import { cn } from '#/lib/utils'

export interface PillTab {
  label: string
  to: LinkProps['to']
  params?: LinkProps['params']
}

/** Route sub-navigation drawn as joined pill buttons (Settings, Practice detail). */
export function PillTabs({ tabs, label }: { tabs: ReadonlyArray<PillTab>; label: string }) {
  return (
    <nav aria-label={label} className="flex flex-wrap gap-px">
      {tabs.map((tab) => (
        <Link
          key={tab.label}
          to={tab.to}
          params={tab.params}
          activeOptions={{ exact: false }}
          className={cn(
            'inline-flex h-9 items-center rounded-sm border border-primary bg-white px-5 text-base text-primary transition-colors hover:bg-secondary',
            'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
            'data-[status=active]:bg-primary data-[status=active]:text-primary-foreground',
          )}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  )
}
