import { refreshToken } from '@/api/auth.api'
import { __ACCESS_TOKEN__ } from '@/constants/localStorage'
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
    console.log(error)

    if (error.response && error.response.status === 401) {
      if (!isRefreshing) {
        try {
          const { data } = await refreshToken()
          localStorage.setItem(__ACCESS_TOKEN__, data.token)
          refreshQueue.forEach((resolve) => resolve())
          refreshQueue = []
          isRefreshing = false

          error.config.headers.Authorization = `Bearer ${data.token}`
          return axios.request(error.config)
        } catch (error) {
          isRefreshing = false
          console.error('Failed to refresh token', error)
        }
      } else {
        return new Promise((resolve) => {
          refreshQueue.push(() => {
            resolve(api.request(error.config))
          })
        })
      }
    }

    return Promise.reject(error)
  }
)

export default api
