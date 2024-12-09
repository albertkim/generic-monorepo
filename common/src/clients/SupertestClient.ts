import { Express } from 'express'
import supertest from 'supertest'
import TestAgent from 'supertest/lib/agent'
import { APIClientBase, APIError, HttpMethod } from './BaseClient'

export class SupertestAPIClient extends APIClientBase {
  private client: TestAgent<supertest.Test>
  private authToken: string | null = null
  private sparkAuthToken: string | null = null

  constructor(app: Express) {
    super()
    this.client = supertest(app)
  }

  protected async request(
    method: HttpMethod,
    url: string,
    data?: any,
    queryParams?: Record<string, string>
  ): Promise<any> {
    let request = this.client[method](url)

    // Add query parameters
    if (queryParams) {
      request = request.query(queryParams)
    }

    if (this.sparkAuthToken) {
      request = request.set('X-Spark-Auth-Token', this.sparkAuthToken)
    } else if (this.authToken) {
      request = request.set('Authorization', `Bearer ${this.authToken}`)
    }

    if (data) {
      request = request.send(data)
    }

    const response = await request

    if (response.status < 200 || response.status >= 300) {
      const error: APIError = {
        statusCode: response.status,
        message: response.body.message,
        data: response.body
      }
      throw error
    }

    return response.body
  }

  setAuthToken(token: string | null): void {
    this.authToken = token
  }

  clearAuthToken(): void {
    this.authToken = null
  }

  setSparkAuthToken(token: string | null): void {
    this.sparkAuthToken = token
  }

  clearSparkAuthToken(): void {
    this.sparkAuthToken = null
  }
}
