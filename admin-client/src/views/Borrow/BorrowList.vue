<template>
  <a-layout :style="{ height: '100%' }">
    <app-filter :title="'Quản lý mượn sách'"> </app-filter>
    <a-layout-content :style="{ margin: '0px 16px 24px 16px', backgroundColor: '#fff' }">
      <template v-if="borrows.length === 0">
        <a-empty />
      </template>
      <template v-else>
        <a-layout :style="{ height: '100%', maxHeight: '100%', backgroundColor: '#fff' }">
          <div class="table-container">
            <a-table
              :dataSource="borrows"
              :columns="columns"
              :scroll="{ y: 'calc(100vh - 430px)' }"
              :pagination="{
                showSizeChanger: true,
                showTotal: (total: number, range: number[]) =>
                  `${range[0]}-${range[1]} of ${total} items`
              }"
              :customRow="
                (record: any, index: any) => {
                  return {
                    onClick: () => {
                      router.push(`borrows/${record._id}`)
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
import router from '@/router'
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

const borrows = ref<any[]>([])
const query = ref('')

const onSearch = () => {
  if (query.value) router.replace({ query: { q: query.value } })
  else router.replace({})
}

onMounted(async () => {
  try {
    const results = await getAll<any>({ source: 'borrows', params: route.query })

    borrows.value = results
  } catch (error) {
    console.log(error)
  }
})

onBeforeRouteUpdate(async (to, from) => {
  try {
    if (to.query.q !== from.query.q) {
      borrows.value = await getAll<any>({ source: 'borrows', params: to.query })
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
