import { Link } from '@tanstack/react-router'
import { EllipsisVertical } from 'lucide-react'

import { Button } from '#/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'

// Frame 2: the row menu deep-links to the practice detail tabs, in tab order and with tab labels (SCREEN_MAP Q11).
const TABS = [
  { label: 'Profile', to: '/practices/$practiceId/profile' },
  { label: 'Connection', to: '/practices/$practiceId/connection' },
  { label: 'Webhooks', to: '/practices/$practiceId/webhooks' },
  { label: 'Providers', to: '/practices/$practiceId/providers' },
  { label: 'Patients', to: '/practices/$practiceId/patients' },
] as const

export function PracticeRowMenu({
  practiceId,
  practiceName,
}: {
  practiceId: string
  practiceName: string
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={`Open menu for ${practiceName}`}
          className="text-foreground"
        >
          <EllipsisVertical className="size-6" aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      {/* 184px wide, 47px centred grey items, no icons or dividers */}
      <DropdownMenuContent
        align="end"
        className="w-[184px] rounded-sm border-0 py-[3px] shadow-tile"
      >
        {TABS.map((tab) => (
          <DropdownMenuItem
            key={tab.to}
            asChild
            className="h-[47px] justify-center text-lg text-popover-foreground focus:text-primary"
          >
            <Link to={tab.to} params={{ practiceId }}>
              {tab.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
