<template>
  <a-layout-header :style="{ background: '#fff', padding: '0 20vw 0 20vw' }">
    <a-flex justify="space-between" align="center">
      <div class="menu"></div>
      <template v-if="!auth.user">
        <a-space gap="3">
          <a-button @click="() => router.push('/register')">Đăng ký</a-button>
          <a-button @click="() => router.push('/login')">Đăng nhập</a-button>
        </a-space>
      </template>
      <template v-else>
        <a-space>
          {{ auth.user?.firstName }}
          <div class="avatar" :style="{ padding: '0px 0px', width: '100%' }">
            <a-popover placement="bottom">
              <template #content>
                <a-space direction="vertical" justify="center" align="center">
                  <router-link :to="{ name: 'profile' }">
                    <a-button type="text" block>Trang cá nhân</a-button>
                  </router-link>
                  <router-link :to="{ name: 'borrow:list' }">
                    <a-button type="text" block>Lịch sử mượn sách</a-button>
                  </router-link>
                  <a-button @click="handleLogout" type="text">Đăng xuất</a-button>
                </a-space>
              </template>
              <template v-if="auth.user?.avatar">
                <a-avatar
                  :src="auth.user?.avatar"
                  size="large"
                  :style="{ verticalAlign: 'middle' }"
                />
              </template>
              <template v-else>
                <a-avatar
                  style="color: #f56a00; background-color: #fde3cf"
                  size="large"
                  :style="{ verticalAlign: 'middle' }"
                >
                  {{ auth.user?.firstName }}
                </a-avatar>
              </template>
            </a-popover>
          </div>
        </a-space>
      </template>
    </a-flex>
  </a-layout-header>
</template>
<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores'
const auth = useAuthStore()
console.log(auth.user)
const handleLogout = () => {
  const auth = useAuthStore()

  auth.logout('success', {
    message: 'Đăng xuất thành công'
  })
}
</script>
