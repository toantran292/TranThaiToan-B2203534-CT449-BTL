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
        :lowerLimit="new Date()"
        :locale="locale"
        :status="inputStatus"
        :id="name"
        :name
        :style="{ width: '100%' }"
        v-model:value="value"
        :valueFormat="'YYYY-MM-DDTHH:mm:ssZ'"
        :format="'DD/MM/YYYY'"
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
      <div :style="{ color: 'red' }">{{ errorMessage }}</div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import locale from 'ant-design-vue/es/date-picker/locale/vi_VN'
import { useField } from 'vee-validate'
import { computed } from 'vue'

const props = defineProps({
  label: String,
  name: String,
  placeholder: String,
  required: Boolean,
  datePicker: Boolean,
  password: Boolean,
  isSwitch: Boolean,
  select: Boolean
})

const inputStatus = computed(() => (errorMessage ? true : false))
const { value, errorMessage } = useField(() => props.name!)
</script>
