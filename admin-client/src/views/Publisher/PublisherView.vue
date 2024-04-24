<template>
  <a-layout :style="{ height: '100%' }">
    <app-filter :title="'Quản lý nhà xuất bản'">
      <template #input>
        <a-input-search
          v-model:value="query"
          placeholder="Nhập thông tin cần tìm"
          enter-button
          @search="onSearch"
        />
      </template>
      <template #action>
        <router-link :to="{ name: 'publisher:create' }">
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
                      router.push(`publishers/${record._id}`)
                    }
                  }
                }
              "
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
import type { IPublisher } from '@/interfaces/publisher.interface'
import router from '@/router'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { onMounted, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

const columns = [
  {
    title: 'Tên nhà xuất bản',
    dataIndex: 'name',
    key: 'name',
    width: 150
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    key: 'address'
  }
]

const route = useRoute()

const publishers = ref<IPublisher[]>([])
const query = ref('')

const onSearch = () => {
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
      publishers.value = await getAll<IPublisher>({ source: 'publishers', params: to.query })
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
