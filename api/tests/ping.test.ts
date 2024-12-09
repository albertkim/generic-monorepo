import { PingSchema } from '@lumber/common/models'
import { describe, expect, it } from 'vitest'
import { Globals } from './Globals'

describe('Ping', () => {
  it('Returns a timestamp', async () => {
    const response = await Globals.supertest.ping()
    expect(PingSchema.safeParse(response).success).toBe(true)
  })
})
