import { refreshToken } from '@/api/auth.api'
import { __ACCESS_TOKEN__ } from '@/constants/localStorage'
import { useAuthStore } from '@/stores'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_ENDPOINT,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(__ACCESS_TOKEN__)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

let isRefreshing = false
let refreshQueue: (() => void)[] = []

api.interceptors.response.use(
  (response) => {
    return response.data
  },
  async (error) => {
    if (error.response) {
      if (error.response.status !== 401) return Promise.reject(error.response.data)

      //STATUS == 401
      if (error.response.data.status === 'token_expired') {
        if (!isRefreshing) {
          isRefreshing = true
          try {
            const data: any = await refreshToken()
            localStorage.setItem(__ACCESS_TOKEN__, data.token)
            refreshQueue.forEach((resolve) => resolve())
            refreshQueue = []
            isRefreshing = false

            error.config.headers.Authorization = `Bearer ${data.token}`
            return api.request(error.config)
          } catch (error) {
            refreshQueue = []
            isRefreshing = false
            const auth = useAuthStore()
            auth.logout('error', {
              message: 'Phiên đã hết hạn',
              description: 'Vui lòng đăng nhập lại!',
              duration: 2.5
            })
          }
        } else {
          return new Promise((resolve) => {
            refreshQueue.push(() => {
              resolve(api.request(error.config))
            })
          })
        }
      }
    }

    return Promise.reject('Lỗi')
  }
)

export default api
