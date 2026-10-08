import { Fragment } from 'react'
import { Link } from '@tanstack/react-router'
import type { LinkProps } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '#/components/ui/breadcrumb'
import { SidebarTrigger } from '#/components/ui/sidebar'
import { cn } from '#/lib/utils'

export interface Crumb {
  label: string
  to?: LinkProps['to']
  params?: LinkProps['params']
}

interface PageHeaderProps {
  title: string
  /** Trail after "Home"; the last crumb is the current page. Omit for no breadcrumb (Overview). */
  breadcrumbs?: ReadonlyArray<Crumb>
  /** Navy band on Overview and Logs; white with a shadow everywhere else (TOKENS §1.4). */
  variant?: 'white' | 'navy'
  /** Right-aligned actions on the title row (e.g. Logs "Filters"). */
  actions?: React.ReactNode
  /** Optional second row: pill tabs or a list toolbar (header grows 98 → 157px). */
  children?: React.ReactNode
}

export function PageHeader({ title, breadcrumbs, variant = 'white', actions, children }: PageHeaderProps) {
  const navy = variant === 'navy'
  const trail: ReadonlyArray<Crumb> = breadcrumbs ? [{ label: 'Home', to: '/overview' }, ...breadcrumbs] : []

  return (
    <header
      className={cn(
        'sticky top-0 z-10 shrink-0 px-gutter',
        navy
          ? 'border-l border-white bg-header-navy text-header-navy-foreground'
          : 'bg-header text-header-foreground shadow-header',
        children ? 'pb-[23px]' : null,
      )}
    >
      <div className="flex h-header items-center gap-4">
        <SidebarTrigger className="-ml-2 md:hidden" />
        <h1 className="text-title font-medium whitespace-nowrap">{title}</h1>
        {trail.length > 0 ? (
          <>
            <span aria-hidden className={cn('h-[30px] w-px', navy ? 'bg-header-navy-muted' : 'bg-header-muted')} />
            <Breadcrumb className="min-w-0 pl-[3px]">
              <BreadcrumbList
                className={cn('gap-0 text-lg sm:gap-0', navy ? 'text-header-navy-muted' : 'text-header-muted')}
              >
                {trail.map((crumb, index) => {
                  const last = index === trail.length - 1
                  return (
                    <Fragment key={crumb.label}>
                      <BreadcrumbItem>
                        {last ? (
                          <BreadcrumbPage className={navy ? 'text-header-navy-muted' : 'font-semibold text-header-current'}>
                            {crumb.label}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild className="hover:text-current hover:underline">
                            <Link to={crumb.to} params={crumb.params}>
                              {crumb.label}
                            </Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {/* thin 7×13 chevron, ~11px after the crumb and ~13px before the next (Connection frame) */}
                      {last ? null : (
                        <BreadcrumbSeparator className="mr-1 ml-px [&>svg]:size-[26px] [&>svg]:stroke-[1.5]">
                          <ChevronRight />
                        </BreadcrumbSeparator>
                      )}
                    </Fragment>
                  )
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </>
        ) : null}
        {actions ? <div className="ml-auto flex items-center gap-[22px]">{actions}</div> : null}
      </div>
      {children ? <div className="-mt-px">{children}</div> : null}
    </header>
  )
}
