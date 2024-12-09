import { Generated } from 'kysely'

export interface DB {
  users: Users
}

export interface Users {
  user_id: Generated<number>
  user_full_name: string | null
  user_email: string | null
  user_created_at: Generated<string>
  user_updated_at: Generated<string>
}
