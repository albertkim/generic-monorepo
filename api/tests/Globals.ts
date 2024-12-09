import { SupertestAPIClient } from '@lumber/common/supertest'
import { app } from '../src/app'

export const apiClient = new SupertestAPIClient(app)

export const Globals = {
  supertest: new SupertestAPIClient(app)
}
