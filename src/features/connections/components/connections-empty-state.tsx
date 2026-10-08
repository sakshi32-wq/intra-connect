import { Link } from '@tanstack/react-router'
import { ExternalLink, Plus } from 'lucide-react'

import { OnboardingEmptyState } from '#/components/onboarding-empty-state'
import type { FollowStep } from '#/components/onboarding-empty-state'
import { Button } from '#/components/ui/button'

const DOCS_URL = 'https://docs.intraconnects.com'

// Coherent 3-step guide (SCREEN_MAP §6.1: the drawn copy is placeholder text from other screens).
const STEPS: ReadonlyArray<FollowStep> = [
  {
    title: 'Create Connection',
    body: (
      <>
        <p>
          Complete the pre-requisite EHR integration, then add a connection with the client ID, client secret and
          scopes your EHR issued for the app.
        </p>
        <a
          href={DOCS_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-1.5 inline-flex items-center gap-1 rounded-sm text-base text-primary hover:underline focus-visible:outline-2 focus-visible:outline-ring"
        >
          Learn More
          <ExternalLink className="size-3.5" aria-hidden />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </>
    ),
  },
  {
    title: 'Add a practice and attach the connection',
    body: 'Add the practice that uses this EHR, then attach the connection from the practice’s Connection tab.',
  },
  {
    title: 'Add a webhook',
    body: 'Add the webhook that receives the practice’s data from the Webhooks tab of the practice.',
  },
]

/** No connections (53), or no connection matching the toolbar filters. */
export function ConnectionsEmptyState({ filtered }: { filtered: boolean }) {
  return (
    <OnboardingEmptyState
      banner={filtered ? 'No connection matches the selected filters.' : 'No connection is added in the system yet!'}
      illustration={{ src: '/images/illustration-transfer-data.png', alt: '' }}
      body={
        <>
          <p>A connection is a virtual representation of your EHR credentials that will be utilised to access the EHR API.</p>
          <p>Attach the connection created for this specific practice of EHR system.</p>
        </>
      }
      action={{
        label: 'Add New Connection',
        render: (
          <Button asChild className="mt-auto text-base">
            <Link to="/connections/new" search={{ step: 'getting-started' }}>
              <Plus className="size-5" aria-hidden />
              Add New Connection
            </Link>
          </Button>
        ),
      }}
      stepsIntro="You can add a new connection through the following steps."
      steps={STEPS}
    />
  )
}
