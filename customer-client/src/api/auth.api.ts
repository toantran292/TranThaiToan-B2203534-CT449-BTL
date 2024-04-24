import api from '@/api/axiosInterceptor'
import { __REFRESH_TOKEN__ } from '@/constants/localStorage'
import type { ILoginPayload, IToken } from '@/interfaces/auth.interface'

export interface ILoginResponse {
  user: {
    userId: string
    isStaff: true
    email: string
  }
  token: IToken
}

export const login = async (payload: ILoginPayload) => {
  try {
    const response = (await api.post('/auth/login', payload)) as ILoginResponse
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}

export const register = async (payload: ILoginPayload) => {
  try {
    const response = (await api.post('/auth/register', payload)) as ILoginResponse
    return response
  } catch (error) {
    return Promise.reject(error)
  }
}

export const refreshToken = () => {
  return api.post('/auth/token', {
    refreshToken: localStorage.getItem(__REFRESH_TOKEN__)
  })
}
