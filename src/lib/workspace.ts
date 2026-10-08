import { useSyncExternalStore } from 'react'

/** Environments offered in the sidebar switcher (options not designed — SCREEN_MAP Q12). */
export const ENVIRONMENTS = ['Production', 'Sandbox'] as const
export type Environment = (typeof ENVIRONMENTS)[number]

const ENVIRONMENT_KEY = 'intraconnect.environment'
const listeners = new Set<() => void>()

function readEnvironment(): Environment {
  try {
    const stored = window.localStorage.getItem(ENVIRONMENT_KEY)
    return ENVIRONMENTS.find((env) => env === stored) ?? 'Production'
  } catch {
    return 'Production'
  }
}

let current: Environment | null = null

function getEnvironment(): Environment {
  current ??= readEnvironment()
  return current
}

export function setEnvironment(environment: Environment) {
  current = environment
  try {
    window.localStorage.setItem(ENVIRONMENT_KEY, environment)
  } catch {
    // Selection still applies for this session.
  }
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

/** The environment selected in the sidebar footer. */
export function useEnvironment() {
  return useSyncExternalStore(subscribe, getEnvironment, () => 'Production' as const)
}
