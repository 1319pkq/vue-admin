<template>
  <div id="main-warp">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "main-warp",
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-warp {
  position: fixed;
  top: 75px;
  left: $navMenu;
  bottom: 0;
  right: 0;
  background: pink;
  border: 30px solid #f7f7f7;
  border-bottom: none;
  margin-top: 10px;
}
</style>