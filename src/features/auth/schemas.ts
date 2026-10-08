import { z } from 'zod'

export const signInSchema = z.object({
  email: z.email('Enter a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
  remember: z.boolean(),
})
export type SignInValues = z.infer<typeof signInSchema>

/** Password rules shown under the Sign Up password field (frame 2). */
export const PASSWORD_RULES = [
  {
    id: 'categories',
    label: 'Password must include these categories: A-Z, a-z, 0-9 and special characters (-!@#$%^&*)',
    test: (value: string) =>
      /[A-Z]/.test(value) &&
      /[a-z]/.test(value) &&
      /[0-9]/.test(value) &&
      /[-!@#$%^&*]/.test(value),
  },
  {
    id: 'length',
    label: 'Password must be at least 8 characters and shorter than 250 characters',
    test: (value: string) => value.length >= 8 && value.length < 250,
  },
] as const

export const signUpSchema = z
  .object({
    username: z.string().trim().min(2, 'Enter a username.'),
    email: z.email('Enter a valid email address.'),
    password: z
      .string()
      .refine((value) => PASSWORD_RULES.every((rule) => rule.test(value)), {
        message: 'Password does not meet the requirements below.',
      }),
    confirmPassword: z.string().min(1, 'Confirm your password.'),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match.',
  })
export type SignUpValues = z.infer<typeof signUpSchema>

export const forgotPasswordSchema = z.object({
  email: z.email('Enter a valid email address.'),
})
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>
