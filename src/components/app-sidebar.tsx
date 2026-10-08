import { Link, useRouterState } from '@tanstack/react-router'
import type { LinkProps } from '@tanstack/react-router'
import { BookOpen, Braces, HousePlus, LayoutGrid, Network, NotebookPen, Settings } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { NavUser } from '#/components/nav-user'
import { SidebarSelect } from '#/components/sidebar-select'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '#/components/ui/sidebar'
import type { CurrentUser, Organisation } from '#/features/settings/types'
import { ENVIRONMENTS, setEnvironment, useEnvironment } from '#/lib/workspace'

interface NavItem {
  label: string
  to: LinkProps['to'] & string
  icon: LucideIcon
}

const PRIMARY_NAV: ReadonlyArray<NavItem> = [
  { label: 'Overview', to: '/overview', icon: LayoutGrid },
  { label: 'Connection', to: '/connections', icon: Network },
  { label: 'Practices', to: '/practices', icon: HousePlus },
  { label: 'Logs', to: '/logs', icon: NotebookPen },
  { label: 'Setting', to: '/settings', icon: Settings },
]

// No pages are designed for these; they open external docs (SCREEN_MAP Q4).
const SECONDARY_NAV = [
  { label: 'Documentation', href: 'https://docs.intraconnects.com', icon: BookOpen },
  { label: 'API Reference', href: 'https://docs.intraconnects.com/api', icon: Braces },
] as const

/** Row: 65px tall at a 66px pitch, icon 24px at x=45, label at x=84 (Connection frame). */
const rowClass =
  'relative h-[65px] gap-[15px] rounded-none px-[45px] text-lg font-medium text-sidebar-foreground hover:bg-white/10 hover:text-sidebar-foreground focus-visible:ring-inset data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:after:absolute data-[active=true]:after:inset-y-0 data-[active=true]:after:right-0 data-[active=true]:after:w-[10px] data-[active=true]:after:bg-sidebar-primary [&>svg]:size-6 [&>svg]:stroke-[1.5]'

export function AppSidebar({ user, organisation }: { user: CurrentUser; organisation: Organisation }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  const environment = useEnvironment()
  const queryClient = useQueryClient()

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="h-[102px] shrink-0 justify-center p-0 px-[45px]">
        {/* The logo was not exported (SCREEN_MAP Q1); a wordmark stands in. */}
        <Link to="/overview" className="w-fit rounded-sm text-heading font-semibold tracking-tight text-white">
          Intra<span className="text-sidebar-primary">Connect</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="gap-0 overflow-x-hidden">
        <nav aria-label="Main">
          <SidebarMenu className="gap-px">
            {PRIMARY_NAV.map(({ label, to, icon: Icon }) => (
              <SidebarMenuItem key={to}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === to || pathname.startsWith(`${to}/`)}
                  className={rowClass}
                >
                  <Link to={to}>
                    <Icon aria-hidden />
                    <span>{label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </nav>
        <SidebarSeparator className="mx-[39px] mt-[29px] mb-[31px]" />
        <SidebarMenu className="gap-px">
          {SECONDARY_NAV.map(({ label, href, icon: Icon }) => (
            <SidebarMenuItem key={label}>
              <SidebarMenuButton asChild className={rowClass}>
                <a href={href} target="_blank" rel="noreferrer">
                  <Icon aria-hidden />
                  <span>{label}</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="shrink-0 gap-6 bg-sidebar-footer px-[45px] pt-[34px] pb-[34px]">
        <SidebarSelect
          label="Current environment"
          value={environment}
          options={ENVIRONMENTS}
          onChange={(next) => {
            setEnvironment(next)
            void queryClient.invalidateQueries()
            toast.success(`Switched to ${next}`)
          }}
        />
        <SidebarSelect
          label="Current organisation"
          value={organisation.name}
          options={[organisation.name]}
          onChange={() => undefined}
        />
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
