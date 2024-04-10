<template>
  <a-row :gutter="[10, 5]">
    <a-col :span="24">
      <a-flex :style="{ height: '100%' }" align="center">
        <label :for="name">
          <a-flex gap="3">
            <span v-if="required" :style="{ color: 'red' }">*</span><span>{{ label }}:</span>
          </a-flex>
        </label>
      </a-flex>
    </a-col>
    <a-col :span="24">
      <a-input-password
        v-if="password"
        :status="inputStatus"
        :id="name"
        :name
        v-model:value="value"
      />
      <a-date-picker
        v-else-if="datePicker"
        :status="inputStatus"
        :id="name"
        :name
        :style="{ width: '100%' }"
        v-model:value="value"
      />
      <a-switch v-else-if="isSwitch" v-model:checked="value" />
      <a-select v-else-if="select" v-model:value="value" :style="{ width: '100%' }">
        <slot />
      </a-select>
      <a-input v-else :status="inputStatus" :id="name" :name v-model:value="value" :placeholder />
    </a-col>
  </a-row>
  <a-row>
    <a-col :span="24" :style="{ height: '1.2rem', marginTop: '5px' }">
      <div :style="{ color: 'red' }">{{ error }}</div>
    </a-col>
  </a-row>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: String,
  name: String,
  placeholder: String,
  required: Boolean,
  datePicker: Boolean,
  password: Boolean,
  isSwitch: Boolean,
  select: Boolean,
  error: {
    type: String,
    default: ''
  }
})
const value = defineModel('value')
// console.log(value)

const inputStatus = computed(() => (props.error ? 'error' : ''))

// console.log(props.inputSpan)
</script>
