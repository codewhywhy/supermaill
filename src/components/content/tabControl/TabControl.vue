<template>
  <div class="TabControl">
    <div
      class="tab-item"
      v-for="(item,index) in tabControlTitle"
      :class="{active:index===currentIndex}"
      @click="itemClick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabControl",
  props: {
    tabControlTitle: {
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
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("tabClick", index);
    }
  }
};
</script>
<style>
.TabControl {
  width: 100%;
  height: 44px;
  background-color: #fff;
  line-height: 44px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.tab-item span {
  padding-bottom: 10px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 2px solid var(--color-high-text);
}
</style>