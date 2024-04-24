<template>
  <a-layout :style="{ height: '100vh', maxHeight: '100vh' }">
    <a-layout>
      <app-header />
      <app-filter :title="'??'" />
      <a-layout-content :style="{ minHeight: '280px', padding: '0 20vw 0 20vw' }">

        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import Banner from '@/components/Banner/Banner.vue'
import AppHeader from '@/components/layouts/AppHeader.vue'
</script>
