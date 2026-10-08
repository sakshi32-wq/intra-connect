import { Link } from '@tanstack/react-router'
import { z } from 'zod'
import type { UseFormReturn } from 'react-hook-form'

import { CenteredFormCard } from '#/components/centered-form-card'
import { FormActions } from '#/components/form-actions'
import { Button } from '#/components/ui/button'
import { Form } from '#/components/ui/form'
import { Separator } from '#/components/ui/separator'
import { PASSWORD_RULES } from '#/features/auth/schemas'
import { PasswordField } from './password-field'

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Enter your current password.'),
    newPassword: z.string().refine((value) => PASSWORD_RULES.every((rule) => rule.test(value)), {
      message: 'Use 8+ characters with upper and lower case letters, a number and a special character (-!@#$%^&*).',
    }),
    confirmPassword: z.string().min(1, 'Confirm the new password.'),
  })
  .refine((values) => values.newPassword !== values.currentPassword, {
    path: ['newPassword'],
    message: 'The new password must be different from the current one.',
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match.',
  })
export type ChangePasswordValues = z.infer<typeof changePasswordSchema>

/** Frame 15: centred card under the "Change password" section bar. */
export function ChangePasswordForm({
  form,
  onSubmit,
}: {
  form: UseFormReturn<ChangePasswordValues>
  onSubmit: (values: ChangePasswordValues) => void
}) {
  const { control } = form
  return (
    <CenteredFormCard
      title="Verify your password before changing it"
      className="mt-[39px] gap-[55px] px-[68px] pt-10 pb-[46px]"
    >
      <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <PasswordField
            control={control}
            name="currentPassword"
            label="Password"
            placeholder="Enter the existing Password"
            autoComplete="current-password"
          />
          <Separator className="mx-[-19px] mt-[23px] mb-9 w-auto" />
          <div className="flex flex-col gap-[23px]">
            <PasswordField
              control={control}
              name="newPassword"
              label="New Password"
              placeholder="Enter the new password"
              autoComplete="new-password"
            />
            <PasswordField
              control={control}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Re-enter the Password to confirm"
              autoComplete="new-password"
            />
          </div>
          <FormActions className="mt-12">
            <Button variant="outline" asChild>
              <Link to="/settings/user-details">Cancel</Link>
            </Button>
            <Button type="submit">Save Changes</Button>
          </FormActions>
        </form>
      </Form>
    </CenteredFormCard>
  )
}
