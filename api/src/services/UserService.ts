import { User } from '@lumber/common/models'
import { UserRepository } from '../repositories/UserRepository'

export const UserService = {
  getUser: async (id: number): Promise<User | null> => {
    const user = await UserRepository.getUser(id)
    return user
  },

  getUsers: async (): Promise<User[]> => {
    const users = await UserRepository.getUsers()
    return users
  }
}
