<template>
  <div id="main-warp">
    <div class="main-content">
      <router-view />
    </div>
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
  border: 30px solid #f7f7f7;
  border-bottom: none;
  margin-top: 10px;
}
.main-content {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
}
</style>