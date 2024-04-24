<template>
  <a-layout :style="{ height: '100%' }">
    <app-filter :title="'Quản lý tác giả'">
      <template #input>
        <a-input-search
          v-model:value="query"
          placeholder="Nhập thông tin cần tìm"
          enter-button
          @search="onSearch"
        />
      </template>
      <template #action>
        <router-link :to="{ name: 'author:create' }">
          <a-button type="primary">
            <template #icon>
              <fas-icon :icon="faUserPlus" />
            </template>
            Tạo người tác giả
          </a-button>
        </router-link>
      </template>
    </app-filter>
    <a-layout-content :style="{ margin: '0px 16px 24px 16px', backgroundColor: '#fff' }">
      <template v-if="authors.length === 0">
        <a-empty />
      </template>
      <template v-else>
        <a-layout :style="{ height: '100%', maxHeight: '100%', backgroundColor: '#fff' }">
          <div class="table-container">
            <a-table
              :dataSource="authors"
              :columns="columns"
              :scroll="{ y: 'calc(100vh - 430px)' }"
              :pagination="{
                showSizeChanger: true,
                showTotal: (total: number, range: number[]) =>
                  `${range[0]}-${range[1]} of ${total} items`
              }"
              :customRow="
                (record: IAuthor, index: any) => {
                  return {
                    onClick: () => {
                      router.push(`authors/${record._id}`)
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
import type { IAuthor } from '@/interfaces/authors.interface'
import router from '@/router'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { onMounted, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

const columns = [
  {
    title: 'Tên tác giá',
    dataIndex: 'name',
    key: 'name',
    width: 150
  }
]

const route = useRoute()

const authors = ref<IAuthor[]>([])
const query = ref('')

const onSearch = () => {
  if (query.value) router.replace({ query: { q: query.value } })
  else router.replace({})
}

onMounted(async () => {
  try {
    const results = await getAll<IAuthor>({ source: 'authors', params: route.query })

    authors.value = results
  } catch (error) {
    console.log(error)
  }
})

onBeforeRouteUpdate(async (to, from) => {
  try {
    if (to.query.q !== from.query.q) {
      authors.value = await getAll<IAuthor>({ source: 'authors', params: to.query })
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
