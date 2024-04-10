<template>
  <a-layout :style="{ height: '100%' }">
    <app-filter :title="'Quản lý người dùng'">
      <template #input>
        <a-button type="primary">Test</a-button>
      </template>
      <template #action>
        <router-link :to="{ name: 'user:create' }">
          <a-button type="primary">
            <template #icon>
              <fas-icon :icon="faUserPlus" />
            </template>
            Tạo người dùng
          </a-button>
        </router-link>
      </template>
    </app-filter>
    <a-layout-content :style="{ margin: '0px 16px 24px 16px', backgroundColor: '#fff' }">
      <template v-if="users.length === 0">
        <a-empty />
      </template>
      <template v-else>
        <a-layout :style="{ height: '100%', maxHeight: '100%', backgroundColor: '#fff' }">
          <div class="table-container">
            <a-table
              :dataSource="users"
              :columns="columns"
              :scroll="{ y: 'calc(100vh - 430px)' }"
              :pagination="{
                showSizeChanger: true,
                showTotal: (total: number, range: number[]) =>
                  `${range[0]}-${range[1]} of ${total} items`
              }"
            />
          </div>
        </a-layout>
      </template>
    </a-layout-content>
  </a-layout>
</template>
<script setup lang="ts">
import { getAll } from '@/api/data.api'
import AppFilter from '@/components/layouts/AppFilter.vue'
import type { IUser } from '@/interfaces/user.interface'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { onMounted, ref } from 'vue'

const columns = [
  {
    name: 'Tên',
    dataIndex: 'firstName',
    key: 'firstName',
    width: 150
  },
  {
    title: 'Số điện thoại',
    key: 'phoneNumber',
    dataIndex: 'phoneNumber'
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Giới tính',
    dataIndex: 'gender',
    key: 'gender'
  },
  {
    title: 'Action',
    key: 'action'
  }
]

const users = ref<IUser[]>([])

onMounted(async () => {
  try {
    const results = await getAll<IUser>({ source: 'users' })

    users.value = results
  } catch (error) {
    console.log(error)
  }
})
</script>
<style>
.table-container {
  height: 100%;
  max-height: 100%;
  overflow: auto;
}
</style>
