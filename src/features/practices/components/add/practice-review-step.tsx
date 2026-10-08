import { SquarePen } from 'lucide-react'

import { ContentCard } from '#/components/content-card'
import { DetailList } from '#/components/detail-list'
import { FormActions } from '#/components/form-actions'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import type { PracticeFormValues } from './practice-form-schema'

// DetailList switches to two columns at lg (1024px); with the sidebar that leaves too little room for values.
const twoColumnsWhenWide = '[&>dl]:grid-cols-1 min-[1600px]:[&>dl]:grid-cols-2'

interface PracticeReviewStepProps {
  values: PracticeFormValues
  onEdit: () => void
  onSave: () => void
}

/** Frame 41: read-only review before saving (no asterisks on read-only labels, SCREEN_MAP §6). */
export function PracticeReviewStep({
  values,
  onEdit,
  onSave,
}: PracticeReviewStepProps) {
  const address = [values.address1, values.address2].filter(Boolean).join(', ')

  return (
    <ContentCard
      title="Practice Profile Details"
      actions={
        <Button
          type="button"
          variant="outline"
          onClick={onEdit}
          className="h-9 px-[19px] text-base"
        >
          <SquarePen className="size-[18px]" aria-hidden />
          Edit Details
        </Button>
      }
    >
      <div className="flex flex-col gap-[14px] px-5 pt-[15px] pb-[52px]">
        <div className="flex flex-col gap-3 bg-panel px-[27px] py-[19px]">
          <DetailList
            variant="plain"
            columns={2}
            className={twoColumnsWhenWide}
            items={[
              { label: 'Practice Name', value: values.name },
              { label: 'Contact', value: values.contact },
              { label: 'E-mail ID', value: values.email },
              { label: 'Website', value: values.website || '-' },
              { label: 'NPI Number', value: values.npi },
            ]}
          />
          <DetailList
            variant="plain"
            items={[
              {
                label: 'Specialty provided',
                value: (
                  <ul
                    className="-my-1.5 flex flex-wrap gap-x-8 gap-y-2"
                    aria-label="Specialties"
                  >
                    {values.specialties.map((specialty) => (
                      <li key={specialty}>
                        <Badge
                          variant="outline"
                          className="h-9 rounded-sm border-primary bg-white px-5 text-base font-normal text-primary"
                        >
                          {specialty}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                ),
              },
            ]}
          />
        </div>
        <DetailList
          columns={2}
          className={twoColumnsWhenWide}
          items={[
            { label: 'Address', value: address },
            { label: 'City', value: values.city },
            { label: 'Zip code', value: values.zip },
            { label: 'State', value: values.state },
          ]}
        />
        <FormActions className="mt-[30px]">
          <Button type="button" variant="outline" onClick={onEdit}>
            Go back
          </Button>
          <Button type="button" onClick={onSave}>
            Save
          </Button>
        </FormActions>
      </div>
    </ContentCard>
  )
}
