<template>
  <a-carousel autoplay :style="{ width: '100%' }">
    <div>
      <img src="../../assets/images/banner-1.jpg" :style="{ objectFit: 'cover' }" />
    </div>
    <div>
      <img src="../../assets/images/banner-2.jpg" :style="{ objectFit: 'cover' }" />
    </div>
    <div>
      <img src="../../assets/images/banner-3.jpg" :style="{ objectFit: 'cover' }" />
    </div>
  </a-carousel>
</template>

<style scoped>
:deep(.slick-dots) {
  position: relative;
  height: auto;
}
:deep(.slick-slide img) {
  border: 5px solid #fff;
  display: block;
  margin: auto;
  max-width: 100%;
}
:deep(.slick-arrow) {
  display: none !important;
}
:deep(.slick-thumb) {
  bottom: 0px;
}
:deep(.slick-thumb li) {
  width: 60px;
  height: 45px;
}
:deep(.slick-thumb li img) {
  width: 100%;
  height: 100%;
  filter: grayscale(100%);
  display: block;
}
:deep .slick-thumb li.slick-active img {
  filter: grayscale(0%);
}
</style>
