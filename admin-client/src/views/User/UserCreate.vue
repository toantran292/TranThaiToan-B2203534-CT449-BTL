<template>
  <a-layout :style="{ height: '100%' }">
    <app-filter :title="'Tạo người dùng'" :hasToolBox="false" />
    <a-layout-content
      :style="{
        margin: '0px 16px 24px 16px',
        backgroundColor: '#fff'
      }"
    >
      <user-form @submit="onSubmit" @changeImg="handleChangeImg" password />
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import { create } from '@/api/data.api'
import AppFilter from '@/components/layouts/AppFilter.vue'
import UserForm from '@/components/users/UserForm.vue'
import router from '@/router'
import { toTypedSchema } from '@vee-validate/zod'
import { notification } from 'ant-design-vue'
import { useForm } from 'vee-validate'
import * as zod from 'zod'

const { setFieldValue, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    zod.object({
      _id: zod.string().optional(),
      firstName: zod.string().min(1, 'Không được để trống'),
      lastName: zod.string().min(1, 'Không được để trống'),
      email: zod.string().min(1, 'Không được để trống').email('Định dạng email không hợp lệ'),
      avatar: zod.string().optional(),
      phoneNumber: zod.string().min(1, 'Không được để trống'),
      address: zod.string().optional(),
      isStaff: zod.boolean(),
      gender: zod.string(),
      password: zod.string(),
      birthDay: zod
        .string()
        .min(1)
        .refine(
          (value) => {
            const iso8601Regex =
              /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/
            return iso8601Regex.test(value)
          },
          {
            message: 'Định dạng không hợp lệ'
          }
        )
    })
  ),
  initialValues: {
    firstName: '',
    lastName: '',
    gender: 'unknow',
    phoneNumber: '',
    email: '',
    password: '',
    birthDay: new Date().toISOString(),
    isStaff: false,
    avatar: ''
  }
})

const onSubmit = handleSubmit(
  async (values: any) => {
    try {
      await create({ source: 'users', data: values })
      notification.success({
        message: 'Tạo người dùng thành công',
        duration: 2.5
      })
      router.push({ name: 'user' })
    } catch (error: any) {
      notification.error({
        message: 'Tạo người dùng thất bại',
        description: error.message,
        duration: 2.5
      })
    }
  },
  (error) => {
    console.log(error)
  }
)

const handleChangeImg = (url: string) => {
  setFieldValue('avatar', url)
}
</script>
