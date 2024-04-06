<template>
  <a-flex
    :style="{ height: '100vh', width: '100%', backgroundColor: '#EEF2F5' }"
    align="center"
    justify="center"
  >
    <login-form />
  </a-flex>
</template>

<script setup lang="ts">
import LoginForm from '@/components/logins/LoginForm.vue'
</script>
