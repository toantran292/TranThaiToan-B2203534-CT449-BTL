<template>
  <a-layout :style="{ height: '100%' }">
    <app-filter :title="'Tạo người tác giả'" :hasToolBox="false" />
    <a-layout-content
      :style="{
        margin: '0px 16px 24px 16px',
        backgroundColor: '#fff'
      }"
    >
      <book-form @submit="onSubmit" />
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import { create } from '@/api/data.api'
import BookForm from '@/components/books/BookForm.vue'
import AppFilter from '@/components/layouts/AppFilter.vue'
import router from '@/router'
import { toTypedSchema } from '@vee-validate/zod'
import { notification } from 'ant-design-vue'
import { useForm } from 'vee-validate'
import * as zod from 'zod'

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(
    zod.object({
      _id: zod.string().optional(),
      name: zod.string().min(1, 'Không được để trống'),
      unitCost: zod.number().min(0, 'Không được là số âm'),
      stock: zod.number().min(0, 'Không được là số âm'),
      publishYear: zod.number(),
      author: zod.string().min(1, 'Không được để trống'),
      publisher: zod.string().min(1, 'Không được để trống')
    })
  ),
  initialValues: {
    name: '',
    unitCost: 0,
    stock: 0,
    publishYear: new Date().getFullYear(),
    author: '',
    publisher: ''
  }
})

const onSubmit = handleSubmit(
  async (values: any) => {
    // console.log(values)
    try {
      await create({ source: 'books', data: values })
      notification.success({
        message: 'Thêm sách thành công',
        duration: 2.5
      })
      router.push({ name: 'book' })
    } catch (error: any) {
      notification.error({
        message: 'Thêm sách thất bại',
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
