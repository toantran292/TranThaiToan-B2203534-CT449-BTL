<template>
  <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
    <a-flex vertical justify="space-between" :style="{ height: '100%', paddingBottom: '10px' }">
      <div>
        <div class="logo" />
        <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
          <a-menu-item key="users">
            <router-link :to="{ name: 'user' }"> </router-link>
            <user-outlined />
            <span>Quản lý người dùng</span>
          </a-menu-item>
          <a-menu-item key="books">
            <router-link :to="{ name: 'book' }"> </router-link>
            <fas-icon :icon="faBook" />
            <span>Quản lý sách</span>
          </a-menu-item>
          <a-menu-item key="publishers">
            <router-link :to="{ name: 'publisher' }"> </router-link>
            <fas-icon :icon="faIndustry" />
            <span>Quản lý NXB</span>
          </a-menu-item>
          <a-menu-item key="authors">
            <router-link :to="{ name: 'author' }"> </router-link>
            <fas-icon :icon="faUserPen" />
            <span>Quản lý tác giả</span>
          </a-menu-item>
        </a-menu>
      </div>
      <div :style="{ padding: '5px' }">
        <a-button @click="handleLogin" type="primary" danger block>
          <template #icon>
            <fas-icon :icon="faRightFromBracket" />
          </template>
          <span v-if="!collapsed"> Đăng xuất </span>
        </a-button>
      </div>
    </a-flex>
  </a-layout-sider>
</template>

<script setup props="props" lang="ts">
import { useAuthStore } from '@/stores'
import { UserOutlined } from '@ant-design/icons-vue'
import {
  faBook,
  faIndustry,
  faRightFromBracket,
  faUserPen
} from '@fortawesome/free-solid-svg-icons'

const collapsed = defineModel('collapsed')
const selectedKeys = defineModel('selectedKeys')

const handleLogin = () => {
  const auth = useAuthStore()

  auth.logout('success', {
    message: 'Đăng xuất thành công'
  })
}
</script>

<style>
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}
</style>
