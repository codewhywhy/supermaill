<template>
  <div class="detailSwiper">
    <swiper>
      <swiper-item v-for="item in bannerList">
        <a :href="item.link">
          <img :src="item.image" alt @load="imageload" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "DetailSwiper",
  props: {
    bannerList: {
      type: Array,
      defaulet() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imageload() {
      this.$emit("detailImageLoad");
    }
  }
};
</script>
<style></style>