<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
};
</script>

<style>
#tab-bar {
  width: 100%;
  height: 49px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #f6f6f6;
  border-top: 0.5px solid #eee;
  position: fixed;
  bottom: 0;
}
</style>
