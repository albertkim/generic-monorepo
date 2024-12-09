import { HttpAPIClient } from '@lumber/common/http'

export const apiClient = new HttpAPIClient(import.meta.env.VITE_API_URL)
