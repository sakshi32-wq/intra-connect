import { Link } from '@tanstack/react-router'
import { SquarePen } from 'lucide-react'

import { ContentCard } from '#/components/content-card'
import { CopyButton } from '#/components/copy-button'
import { DetailList } from '#/components/detail-list'
import { StatusBadge } from '#/components/status-badge'
import { StatusSwitch } from '#/components/status-switch'
import { Button } from '#/components/ui/button'
import type { Webhook } from '../types'

/** Frame 35: read-only webhook details with the status switch and Edit Details. */
export function WebhookDetailCard({ practiceId, webhook }: { practiceId: string; webhook: Webhook }) {
  return (
    <ContentCard
      title="Webhook Details"
      className="shadow-none"
      actions={
        <>
          <StatusSwitch
            variant="framed"
            caption="Webhook status :"
            defaultActive={webhook.status === 'active'}
            label={`Status of ${webhook.name}`}
          />
          <Button variant="outline" asChild>
            <Link
              to="/practices/$practiceId/webhooks/$webhookId/edit"
              params={{ practiceId, webhookId: webhook.id }}
              search={{ step: 'details' }}
            >
              <SquarePen className="size-[18px]" aria-hidden />
              Edit Details
            </Link>
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-[15px] px-5 pt-[16px]">
        <DetailList
          className="py-[21px]"
          items={[
            { label: 'Webhook Name', value: webhook.name },
            { label: 'Webhook URL', value: webhook.url },
            { label: 'Method Type', value: webhook.method },
          ]}
        />
        <DetailList
          className="min-h-[170px] py-[21px]"
          items={[
            {
              label: 'Token ID',
              value: (
                <span className="inline-flex max-w-full items-center gap-2">
                  <span className="break-all">{webhook.tokenId}</span>
                  <CopyButton value={webhook.tokenId} label="token ID" />
                </span>
              ),
            },
            {
              label: 'Verification',
              value: webhook.verified ? (
                <StatusBadge variant="verified">Verified</StatusBadge>
              ) : (
                <StatusBadge variant="muted" className="text-muted-foreground">
                  Not verified
                </StatusBadge>
              ),
            },
          ]}
        />
      </div>
    </ContentCard>
  )
}
