<template>
  <div class="swiper-box">
    <div class="swiper-content">
      <van-swipe :autoplay="5000">
        <van-swipe-item v-for="(image, index) in swiperImgSrcLists" :key="index">
          <img :src="'https://'+image.img_path" width="100%" @click="jumpPage(index)" height="100%">
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
export default {
  props: ["swiperImgSrcLists"],
  methods: {
    jumpPage(index) {
      console.log(index);
      window.location.href = this.swiperImgSrcLists[index].link;
    }
  }
};
</script>

<style lang="scss" scoped>
.swiper-box {
  margin-top: 0.3rem;
  padding: 0 0.28rem;
  .swiper-content {
    width: 6.94rem;
    height: 1.34rem;
    overflow: hidden;
    border-radius: 1.34rem;
    .van-swipe {
      height: 100% !important;
    }
  }
}
.swiper-box .swiper-content .van-swipe {
  border-radius: 1.34rem !important;
}
</style>