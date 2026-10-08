import { useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import { ChevronDown, LogOut, UserRound } from 'lucide-react'

import { Avatar, AvatarFallback } from '#/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '#/components/ui/dropdown-menu'
import type { CurrentUser } from '#/features/settings/types'
import { clearSession } from '#/lib/session'

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}

/** White user card in the sidebar footer; its menu is not designed (SCREEN_MAP Q5 default: User Details + Sign out). */
export function NavUser({ user }: { user: CurrentUser }) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const signOut = () => {
    clearSession()
    queryClient.clear()
    void navigate({ to: '/login' })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`Account menu, ${user.name}`}
        className="flex h-[57px] w-full items-center gap-2.5 rounded-md bg-white pr-[15px] pl-[15px] text-left outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar-footer">
        <Avatar className="size-[41px]">
          {/* The avatar photo was not exported; initials stand in. */}
          <AvatarFallback className="bg-secondary text-sm font-semibold text-primary">
            {initials(user.name)}
          </AvatarFallback>
        </Avatar>
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-sm font-medium text-foreground">{user.name}</span>
          <span className="truncate text-2xs text-muted-foreground">{user.email}</span>
        </span>
        <ChevronDown className="size-5 shrink-0 text-foreground" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start" className="w-(--radix-dropdown-menu-trigger-width)">
        <DropdownMenuLabel className="flex flex-col">
          <span className="truncate">{user.name}</span>
          <span className="truncate text-xs font-normal text-muted-foreground">{user.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/settings/user-details">
            <UserRound aria-hidden />
            User Details
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={signOut}>
          <LogOut aria-hidden />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
