<template>
  <a-layout-header style="background: #fff; padding: 0">
    <menu-unfold-outlined v-if="collapsed" class="trigger" @click="$emit('handleCollapsed')" />
    <menu-fold-outlined v-else class="trigger" @click="$emit('handleCollapsed')" />
  </a-layout-header>
</template>
<script setup lang="ts">
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue'
defineProps(['collapsed'])
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
