import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { LockKeyhole, Mail, UserRound } from 'lucide-react'
import { useForm, useWatch } from 'react-hook-form'

import { Button } from '#/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '#/components/ui/form'
import { Spinner } from '#/components/ui/spinner'
import { signUpMutation } from '../api'
import { signUpSchema } from '../schemas'
import type { SignUpValues } from '../schemas'
import { authButtonClass } from './auth-card'
import { AuthInput } from './auth-input'
import { FormError } from './form-error'
import { PasswordRules } from './password-rules'

export function SignUpForm({ onSignedUp }: { onSignedUp: (email: string) => void }) {
  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { username: '', email: '', password: '', confirmPassword: '' },
  })
  const password = useWatch({ control: form.control, name: 'password' })
  const signUp = useMutation({
    ...signUpMutation(),
    onSuccess: ({ email }) => onSignedUp(email),
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
                <AuthInput icon={UserRound} autoComplete="username" placeholder="Username" {...field} />
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
                <AuthInput icon={Mail} type="email" autoComplete="email" placeholder="Email ID" {...field} />
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
                  aria-describedby="password-rules"
                  {...field}
                />
              </FormControl>
              <PasswordRules value={password} showErrors={form.formState.isSubmitted} />
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
        <FormError error={signUp.error} />
        <Button type="submit" disabled={signUp.isPending} className={`mt-5 ${authButtonClass}`}>
          {signUp.isPending ? <Spinner /> : null}
          Sign Up
        </Button>
      </form>
    </Form>
  )
}
