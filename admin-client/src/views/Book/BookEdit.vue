<template>
  <a-layout :style="{ height: '100%' }">
    <app-filter :title="'Chỉnh sửa sách'" :hasToolBox="false" />
    <a-layout-content
      :style="{
        margin: '0px 16px 24px 16px',
        backgroundColor: '#fff'
      }"
    >
      <book-form :_id @submit="onSubmit" :dirty="meta.dirty" @changeImg="handleChangeCover" />
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import { getOne, updateOne } from '@/api/data.api'
import BookForm from '@/components/books/BookForm.vue'
import AppFilter from '@/components/layouts/AppFilter.vue'
import type { IBook } from '@/interfaces/book.interface'
import router from '@/router'
// import router from '@/router'
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
      cover: zod.string().optional(),
      name: zod.string().min(1, 'Không được để trống'),
      unitCost: zod.coerce.number().min(0, 'Không được là số âm'),
      stock: zod.coerce.number().min(0, 'Không được là số âm'),
      publishYear: zod.coerce.number(),
      author: zod.string().min(1, 'Không được để trống'),
      publisher: zod.string().min(1, 'Không được để trống')
    })
  )
})

const route = useRoute()

const onSubmit = handleSubmit(
  async (values: any) => {
    try {
      const regex = /\/[^/]+\/(.+)$/
      const result = values.cover.match(regex)
      if (result) values.cover = result[1]
      await updateOne({ source: 'books', id: route.params.id as string, data: values })
      notification.success({
        message: 'Chỉnh sửa sách thành công',
        duration: 2.5
      })
      router.push({ name: 'book' })
    } catch (error: any) {
      notification.error({
        message: 'Chỉnh sửa sách thất bại',
        description: error.message,
        duration: 2.5
      })
    }
  },
  (error) => {
    console.log(error)
  }
)

const [cover] = defineField('cover')
const [_id] = defineField('_id')

const handleChangeCover = (url: string) => {
  setFieldValue('cover', url)
}

onMounted(async () => {
  try {
    const data = await getOne<IBook>({ source: 'books', id: route.params.id as string })
    resetForm({ values: data })
  } catch (error: any) {
    console.log(error)
    if (error.status === 'not_found') {
      notification.error({
        message: 'Không tìm thấy người dùng',
        duration: 2.5
      })
      router.push({ name: 'book' })
    }
  }
})
</script>
