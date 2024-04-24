<template>
  <a-table
    :dataSource="borrows"
    :columns="columns"
    :scroll="{ y: 'calc(100vh - 430px)' }"
    :pagination="{
      showSizeChanger: true,
      showTotal: (total: number, range: number[]) => `${range[0]}-${range[1]} of ${total} items`
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
        <div @click="() => onClick2(record.book._id)" style="cursor: pointer">
          {{ record.book.name }}
        </div>
      </template>
      <template v-else-if="column.key === 'borrowedDay'">
        {{ formatDateISOStringToDDMMYYYY(record.borrowedDay) }}
      </template>
      <template v-else-if="column.key === 'estimatedReturnDate'">
        {{ formatDateISOStringToDDMMYYYY(record.estimatedReturnDate) }}
      </template>
      <template v-else-if="column.key === 'actualReturnDate'">
        {{ formatDateISOStringToDDMMYYYY(record.actualReturnDate) }} </template
      ><template v-else-if="column.key === 'action'">
        <a-button v-if="!record.actualReturnDate" @click="() => onClick(record._id)"
          >Trả sách</a-button
        >
      </template>
    </template></a-table
  >
</template>

<script setup lang="ts">
import { getAll, updateOne } from '@/api/data.api'
import router from '@/router'
import { formatDateISOStringToDDMMYYYY } from '@/utils'
import { notification } from 'ant-design-vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
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
  },
  {
    title: 'Thao tác',
    key: 'action'
  }
]

// import router form
const borrows = ref<any[]>([])

const route = useRoute()
const onClick2 = (id: string) => {
  router.push(`/${id}`)
}

const getData = async () => {
  try {
    const results = await getAll<any>({ source: 'borrows', params: route.query })
    // console.log
    borrows.value = results
  } catch (error) {
    console.log(error)
  }
}
const onClick = async (id: string) => {
  try {
    await updateOne<any>({ source: 'borrows', id: id, data: {} })
    notification.success({
      message: 'Trả thành công',
      duration: 2.5
    })
    await getData()
  } catch (error) {
    notification.success({
      message: 'Trả thất bại',
      duration: 2.5
    })
  }
}
onMounted(async () => {
  await getData()
})
</script>
