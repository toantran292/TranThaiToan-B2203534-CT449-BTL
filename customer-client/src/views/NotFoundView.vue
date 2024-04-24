<template>
  <a-result status="404" title="404" sub-title="Xin lỗi, không tìm thấy trang">
    <template #extra>
      <a-button type="primary" @click="() => router.push({ name: 'home' })">Trở về</a-button>
    </template>
  </a-result>
</template>

<script setup lang="ts">
import router from '@/router'
</script>
