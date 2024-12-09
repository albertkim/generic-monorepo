import { UserSchema } from '@lumber/common/models'
import { describe, expect, it } from 'vitest'
import { Globals } from './Globals'

describe('UserService', () => {
  it('Admin can get all users', async () => {
    const usersResponse = await Globals.supertest.getAdminUsers()
    expect(usersResponse.data).toBeInstanceOf(Array)
    expect(usersResponse.data.every((user) => UserSchema.safeParse(user).success)).toBe(true)
  })
  it('Returns a user by id', async () => {
    const userResponse = await Globals.supertest.getAdminUser(1)
    expect(userResponse.userId).toBe(1)
  })
  it('Returns a 404 if the user is not found', async () => {
    try {
      await Globals.supertest.getAdminUser(999)
    } catch (error: any) {
      expect(error.statusCode).toBe(404)
    }
  })
})
