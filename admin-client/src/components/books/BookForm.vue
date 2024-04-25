<template>
  <form @submit.prevent="$emit('submit')" :style="{ backgroundColor: '#fff', height: '100%' }">
    <a-layout :style="{ backgroundColor: '#fff', height: '100%' }">
      <!-- <a-flex> -->
      <a-layout-content :style="{ flex: 1, padding: '12px 0', marginTop: '12px' }">
        <a-flex vertical :gap="10" align="center">
          <template v-if="getImg">
            <div :style="{ cursor: 'pointer' }">
              <a-avatar :size="128" :src="getImg" @click="() => setVisible(true)" />
            </div>
            <div :style="{ display: 'none' }">
              <a-image
                :preview="{
                  visible,
                  onVisibleChange: setVisible
                }"
                :src="imageUrl"
                :previewMask="false"
              />
            </div>
          </template>
          <a-avatar v-else :size="128">
            <template #icon><UserOutlined /></template>
          </a-avatar>
          <a-button @click="handleClick">
            <upload-outlined></upload-outlined>
            Tải ảnh lên
          </a-button>

          <input
            ref="inputRef"
            name="cover"
            type="file"
            @change="handleFileUpload"
            accept="image/*"
            :style="{ display: 'none' }"
          />
        </a-flex>
        <a-row>
          <a-col :offset="8" :span="8">
            <TInput :label="'Tên'" name="name" required />
          </a-col>
          <a-col :offset="8" :span="8">
            <TInput :label="'Giá'" name="unitCost" required type="number" />
          </a-col>
          <a-col :offset="8" :span="8">
            <TInput :label="'Số lượng'" name="stock" required type="number" />
          </a-col>
          <a-col :offset="8" :span="8">
            <TInput :label="'Năm xuất bản'" name="publishYear" required type="number" />
          </a-col>
          <a-col :offset="8" :span="8">
            <TInput :label="'Tác giả'" name="author" required select>
              <a-select-option v-for="author in authors" :key="author._id" :value="author._id">
                {{ author.name }}
              </a-select-option>
            </TInput>
          </a-col>
          <a-col :offset="8" :span="8">
            <TInput :label="'Nhà xuất bản'" name="publisher" required select>
              <a-select-option
                v-for="publisher in publishers"
                :key="publisher._id"
                :value="publisher._id"
              >
                {{ publisher.name }}
              </a-select-option>
            </TInput>
          </a-col>
        </a-row>
      </a-layout-content>
      <a-layout-footer :style="{ backgroundColor: '#fff', padding: '12px' }">
        <a-flex justify="right" :gap="10">
          <router-link :to="{ name: 'book' }">
            <a-button type="primary" danger> Trở về</a-button>
          </router-link>
          <a-button type="primary" html-type="submit" :disabled="!dirty">{{
            _id ? 'Sửa' : 'Tạo'
          }}</a-button>
        </a-flex>
      </a-layout-footer>
    </a-layout>
  </form>
</template>

<script setup lang="ts">
import { getAll, uploadImage } from '@/api/data.api'
import TInput from '@/components/common/TInput.vue'
import type { IAuthor } from '@/interfaces/authors.interface'
import type { IPublisher } from '@/interfaces/publisher.interface'
import { computed, onMounted, ref } from 'vue'

// const formState = ref<IUser>({} as any)

const emit = defineEmits(['submit', 'changeImg'])
const props = defineProps({
  cover: String,
  _id: String,
  dirty: {
    type: Boolean,
    default: true
  }
})

const inputRef = ref<HTMLInputElement | null>(null)
const imageUrl = ref<string>('')
const visible = ref<boolean>(false)
const setVisible = (value: boolean): void => {
  visible.value = value
}

const handleClick = () => {
  inputRef.value?.click()
}

const handleFileUpload = async (event: Event) => {
  try {
    const el = event.target as HTMLInputElement
    const file = el.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        imageUrl.value = reader.result as string
      }
      reader.readAsDataURL(file)
      const { imgPath } = (await uploadImage(el.name, file)) as any
      emit('changeImg', imgPath)
    }
  } catch (err) {
    console.log(err)
  }
}

const getImg = computed(() => {
  if (imageUrl.value) return imageUrl.value
  if (props.cover) return props.cover
  return false
})

const authors = ref<IAuthor[]>([])
const publishers = ref<IPublisher[]>([])
onMounted(async () => {
  try {
    const _publishers = await getAll<IPublisher>({ source: 'publishers' })
    const _authors = await getAll<IPublisher>({ source: 'authors' })

    publishers.value = _publishers
    authors.value = _authors
  } catch (error) {
    console.log(error)
  }
})
</script>
