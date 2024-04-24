<template>
  <div>
    <section class="py-5">
      <div class="container px-4 px-lg-5 my-5">
        <div class="row gx-4 gx-lg-5 align-items-center">
          <div class="col-md-6">
            <img
              class="card-img-top mb-5 mb-md-0"
              style="width: 550px; height: 550px; object-fit: contain; width: 100%"
              :src="user?.avatar"
              alt="Avatar"
            />
          </div>
          <div class="col-md-6">
            <h1 class="display-5 fw-bolder">
              {{ `${user?.lastName ?? 'Khong'} ${user?.firstName ?? 'Co'}` }}
            </h1>
            <div class="fs-5 mb-5"></div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { getOne } from '@/api/data.api'
import type { IUser } from '@/interfaces/user.interface'
import router from '@/router'
import { useAuthStore } from '@/stores'
import { notification } from 'ant-design-vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const auth = useAuthStore()
const getData = async () => {
  try {
    console.log(auth.user)
    const data = await getOne<IUser>({ source: 'users', id: auth.user.userId })
    user.value = data
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

const user = ref<IUser | null>(null)

onMounted(async () => {
  await getData()
})
</script>
