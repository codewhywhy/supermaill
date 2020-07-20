<template>
  <div class="homeRecommend">
    <div class="recommen-item" v-for="item in recommend">
      <a :href="item.link">
        <img :src="item.image" alt />
      </a>
      <p>{{item.title}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomeRecommend",
  props: {
    recommend: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>
<style>
.homeRecommend {
  width: 100%;
  padding: 10px 15px 20px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 8px solid #eee;
}
.recommen-item {
  text-align: center;
  color: #999;
  font-size: 12px;
}
.recommen-item img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>