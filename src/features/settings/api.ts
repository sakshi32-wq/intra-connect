import { queryOptions } from '@tanstack/react-query'

import { db } from '#/mocks/db'

export const settingsKeys = {
  all: ['settings'] as const,
  organisation: () => [...settingsKeys.all, 'organisation'] as const,
}

export const organisationQueryOptions = () =>
  queryOptions({
    queryKey: settingsKeys.organisation(),
    queryFn: () => db.organisation.get(),
  })
