import { z } from 'zod'

export const PingSchema = z.object({
  timestamp: z.string()
})

export type Ping = z.infer<typeof PingSchema>
