<template>
  <a-card :style="{ padding: '1rem' }">
    <a-typography-title :style="{ textAlign: 'center' }">Đăng ký</a-typography-title>
    <a-form :model="formState" name="test" autocomplete="off" @submit="handleSubmit">
      <a-form-item
        name="email"
        :rules="[{ required: true, message: 'Email không được bỏ trống!' }]"
      >
        <a-input v-model:value="formState.email" placeholder="Email" size="large">
          <template #prefix> <UserOutlined class="site-form-item-icon" /> </template>
        </a-input>
      </a-form-item>
      <a-form-item
        name="password"
        :rules="[{ required: true, message: 'Mật khẩu không được bỏ trống!' }]"
      >
        <a-input-password v-model:value="formState.password" placeholder="Mật khẩu" size="large">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        name="phoneNumber"
        :rules="[{ required: true, message: 'Số điện thoại không được bỏ trống!' }]"
      >
        <a-input v-model:value="formState.phoneNumber" placeholder="Số điện thoại" size="large">
          <template #prefix>
            <LockOutlined class="site-form-item-icon" />
          </template>
        </a-input>
      </a-form-item>

      <a-flex justify="center">
        <a-button
          type="primary"
          html-type="submit"
          :loading="loading"
          :width="'10px'"
          :style="{ color: 'white' }"
          >Đăng ký</a-button
        >
      </a-flex>
    </a-form>
  </a-card>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores'
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue'
import { reactive, ref } from 'vue'

// State
const loading = ref<boolean>(false)

const formState = reactive<any>({
  email: '',
  password: '',
  phoneNumber: ''
})

const handleSubmit = async () => {
  try {
    const authStore = useAuthStore()
    loading.value = true
    await authStore.register(formState)

    loading.value = false
  } catch (error: any) {
    loading.value = false
    console.log(error)
  }
}
</script>
