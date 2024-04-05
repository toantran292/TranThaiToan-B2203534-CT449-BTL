<script setup lang="ts">
import LoginForm from '@/components/logins/LoginForm.vue'
import { ref } from 'vue'

const count = ref(0)

const increment = () => {
  count.value++
}
</script>

<template>
  <main>
    This is Login view
    <LoginForm />
  </main>
</template>
