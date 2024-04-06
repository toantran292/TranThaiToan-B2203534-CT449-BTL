import { login } from '@/api/auth.api'
import { __ACCESS_TOKEN__, __REFRESH_TOKEN__, __USER__ } from '@/constants/localStorage'
import type { ILoginPayload } from '@/interfaces'
import router from '@/router'
import { sleep } from '@/utils/helper.util'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: JSON.parse(localStorage.getItem(__USER__) || 'null'),
    returnUrl: null as string | null
  }),
  actions: {
    async login(payload: ILoginPayload) {
      try {
        await sleep(1000)
        const { user, token } = await login(payload)

        this.user = user

        localStorage.setItem(__USER__, JSON.stringify(user))
        localStorage.setItem(__ACCESS_TOKEN__, token.accessToken)
        localStorage.setItem(__REFRESH_TOKEN__, token.refreshToken)

        router.push(this.returnUrl || '/')
      } catch (error) {
        return Promise.reject(error)
      }
    },
    logout() {
      this.user = null
      localStorage.removeItem(__USER__)
      router.push('/login')
    }
  }
})
