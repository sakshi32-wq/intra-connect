import type { Session } from '#/features/auth/types'

const SESSION_KEY = 'intraconnect.session'

type StorageKind = 'localStorage' | 'sessionStorage'

/** Storage access throws when the browser blocks site data; treat that as "no storage". */
function storage(kind: StorageKind): Storage | null {
  try {
    return window[kind]
  } catch {
    return null
  }
}

function isSession(value: unknown): value is Session {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as Session).email === 'string' &&
    typeof (value as Session).signedInAt === 'string'
  )
}

function read(store: Storage | null) {
  if (!store) return null
  try {
    const raw = store.getItem(SESSION_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : null
    return isSession(parsed) ? parsed : null
  } catch {
    return null
  }
}

/** The signed-in session, or null. "Remember me" sessions survive restarts. */
export function getSession(): Session | null {
  if (typeof window === 'undefined') return null
  return read(storage('localStorage')) ?? read(storage('sessionStorage'))
}

export function saveSession(session: Session, { remember }: { remember: boolean }) {
  clearSession()
  const store = storage(remember ? 'localStorage' : 'sessionStorage')
  try {
    if (!store) throw new Error('Storage unavailable')
    store.setItem(SESSION_KEY, JSON.stringify(session))
  } catch {
    throw new Error('Could not save your session. Check that your browser allows site data.')
  }
}

export function clearSession() {
  for (const kind of ['localStorage', 'sessionStorage'] as const) {
    try {
      storage(kind)?.removeItem(SESSION_KEY)
    } catch {
      // Nothing to clear when storage is blocked.
    }
  }
}

/** Accepts only same-origin paths for post-login redirects. */
export function safeRedirect(path: string | undefined) {
  if (!path || !path.startsWith('/')) return undefined
  try {
    const url = new URL(path, window.location.origin)
    return url.origin === window.location.origin ? url.pathname + url.search + url.hash : undefined
  } catch {
    return undefined
  }
}
