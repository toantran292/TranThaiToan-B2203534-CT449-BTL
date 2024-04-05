<template>
  <a-form
    :model="formState"
    name="test"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finish-failed="onFinishFailed"
  >
    <a-form-item
      label="Email"
      name="email"
      :rules="[{ required: true, message: 'Please input your email!' }]"
    >
      <a-input v-model:value="formState.email" />
    </a-form-item>

    <a-form-item
      label="Password"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
      <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
<script setup lang="ts">
import { login } from '@/api/auth.api'
import type { ILoginPayload } from '@/interfaces/auth.interface'
import { reactive } from 'vue'

interface IFormState extends ILoginPayload {
  remember?: boolean
}

const formState = reactive<IFormState>({
  email: 'test@gmail.com',
  password: '123456',
  remember: true
})

const onFinish = async (values: IFormState) => {
  delete values.remember
  const res = await login(values)
  console.log({ res })
  // console.log('Success:', values)
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>
