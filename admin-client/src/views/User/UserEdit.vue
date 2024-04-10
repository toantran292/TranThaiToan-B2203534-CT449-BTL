<template>
  <a-layout :style="{ height: '100%' }">
    <app-filter :title="'Tạo người dùng'" :hasToolBox="false" />
    <a-layout-content
      :style="{
        margin: '0px 16px 24px 16px',
        backgroundColor: '#fff'
      }"
    >
      <user-form :avatar :_id @submit="onSubmit" :dirty="meta.dirty" @changeImg="handleChangeImg" />
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import { getOne, updateOne } from '@/api/data.api'
import AppFilter from '@/components/layouts/AppFilter.vue'
import UserForm from '@/components/users/UserForm.vue'
import type { IUser } from '@/interfaces/user.interface'
import { toTypedSchema } from '@vee-validate/zod'
import { notification } from 'ant-design-vue'
import { useForm } from 'vee-validate'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import * as zod from 'zod'

const { setFieldValue, handleSubmit, resetForm, defineField, meta } = useForm({
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
  )
})
const route = useRoute()

const onSubmit = handleSubmit(
  async (values: any) => {
    try {
      const regex = /\/[^/]+\/(.+)$/
      const result = values.avatar.match(regex)
      if (result) values.avatar = result[1]
      console.log(values)
      await updateOne({ source: 'users', id: route.params.id as string, data: values })
      notification.success({
        message: 'Chỉnh sửa người dùng thành công',
        duration: 2.5
      })
    } catch (error: any) {
      notification.error({
        message: 'Chỉnh sửa người dùng thất bại',
        description: error.message,
        duration: 2.5
      })
    }
  },
  (error) => {
    console.log(error)
  }
)

const [avatar] = defineField('avatar')
const [_id] = defineField('_id')

const handleChangeImg = (url: string) => {
  setFieldValue('avatar', url)
}

onMounted(async () => {
  try {
    const data = await getOne<IUser>({ source: 'users', id: route.params.id as string })
    resetForm({ values: data })
  } catch (error) {
    console.log(error)
  }
})
</script>
