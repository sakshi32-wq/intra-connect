import type { Session } from '#/features/auth/types'

const SESSION_KEY = 'intraconnect.session'

function isSession(value: unknown): value is Session {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as Session).email === 'string' &&
    typeof (value as Session).signedInAt === 'string'
  )
}

function read(storage: Storage) {
  try {
    const raw = storage.getItem(SESSION_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : null
    return isSession(parsed) ? parsed : null
  } catch {
    return null
  }
}

/** The signed-in session, or null. "Remember me" sessions survive restarts. */
export function getSession(): Session | null {
  if (typeof window === 'undefined') return null
  return read(window.localStorage) ?? read(window.sessionStorage)
}

export function saveSession(session: Session, { remember }: { remember: boolean }) {
  clearSession()
  const storage = remember ? window.localStorage : window.sessionStorage
  storage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearSession() {
  window.localStorage.removeItem(SESSION_KEY)
  window.sessionStorage.removeItem(SESSION_KEY)
}

/** Accepts only same-origin paths for post-login redirects. */
export function safeRedirect(path: string | undefined) {
  return path && path.startsWith('/') && !path.startsWith('//') ? path : undefined
}
