import api from '@/api/axiosInterceptor'
import { __ACCESS_TOKEN__, __REFRESH_TOKEN__, __USER__ } from '@/constants/localStorage'
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
    const { user, token } = (await api.post('/auth/login', payload)) as ILoginResponse
    localStorage.setItem(__USER__, JSON.stringify(user))
    localStorage.setItem(__ACCESS_TOKEN__, token.accessToken)
    localStorage.setItem(__REFRESH_TOKEN__, token.refreshToken)
    return { test: 'ok' }
  } catch (error) {
    return error
  }
}

export const refreshToken = () => {
  return api.post('/auth/token', {
    refreshToken: localStorage.getItem(__REFRESH_TOKEN__)
  })
}
