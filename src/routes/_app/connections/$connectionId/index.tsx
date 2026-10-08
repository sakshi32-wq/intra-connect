import { Link, createFileRoute } from '@tanstack/react-router'
import { SquarePen } from 'lucide-react'

import { ContentCard } from '#/components/content-card'
import { CopyableText } from '#/components/copy-button'
import { DetailList } from '#/components/detail-list'
import { ehrName } from '#/components/ehr-logo'
import { PageContent } from '#/components/page-content'
import { PageHeader } from '#/components/page-header'
import { StatusSwitch } from '#/components/status-switch'
import { Button } from '#/components/ui/button'
import { ConnectionNotFound } from '#/features/connections/components/connection-not-found'
import { maskSecret } from '#/features/connections/format'
import { APP_TYPE_LABELS, findSampleConnection } from '#/features/connections/sample-data'

// Second column starts at x1245 on 63 (≈55% of the panel); one column until the panel is wide enough
const TWO_COLUMNS = 'lg:[&>dl]:grid-cols-1 2xl:[&>dl]:grid-cols-[55fr_45fr]'

export const Route = createFileRoute('/_app/connections/$connectionId/')({
  head: () => ({ meta: [{ title: 'Connection Details · IntraConnect' }] }),
  component: ConnectionDetailPage,
})

// 63. Single values from one Connection record (SCREEN_MAP §6: the drawn duplicates are mock noise).
function ConnectionDetailPage() {
  const { connectionId } = Route.useParams()
  const connection = findSampleConnection(connectionId)

  if (!connection) return <ConnectionNotFound />

  const optional = (value: string | undefined) => value ?? '—'
  return (
    <>
      <PageHeader
        title="Connection Details"
        breadcrumbs={[{ label: 'Connections', to: '/connections' }, { label: connection.name }]}
      />
      <PageContent>
        <ContentCard
          title="Connection Details"
          className="min-h-[878px]"
          actions={
            <>
              <StatusSwitch
                // remount when navigating between connections
                key={connection.id}
                variant="framed"
                caption="Connection status :"
                defaultActive={connection.status === 'active'}
                label={`Status of ${connection.name}`}
              />
              <Button variant="outline" asChild className="h-9 rounded-sm px-[19px]">
                <Link to="/connections/$connectionId/edit" params={{ connectionId }} search={{ step: 'type' }}>
                  <SquarePen className="size-[18px]" aria-hidden />
                  Edit Details
                </Link>
              </Button>
            </>
          }
        >
          {/* label column and second-column start measured on 63 (values at x721, right labels at x1245) */}
          <div className="flex flex-col gap-4 px-5 pt-4 pb-6 [&_dl>div]:grid-cols-[minmax(150px,226px)_auto_1fr]">
            <DetailList
              items={[
                { label: 'Connection Name', value: connection.name },
                { label: 'Connection ID', value: <CopyableText value={connection.id} label="connection ID" className="break-all" /> },
                { label: 'Customer ID', value: connection.customerId },
              ]}
            />
            <DetailList
              columns={2}
              className={TWO_COLUMNS}
              items={[
                { label: 'EHR Name', value: ehrName(connection.ehr) },
                { label: 'App Type', value: APP_TYPE_LABELS[connection.appType] },
                { label: 'Redirect URL', value: <span className="break-all">{connection.redirectUrl}</span> },
                { label: 'Client Secret', value: maskSecret(connection.clientSecret) },
              ]}
            />
            <DetailList
              columns={2}
              className={TWO_COLUMNS}
              items={[
                { label: 'Org Redirect URL', value: <span className="break-all">{connection.orgRedirectUrl}</span> },
                { label: 'Client ID', value: connection.clientId },
                { label: 'Scope', value: connection.scope },
                { label: 'Nonce', value: optional(connection.nonce) },
                { label: 'Audience', value: optional(connection.audience) },
                { label: 'Launch', value: optional(connection.launch) },
              ]}
            />
          </div>
        </ContentCard>
      </PageContent>
    </>
  )
}
