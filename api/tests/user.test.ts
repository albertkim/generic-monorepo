import { describe, expect, it } from 'vitest'
import { UserService } from '../src/services/UserService'

describe('UserService', () => {
  it('Returns a user by id', async () => {
    const user = await UserService.getUser(1)
    expect(user).toEqual({
      userId: 1,
      userFullName: 'John Doe',
      userEmail: 'john.doe@example.com'
    })
  })
  it('Returns all users', async () => {
    const users = await UserService.getUsers()
    expect(users).toHaveLength(3)
  })
})
