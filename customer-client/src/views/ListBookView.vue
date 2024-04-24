<template>
  <div :style="{}">
    <!-- {{ books }}   -->
    <a-space wrap>
      <template v-for="book in books" :key="book.key">
        <ProductCard :book />
      </template>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import { getAll } from '@/api/data.api'
import ProductCard from '@/components/Card/ProductCard.vue'
import type { IBook } from '@/interfaces/book.interface'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const books = ref<IBook[]>([])

const route = useRoute()

onMounted(async () => {
  try {
    const results = await getAll<IBook>({ source: 'books', params: route.query })

    books.value = results
  } catch (error) {
    console.log(error)
  }
})
</script>
