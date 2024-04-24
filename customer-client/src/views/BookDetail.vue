<template>
  <div>
    <section class="py-5">
      <div class="container px-4 px-lg-5 my-5">
        <div class="row gx-4 gx-lg-5 align-items-center">
          <div class="col-md-6">
            <img
              class="card-img-top mb-5 mb-md-0"
              style="width: 550px; height: 550px; object-fit: contain; width: 100%"
              :src="book?.image ?? imagge"
              alt="Book Image"
            />
          </div>
          <div class="col-md-6">
            <div class="small mb-1">id: {{ book?._id }}</div>
            <h1 class="display-5 fw-bolder">{{ book?.name }}</h1>
            <div class="fs-5 mb-5">
              <span>{{ book?.unitCost }}&#x20AB;</span>
            </div>
            <p>{{ book?.stock }} quyển sách có sẵn</p>

            <div class="d-flex">
              <button
                v-if="auth.user"
                class="btn flex-shrink-0"
                style="background-color: #226e3e; color: #fff"
                type="button"
                @click="handleClick"
              >
                <i class="bi-cart-fill me-1"></i>
                Mượn sách
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { create, getOne } from '@/api/data.api'
import type { IBook } from '@/interfaces/book.interface'
import router from '@/router'
import { useAuthStore } from '@/stores'
import { notification } from 'ant-design-vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import imagge from '../assets/images/image.png'

const route = useRoute()
const auth = useAuthStore()
const getData = async () => {
  try {
    const data = await getOne<IBook>({ source: 'books', id: route.params.id as string })
    book.value = data
  } catch (error: any) {
    if (error.status === 'not_found') {
      notification.error({
        message: 'Không tìm thấy người dùng',
        duration: 2.5
      })
    } else {
      notification.error({
        message: error.message,
        duration: 2.5
      })
    }
    router.back()
  }
}

const handleClick = async () => {
  try {
    const id = route.params.id as string
    const res = (await create({ source: 'borrows', data: { id } })) as any as string
    notification.success({
      message: res,
      duration: 2.5
    })
    await getData()
  } catch (error: any) {
    notification.error({
      message: error.message,
      duration: 2.5
    })
  }
}

const book = ref<IBook | null>(null)

onMounted(async () => {
  await getData()
})
</script>
