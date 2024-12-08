import { database } from '../database'
import { UserDatabase, UserDatabaseSchema } from './UserDatabaseModel'

export const UserRepository = {
  getUser: async (id: number): Promise<UserDatabase | null> => {
    const result = database.users.find((user) => user.userId === id)
    if (!result) {
      return null
    }
    const validatedUser = UserDatabaseSchema.parse(result)
    return validatedUser
  },
  getUsers: async (): Promise<UserDatabase[]> => {
    const result = database.users
    const validatedUsers = result.map((user) => UserDatabaseSchema.parse(user))
    return validatedUsers
  }
}
