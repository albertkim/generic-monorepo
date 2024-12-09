import { AdminUserResponse, AdminUsersResponse, PingResponse } from '../responses'

export type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete'

export interface APIError {
  statusCode: number
  message: string
  data?: any
}

export abstract class APIClientBase {
  protected abstract request<T>(
    method: HttpMethod,
    url: string,
    data?: any,
    queryParams?: Record<string, string>
  ): Promise<T>

  abstract setAuthToken(token: string | null): void
  abstract clearAuthToken(): void

  async ping(): Promise<PingResponse> {
    return this.request<PingResponse>('get', '/api/v1/ping')
  }

  async getAdminUsers(): Promise<AdminUsersResponse> {
    return this.request<AdminUsersResponse>('get', '/api/v1/admin/users')
  }

  async getAdminUser(id: number): Promise<AdminUserResponse> {
    return this.request<AdminUserResponse>('get', `/api/v1/admin/users/${id}`)
  }
}
