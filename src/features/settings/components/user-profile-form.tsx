import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { TextField } from '#/components/form-fields'
import { ImageUploadCard } from '#/components/image-upload-card'
import { Button } from '#/components/ui/button'
import { Form } from '#/components/ui/form'
import type { CurrentUser } from '../types'

const userProfileSchema = z.object({
  name: z.string().trim().min(2, 'Enter your name.'),
  email: z.email('Enter a valid email address.'),
  contact: z.string().trim().min(7, 'Enter a contact number.'),
})
type UserProfileValues = z.infer<typeof userProfileSchema>

/** Grey default silhouette drawn in frames 10/14 (#BFBFBF). */
function AvatarSilhouette() {
  return (
    <span aria-hidden className="flex flex-col items-center gap-4 pt-1">
      <span className="size-14 rounded-full bg-input" />
      <span className="h-14 w-[124px] rounded-t-full rounded-b-[28px] bg-input" />
    </span>
  )
}

/** Frames 10/14 top block: photo card + User Name / Email ID / Contact. Save is added (missing in the design). */
export function UserProfileForm({ user }: { user: CurrentUser }) {
  const form = useForm<UserProfileValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: { name: user.name, email: user.email, contact: user.contact ?? '' },
  })

  return (
    <div className="flex flex-col gap-8 md:flex-row md:gap-[68px]">
      <div className="[&_figcaption]:font-semibold [&_figcaption]:text-foreground">
        <ImageUploadCard caption="User Profile" uploadLabel="Upload Photo" placeholder={<AvatarSilhouette />} />
      </div>
      <Form {...form}>
        <form
          noValidate
          aria-label="User profile"
          onSubmit={form.handleSubmit(() => {
            form.reset(form.getValues())
            toast.success('Profile details saved')
          })}
          className="flex min-w-0 flex-1 flex-col gap-[23px] pt-0.5"
        >
          <TextField
            control={form.control}
            name="name"
            label="User Name"
            required
            placeholder="Enter your name"
            description="Your name as shown to other users"
            autoComplete="name"
          />
          <TextField
            control={form.control}
            name="email"
            label="Email ID"
            required
            type="email"
            placeholder="Enter E-mail where notification can follow"
            autoComplete="email"
          />
          <TextField
            control={form.control}
            name="contact"
            label="Contact"
            required
            type="tel"
            placeholder="Enter contact number"
            autoComplete="tel"
          />
          <Button type="submit" className="self-start">
            Save
          </Button>
        </form>
      </Form>
    </div>
  )
}
