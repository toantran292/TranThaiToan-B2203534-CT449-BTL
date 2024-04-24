<template>
  <a-layout :style="{ height: '100%' }">
    <app-filter :title="'Tạo người nhà xuất bản'" :hasToolBox="false" />
    <a-layout-content
      :style="{
        margin: '0px 16px 24px 16px',
        backgroundColor: '#fff'
      }"
    >
      <publisher-form @submit="onSubmit" />
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import { create } from '@/api/data.api'
import AppFilter from '@/components/layouts/AppFilter.vue'
import PublisherForm from '@/components/publishers/PublisherForm.vue'
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
      address: zod.string().min(1, 'Không được để trống')
    })
  ),
  initialValues: {
    name: '',
    address: ''
  }
})

const onSubmit = handleSubmit(
  async (values: any) => {
    // console.log(values)
    try {
      await create({ source: 'publishers', data: values })
      notification.success({
        message: 'Tạo nhà xuất bản thành công',
        duration: 2.5
      })
      router.push({ name: 'publisher' })
    } catch (error: any) {
      notification.error({
        message: 'Tạo nhà xuất bản thất bại',
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
