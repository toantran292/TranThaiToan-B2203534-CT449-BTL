<template>
  <a-layout-header :style="{ background: '#fff', padding: 0 }">
    <a-flex justify="space-between">
      <div class="menu">
        <menu-unfold-outlined v-if="collapsed" class="trigger" @click="$emit('handleCollapsed')" />
        <menu-fold-outlined v-else class="trigger" @click="$emit('handleCollapsed')" />
      </div>
      <div class="avatar" :style="{ padding: '0px 16px' }">
        <!-- <template -->
        <template v-if="auth.user?.avatar">
          <a-avatar :src="auth.user?.avatar" size="large" :style="{ verticalAlign: 'middle' }" />
        </template>
        <template v-else>
          <a-avatar
            style="color: #f56a00; background-color: #fde3cf"
            size="large"
            :style="{ verticalAlign: 'middle' }"
            >{{ auth.user?.firstName }}</a-avatar
          >
        </template>
      </div>
    </a-flex>
  </a-layout-header>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
defineProps(['collapsed'])

const auth = useAuthStore()
</script>
<style>
.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}
</style>
