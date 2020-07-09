<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-active-icon"></slot>
    </div>

    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red"
    }
  },
  data() {
    return {
      // isActive: false
    };
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    }
  },
  methods: {
    itemClick: function() {
      this.$router.replace(this.path);
    }
  }
};
</script>

<style>
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin: 0;
}
.tab-bar-item {
  font-size: 10px;
  color: #999;
}
.tab-bar-item p {
  margin: 0;
}
</style>
