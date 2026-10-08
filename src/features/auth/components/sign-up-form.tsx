import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { LockKeyhole, Mail, UserRound } from 'lucide-react'
import { useForm, useWatch } from 'react-hook-form'

import { Button } from '#/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '#/components/ui/form'
import { Spinner } from '#/components/ui/spinner'
import { HttpError } from '#/lib/http-error'
import { cn } from '#/lib/utils'
import { signUpMutation } from '../api'
import { signUpSchema } from '../schemas'
import type { SignUpValues } from '../schemas'
import { authButtonClass } from './auth-card'
import { AuthInput } from './auth-input'
import { FormError } from './form-error'
import { PasswordRules } from './password-rules'

/** 409 = email already registered; shown on the Email field instead of below the form. */
function isConflict(error: Error | null): error is HttpError {
  return error instanceof HttpError && error.status === 409
}

export function SignUpForm({ onSignedUp }: { onSignedUp: (email: string) => void }) {
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { username: '', email: '', password: '', confirmPassword: '' },
  })
  const password = useWatch({ control: form.control, name: 'password' })
  const signUp = useMutation({
    ...signUpMutation(),
    onSuccess: ({ email }) => onSignedUp(email),
    onError: (error) => {
      if (isConflict(error)) {
        form.setError('email', { message: error.message }, { shouldFocus: true })
      }
    },
  })

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit((values) => signUp.mutate(values))}
        className="mt-[31px] flex flex-col gap-[11px]"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="sr-only">Username</FormLabel>
              <FormControl>
                <AuthInput icon={UserRound} autoComplete="nickname" placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="gap-1">
              <FormLabel className="sr-only">Email ID</FormLabel>
              <FormControl>
                <AuthInput icon={Mail} type="email" autoComplete="username" placeholder="Email ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="gap-[14px]">
              <FormLabel className="sr-only">Password</FormLabel>
              <FormControl>
                <AuthInput
                  icon={LockKeyhole}
                  type="password"
                  autoComplete="new-password"
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <PasswordRules value={password} showErrors={form.formState.isSubmitted} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="mt-[3px] gap-1">
              <FormLabel className="sr-only">Confirm password</FormLabel>
              <FormControl>
                <AuthInput
                  icon={LockKeyhole}
                  type="password"
                  autoComplete="new-password"
                  placeholder="Confirm Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError error={isConflict(signUp.error) ? null : signUp.error} />
        <Button
          type="submit"
          disabled={signUp.isPending}
          aria-busy={signUp.isPending}
          className={cn('mt-5', authButtonClass)}
        >
          {signUp.isPending ? <Spinner aria-hidden /> : null}
          Sign Up
        </Button>
      </form>
    </Form>
  )
}
