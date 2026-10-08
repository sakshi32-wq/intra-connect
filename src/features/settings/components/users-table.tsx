import { Fragment } from 'react'

import { CopyButton } from '#/components/copy-button'
import { StatusBadge } from '#/components/status-badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '#/components/ui/table'
import { cn } from '#/lib/utils'
import type { OrgUser } from '../types'
import { ROLE_LABELS } from '../sample-data'

const COLUMNS = ['ID : User Name', 'User Status', 'User Role', 'Email', 'PHI Access', 'Owner/ User', 'MFA Status'] as const

/** Design badges are 36px tall with a fixed 109px width (frame 9). */
const badgeClass = 'h-9 min-w-[109px]'

const GROUPS = [
  { status: 'pending', label: 'Pending Invites' },
  { status: 'active', label: 'Active Users' },
] as const

/** Frame 9: one table, rows grouped under PENDING INVITES / ACTIVE USERS with a blue rule between groups. */
export function UsersTable({ users }: { users: ReadonlyArray<OrgUser> }) {
  const groups = GROUPS.map((group) => ({ ...group, rows: users.filter((user) => user.status === group.status) })).filter(
    (group) => group.rows.length > 0,
  )

  return (
    <div className="min-h-[854px] overflow-x-auto bg-card shadow-card">
      <Table className="min-w-[1180px] text-lg">
        <caption className="sr-only">Organisation users</caption>
        <TableHeader>
          <TableRow className="border-0 bg-table-header hover:bg-table-header">
            {COLUMNS.map((column, index) => (
              <TableHead
                key={column}
                scope="col"
                className={cn('h-[62px] px-0 pr-4 text-lg font-medium text-foreground', index === 0 && 'pl-[38px]')}
              >
                {column}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {groups.map((group, groupIndex) => (
          <TableBody key={group.status} className="[&_tr:last-child]:border-0">
            <TableRow className="border-0 hover:bg-transparent">
              <TableHead
                colSpan={COLUMNS.length}
                scope="colgroup"
                className={cn(
                  'h-auto px-[38px] pb-2 text-base font-normal text-muted-foreground uppercase',
                  groupIndex === 0 && 'pt-[19px]',
                )}
              >
                <span className={cn('block', groupIndex > 0 && 'border-t border-primary pt-[19px]')}>{group.label}</span>
              </TableHead>
            </TableRow>
            {group.rows.map((user, rowIndex) => (
              <Fragment key={user.id}>
                <UserRow user={user} />
                {rowIndex < group.rows.length - 1 ? <RowDivider /> : null}
              </Fragment>
            ))}
          </TableBody>
        ))}
      </Table>
    </div>
  )
}

/** Row dividers are inset to the content edges (x 452–1850), so they're drawn as their own row. */
function RowDivider() {
  return (
    <TableRow aria-hidden className="border-0 hover:bg-transparent">
      <TableCell colSpan={COLUMNS.length} className="h-px p-0 px-[38px]">
        <div className="h-px bg-input" />
      </TableCell>
    </TableRow>
  )
}

function UserRow({ user }: { user: OrgUser }) {
  return (
    <TableRow className="h-[70px] border-0 hover:bg-secondary/40">
      <TableCell className="pl-[38px] font-semibold text-foreground">
        <span className="inline-flex items-center gap-2">
          <CopyButton value={user.id} label={`${user.name}'s user ID`} />
          {user.name}
        </span>
      </TableCell>
      <TableCell className="px-0 pr-4">
        {user.status === 'pending' ? (
          <StatusBadge variant="muted" className={cn(badgeClass, 'min-w-[133px]')}>
            Pending Invites
          </StatusBadge>
        ) : (
          <StatusBadge variant="success" className={cn(badgeClass, 'min-w-[133px]')}>
            Active User
          </StatusBadge>
        )}
      </TableCell>
      <TableCell className="px-0 pr-4 text-muted-foreground">{ROLE_LABELS[user.role]}</TableCell>
      <TableCell className="px-0 pr-4 text-muted-foreground">{user.email}</TableCell>
      <TableCell className="px-0 pr-4">
        <StatusBadge variant={user.phiAccess ? 'success' : 'inactive'} className={badgeClass}>
          {user.phiAccess ? 'Access' : 'No Access'}
        </StatusBadge>
      </TableCell>
      <TableCell className="px-0 pr-4">
        <StatusBadge variant="neutral" className={badgeClass}>
          {user.ownership === 'owner' ? 'Owner' : 'Sub-user'}
        </StatusBadge>
      </TableCell>
      <TableCell className="px-0 pr-4 pr-[41px]">
        <StatusBadge variant={user.mfa === 'active' ? 'success' : 'inactive'} className={badgeClass}>
          {user.mfa === 'active' ? 'Active' : 'Inactive'}
        </StatusBadge>
      </TableCell>
    </TableRow>
  )
}
