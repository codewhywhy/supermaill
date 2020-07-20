<template>
  <div class="homeSwiper">
    <swiper v-if="banners.length">
      <swiper-item v-for="(item, index) in banners">
        <!-- <a :href="item.link"> -->
        <img :src="item.image" alt @load="imgLoad" />
        <!-- </a> -->
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isLoaded: false
    };
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imgLoad() {
      this.$emit("homeSwiperImgLoad");
    }
  }
};
</script>

<style scoped>
</style>