<template>
  <div class="goodsListItem" @click="itemClick">
    <img :src="goodsListItem.url" alt @load="imageLoad" />
    <p>{{ goodsListItem.desc }}</p>
  </div>
</template>
<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsListItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    imageLoad() {
      //第一种方式
      // if (this.$route.path.indexOf(`/home`)) {
      //   this.$bus.$emit("imageLoad");
      // } else if (this.$route.path.indexOf(`/detail`)) {
      //   this.$bus.$emit("detailImageLoad");
      // }
      //第二种方式
      this.$bus.$emit("imageLoad");
    },
    itemClick() {
      let iid = "IJWOsr2";
      this.$router.push("/detail/" + iid);
    }
  }
};
</script>
<style>
.goodsListItem {
  padding-bottom: 40px;
  position: relative;
}
.goodsListItem img {
  width: 100%;
  border-radius: 5px;
}
</style>
