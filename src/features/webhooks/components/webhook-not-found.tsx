import { Link } from '@tanstack/react-router'
import { Webhook as WebhookIcon } from 'lucide-react'

import { Button } from '#/components/ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '#/components/ui/empty'

// Not in the Figma: shown for an unknown webhook id.
export function WebhookNotFound({ practiceId }: { practiceId: string }) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <WebhookIcon />
        </EmptyMedia>
        <EmptyTitle className="text-heading">Webhook not found</EmptyTitle>
        <EmptyDescription>This webhook doesn’t exist or was removed from the practice.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" asChild>
          <Link to="/practices/$practiceId/webhooks" params={{ practiceId }}>
            Back to Webhooks
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  )
}
