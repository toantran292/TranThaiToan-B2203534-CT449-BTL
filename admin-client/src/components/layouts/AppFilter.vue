<template>
  <div :style="{ margin: '12px 16px' }">
    <a-typography>
      <a-typography-title :level="4">{{ title }}</a-typography-title>
    </a-typography>
    <a-flex
      :style="{
        marginTop: '12px',
        marginBottom: '12px',
        padding: '24px',
        background: 'rgb(255, 255, 255)'
      }"
      justify="space-between"
    >
      <div>
        <slot name="input"></slot>
      </div>
      <div>
        <slot name="action"></slot>
      </div>
    </a-flex>
  </div>
</template>

<script setup lang="ts">
defineProps(['title'])
</script>
