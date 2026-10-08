import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

import { ContentCard } from '#/components/content-card'
import { OnboardingEmptyState } from '#/components/onboarding-empty-state'
import type { FollowStep } from '#/components/onboarding-empty-state'
import { Button } from '#/components/ui/button'

// Coherent 3-step guide (SCREEN_MAP §6: the design shows step 2 only, with practice copy).
const STEPS: ReadonlyArray<FollowStep> = [
  {
    title: 'Create a connection',
    body: 'Add an EHR connection from the Connection section with the credentials of the EHR instance that serves this practice.',
  },
  {
    title: 'Attach the connection to the practice',
    body: 'Open the practice’s Connection tab and attach the connection, so that IntraConnect can read the practice’s EHR data.',
  },
  {
    title: 'Add Webhook to the practice',
    body: (
      <ul className="list-disc space-y-1 pl-5">
        <li>Add a webhook with the URL that should receive this practice’s events.</li>
        <li>Generate a verification token to verify the webhook.</li>
        <li>All event-based (asynchronous) responses for the practice are then forwarded to it.</li>
      </ul>
    ),
  },
]

/** Frame 46: the Webhooks tab of a practice that has no connection attached yet. */
export function WebhooksBlocked({ practiceId }: { practiceId: string }) {
  return (
    <ContentCard title="Webhook Details" className="flex-1">
      <div className="px-[29px] pt-[14px] pb-[61px]">
        <OnboardingEmptyState
          banner="No connection is attached to this specific practice yet!"
          // The EHR architecture diagram is not exported (SCREEN_MAP §7 Q1): reuse the transfer illustration.
          illustration={{ src: '/images/illustration-transfer-data.png', alt: 'Data transferred between the practice and its EHR' }}
          body={
            <p>
              When utilising the event-based APIs (also known as asynchronous APIs), all the responses related to a
              particular practice will be forwarded to this designated webhook.
            </p>
          }
          action={{
            label: 'Attach Connection',
            render: (
              <Button asChild>
                <Link to="/practices/$practiceId/connection/attach" params={{ practiceId }} search={{ step: 'ehr' }}>
                  <Plus aria-hidden />
                  Attach Connection
                </Link>
              </Button>
            ),
          }}
          stepsIntro="You can add a webhook to this practice through the following steps."
          steps={STEPS}
          currentStep={2}
        />
      </div>
    </ContentCard>
  )
}
