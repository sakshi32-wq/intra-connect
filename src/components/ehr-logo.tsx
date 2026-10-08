import type { Ehr } from '#/features/connections/types'
import { cn } from '#/lib/utils'

const EHR_NAMES: Record<Ehr, string> = {
  athenahealth: 'athenahealth',
  epic: 'Epic',
  cerner: 'Cerner',
  nextgen: 'NextGen',
  drchrono: 'DrChrono',
}

export function ehrName(ehr: Ehr) {
  return EHR_NAMES[ehr]
}

/** EHR wordmark; DrChrono has no exported asset, so a green "dr" tile stands in. */
export function EhrLogo({ ehr, className }: { ehr: Ehr; className?: string }) {
  if (ehr === 'drchrono') {
    return (
      <span
        role="img"
        aria-label={EHR_NAMES.drchrono}
        className={cn('grid size-[30px] place-items-center rounded-[3px] bg-[#3BA544] text-lg font-medium text-white', className)}
      >
        dr
      </span>
    )
  }
  return <img src={`/images/ehr-${ehr}.svg`} alt={EHR_NAMES[ehr]} className={cn('h-6 w-auto max-w-[90px]', className)} />
}
