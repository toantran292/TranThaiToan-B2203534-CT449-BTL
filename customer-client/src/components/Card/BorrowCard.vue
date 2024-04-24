<template>
  <div>
    <hr class="my-4" />
    <div class="row mb-4 d-flex justify-content-between align-items-center">
      <div class="col-md-2 col-lg-2 col-xl-2">
        <img
          style="width: 100px; height: 100px; object-fit: cover"
          :src="baseURL + '/' + borrow.book.image"
          class="img-fluid rounded-3"
          alt="Cotton T-shirt"
        />
      </div>
      <div class="col-md-3 col-lg-3 col-xl-3">
        <h6 class="text-muted">{{ borrow.book.title }}</h6>
        <h6 class="text-black mb-0">{{ borrow.book.author }}</h6>
      </div>

      <div class="col-md-3 col-lg-3 col-xl-3">
        <h6 class="text-muted">Ngày mượn</h6>
        <h6 class="text-black mb-0">{{ formatDate(borrow.borrowingDay) }}</h6>
      </div>

      <div class="col-md-3 col-lg-3 col-xl-3">
        <h6 class="text-muted">Ngày trả</h6>
        <h6 class="text-black mb-0">{{ formatDate(borrow.returnDay) }}</h6>
      </div>
    </div>
  </div>
</template>

<script setup>
const baseURL = import.meta.env.VITE_BE_ENDPOINT
const props = defineProps(['borrow'])
// import { formatCurrency, formatDate } from '../../utils/format'

console.log(props.borrow)
</script>
