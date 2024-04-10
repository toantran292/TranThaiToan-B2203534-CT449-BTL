<template>
  <a-row :gutter="10">
    <a-col :span="labelSpan">
      <a-flex :style="{ height: '100%' }" align="center">
        <label :for="name">
          <a-flex gap="3">
            <span v-if="required" :style="{ color: 'red' }">*</span><span>{{ label }}:</span>
          </a-flex>
        </label>
      </a-flex>
    </a-col>
    <a-col :span="inputSpan">
      <a-date-picker
        v-if="datePicker"
        :status="inputStatus"
        :id="name"
        :name
        :style="{ width: '100%' }"
        v-model:value="value"
      />
      <a-input-password
        v-else-if="password"
        :status="inputStatus"
        :id="name"
        :name
        v-model:value="value"
      />
      <a-input v-else :status="inputStatus" :id="name" :name v-model:value="value" :placeholder />
    </a-col>
  </a-row>
  <a-row>
    <a-col :offset="labelSpan" :span="inputSpan" :style="{ height: '1.2rem' }">
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
  error: {
    type: String,
    default: ''
  },
  labelSpan: {
    type: Number,
    default: 4
  },
  inputSpan: {
    type: Number,
    default(toRaw) {
      // console.log(toRaw)
      return 24 - toRaw.labelSpan
    }
  }
})
const value = defineModel('value')
// console.log(value)

const inputStatus = computed(() => (props.error ? 'error' : ''))

// console.log(props.inputSpan)
</script>
