import type { Session } from '#/features/auth/types'
import type { CurrentUser, OrgUser } from '#/features/settings/types'
import { HttpError } from '#/lib/http-error'
import { latency } from './latency'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD_LENGTH = 6

/**
 * Mock identity service. Any well-formed email with a password of at least
 * six characters signs in; sign-up only rejects emails already registered.
 */
function nameFromEmail(email: string) {
  return email
    .split('@')[0]
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export function createAuthService(users: ReadonlyArray<OrgUser>, profile: CurrentUser) {
  const registered = new Set(users.map((user) => user.email.toLowerCase()))

  return {
    async signIn(input: { email: string; password: string }): Promise<Session> {
      await latency()
      if (!EMAIL_PATTERN.test(input.email) || input.password.length < MIN_PASSWORD_LENGTH) {
        throw new HttpError(401, 'Invalid email or password.')
      }
      return { email: input.email.toLowerCase(), signedInAt: new Date().toISOString() }
    },

    async signUp(input: { username: string; email: string; password: string }) {
      await latency()
      const email = input.email.toLowerCase()
      if (registered.has(email)) {
        throw new HttpError(409, 'An account with this email already exists.')
      }
      registered.add(email)
      return { email }
    },

    /** Profile of the signed-in user ("me" endpoint). */
    async me(email: string): Promise<CurrentUser> {
      await latency()
      const known = users.find((user) => user.email.toLowerCase() === email.toLowerCase())
      return {
        ...profile,
        id: known?.id ?? `usr_${email.toLowerCase()}`,
        name: known?.name ?? nameFromEmail(email),
        email: email.toLowerCase(),
      }
    },

    async requestPasswordReset(input: { email: string }) {
      await latency()
      return { email: input.email.toLowerCase(), sentAt: new Date().toISOString() }
    },
  }
}
