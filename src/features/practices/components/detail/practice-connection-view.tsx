import { Link } from '@tanstack/react-router'
import { Plus, SquarePen } from 'lucide-react'

import { ContentCard } from '#/components/content-card'
import { DetailList } from '#/components/detail-list'
import { ehrName } from '#/components/ehr-logo'
import { OnboardingEmptyState } from '#/components/onboarding-empty-state'
import { StatusSwitch } from '#/components/status-switch'
import { Button } from '#/components/ui/button'
import type { Practice, PracticeConnection } from '#/features/practices/types'
import { DetailPanel } from './detail-panel'
import { sampleLinkedConnection } from './sample-lookup'

/** "Patient - EpicPatient13" lines for each enabled app type. */
export function appTypeLines(appTypes: PracticeConnection['appTypes']) {
  return [
    appTypes.patient ? `Patient - ${appTypes.patient}` : null,
    appTypes.provider ? `Provider - ${appTypes.provider}` : null,
  ].filter((line): line is string => line !== null)
}

export function MultiLine({ lines }: { lines: ReadonlyArray<string> }) {
  return (
    <span className="flex flex-col gap-1">
      {lines.map((line) => (
        <span key={line}>{line}</span>
      ))}
    </span>
  )
}

/** Connection tab with an attached connection (28). */
export function PracticeConnectionView({ practice, connection }: { practice: Practice; connection: PracticeConnection }) {
  const appTypes = [connection.appTypes.patient ? 'Patient' : null, connection.appTypes.provider ? 'Provider' : null]
  return (
    <ContentCard
      title="Connection Details"
      actions={
        <>
          <StatusSwitch
            variant="framed"
            caption="Connection status :"
            defaultActive={connection.status === 'active'}
            label={`Status of the ${practice.name} connection`}
          />
          <Button variant="outline" asChild className="ml-1.5">
            <Link to="/practices/$practiceId/connection/edit" params={{ practiceId: practice.id }}>
              <SquarePen aria-hidden />
              Edit Details
            </Link>
          </Button>
        </>
      }
      className="flex-1"
    >
      <div className="flex flex-col gap-[15px] px-5 pt-[15px] pb-[23px]">
        <DetailPanel>
          <DetailList
            variant="plain"
            items={[
              { label: 'Practice Name', value: practice.name },
              { label: 'Practice E-mail', value: practice.email },
              { label: 'Customer ID', value: practice.customerId },
            ]}
          />
        </DetailPanel>
        <DetailPanel>
          <DetailList
            variant="plain"
            items={[
              { label: 'EHR Name', value: ehrName(connection.ehr) },
              { label: 'EHR Type', value: appTypes.filter(Boolean).join(', ') },
              { label: 'Connection connected', value: <MultiLine lines={appTypeLines(connection.appTypes)} /> },
              { label: 'Practice ID', value: connection.ehrPracticeId },
            ]}
          />
        </DetailPanel>
        <DetailPanel>
          <DetailList
            variant="plain"
            items={[
              { label: 'Org Redirect URL', value: sampleLinkedConnection.orgRedirectUrl },
              { label: 'Scope', value: sampleLinkedConnection.scope },
              { label: 'Audience', value: sampleLinkedConnection.audience },
            ]}
          />
        </DetailPanel>
      </div>
    </ContentCard>
  )
}

/** Connection tab when the practice has no connection attached (27). */
export function PracticeConnectionEmpty({ practiceId }: { practiceId: string }) {
  return (
    <ContentCard title="Connection Details" className="mt-5 flex-1">
      <div className="flex flex-1 flex-col px-[29px] pt-[13px] pb-[25px] [&>div]:flex-1 [&>div>div:last-child]:flex-1">
        <OnboardingEmptyState
          banner="No connection is attached to this specific practice yet!"
          // the EHR architecture diagram drawn in 27 was not exported (SCREEN_MAP Q1)
          illustration={{ src: '/images/illustration-transfer-data.png', alt: 'Data moving between an EHR and a practice' }}
          body={
            <>
              <p>A connection is a virtual representation of your EHR credentials that will be used to access the EHR API.</p>
              <p>Attach the connection created for this practice&apos;s EHR system.</p>
            </>
          }
          action={{
            label: 'Attach Connection',
            render: (
              <Button asChild>
                <Link to="/practices/$practiceId/connection/attach" params={{ practiceId }}>
                  <Plus aria-hidden />
                  Attach Connection
                </Link>
              </Button>
            ),
          }}
          stepsIntro="You can connect a practice to its EHR through the following steps."
          currentStep={1}
          steps={[
            {
              title: 'Create a connection',
              body: 'Add your EHR credentials as a connection in the Connection section.',
            },
            {
              title: 'Attach connection to the practice',
              body: (
                <>
                  <p>
                    The practice is where all the information belonging to a specific EHR instance is stored. Attach the
                    connection created for that practice&apos;s EHR account.
                  </p>
                  <ul className="mt-3 list-disc pl-5">
                    <li>Choose the EHR and the app types the practice uses</li>
                    <li>Select the connection for each enabled app type</li>
                    <li>Enter the practice ID from the EHR account</li>
                  </ul>
                </>
              ),
            },
            {
              title: 'Add webhook to the practice',
              body: 'Add the webhook that should receive this practice’s events in its Webhooks tab.',
            },
          ]}
        />
      </div>
    </ContentCard>
  )
}
