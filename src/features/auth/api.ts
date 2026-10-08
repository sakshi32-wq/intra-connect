import { mutationOptions } from '@tanstack/react-query'

import { db } from '#/mocks/db'
import type { ForgotPasswordValues, SignInValues, SignUpValues } from './schemas'

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
