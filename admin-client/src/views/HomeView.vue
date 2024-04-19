<template>
  <a-layout :style="{ height: '100vh', maxHeight: '100vh' }">
    <app-slider v-model:selected-keys="selectedKeys" v-model:collapsed="collapsed" />
    <a-layout>
      <app-header :collapsed="collapsed" @handle-collapsed="() => (collapsed = !collapsed)" />
      <app-bread-crumb />
      <!-- <app-filter :title="'??'" /> -->
      <a-layout-content :style="{ minHeight: '280px' }">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import AppBreadCrumb from '@/components/layouts/AppBreadCrumb.vue'
import AppHeader from '@/components/layouts/AppHeader.vue'
import AppSlider from '@/components/layouts/AppSlider.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const selectedKeys = ref<string[]>(['users'])
const collapsed = ref<boolean>(false)
</script>
