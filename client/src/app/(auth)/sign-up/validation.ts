import { z } from 'zod'

export const signUpFormSchema = z.object({
  email: z.email({ message: 'Please enter a valid email.' }).toLowerCase().trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    }),
})

export type SignUpFormData = z.infer<typeof signUpFormSchema>
type SignUpFieldErrors = z.inferFlattenedErrors<typeof signUpFormSchema>['fieldErrors']

export type SignUpActionState = {
  formData?: SignUpFormData
  fieldErrors?: SignUpFieldErrors
}