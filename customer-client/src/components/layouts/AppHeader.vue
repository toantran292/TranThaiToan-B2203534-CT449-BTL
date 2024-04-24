<template>
  <a-layout-header :style="{ background: '#fff', padding: '0 20vw 0 20vw' }">
    <a-flex justify="space-between">
      <div class="menu"></div>
      <a-space>
        {{ auth.user?.firstName }}
        <div class="avatar" :style="{ padding: '0px 0px', width: '100%' }">
          <a-popover placement="bottom">
            <template #content>
              <a-space-compact direction="vertical">
                <router-link :to="{ name: 'home' }" block>
                  <a-button type="text">Trang cá nhân</a-button>
                </router-link>
                <router-link :to="{ name: 'home' }" block>
                  <a-button type="text">Đăng xuất</a-button>
                </router-link>
              </a-space-compact>
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
    </a-flex>
  </a-layout-header>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores'

const auth = useAuthStore()

const handleLogin = () => {
  const auth = useAuthStore()

  auth.logout('success', {
    message: 'Đăng xuất thành công'
  })
}
</script>
