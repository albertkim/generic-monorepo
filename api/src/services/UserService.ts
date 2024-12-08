import { User, UserModel } from '@lumber/common'
import { UserRepository } from '../repositories/UserRepository'

export const UserService = {
  getUser: async (id: number): Promise<User> => {
    const userDatabase = await UserRepository.getUser(id)
    const user = UserModel.parse(userDatabase)
    return user
  },

  getUsers: async (): Promise<User[]> => {
    const usersDatabase = await UserRepository.getUsers()
    const users = usersDatabase.map((user) => UserModel.parse(user))
    return users
  }
}
