<template>
  <a-flex
    :style="{ height: '100vh', width: '100%', backgroundColor: '#EEF2F5' }"
    align="center"
    justify="center"
  >
    <RegisterForm />
  </a-flex>
</template>

<script setup lang="ts">
import RegisterForm from '@/components/logins/RegisterForm.vue'
</script>
