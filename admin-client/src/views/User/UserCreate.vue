<template>
  <a-layout :style="{ height: '100%' }">
    <app-filter :title="'Tạo người dùng'" :hasToolBox="false" />
    <a-layout-content
      :style="{
        margin: '0px 16px 24px 16px',
        backgroundColor: '#fff'
      }"
    >
      <user-form />
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import AppFilter from '@/components/layouts/AppFilter.vue'
import UserForm from '@/components/users/UserForm.vue'
</script>
