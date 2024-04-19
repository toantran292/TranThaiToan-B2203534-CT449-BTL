<template>
  <form @submit.prevent="$emit('submit')" :style="{ backgroundColor: '#fff', height: '100%' }">
    <a-layout :style="{ backgroundColor: '#fff', height: '100%' }">
      <!-- <a-flex> -->
      <a-layout-header :style="{ height: 'auto', padding: '10px 0', backgroundColor: '#fff' }">
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
            name="avatar"
            type="file"
            @change="handleFileUpload"
            accept="image/*"
            :style="{ display: 'none' }"
          />
        </a-flex>
      </a-layout-header>
      <a-layout-content :style="{ flex: 1, padding: '12px 0' }">
        <a-row>
          <a-col :offset="8" :span="8">
            <TInput :label="'Họ'" name="lastName" required />
          </a-col>
        </a-row>
        <a-row>
          <a-col :offset="8" :span="8">
            <TInput :label="'Tên'" name="firstName" required />
          </a-col>
        </a-row>
        <a-row>
          <a-col :offset="8" :span="8">
            <TInput :label="'Email'" name="email" required />
          </a-col>
        </a-row>
        <a-row>
          <a-col :offset="8" :span="8">
            <TInput :label="'Số điện thoại'" name="phoneNumber" required />
          </a-col>
        </a-row>
        <a-row v-if="password">
          <a-col :offset="8" :span="8">
            <TInput :label="'Mật khẩu'" name="password" required password />
          </a-col>
        </a-row>
        <a-row>
          <a-col :offset="8" :span="8">
            <TInput :label="'Địa chỉ'" name="address" required />
          </a-col>
        </a-row>
        <a-row>
          <a-col :offset="8" :span="8">
            <TInput :label="'Ngày sinh'" name="birthDay" required datePicker />
          </a-col>
        </a-row>
        <a-row>
          <a-col :offset="8" :span="8">
            <a-row :gutter="10">
              <a-col :span="6">
                <TInput :label="'Nhân viên'" name="isStaff" is-switch />
              </a-col>
              <a-col :span="18">
                <TInput :label="'Giới tính'" name="gender" required select>
                  <a-select-option value="unknow">Không rõ</a-select-option>
                  <a-select-option value="0">Nam</a-select-option>
                  <a-select-option value="1">Nứ</a-select-option>
                </TInput>
              </a-col>
            </a-row>
          </a-col>
        </a-row>
      </a-layout-content>
      <a-layout-footer :style="{ backgroundColor: '#fff', padding: '12px' }">
        <a-flex justify="right" :gap="10">
          <router-link :to="{ name: 'user' }">
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
import { uploadImage } from '@/api/data.api'
import TInput from '@/components/common/TInput.vue'
import type { IUser } from '@/interfaces/user.interface'
import { UploadOutlined, UserOutlined } from '@ant-design/icons-vue'
import { computed, ref } from 'vue'

const emit = defineEmits(['submit', 'changeImg'])
const props = defineProps({
  avatar: String,
  _id: String,
  password: Boolean,
  dirty: {
    type: Boolean,
    default: true
  }
})

const formState = ref<IUser>({} as any)

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
  if (props.avatar) return props.avatar
  return false
})
</script>
