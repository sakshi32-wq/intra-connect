import { mutationOptions, queryOptions } from '@tanstack/react-query'

import { db } from '#/mocks/db'
import type { ForgotPasswordValues, SignInValues, SignUpValues } from './schemas'

export const authKeys = {
  me: (email: string) => ['auth', 'me', email.toLowerCase()] as const,
}

/** The signed-in user's profile, keyed by the session email. */
export const meQueryOptions = (email: string) =>
  queryOptions({
    queryKey: authKeys.me(email),
    queryFn: () => db.auth.me(email),
    staleTime: Infinity,
  })

export const signInMutation = () =>
  mutationOptions({
    mutationKey: ['auth', 'sign-in'],
    mutationFn: ({ email, password }: SignInValues) => db.auth.signIn({ email, password }),
  })

export const signUpMutation = () =>
  mutationOptions({
    mutationKey: ['auth', 'sign-up'],
    mutationFn: ({ username, email, password }: SignUpValues) =>
      db.auth.signUp({ username, email, password }),
  })

export const requestPasswordResetMutation = () =>
  mutationOptions({
    mutationKey: ['auth', 'password-reset'],
    mutationFn: ({ email }: ForgotPasswordValues) => db.auth.requestPasswordReset({ email }),
  })
