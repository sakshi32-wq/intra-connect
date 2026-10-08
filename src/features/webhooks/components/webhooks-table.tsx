import { Link } from '@tanstack/react-router'
import { SquarePen } from 'lucide-react'

import { CopyButton } from '#/components/copy-button'
import { DataTable } from '#/components/data-table'
import type { Column } from '#/components/data-table'
import { StatusBadge } from '#/components/status-badge'
import { StatusSwitch } from '#/components/status-switch'
import { Button } from '#/components/ui/button'
import { cn } from '#/lib/utils'
import type { Webhook } from '../types'

/** Frame 34: webhooks of a practice inside a shadowed card. */
export function WebhooksTable({ practiceId, webhooks }: { practiceId: string; webhooks: ReadonlyArray<Webhook> }) {
  const columns: ReadonlyArray<Column<Webhook>> = [
    {
      id: 'name',
      header: 'ID : Name',
      className: 'w-[24%]',
      cell: (webhook) => (
        <span className="flex max-w-[180px] min-w-0 items-center gap-[11px] 2xl:max-w-none">
          <CopyButton value={webhook.name} label={`${webhook.name} name`} />
          <Link
            to="/practices/$practiceId/webhooks/$webhookId"
            params={{ practiceId, webhookId: webhook.id }}
            className="truncate font-medium text-text-strong hover:text-primary hover:underline focus-visible:outline-2 focus-visible:outline-ring"
          >
            {webhook.name}
          </Link>
        </span>
      ),
    },
    {
      id: 'token',
      header: 'Token ID',
      className: 'w-[16.4%]',
      cell: (webhook) => (
        <span className="inline-flex items-center gap-[11px]">
          <CopyButton value={webhook.tokenId} label={`token ID of ${webhook.name}`} />
          <TruncatedValue value={webhook.tokenId} className="max-w-[86px] font-medium text-text-strong" />
        </span>
      ),
    },
    {
      id: 'url',
      header: 'URL',
      className: 'w-[14.8%]',
      cell: (webhook) => <TruncatedValue value={webhook.url} className="max-w-[100px] font-medium text-text-strong" />,
    },
    {
      id: 'verification',
      header: 'Verification',
      className: 'w-[17.4%]',
      cell: (webhook) =>
        webhook.verified ? (
          <StatusBadge variant="verified" className="w-[121px]">
            Verified
          </StatusBadge>
        ) : (
          <StatusBadge variant="muted" className="w-[121px] text-muted-foreground">
            Not verified
          </StatusBadge>
        ),
    },
    {
      id: 'status',
      header: 'Status',
      className: 'w-[13.5%]',
      cell: (webhook) => <StatusSwitch defaultActive={webhook.status === 'active'} label={`Status of ${webhook.name}`} />,
    },
    {
      id: 'action',
      header: 'Action',
      cell: (webhook) => (
        <Button variant="ghost" size="icon" asChild className="-ml-1.5 text-foreground/80 hover:text-primary">
          <Link
            to="/practices/$practiceId/webhooks/$webhookId/edit"
            params={{ practiceId, webhookId: webhook.id }}
            search={{ step: 'details' }}
            aria-label={`Edit ${webhook.name}`}
          >
            <SquarePen className="size-6 stroke-[1.5]" aria-hidden />
          </Link>
        </Button>
      ),
    },
  ]

  return (
    <DataTable
      variant="card"
      caption="Webhooks of this practice"
      columns={columns}
      rows={webhooks}
      rowKey={(webhook) => webhook.id}
      emptyMessage="No webhook is added to this practice yet."
      className="flex-1"
    />
  )
}

/** Fixed-width value cut with an ellipsis (design: "c127da....", "http://pa...."); full value on hover. */
function TruncatedValue({ value, className }: { value: string; className: string }) {
  return (
    <span title={value} className={cn('block truncate', className)}>
      {value}
    </span>
  )
}
