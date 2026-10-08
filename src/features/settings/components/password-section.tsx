import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { Button } from '#/components/ui/button'
import { formatDateTime } from './format'

/** "Manage Password" block of User Details (10, 14). */
export function PasswordSection({ updatedAt }: { updatedAt: string }) {
  return (
    <section aria-labelledby="password-heading" className="flex flex-col">
      <h2 id="password-heading" className="text-heading font-semibold text-foreground">
        Manage Password
      </h2>
      <p className="mt-2.5 text-md text-muted-foreground">This secured password will protect your user account.</p>
      <div className="mt-[18px] flex flex-wrap items-end justify-between gap-4 bg-card pt-[22px] pr-12 pb-[17px] pl-[37px] shadow-[0_0_10px_rgb(0_0_0/0.12)]">
        <div>
          <p className="text-lg font-semibold text-foreground">
            Current Password : <span aria-hidden>••••••••••••</span>
            <span className="sr-only">hidden</span>
          </p>
          <p className="mt-3 text-md text-muted-foreground">Last Update : {formatDateTime(updatedAt, 'long')}</p>
        </div>
        <Button variant="outline" asChild className="px-5 text-base">
          <Link to="/settings/user-details/change-password" search={{ step: 'form' }}>
            Change Password
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Button>
      </div>
    </section>
  )
}
