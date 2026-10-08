import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { LockKeyhole, Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '#/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '#/components/ui/form'
import { Spinner } from '#/components/ui/spinner'
import { Switch } from '#/components/ui/switch'
import { saveSession } from '#/lib/session'
import { signInMutation } from '../api'
import { signInSchema } from '../schemas'
import type { SignInValues } from '../schemas'
import { authButtonClass } from './auth-card'
import { AuthInput } from './auth-input'
import { FormError } from './form-error'

export function SignInForm({ onSignedIn }: { onSignedIn: () => void }) {
  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '', remember: true },
  })
  const signIn = useMutation({
    ...signInMutation(),
    onSuccess: (session, values) => {
      saveSession(session, { remember: values.remember })
      onSignedIn()
    },
  })

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit((values) => signIn.mutate(values))}
        className="mt-[31px] flex flex-col gap-[11px]"
      >
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
            <FormItem className="gap-1">
              <FormLabel className="sr-only">Password</FormLabel>
              <FormControl>
                <AuthInput
                  icon={LockKeyhole}
                  type="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-1.5">
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="h-[17px] w-[33px] data-[state=checked]:bg-auth-toggle"
                  />
                </FormControl>
                <FormLabel className="text-lg font-normal text-muted-foreground">Remember me</FormLabel>
              </FormItem>
            )}
          />
          <Link to="/forgot-password" className="text-lg font-medium text-auth-link hover:underline">
            Forgot Password
          </Link>
        </div>
        <FormError error={signIn.error} />
        <Button type="submit" disabled={signIn.isPending} className={`mt-5 ${authButtonClass}`}>
          {signIn.isPending ? <Spinner /> : null}
          Sign In
        </Button>
      </form>
    </Form>
  )
}
