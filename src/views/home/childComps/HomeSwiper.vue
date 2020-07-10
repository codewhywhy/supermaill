<template>
  <swiper ref="swiper" v-if="banners.length">
    <swiper-item v-for="(item, index) in banners">
      <a :href="item.link">
        <img :src="item.image" alt />
      </a>
    </swiper-item>
  </swiper>
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
  methods: {}
};
</script>

<style scoped>
</style>