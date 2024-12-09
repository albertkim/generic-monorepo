import { z } from 'zod'

export const UserSchema = z
  .object({
    userId: z.number(),
    userFullName: z.string().nullable(),
    userEmail: z.string().email().nullable()
  })
  .strict()

export type User = z.infer<typeof UserSchema>
