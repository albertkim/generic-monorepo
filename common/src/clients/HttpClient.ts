import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { APIClientBase, APIError, HttpMethod } from './BaseClient'

export class HttpAPIClient extends APIClientBase {
  client: AxiosInstance

  constructor(baseURL: string) {
    super()
    this.client = axios.create({ baseURL })
  }

  protected async request(
    method: HttpMethod,
    url: string,
    data?: any,
    queryParams?: Record<string, string>
  ): Promise<any> {
    try {
      const response: AxiosResponse = await this.client.request({
        method,
        url,
        params: queryParams,
        data
      })
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: APIError = {
          statusCode: error.response?.status || 500,
          message: error.response?.data?.message || 'An unexpected error occurred',
          data: error.response?.data
        }
        throw axiosError
      }
      throw error
    }
  }

  setAuthToken(token: string | null): void {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  clearAuthToken(): void {
    delete this.client.defaults.headers.common['Authorization']
  }
}
