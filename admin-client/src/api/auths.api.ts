import instanceAxios, { getLocalRefreshToken } from '@/api/axiosInterceptor'

export interface ILoginPayload {
  username: string
  password: string
}
export const getToken = (payload: ILoginPayload) => {
  return instanceAxios.post('/auth/login', payload)
}

export const refreshToken = () => {
  return instanceAxios.post('/auth/token', {
    refreshToken: getLocalRefreshToken()
  })
}
