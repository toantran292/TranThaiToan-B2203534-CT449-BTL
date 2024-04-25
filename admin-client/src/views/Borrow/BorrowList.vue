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
                    onClick: () => {}
                  }
                }
              "
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'book'">
                  {{ record.book.name }}
                </template>
                <template v-else-if="column.key === 'borrowedDay'">
                  {{ formatDateISOStringToDDMMYYYY(record.borrowedDay) }}
                </template>
                <template v-else-if="column.key === 'estimatedReturnDate'">
                  {{ formatDateISOStringToDDMMYYYY(record.estimatedReturnDate) }}
                </template>
                <template v-else-if="column.key === 'actualReturnDate'">
                  {{ formatDateISOStringToDDMMYYYY(record.actualReturnDate) }}
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
import router from '@/router'
import { formatDateISOStringToDDMMYYYY } from '@/utils'
import { onMounted, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

const columns = [
  {
    title: 'Tên sách',
    dataIndex: 'book.name',
    key: 'book',
    width: 150
  },
  {
    title: 'Ngày mượn',
    dataIndex: 'borrowedDay',
    key: 'borrowedDay'
  },
  {
    title: 'Hạn trả',
    dataIndex: 'estimatedReturnDate',
    key: 'estimatedReturnDate'
  },
  {
    title: 'Ngày đã trả',
    dataIndex: 'actualReturnDate',
    key: 'actualReturnDate'
  }
  // {
  //   title: 'Thao tác',
  //   key: 'action'
  // }
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
