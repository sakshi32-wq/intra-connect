import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

import { DetailList } from '#/components/detail-list'
import { FormActions } from '#/components/form-actions'
import { Button } from '#/components/ui/button'
import { Separator } from '#/components/ui/separator'
import { SAMPLE_U2F_CREDENTIALS } from '../sample-data'
import { formatDateTime } from './format'

const linkClass = 'text-primary hover:underline focus-visible:outline-2 focus-visible:outline-ring'

/** Frame 16: U2F security-key set-up. */
export function SecurityKeySetup({ onProceed }: { onProceed: () => void }) {
  return (
    <div className="flex flex-col">
      <h3 className="text-heading font-semibold text-foreground">Set up virtual MFA device</h3>
      <a href="#" className={`mt-[19px] self-start text-md ${linkClass}`}>
        See the list of browsers that support U2F keys.
      </a>
      <DetailList
        variant="plain"
        title="Security Credentials"
        className="mt-[37px] [&_dd]:text-md [&_dl]:gap-y-3 [&_dt]:text-md [&>h3]:mb-2.5 [&>h3]:text-lg [&>h3]:font-medium [&>h3]:text-black"
        items={[
          { label: 'User ARN', value: SAMPLE_U2F_CREDENTIALS.userArn },
          { label: 'Path', value: SAMPLE_U2F_CREDENTIALS.path },
          { label: 'Creation time', value: formatDateTime(SAMPLE_U2F_CREDENTIALS.createdAt).replace(' at', '') },
        ]}
      />
      <Separator className="mt-5 mb-[30px]" />
      <p className="text-lg text-muted-foreground">Follow the steps given to set up the U2F security key:</p>
      <ol className="mt-[38px] flex list-decimal flex-col gap-[25px] pl-[30px] text-lg font-medium text-foreground">
        <li className="pl-1">Insert your U2F key into your computer’s USB port.</li>
        <li className="pl-1">
          Tap the golden button on your U2F security key
          <p className="mt-3 text-md font-normal text-muted-foreground">
            Tapping the button will notify the key, then you can proceed with the process
          </p>
          <a href="#" className={`mt-3 inline-flex items-center gap-3 text-base font-normal ${linkClass}`}>
            Troubleshoot U2F
            <ArrowRight className="size-4" aria-hidden />
          </a>
        </li>
      </ol>
      <FormActions className="mt-[47px]">
        <Button variant="outline" asChild>
          <Link to="/settings/user-details">Cancel</Link>
        </Button>
        <Button type="button" onClick={onProceed}>
          Proceed
        </Button>
      </FormActions>
    </div>
  )
}
