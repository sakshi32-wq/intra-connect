import { createFileRoute } from '@tanstack/react-router'

import { UsersTable } from '#/features/settings/components/users-table'
import { SAMPLE_ORG_USERS } from '#/features/settings/sample-data'

// Frame 9; "+ Invite New User" sits on the tab row (settings/route.tsx).
export const Route = createFileRoute('/_app/settings/users/')({
  head: () => ({ meta: [{ title: 'Manage User · IntraConnect' }] }),
  component: () => (
    <div className="pt-[22px]">
      <UsersTable users={SAMPLE_ORG_USERS} />
    </div>
  ),
})
