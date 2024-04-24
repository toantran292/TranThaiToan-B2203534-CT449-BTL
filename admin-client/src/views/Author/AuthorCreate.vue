<template>
  <a-layout :style="{ height: '100%' }">
    <app-filter :title="'Tạo người tác giả'" :hasToolBox="false" />
    <a-layout-content
      :style="{
        margin: '0px 16px 24px 16px',
        backgroundColor: '#fff'
      }"
    >
      <author-form @submit="onSubmit" />
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import { create } from '@/api/data.api'
import AuthorForm from '@/components/authors/AuthorForm.vue'
import AppFilter from '@/components/layouts/AppFilter.vue'
import router from '@/router'
import { toTypedSchema } from '@vee-validate/zod'
import { notification } from 'ant-design-vue'
import { useForm } from 'vee-validate'
import * as zod from 'zod'

const { setFieldValue, handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    zod.object({
      _id: zod.string().optional(),
      name: zod.string().min(1, 'Không được để trống')
    })
  )
})

const onSubmit = handleSubmit(
  async (values: any) => {
    // console.log(values)
    try {
      await create({ source: 'authors', data: values })
      notification.success({
        message: 'Tạo tác giả thành công',
        duration: 2.5
      })
      router.push({ name: 'author' })
    } catch (error: any) {
      notification.error({
        message: 'Tạo tác giả thất bại',
        description: error.message,
        duration: 2.5
      })
    }
  },
  (error) => {
    console.log(error)
  }
)
</script>
