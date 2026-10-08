import { Link } from '@tanstack/react-router'
import { Plus } from 'lucide-react'

import { OnboardingEmptyState } from '#/components/onboarding-empty-state'
import { Button } from '#/components/ui/button'

// Frame 52, with the coherent 3-step guide from SCREEN_MAP §6 (step 2 highlighted on this page).
const STEPS = [
  {
    title: 'Create a connection',
    body: 'Add the EHR connection that holds the credentials Intraconnects uses to talk to the EHR.',
  },
  {
    title: 'Add a new practice',
    body: 'A practice is where all the information belonging to a specific EHR instance is stored. Add it, then attach the connection created for it.',
  },
  {
    title: 'Add a webhook',
    body: 'Add the webhook that receives the events of this practice, from the practice’s Webhooks tab.',
  },
]

export function PracticesEmptyState({ banner }: { banner: string }) {
  return (
    <OnboardingEmptyState
      banner={banner}
      illustration={{ src: '/images/practice-hospital.png', alt: '' }}
      body={
        <p>
          Add a new practice where you can attach the connection you have
          created. A practice is a virtual representation of a healthcare
          organisation or entity.
        </p>
      }
      action={{
        label: 'Add New Practice',
        render: (
          <Button asChild>
            <Link to="/practices/new">
              <Plus aria-hidden />
              Add New Practice
            </Link>
          </Button>
        ),
      }}
      steps={STEPS}
      currentStep={1}
    />
  )
}
