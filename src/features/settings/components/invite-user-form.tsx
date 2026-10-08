import { Link } from '@tanstack/react-router'
import { z } from 'zod'
import type { UseFormReturn } from 'react-hook-form'

import { CenteredFormCard } from '#/components/centered-form-card'
import { FormActions } from '#/components/form-actions'
import { SelectField, TextField } from '#/components/form-fields'
import { Button } from '#/components/ui/button'
import { Form } from '#/components/ui/form'
import { USER_ROLES } from '../types'
import { ROLE_OPTIONS } from '../sample-data'

export const inviteUserSchema = z.object({
  name: z.string().trim().min(2, 'Enter the name of the user.'),
  email: z.email('Enter a valid email address.'),
  // the select starts empty, so the input is a string and the output a role
  role: z.string().pipe(z.enum(USER_ROLES, 'Select the role of the user.')),
})
export type InviteUserDraft = z.input<typeof inviteUserSchema>
export type InviteUserValues = z.output<typeof inviteUserSchema>

/** Frame 18: centred invite card under the "Invite New User" section bar. */
export function InviteUserForm({
  form,
  onSubmit,
}: {
  form: UseFormReturn<InviteUserDraft, unknown, InviteUserValues>
  onSubmit: (values: InviteUserValues) => void
}) {
  const { control } = form
  return (
    <CenteredFormCard
      title="Invite User in current organisation"
      subtitle={
        <>
          The user will get notified of the invite and will be shown as “Pending Invite” in the list until they accept
          the invite.
        </>
      }
      className="mt-[39px] gap-[39px] px-[68px] pt-[42px] pb-[68px] [&>header_p]:mx-auto [&>header_p]:mt-[17px] [&>header_p]:max-w-[505px]"
    >
      <Form {...form}>
        <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-[23px]">
          <TextField control={control} name="name" label="Name" placeholder="Enter the name of user" autoComplete="off" />
          <TextField
            control={control}
            name="email"
            label="E-mail"
            type="email"
            placeholder="Enter the E-mail address of the user"
            autoComplete="off"
          />
          <SelectField
            control={control}
            name="role"
            label="User role"
            placeholder="Select the role of the user"
            options={ROLE_OPTIONS}
          />
          <FormActions className="mt-[25px]">
            <Button variant="outline" asChild>
              <Link to="/settings/users">Cancel</Link>
            </Button>
            <Button type="submit">Invite</Button>
          </FormActions>
        </form>
      </Form>
    </CenteredFormCard>
  )
}
