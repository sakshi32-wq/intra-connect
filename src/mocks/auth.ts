import type { Session } from '#/features/auth/types'
import { HttpError } from '#/lib/http-error'
import { latency } from './latency'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD_LENGTH = 6

/**
 * Mock identity service. Any well-formed email with a password of at least
 * six characters signs in; sign-up only rejects emails already registered.
 */
export function createAuthService(seedEmails: ReadonlyArray<string>) {
  const registered = new Set(seedEmails.map((email) => email.toLowerCase()))

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

    async requestPasswordReset(input: { email: string }) {
      await latency()
      return { email: input.email.toLowerCase(), sentAt: new Date().toISOString() }
    },
  }
}
