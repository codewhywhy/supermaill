<template>
  <div class="goodsList">
    <goods-list-item
      v-for="(item,index) in JSON.parse(JSON.stringify(this.goods))"
      :goodsListItem="item"
      class="item"
      @click="tabClick"
    ></goods-list-item>
  </div>
</template>
<script>
import GoodsListItem from "./GoodsListItem";
export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    GoodsListItem
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    }
  }
};
</script>
<style>
.goodsList {
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
  justify-content: space-between;
}
.goodsList .item {
  width: 48%;
}
</style>