<template>
  <a-layout :style="{ height: '100%' }">
    <app-filter :title="'Quản lý người dùng'">
      <template #input>
        <a-input-search
          v-model:value="query"
          placeholder="Nhập thông tin cần tìm"
          enter-button
          @search="onSearch"
        />
      </template>
      <template #action>
        <router-link :to="{ name: 'user:create' }">
          <a-button type="primary">
            <template #icon>
              <fas-icon :icon="faUserPlus" />
            </template>
            Tạo nhà xuất bản
          </a-button>
        </router-link>
      </template>
    </app-filter>
    <a-layout-content :style="{ margin: '0px 16px 24px 16px', backgroundColor: '#fff' }">
      <template v-if="publishers.length === 0">
        <a-empty />
      </template>
      <template v-else>
        <a-layout :style="{ height: '100%', maxHeight: '100%', backgroundColor: '#fff' }">
          <div class="table-container">
            <a-table
              :dataSource="publishers"
              :columns="columns"
              :scroll="{ y: 'calc(100vh - 430px)' }"
              :pagination="{
                showSizeChanger: true,
                showTotal: (total: number, range: number[]) =>
                  `${range[0]}-${range[1]} of ${total} items`
              }"
              :customRow="
                (record: IPublisher, index: any) => {
                  return {
                    onClick: () => {
                      router.push(`users/${record._id}`)
                    }
                  }
                }
              "
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'gender'">
                  {{ TitleGender[record.gender] }}
                </template>
                <template v-else-if="column.key === 'isStaff'">
                  <a-tag :color="record.isStaff ? '#87d068' : '#108ee9'">
                    {{ record.isStaff ? 'Nhân viên' : 'Khách' }}
                  </a-tag>
                </template>
              </template>
            </a-table>
          </div>
        </a-layout>
      </template>
    </a-layout-content>
  </a-layout>
</template>
<script setup lang="ts">
import { getAll } from '@/api/data.api'
import AppFilter from '@/components/layouts/AppFilter.vue'
import type { IPublisher } from '@/interfaces/publisher.interface'
import router from '@/router'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { onMounted, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

const TitleGender: Record<string, string> = {
  unknow: '',
  '0': 'Nam',
  '1': 'Nữ'
}

const columns = [
  {
    title: 'Họ',
    dataIndex: 'lastName',
    key: 'lastName',
    width: 150
  },
  {
    title: 'Tên',
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
    title: 'Loại tài khoản',
    dataIndex: 'isStaff',
    key: 'isStaff'
  }
]

const route = useRoute()

const publishers = ref<IPublisher[]>([])
const query = ref('')

const onSearch = () => {
  // const queryReduced = Object.keys(query.value).reduce<any>((prev, q: any) => {
  //   if (query.value[q]) return { ...prev, [q]: query.value[q] }
  //   return prev
  // }, {})
  // console.log({ queryReduced })

  if (query.value) router.replace({ query: { q: query.value } })
  else router.replace({})
}

onMounted(async () => {
  try {
    const results = await getAll<IPublisher>({ source: 'publishers', params: route.query })

    publishers.value = results
  } catch (error) {
    console.log(error)
  }
})

onBeforeRouteUpdate(async (to, from) => {
  try {
    if (to.query.q !== from.query.q) {
      publishers.value = await getAll<IPublisher>({ source: 'users', params: to.query })
    }
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
