<template>
  <a-layout :style="{ height: '100vh' }">
    <app-slider v-model:selected-keys="selectedKeys" v-model:collapsed="collapsed" />
    <a-layout>
      <app-header :collapsed="collapsed" @handle-collapsed="() => (collapsed = !collapsed)" />
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import AppHeader from '@/components/layouts/AppHeader.vue'
import AppSlider from '@/components/layouts/AppSlider.vue'
import { ref } from 'vue'
const selectedKeys = ref<string[]>(['users'])
const collapsed = ref<boolean>(false)
</script>
