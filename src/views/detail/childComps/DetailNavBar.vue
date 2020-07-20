<template>
  <div class="detailNavBar">
    <nav-bar>
      <div slot="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt />
      </div>
      <div slot="center" class="titleCenter">
        <div
          class="centerNav"
          v-for="(item,index) in title"
          @click="titleClick(index)"
          :class="{active:currentIndex===index}"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from "components/content/navBar/NavBar";
export default {
  name: "DetailNavBar",
  props: {
    title: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  components: {
    NavBar
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit("detailNavClick", index);
    },
    backClick() {
      this.$router.back();
    }
  }
};
</script>
<style>
.detailNavBar {
  width: 100%;
  height: 44px;
  line-height: 44px;
}
.titleCenter {
  width: 100%;
  display: flex;
  font-size: 13px;
}
.centerNav {
  flex: 1;
}
.left {
  text-align: center;
}
.left img {
  margin-top: 12px;
}
.active {
  color: var(--color-high-text);
}
</style>