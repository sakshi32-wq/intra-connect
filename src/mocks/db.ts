// In-memory fake backend. Only src/features/*/api.ts may import this module;
// swapping those files for real HTTP calls must not affect anything else.

import { HttpError } from '#/lib/http-error'
import type { Page } from '#/lib/pagination'
import { createAuthService } from './auth'
import { connectionsSeed } from './data/connections'
import { logsSeed } from './data/logs'
import {
  patientsSeed,
  practiceConnectionsSeed,
  practicesSeed,
  providersSeed,
} from './data/practices'
import {
  currentUserSeed,
  mfaDevicesSeed,
  orgUsersSeed,
  organisationSeed,
} from './data/settings'
import { webhooksSeed } from './data/webhooks'
import { latency } from './latency'

let idCounter = 0
export function createId(prefix: string) {
  idCounter += 1
  return `${prefix}_${Date.now().toString(36)}${idCounter}`
}

export interface PageQuery<T> {
  page: number
  pageSize: number
  filter?: (row: T) => boolean
  sort?: (a: T, b: T) => number
}

function createTable<T>(seed: ReadonlyArray<T>, keyOf: (row: T) => string, label: string) {
  let rows: Array<T> = structuredClone([...seed])

  const find = (key: string) => {
    const row = rows.find((candidate) => keyOf(candidate) === key)
    if (!row) throw new HttpError(404, `${label} not found`)
    return row
  }

  return {
    async list(filter?: (row: T) => boolean, sort?: (a: T, b: T) => number) {
      await latency()
      const result = filter ? rows.filter(filter) : [...rows]
      if (sort) result.sort(sort)
      return structuredClone(result)
    },

    async page({ page, pageSize, filter, sort }: PageQuery<T>): Promise<Page<T>> {
      await latency()
      const matching = filter ? rows.filter(filter) : [...rows]
      if (sort) matching.sort(sort)
      const start = (page - 1) * pageSize
      return {
        items: structuredClone(matching.slice(start, start + pageSize)),
        total: matching.length,
        page,
        pageSize,
      }
    },

    async get(key: string) {
      await latency()
      return structuredClone(find(key))
    },

    async insert(row: T) {
      await latency()
      if (rows.some((candidate) => keyOf(candidate) === keyOf(row))) {
        throw new HttpError(409, `${label} already exists`)
      }
      rows = [structuredClone(row), ...rows]
      return structuredClone(row)
    },

    async update(key: string, patch: Partial<T>) {
      await latency()
      const updated = { ...find(key), ...structuredClone(patch) }
      rows = rows.map((row) => (keyOf(row) === key ? updated : row))
      return structuredClone(updated)
    },

    async remove(key: string) {
      await latency()
      find(key)
      rows = rows.filter((row) => keyOf(row) !== key)
    },
  }
}

function createRecord<T extends object>(seed: T) {
  let value: T = structuredClone(seed)
  return {
    async get() {
      await latency()
      return structuredClone(value)
    },
    async update(patch: Partial<T>) {
      await latency()
      value = { ...value, ...structuredClone(patch) }
      return structuredClone(value)
    },
  }
}

const byId = <T extends { id: string }>(row: T) => row.id

export const db = {
  connections: createTable(connectionsSeed, byId, 'Connection'),
  practices: createTable(practicesSeed, byId, 'Practice'),
  practiceConnections: createTable(
    practiceConnectionsSeed,
    (row) => row.practiceId,
    'Practice connection',
  ),
  providers: createTable(providersSeed, byId, 'Provider'),
  patients: createTable(patientsSeed, byId, 'Patient'),
  webhooks: createTable(webhooksSeed, byId, 'Webhook'),
  logs: createTable(logsSeed, byId, 'Log'),
  orgUsers: createTable(orgUsersSeed, byId, 'User'),
  mfaDevices: createTable(mfaDevicesSeed, byId, 'MFA device'),
  organisation: createRecord(organisationSeed),
  currentUser: createRecord(currentUserSeed),
  auth: createAuthService(orgUsersSeed, currentUserSeed),
}
