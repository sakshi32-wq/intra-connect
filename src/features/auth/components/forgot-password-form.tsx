import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { ArrowRight, Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { Button } from '#/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '#/components/ui/form'
import { Spinner } from '#/components/ui/spinner'
import { requestPasswordResetMutation } from '../api'
import { forgotPasswordSchema } from '../schemas'
import type { ForgotPasswordValues } from '../schemas'
import { authButtonClass } from './auth-card'
import { AuthInput } from './auth-input'
import { FormError } from './form-error'

export function ForgotPasswordForm({ onSent }: { onSent: (email: string) => void }) {
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  })
  const requestReset = useMutation({
    ...requestPasswordResetMutation(),
    onSuccess: ({ email }) => onSent(email),
  })

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit((values) => requestReset.mutate(values))}
        className="mt-[42px] flex flex-col"
      >
        <p className="text-lg text-muted-foreground">
          Enter your email ID to get a verification link for a new password.
        </p>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="mt-[23px] gap-1">
              <FormLabel className="sr-only">Email ID</FormLabel>
              <FormControl>
                <AuthInput icon={Mail} type="email" autoComplete="email" placeholder="Email ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormError error={requestReset.error} />
        <Button
          type="submit"
          disabled={requestReset.isPending}
          className={`mt-[31px] ${authButtonClass}`}
        >
          Get Verification Link
          {requestReset.isPending ? <Spinner /> : <ArrowRight aria-hidden />}
        </Button>
      </form>
    </Form>
  )
}
