<template>
  <a-breadcrumb :style="{ margin: '12px 16px 0px 16px' }">
    <a-breadcrumb-item>
      <router-link :to="{ path: `/` }"> {{ viLang['home'] }} </router-link>
    </a-breadcrumb-item>
    <template v-for="path in paths" :key="path">
      <a-breadcrumb-item v-if="viLang[path]">
        <router-link :to="{ path: `/${path}` }"> {{ viLang[path] }} </router-link>
      </a-breadcrumb-item>
    </template>
  </a-breadcrumb>
</template>

<script setup lang="ts">
import { viLang } from '@/utils'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const paths = computed(() => {
  return route.path.split('/').filter((path) => path !== '')
})
</script>
