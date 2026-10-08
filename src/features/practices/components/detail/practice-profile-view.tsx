import { Link } from '@tanstack/react-router'
import { SquarePen } from 'lucide-react'

import { ContentCard } from '#/components/content-card'
import { DetailList } from '#/components/detail-list'
import { StatusBadge } from '#/components/status-badge'
import { Button } from '#/components/ui/button'
import type { Practice } from '#/features/practices/types'
import { DetailPanel } from './detail-panel'

/** Practice profile, read-only (22). */
export function PracticeProfileView({ practice }: { practice: Practice }) {
  return (
    <ContentCard
      title="Practice Profile Details"
      actions={
        <Button variant="outline" asChild>
          <Link to="/practices/$practiceId/profile/edit" params={{ practiceId: practice.id }}>
            <SquarePen aria-hidden />
            Edit Details
          </Link>
        </Button>
      }
    >
      <div className="flex flex-col gap-[14px] px-5 pt-[15px] pb-[23px]">
        <DetailPanel columns={2}>
          <DetailList
            variant="plain"
            items={[
              { label: 'Practice Name', value: practice.name },
              { label: 'Practice E-mail', value: practice.email },
              { label: 'NPI Number', value: practice.npi },
            ]}
          />
          <DetailList
            variant="plain"
            items={[
              { label: 'Contact', value: practice.contact },
              {
                label: 'Website',
                value: practice.website ? (
                  <a
                    href={practice.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary hover:underline focus-visible:outline-2 focus-visible:outline-ring"
                  >
                    {practice.website.replace(/^https?:\/\//, '')}
                  </a>
                ) : (
                  '-'
                ),
              },
            ]}
          />
        </DetailPanel>

        <DetailPanel title="Practices Provided" className="[&>h3]:mb-[7px]">
          <ul aria-label="Specialties" className="flex flex-wrap gap-x-8 gap-y-3">
            {practice.specialties.map((specialty) => (
              <li key={specialty}>
                <StatusBadge variant="chip" className="h-9 px-5 text-md">
                  {specialty}
                </StatusBadge>
              </li>
            ))}
          </ul>
        </DetailPanel>

        <DetailPanel title="Physical Address :" columns={2}>
          <DetailList
            variant="plain"
            items={[
              { label: 'Address', value: [practice.address1, practice.address2].filter(Boolean).join(', ') },
              { label: 'Zip code', value: practice.zip },
            ]}
          />
          <DetailList
            variant="plain"
            items={[
              { label: 'City', value: practice.city },
              { label: 'State', value: practice.state },
            ]}
          />
        </DetailPanel>
      </div>
    </ContentCard>
  )
}
