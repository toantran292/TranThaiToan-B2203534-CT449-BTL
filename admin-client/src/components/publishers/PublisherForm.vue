<template>
  <form @submit.prevent="$emit('submit')" :style="{ backgroundColor: '#fff', height: '100%' }">
    <a-layout :style="{ backgroundColor: '#fff', height: '100%' }">
      <!-- <a-flex> -->
      <a-layout-content :style="{ flex: 1, padding: '12px 0', marginTop: '12px' }">
        <a-row>
          <a-col :offset="8" :span="8">
            <TInput :label="'Tên nhà xuất bản'" name="name" required />
          </a-col>
          <a-col :offset="8" :span="8">
            <TInput :label="'Địa chỉ'" name="address" required />
          </a-col>
        </a-row>
      </a-layout-content>
      <a-layout-footer :style="{ backgroundColor: '#fff', padding: '12px' }">
        <a-flex justify="right" :gap="10">
          <router-link :to="{ name: 'author' }">
            <a-button type="primary" danger> Trở về</a-button>
          </router-link>
          <a-button type="primary" html-type="submit" :disabled="!dirty">{{
            _id ? 'Sửa' : 'Tạo'
          }}</a-button>
        </a-flex>
      </a-layout-footer>
    </a-layout>
  </form>
</template>

<script setup lang="ts">
import TInput from '@/components/common/TInput.vue'

// const formState = ref<IUser>({} as any)

defineEmits(['submit'])
defineProps({
  _id: String,
  dirty: {
    type: Boolean,
    default: true
  }
})
</script>
