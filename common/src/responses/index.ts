import { Ping } from '../models/PingModel'
import { User } from '../models/UserModel'

export type PingResponse = Ping

export type AdminUsersResponse = {
  data: User[]
  total: number
}

export type AdminUserResponse = User
