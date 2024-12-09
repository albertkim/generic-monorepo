import { User, UserSchema } from '@lumber/common/models'
import { db } from '../database'

export const UserRepository = {
  getUser: async (id: number): Promise<User | null> => {
    const result = await db.selectFrom('users').selectAll().where('user_id', '=', id).executeTakeFirst()
    if (!result) {
      return null
    }
    return UserSchema.parse({
      userId: result.user_id,
      userFullName: result.user_full_name,
      userEmail: result.user_email
    })
  },
  getUsers: async (): Promise<User[]> => {
    const result = await db.selectFrom('users').selectAll().execute()
    return result.map((user) =>
      UserSchema.parse({
        userId: user.user_id,
        userFullName: user.user_full_name,
        userEmail: user.user_email
      })
    )
  }
}
