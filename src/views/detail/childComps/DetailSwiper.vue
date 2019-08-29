<template>
      <Swiper class="detail-swiper">
          <Swiper-item v-for="(item,index) in topImages" :key="index">
              <img :src="item" alt="">
          </Swiper-item>
      </Swiper>
</template>
<script>
import {Swiper,SwiperItem} from "components/common/swiper"
export default {
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components:{
      Swiper,
      SwiperItem
  }
};
</script>
<style scoped>
.detail-swiper{
    height: 300px;
    overflow: hidden;
}
</style>