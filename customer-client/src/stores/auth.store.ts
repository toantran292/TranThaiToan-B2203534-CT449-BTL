import { login, register } from '@/api/auth.api'
import { __ACCESS_TOKEN__, __REFRESH_TOKEN__, __USER__ } from '@/constants/localStorage'
import type { ILoginPayload } from '@/interfaces'
import router from '@/router'
import { sleep } from '@/utils/helper.util'
import { notification } from 'ant-design-vue'
import type { NotificationArgsProps, NotificationInstance } from 'ant-design-vue/es/notification'
import { defineStore } from 'pinia'
// import {} from '@'
export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: JSON.parse(localStorage.getItem(__USER__) || 'null'),
    returnUrl: null as string | null
  }),
  actions: {
    async register(payload: ILoginPayload) {
      try {
        await sleep(1000)
        const { user, token } = await register(payload)

        if (user.isStaff) throw new Error()

        this.user = user

        localStorage.setItem(__USER__, JSON.stringify(user))
        localStorage.setItem(__ACCESS_TOKEN__, token.accessToken)
        localStorage.setItem(__REFRESH_TOKEN__, token.refreshToken)

        notification.success({
          message: 'Đăng ký thành công',
          description: 'Hệ thống đang chuyển hướng bạn đến trang chủ!',
          duration: 2.5
        })

        router.push(this.returnUrl || '/')
      } catch (error: any) {
        notification.error({
          message: 'Đăng ký thất bại',
          description: error.message,
          duration: 2.5
        })
        return Promise.reject(error)
      }
    },
    async login(payload: ILoginPayload) {
      try {
        await sleep(1000)
        const { user, token } = await login(payload)

        console.log(user)

        this.user = user

        localStorage.setItem(__USER__, JSON.stringify(user))
        localStorage.setItem(__ACCESS_TOKEN__, token.accessToken)
        localStorage.setItem(__REFRESH_TOKEN__, token.refreshToken)

        notification.success({
          message: 'Đăng nhập thành công',
          description: 'Hệ thống đang chuyển hướng bạn đến trang quản trị!',
          duration: 2.5
        })

        router.push(this.returnUrl || '/')
      } catch (error: any) {
        notification.error({
          message: 'Đăng nhập thất bại',
          description: error.message,
          duration: 2.5
        })
        return Promise.reject(error)
      }
    },
    logout(type: keyof NotificationInstance, opts: NotificationArgsProps) {
      this.user = null
      localStorage.removeItem(__USER__)
      router.push('/')
      notification[type](opts)
    }
  }
})
