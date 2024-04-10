<template>
  <a-layout :style="{ backgroundColor: '#fff', height: '100%' }">
    <!-- <a-flex> -->
    <a-layout-header :style="{ height: 'auto', padding: '10px 0', backgroundColor: '#fff' }">
      <a-flex vertical :gap="10" align="center">
        <template v-if="imageUrl">
          <div :style="{ cursor: 'pointer' }">
            <a-avatar :size="128" :src="imageUrl" @click="() => setVisible(true)" />
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
          <a-row :gutter="10">
            <a-col :span="12">
              <TInput :label="'Họ'" name="lastName" v-model:value="formState.lastName" required />
            </a-col>
            <a-col :span="12">
              <TInput
                :label="'Tên'"
                name="firstName"
                v-model:value="formState.firstName"
                required
              />
            </a-col>
          </a-row>
        </a-col>
      </a-row>
      <a-row>
        <a-col :offset="8" :span="8">
          <TInput :label="'Email'" name="email" v-model:value="formState.email" required />
        </a-col>
      </a-row>
      <a-row>
        <a-col :offset="8" :span="8">
          <TInput
            :label="'Số điện thoại'"
            name="phoneNumber"
            v-model:value="formState.phoneNumber"
            required
          />
        </a-col>
      </a-row>
      <a-row v-if="formState.password !== undefined">
        <a-col :offset="8" :span="8">
          <TInput
            :label="'Mật khẩu'"
            name="password"
            v-model:value="formState.password"
            required
            password
          />
        </a-col>
      </a-row>
      <a-row>
        <a-col :offset="8" :span="8">
          <TInput :label="'Địa chỉ'" name="address" v-model:value="formState.address" required />
        </a-col>
      </a-row>
      <a-row>
        <a-col :offset="8" :span="8">
          <TInput
            :label="'Ngày sinh'"
            name="birthDay"
            v-model:value="formState.birthDay"
            required
            datePicker
          />
        </a-col>
      </a-row>
      <a-row>
        <a-col :offset="8" :span="8">
          <a-row :gutter="10">
            <a-col :span="6">
              <TInput
                :label="'Nhân viên'"
                name="isStaff"
                v-model:value="formState.isStaff"
                is-switch
              />
            </a-col>
            <a-col :span="18">
              <TInput
                :label="'Giới tính'"
                name="gender"
                v-model:value="formState.gender"
                required
                select
              >
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
        <a-button type="primary" danger> Trở về</a-button>
        <a-button type="primary" @click="handleSubmit">Tạo</a-button>
      </a-flex>
    </a-layout-footer>
  </a-layout>
</template>

<script setup lang="ts">
import { uploadImage } from '@/api/data.api'
import TInput from '@/components/common/TInput.vue'
import { UploadOutlined, UserOutlined } from '@ant-design/icons-vue'
import dayjs from 'dayjs'
import { onMounted, reactive, ref, toRaw, watch } from 'vue'

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
      formState.avatar = imgPath
      console.log(formState)
    }
  } catch (err) {
    console.log(err)
  }
}

const handleSubmit = () => {
  const temp = toRaw(formState)
  temp.birthDay = temp.birthDay?.format?.('DD/MM/YYYY') || temp.birthDay
  console.log(temp)
}

const formState: any = reactive({
  firstName: '',
  lastName: '',
  birthDay: dayjs(),
  address: '',
  gender: 'unknow',
  phoneNumber: '',
  isStaff: false,
  avatar: '',

  email: '',
  password: ''
})

onMounted(() => {
  imageUrl.value = formState.avatar
})

watch(
  () => formState.birthDay,
  (birthDay: any) => {
    console.log(`count is: ${birthDay}`)
    console.log(formState.birthDay)
  }
)
</script>
