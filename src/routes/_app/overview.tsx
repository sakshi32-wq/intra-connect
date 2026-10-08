import { Link, createFileRoute } from '@tanstack/react-router'
import { ListChecks } from 'lucide-react'
import { z } from 'zod'

import { PageHeader } from '#/components/page-header'
import { SectionBar } from '#/components/section-bar'
import { Stepper } from '#/components/stepper'
import { Button } from '#/components/ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '#/components/ui/empty'
import { ComponentsGlossary } from '#/features/overview/components/components-glossary'
import { HowItWorksDiagram } from '#/features/overview/components/how-it-works-diagram'

// Steps 2 and 3 share a title in the design and have no content yet (SCREEN_MAP Q7).
const STEPS = ['How Intraconnects works', 'Pre-requisite Process', 'Pre-requisite Process', 'Create Practice'] as const

export const Route = createFileRoute('/_app/overview')({
  validateSearch: z.object({
    step: z.coerce.number().int().min(1).max(STEPS.length).default(1).catch(1),
  }),
  head: () => ({ meta: [{ title: 'Overview · IntraConnect' }] }),
  component: OverviewPage,
})

function OverviewPage() {
  const { step } = Route.useSearch()
  const navigate = Route.useNavigate()
  const goTo = (next: number) => void navigate({ search: { step: next } })

  return (
    <>
      <PageHeader title="Overview" variant="navy" />
      <div className="flex flex-col gap-[13px] px-[19px] pt-3 pb-[30px]">
        <SectionBar>
          {step}. {STEPS[step - 1]}
        </SectionBar>
        <Stepper
          steps={STEPS}
          current={step - 1}
          onStepClick={(index) => goTo(index + 1)}
          onNext={() => goTo(step + 1)}
        />
        <div className="px-[59px]">
          {step === 1 ? (
            <div className="flex flex-col gap-[62px] pt-[15px]">
              <HowItWorksDiagram />
              <ComponentsGlossary />
            </div>
          ) : step === STEPS.length ? (
            <Empty className="mt-10">
              <EmptyHeader>
                <EmptyTitle className="text-heading">Create your first practice</EmptyTitle>
                <EmptyDescription>
                  Add the hospital, clinic or provider you want to integrate with, then attach its EHR connection.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button asChild>
                  <Link to="/practices">Go to Practices</Link>
                </Button>
              </EmptyContent>
            </Empty>
          ) : (
            <Empty className="mt-10">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <ListChecks />
                </EmptyMedia>
                <EmptyTitle className="text-heading">{STEPS[step - 1]}</EmptyTitle>
                <EmptyDescription>The content for this step hasn’t been designed yet.</EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </div>
      </div>
    </>
  )
}
