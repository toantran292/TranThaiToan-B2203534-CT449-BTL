<template>
  <a-card
    hoverable
    @click="() => router.push(`/${book?._id}`)"
    :style="{ width: '240px', height: '360px' }"
  >
    <div>
      <img
        alt="??"
        src="../../assets/images/image.png"
        :style="{ height: '260px', objectFit: 'contain', aspectRatio: '16/9', width: '100%' }"
      />
    </div>
    <a-card-meta :title="book?.name" />
    Hiện có: {{ book?.stock }} <br />
    Giá: {{ book?.unitCost }}
  </a-card>
</template>

<script setup lang="ts">
import type { IBook } from '@/interfaces/book.interface'
import router from '@/router'
import type { PropType } from 'vue'

defineProps({
  book: Object as PropType<IBook>
})
</script>
