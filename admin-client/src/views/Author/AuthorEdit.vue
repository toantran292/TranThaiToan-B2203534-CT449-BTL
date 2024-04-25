<template>
  <a-layout :style="{ height: '100%' }">
    <app-filter :title="'Sửa tác giả'" :hasToolBox="false" />
    <a-layout-content
      :style="{
        margin: '0px 16px 24px 16px',
        backgroundColor: '#fff'
      }"
    >
      <author-form :_id @submit="onSubmit" :dirty="meta.dirty" />
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import { getOne, updateOne } from '@/api/data.api'
import AuthorForm from '@/components/authors/AuthorForm.vue'
import AppFilter from '@/components/layouts/AppFilter.vue'
import type { IAuthor } from '@/interfaces/authors.interface'
import router from '@/router'
// import router from '@/router'
import { toTypedSchema } from '@vee-validate/zod'
import { notification } from 'ant-design-vue'
import { useForm } from 'vee-validate'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import * as zod from 'zod'

const { handleSubmit, resetForm, defineField, meta } = useForm({
  validationSchema: toTypedSchema(
    zod.object({
      _id: zod.string().optional(),
      name: zod.string().min(1, 'Không được để trống')
    })
  )
})

const route = useRoute()

const onSubmit = handleSubmit(
  async (values: any) => {
    try {
      await updateOne({ source: 'authors', id: route.params.id as string, data: values })
      notification.success({
        message: 'Chỉnh sửa tác giả thành công',
        duration: 2.5
      })
      router.push({ name: 'author' })
    } catch (error: any) {
      notification.error({
        message: 'Chỉnh sửa tác giả thất bại',
        description: error.message,
        duration: 2.5
      })
    }
  },
  (error) => {
    console.log(error)
  }
)

const [_id] = defineField('_id')

onMounted(async () => {
  try {
    const data = await getOne<IAuthor>({ source: 'authors', id: route.params.id as string })
    resetForm({ values: data })
  } catch (error: any) {
    console.log(error)
    if (error.status === 'not_found') {
      notification.error({
        message: 'Không tìm thấy người dùng',
        duration: 2.5
      })
      router.push({ name: 'author' })
    }
  }
})
</script>
