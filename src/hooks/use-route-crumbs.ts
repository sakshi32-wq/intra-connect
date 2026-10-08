import { useMatches } from '@tanstack/react-router'

import type { Crumb } from '#/components/page-header'

/** Breadcrumbs from the `staticData.crumb` of the matched child routes (last one = current page). */
export function useRouteCrumbs(): Array<Crumb> {
  const matches = useMatches()
  return matches.flatMap((match) => (match.staticData.crumb ? [{ label: match.staticData.crumb }] : []))
}
