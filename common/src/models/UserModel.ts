import { z } from 'zod'

export const UserModel = z.object({
  userId: z.number(),
  userFullName: z.string().nullable(),
  userEmail: z.string().email().nullable()
})

export type User = z.infer<typeof UserModel>
