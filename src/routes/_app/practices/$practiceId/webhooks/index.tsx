import { Link, createFileRoute } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

import { Button } from '#/components/ui/button'
import { hasSampleConnection, sampleWebhooks } from '#/features/practices/sample-data'
import { WebhooksBlocked } from '#/features/webhooks/components/webhooks-blocked'
import { WebhooksTable } from '#/features/webhooks/components/webhooks-table'

// Frames 34 (list) and 46 (no connection attached yet).
export const Route = createFileRoute('/_app/practices/$practiceId/webhooks/')({
  head: () => ({ meta: [{ title: 'Webhooks · IntraConnect' }] }),
  component: WebhooksPage,
})

function WebhooksPage() {
  const { practiceId } = Route.useParams()

  if (!hasSampleConnection(practiceId)) return <WebhooksBlocked practiceId={practiceId} />

  return (
    <div className="flex flex-1 flex-col gap-[13px]">
      {/* Drawn in the header's tab row (34); the practice layout has no action slot, so it heads the list. */}
      <div className="flex justify-end">
        <Button asChild>
          <Link to="/practices/$practiceId/webhooks/new" params={{ practiceId }} search={{ step: 'details' }}>
            <Plus aria-hidden />
            Add New Webhook
          </Link>
        </Button>
      </div>
      <WebhooksTable practiceId={practiceId} webhooks={sampleWebhooks} />
    </div>
  )
}
