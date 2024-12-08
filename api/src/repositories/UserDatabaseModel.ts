import { z } from 'zod'

export const UserDatabaseSchema = z.object({
  userId: z.number(),
  userFullName: z.string().nullable(),
  userEmail: z.string().email().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

export type UserDatabase = z.infer<typeof UserDatabaseSchema>
