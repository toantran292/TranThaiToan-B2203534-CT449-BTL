<template>
  <a-flex vertical :gap="10" :style="{ margin: '12px 16px' }">
    <a-typography>
      <a-typography-title :level="4" :style="{ margin: 0 }">{{ title }}</a-typography-title>
    </a-typography>
    <a-flex
      v-if="hasToolBox"
      :style="{
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
  </a-flex>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  hasToolBox: {
    type: Boolean,
    default() {
      return true
    }
  }
})
</script>
