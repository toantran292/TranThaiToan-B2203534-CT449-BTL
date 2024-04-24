<template>
  <a-layout :style="{ height: '100%' }">
    <app-filter :title="'Quản lý sách'">
      <template #input>
        <a-input-search
          v-model:value="query"
          placeholder="Nhập thông tin cần tìm"
          enter-button
          @search="onSearch"
        />
      </template>
      <template #action>
        <router-link :to="{ name: 'book:create' }">
          <a-button type="primary">
            <template #icon>
              <fas-icon :icon="faUserPlus" />
            </template>
            Tạo sách
          </a-button>
        </router-link>
      </template>
    </app-filter>
    <a-layout-content :style="{ margin: '0px 16px 24px 16px', backgroundColor: '#fff' }">
      <template v-if="books.length === 0">
        <a-empty />
      </template>
      <template v-else>
        <a-layout :style="{ height: '100%', maxHeight: '100%', backgroundColor: '#fff' }">
          <div class="table-container">
            <a-table
              :dataSource="books"
              :columns="columns"
              :scroll="{ y: 'calc(100vh - 430px)' }"
              :pagination="{
                showSizeChanger: true,
                showTotal: (total: number, range: number[]) =>
                  `${range[0]}-${range[1]} of ${total} items`
              }"
              :customRow="
                (record: IBook, index: any) => {
                  return {
                    onClick: () => {
                      router.push(`books/${record._id}`)
                    }
                  }
                }
              "
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'author'">
                  {{ record.author.name }}
                </template>
                <template v-if="column.key === 'publisher'">
                  {{ record.publisher.name }}
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
import type { IBook } from '@/interfaces/book.interface'
import router from '@/router'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { onMounted, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

const columns = [
  {
    title: 'Tên sách',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Đơn giá',
    dataIndex: 'unitCost',
    key: 'unitCost'
  },
  {
    title: 'Tồn kho',
    dataIndex: 'stock',
    key: 'stock'
  },
  {
    title: 'Năm xuất bản',
    dataIndex: 'publishYear',
    key: 'publishYear'
  },
  {
    title: 'Tác giả',
    dataIndex: 'author',
    key: 'author'
  },
  {
    title: 'Nhà xuất bản',
    dataIndex: 'publisher',
    key: 'publisher'
  }
]

const route = useRoute()

const books = ref<IBook[]>([])
const query = ref('')

const onSearch = () => {
  if (query.value) router.replace({ query: { q: query.value } })
  else router.replace({})
}

onMounted(async () => {
  try {
    const results = await getAll<IBook>({ source: 'books', params: route.query })

    books.value = results
  } catch (error) {
    console.log(error)
  }
})

onBeforeRouteUpdate(async (to, from) => {
  try {
    if (to.query.q !== from.query.q) {
      books.value = await getAll<IBook>({ source: 'books', params: to.query })
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
